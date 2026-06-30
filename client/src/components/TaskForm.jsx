import { useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: ""
    });

    useEffect(() => {
        if (editingTask) {
            setForm({
                title: editingTask.title || "",
                description: editingTask.description || "",
                priority: editingTask.priority || "Medium",
                dueDate: editingTask.dueDate
                    ? editingTask.dueDate.substring(0, 10)
                    : ""
            });
        } else {
            setForm({
                title: "",
                description: "",
                priority: "Medium",
                dueDate: ""
            });
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div
            style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: "25px"
            }}
        >
            <h2>
                {editingTask ? "Edit Task" : "Add New Task"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px"
                    }}
                />

                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px"
                    }}
                />

                <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "12px"
                    }}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >
                    <button
                        type="submit"
                        style={{
                            flex: 1,
                            background: "#198754",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>

                    {editingTask && (
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                flex: 1,
                                background: "#6c757d",
                                color: "white",
                                border: "none",
                                padding: "12px",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
}

export default TaskForm;