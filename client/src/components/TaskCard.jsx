function TaskCard({ task, onDelete, onEdit }) {
    const priorityColor = {
        High: "#dc3545",
        Medium: "#fd7e14",
        Low: "#198754"
    };

    return (
        <div
            style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
        >
            <h2>{task.title}</h2>

            <p>{task.description || "No Description"}</p>

            <p>
                <strong>Priority: </strong>

                <span
                    style={{
                        background: priorityColor[task.priority],
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "14px"
                    }}
                >
                    {task.priority}
                </span>
            </p>

            <p>
                <strong>Status: </strong>

                {task.completed ? (
                    <span style={{ color: "green" }}>
                        ✅ Completed
                    </span>
                ) : (
                    <span style={{ color: "orange" }}>
                        ⏳ Pending
                    </span>
                )}
            </p>

            <p>
                <strong>Due Date: </strong>

                {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "20px"
                }}
            >
                <button
                    onClick={() => onEdit(task)}
                    style={{
                        flex: 1,
                        background: "#0d6efd",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(task._id)}
                    style={{
                        flex: 1,
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;