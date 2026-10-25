import Select from "../../ui/Select";

function Filters({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) {
    const categories = ["All", "electronics", "jewelery", "men's clothing", "women's clothing"];
    const sortOptions = ["Default", "Price: Low to High", "Price: High to Low"];

    return (
        <div className="mb-6 flex sm:flex-row flex-col items-center sm:justify-end justify-center gap-6">
            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row w-full sm:items-start items-center justify-end gap-4">
                <label className="text-gray-700 font-normal">Filter by Category</label>
                <div style={{ width: "100%", maxWidth: 200 }}>
                    <Select
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        size="large"
                    >
                        {categories.map((category) => (
                            <Select.Option key={category} value={category}>
                                {category === "All"
                                    ? "All Products"
                                    : category.charAt(0).toUpperCase() + category.slice(1)}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Sort Filter */}
            <div className="flex flex-col sm:flex-row w-full items-center gap-4">
                <label className="text-gray-700 font-normal">Sort by</label>
                <div style={{ width: "100%", maxWidth: 200 }}>
                    <Select
                        value={sortOrder}
                        onChange={setSortOrder}
                        size="large"
                    >
                        {sortOptions.map((option) => (
                            <Select.Option key={option} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
}

export default Filters;