import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import TaskCard from "../components/TaskCard";
import StatsCards from "../components/StatsCards";
import TaskForm from "../components/TaskForm";
import "../Dashboard.css";


function Dashboard() {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const [editingTask, setEditingTask] = useState(null);

    const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0
});

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: ""
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("newest");

    // Fetch Tasks
   const fetchTasks = async () => {

    try {

        const { data } = await API.get(
            `/tasks?search=${search}&status=${status}&sort=${sort}`
        );

        setTasks(data);

    } catch (error) {

        alert("Please login again");

        localStorage.removeItem("token");

        navigate("/");

    }

};

const fetchStats = async () => {

    try {

        const { data } = await API.get("/tasks/stats");

        setStats(data);

    } catch (error) {

        console.log(error);

    }

};

useEffect(() => {

    fetchTasks();

    fetchStats();

}, [search, status, sort]);

    // Handle Input Change
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update Task
    const saveTask = async (taskData) => {
        try {

            if (editingTask) {

                await API.put(`/tasks/${editingTask._id}`, taskData);

                alert("Task Updated Successfully");

                setEditingTask(null);

            } else {

                await API.post("/tasks", taskData);

                alert("Task Added Successfully");

            }

            setForm({
                title: "",
                description: "",
                priority: "Medium",
                dueDate: ""
            });

            fetchTasks();

        } catch (error) {

            alert(error.response?.data?.message || "Operation Failed");

        }
    };

    // Delete Task
    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/tasks/${id}`);

            alert("Task Deleted Successfully");

            fetchTasks();

        } catch (error) {

            alert("Failed to delete task");

        }

    };

    // Edit Task
    const editTask = (task) => {

        setEditingTask(task);

        setForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

       <div className="min-h-screen bg-slate-100">

    <div className="bg-gradient-to-r from-blue-700 to-blue-500 shadow-lg">

        <div className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">

            <div>

                <h1 className="text-4xl font-bold text-white">
                    Task Manager
                </h1>

                <p className="text-blue-100 mt-2">
                    Manage your daily work efficiently
                </p>

            </div>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg text-white font-semibold transition"
            >
                Logout
            </button>

        </div>

    </div>

    <div className="max-w-7xl mx-auto px-8 py-8">

        {/* Stats */}

        <StatsCards stats={stats} />

        {/* Search */}

        <SearchBar
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
        />

        {/* Form */}

        <TaskForm
            onSubmit={saveTask}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
        />

        {/* Tasks */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            {tasks.map((task) => (

                <TaskCard
                    key={task._id}
                    task={task}
                    onDelete={deleteTask}
                    onEdit={editTask}
                />

            ))}

        </div>

    </div>

</div>
    );
}

export default Dashboard;