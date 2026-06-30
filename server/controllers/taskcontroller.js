const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

// ================= CREATE TASK =================

const createTask = asyncHandler(async (req, res) => {

    const { title, description, priority, dueDate } = req.body;

    if (!title) {
        res.status(400);
        throw new Error("Task title is required");
    }

    const task = await Task.create({
        title,
        description,
        priority,
        dueDate,
        user: req.user._id
    });

    res.status(201).json(task);

});

// ================= GET ALL TASKS (SEARCH + FILTER + SORT) =================

const getTasks = asyncHandler(async (req, res) => {

    const { search, status, sort } = req.query;

    // Base query (only logged-in user's tasks)
    let query = {
        user: req.user._id
    };

    // ---------- SEARCH ----------
    if (search) {
        query.$or = [
            {
                title: {
                    $regex: search,
                    $options: "i"
                }
            },
            {
                description: {
                    $regex: search,
                    $options: "i"
                }
            }
        ];
    }

    // ---------- FILTER ----------
    if (status === "completed") {
        query.completed = true;
    } else if (status === "pending") {
        query.completed = false;
    }

    // ---------- SORT ----------
    let sortOption = {
        createdAt: -1
    };

    switch (sort) {

        case "oldest":
            sortOption = {
                createdAt: 1
            };
            break;

        case "priority":
            sortOption = {
                priority: 1
            };
            break;

        case "dueDate":
            sortOption = {
                dueDate: 1
            };
            break;

        case "newest":
        default:
            sortOption = {
                createdAt: -1
            };
            break;
    }

    const tasks = await Task.find(query).sort(sortOption);

    res.status(200).json(tasks);

});

// ================= GET SINGLE TASK =================

const getTaskById = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    res.status(200).json(task);

});

// ================= UPDATE TASK =================

const updateTask = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    const updatedTask = await Task.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user._id
        },
        req.body,
        {
            returnDocument: "after"
        }
    );

    res.status(200).json(updatedTask);

});

// ================= DELETE TASK =================

const deleteTask = asyncHandler(async (req, res) => {

    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!task) {
        res.status(404);
        throw new Error("Task not found");
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        message: "Task deleted successfully"
    });

});

// ================= DELETE COMPLETED TASKS =================

const deleteCompletedTasks = asyncHandler(async (req, res) => {

    const result = await Task.deleteMany({
        user: req.user._id,
        completed: true
    });

    res.status(200).json({
        success: true,
        message: `${result.deletedCount} completed task(s) deleted`
    });

});
// ================= TASK STATISTICS =================

const getTaskStats = asyncHandler(async (req, res) => {

    const totalTasks = await Task.countDocuments({
        user: req.user._id
    });

    const completedTasks = await Task.countDocuments({
        user: req.user._id,
        completed: true
    });

    const pendingTasks = await Task.countDocuments({
        user: req.user._id,
        completed: false
    });

    const overdueTasks = await Task.countDocuments({
        user: req.user._id,
        completed: false,
        dueDate: {
            $lt: new Date()
        }
    });

    res.status(200).json({
        totalTasks,
        completedTasks,
        pendingTasks,
        overdueTasks
    });

});

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteCompletedTasks,
    getTaskStats
};