import { useLocation } from "react-router-dom";
import { useContext, useState, useMemo, useEffect } from "react";
import { GameContext } from "../context/DataContext";
import GameCard from "../components/GameCard";
import FilterPanel from "../components/FilterPanel";
import SearchNav from "../components/SearchNav";

export default function SearchResults() {
  const { games, dlcs } = useContext(GameContext);
  const location = useLocation();

  const queryParam = (new URLSearchParams(location.search).get("q") || "").toLowerCase();
  const [searchQuery, setSearchQuery] = useState(queryParam);

  const [filters, setFilters] = useState({
    genre: [],
    features: [],
    type: [],
    platforms: [],
    price: null,
  });

  useEffect(() => {
    const newQuery = (new URLSearchParams(location.search).get("q") || "").toLowerCase();
    setSearchQuery(newQuery);
  }, [location.search]);

  const combined = useMemo(() => [...games, ...dlcs], [games, dlcs]);

  const filtered = useMemo(() => {
    return combined.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const matchesQuery = searchQuery === "" || title.includes(searchQuery);

      const matchesGenre =
        filters.genre.length === 0 ||
        (Array.isArray(item.genre) && filters.genre.some((g) => item.genre.includes(g)));

      const matchesFeatures =
        filters.features.length === 0 ||
        (Array.isArray(item.features) && filters.features.some((f) => item.features.includes(f)));

      const matchesType =
        filters.type.length === 0 ||
        (typeof item.type === "string" && filters.type.includes(item.type));

      const matchesPlatforms =
        filters.platforms.length === 0 ||
        (Array.isArray(item.platforms) &&
          filters.platforms.some((p) => item.platforms.includes(p)));

      // 🛠️ Qiymət parse və filter
      let price = 0;
      if (typeof item.price === "number") {
        price = item.price;
      } else if (typeof item.price === "string") {
        const cleaned = item.price.replace(/[^0-9.]/g, "");
        price = parseFloat(cleaned);
        if (isNaN(price)) price = 0;
      }

      let matchesPrice = true;
      if (filters.price === "Free") matchesPrice = price === 0;
      else if (filters.price === "Under $5") matchesPrice = price < 5;
      else if (filters.price === "Under $10") matchesPrice = price < 10;
      else if (filters.price === "Under $20") matchesPrice = price < 20;
      else if (filters.price === "Under $50") matchesPrice = price < 50;

      return (
        matchesQuery &&
        matchesGenre &&
        matchesFeatures &&
        matchesType &&
        matchesPlatforms &&
        matchesPrice
      );
    });
  }, [combined, searchQuery, filters]);

  const recommended = games.slice(0, 5);

  return (
  <>
    <SearchNav />
    <div className="bg-[#0f0f10]">
    <div className="max-w-[82%] mx-auto min-h-screen text-white px-[3.5%] py-6">

      <div className="flex gap-6">
        <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h3 className="text-[50px] font-semibold text-center">No results found</h3>
            <p className="text-gray-400 mt-2 text-center max-w-md">
              Unfortunately I could not find any results matching your search.
            </p>
            <div className="grid grid-cols-4 gap-4 mt-4 w-full">
              {recommended.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}

        </div>

        <div className="w-[250px]">
          <FilterPanel
            onFilterChange={setFilters}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>
    </div>
    </div>
  </>
);
}
