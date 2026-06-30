const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const taskValidation = require("../validators/taskValidator");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    deleteCompletedTasks,
    getTaskStats
} = require("../controllers/taskController");

router.post("/", protect, taskValidation, validate, createTask);

router.get("/", protect, getTasks);

router.get("/stats", protect, getTaskStats);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, taskValidation, validate, updateTask);

router.delete("/:id", protect, deleteTask);

router.delete("/completed/all", protect, deleteCompletedTasks);

module.exports = router;