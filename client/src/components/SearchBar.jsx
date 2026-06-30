function SearchBar({
    search,
    setSearch,
    status,
    setStatus,
    sort,
    setSort
}) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "25px",
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
        >
            {/* Search */}
            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    flex: 2,
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc"
                }}
            />

            {/* Filter */}
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px"
                }}
            >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>

            {/* Sort */}
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "5px"
                }}
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
            </select>
        </div>
    );
}

export default SearchBar;