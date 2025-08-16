import { useState, useContext, useEffect } from "react";
import { GameContext } from "../context/DataContext";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const extractUniqueValues = (games, key) => {
  const values = games.flatMap((game) =>
    Array.isArray(game[key]) ? game[key] : []
  );
  return [...new Set(values)];
};

const extractSingleValues = (games, key) => {
  const values = games
    .map((game) => game[key])
    .filter((val) => val !== undefined && val !== null && val !== "");
  return [...new Set(values)];
};

export default function FilterPanel({ onFilterChange, searchQuery, onSearchChange,  onFilterStatusChange  }) {
  const { games, dlcs } = useContext(GameContext);
  const allItems = [...games, ...dlcs];

  const typeMapping = {
  basedgame: "Base Game",
  editor: "Editor",
  demo: "Demo",
  edition: "Edition",
  addon: "Addon",
};


  const [openSection, setOpenSection] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    genre: [],
    features: [],
    type: [],
    platforms: [],
    price: null,
  });

useEffect(() => {
  onFilterChange && onFilterChange(selectedFilters);

  // Yeni: Filter və search aktivdirsə xəbər ver
  if (onFilterStatusChange) {
    const isSearchActive = !!searchQuery?.trim();
    const hasActiveFilters = Object.values(selectedFilters).some((v) =>
      Array.isArray(v) ? v.length > 0 : v !== null
    );
    onFilterStatusChange(isSearchActive || hasActiveFilters);
  }
}, [selectedFilters, onFilterChange, searchQuery, onFilterStatusChange]);


  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const toggleValue = (key, value) => {
    setSelectedFilters((prev) => {
      const current = prev[key];
      const newValues = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (price) => {
    setSelectedFilters((prev) => ({
      ...prev,
      price: prev.price === price ? null : price,
    }));
  };

const resetFilters = () => {
  setSelectedFilters({
    genre: [],
    features: [],
    type: [],
    platforms: [],
    price: null,
  });

  // Axtarış inputunu sıfırla
  if (onSearchChange) {
    onSearchChange("");
  }
};


  const getActiveFilterCount = () => {
    let count = 0;
    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) count += value.length;
      else if (value !== null) count += 1;
    });
    // Add search query to count if it exists
    if (searchQuery?.trim()) count += 1;
    return count;
    };


  const sections = [
    { title: "Genre", key: "genre", values: extractUniqueValues(allItems, "genre") },
    { title: "Features", key: "features", values: extractUniqueValues(allItems, "features") },
    { title: "Types", key: "type", values: extractSingleValues(allItems, "type") },
    { title: "Platform", key: "platforms", values: extractUniqueValues(allItems, "platforms") },
  ];

  return (
  <div className="w-[250px] mx-auto  text-sm space-y-4 py-5 px-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="text-blue-400 ml-1">
              ({getActiveFilterCount()})
            </span>
          )}
        </h3>
        <button
          onClick={resetFilters}
          className="flex items-center text-blue-400 hover:text-white transition text-sm"
        >
          reset
        </button>
      </div>
    <input
      type="text"
      value={searchQuery ?? ""}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Search..."
      className="w-full px-2 py-1 mt-1 mb-4 bg-[#1e1e1e] text-white border border-gray-600 rounded"
    />

        {sections.map(({ title, key, values }) => (
        <div key={title}>
        <div
        onClick={() => toggleSection(title)}
        className={`flex items-center justify-between text-[#ffffffa6] cursor-pointer py-5 px-3 border-b border-gray-600
            hover:text-white transition-colors duration-300`}
        >
        <h4 className="font-medium">{title}</h4>
        {openSection === title ? <FiChevronUp /> : <FiChevronDown />}
        </div>


            {openSection === title && (
            <ul className="mt-2 pl-1 space-y-1">
                {values.map((val) => (
                <li
                    key={val}
                    onClick={() => toggleValue(key, val)}
                    className="flex items-center font-semibold justify-between cursor-pointer text-[#ffffffa6] p-3 hover:bg-gray-700 rounded"
                >
                    {/* Burada 'type' üçün mapping tətbiq edilir */}
                    {key === "type" ? (typeMapping[val] || val) : val}
                    {selectedFilters[key].includes(val) && (
                    <span className="text-green-400 font-bold">✓</span>
                    )}
                </li>
                ))}
            </ul>
            )}
        </div>
        ))}

        {/* Price section */}
        <div>
        <div
            onClick={() => toggleSection("Price")}
            className="flex items-center justify-between cursor-pointer text-[#ffffffa6] hover:text-white py-5 px-3 border-b border-gray-600 transition-colors duration-300"
        >
            <h4 className="font-medium">Price</h4>
            {openSection === "Price" ? <FiChevronUp /> : <FiChevronDown />}
        </div>
        {openSection === "Price" && (
            <ul className="mt-2 pl-1 space-y-1">
            {["Free", "Under $5", "Under $10", "Under $20", "Under $50"].map((label) => (
                <li
                key={label}
                onClick={() => handlePriceChange(label)}
                className={`flex items-center font-semibold justify-between cursor-pointer p-3 rounded hover:bg-gray-700 ${
                    selectedFilters.price === label ? "text-white" : "text-[#ffffffa6]"
                }`}
                >
                {label}
                {selectedFilters.price === label && (
                    <span className="text-green-400 font-bold">✓</span>
                )}
                </li>
            ))}
            </ul>
        )}
        </div>



  </div>
);

}