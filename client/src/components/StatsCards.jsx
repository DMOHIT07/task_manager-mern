function StatsCards({ stats }) {

    const cards = [
        {
            title: "Total Tasks",
            value: stats.totalTasks,
            color: "bg-blue-600",
            icon: "📋"
        },
        {
            title: "Completed",
            value: stats.completedTasks,
            color: "bg-green-600",
            icon: "✅"
        },
        {
            title: "Pending",
            value: stats.pendingTasks,
            color: "bg-yellow-500",
            icon: "⏳"
        },
        {
            title: "Overdue",
            value: stats.overdueTasks,
            color: "bg-red-600",
            icon: "⚠️"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`${card.color} text-white rounded-xl shadow-lg p-6`}
                >
                    <div className="flex justify-between items-center">

                        <div>

                            <p className="text-lg">
                                {card.title}
                            </p>

                            <h2 className="text-4xl font-bold mt-2">
                                {card.value}
                            </h2>

                        </div>

                        <span className="text-5xl">
                            {card.icon}
                        </span>

                    </div>

                </div>

            ))}

        </div>
    );
}

export default StatsCards;