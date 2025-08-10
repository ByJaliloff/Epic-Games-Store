import { FiSearch,  FiChevronDown } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { GameContext } from "../context/DataContext";
import { IoClose } from "react-icons/io5";

export default function SearchNav() {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { games, dlcs, user } = useContext(GameContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim()) {
        navigate(`/browse?q=${encodeURIComponent(query)}`);

        setShowDropdown(false);
      }
    }
  };
        const toggleMobileSearch = () => {
          setShowMobileSearch((prev) => !prev);
          setQuery("");
        };


  useEffect(() => {
    if (query.trim().length > 0) {
      const allItems = [
        ...games.map((item) => ({ ...item, type: "game" })),
        ...dlcs
      ];
      const filtered = allItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredResults(filtered.slice(0, 5)); // yalnız ilk 5 nəticə
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [query, games, dlcs]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

return (
  <div className="bg-[#0f0f10] sticky top-0 h-[80px] md:h-[100px] z-50">
    <div className="px-[3.5%] py-4 flex items-center h-full justify-between max-w-[95%] md:max-w-[82%] mx-auto relative">
      {/* Sol (search + nav links) */}
      <div className="flex items-center gap-6 relative flex-grow">
        {/* Search input */}
        <div className="hidden md:flex items-center bg-[#202024] hover:bg-[#404044] px-4 py-2 rounded-full text-sm text-white w-full max-w-[250px] relative z-50">
          <FiSearch
            onClick={handleSearch}
            className="mr-2 text-gray-400 cursor-pointer"
          />
          <input
            type="text"
            placeholder="Search store"
            className="bg-transparent outline-none placeholder-gray-400 text-white w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
          <div className="md:hidden flex items-center z-50">
                  <FiSearch
                    className="text-white text-xl cursor-pointer"
                    onClick={toggleMobileSearch}
                  />
                </div>

                {/* Açılan mobil input – tam enli üst div */}
                {showMobileSearch && (
                  <div className="absolute top-[-30px] left-0 w-full bg-[#202024] h-[80px] px-4 py-3 flex items-center z-50">
                    <FiSearch className="mr-2 text-white text-xl" />
                    <input
                      type="text"
                      placeholder="Search store"
                      className="bg-transparent outline-none placeholder-gray-400 text-white w-full text-sm"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      autoFocus
                    />
                    <IoClose
                      className="ml-2 text-white text-2xl cursor-pointer"
                      onClick={toggleMobileSearch}
                    />
                  </div>
                )}

        {/* Nav links (Discover, Browse, News) */}
              <div className="hidden md:flex items-center gap-4 text-sm font-medium">
                <Link
                  to="/"
                  className={`transition ${
                    location.pathname === "/"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Discover
                </Link>

                <Link
                  to="/browse"
                  className={`transition ${
                    location.pathname === "/browse"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Browse
                </Link>

                <Link
                  to="/news"
                  className={`transition ${
                    location.pathname === "/news"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  News
                </Link>
              </div>
{/* Mobile Discover dropdown (only visible on small screens) */}
<div className="flex md:hidden items-center w-full justify-between">
  <div className="relative w-full">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center gap-1 text-gray-400 hover:text-white transition text-sm font-medium"
    >
      Discover
      <FiChevronDown
        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    {isOpen && (
      <div className="absolute top-full left-[48%] -translate-x-[46%] mt-8 w-screen px-4 z-50">
        <div className="bg-[#101014] rounded-none shadow-lg p-[27px_32px] w-full flex flex-col items-center">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className={`block w-full px-4 py-3 text-base border-b border-[#333] text-left transition ${
              location.pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Discover
          </Link>
          <Link
            to="/browse"
            onClick={() => setIsOpen(false)}
            className={`block w-full px-4 py-3 text-base border-b border-[#333] text-left transition ${
              location.pathname === "/browse" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Browse
          </Link>
          <Link
            to="/news"
            onClick={() => setIsOpen(false)}
            className={`block w-full px-4 py-3 text-base text-left transition ${
              location.pathname === "/news" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            News
          </Link>
        </div>
      </div>
    )}
  </div>
</div>




        {/* Dropdown nəticələri */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute top-[50px] left-1/2 -translate-x-[41%] w-screen max-w-[500px]
           md:translate-x-0 md:left-5 md:w-[600px] backdrop-blur-md bg-[#1e1e1fcc] 
           rounded-xl shadow-xl z-40 overflow-hidden"


          >
            <div className="px-4 pt-4 pb-1 text-[12px] text-gray-300 font-bold uppercase">
              Top Results
            </div>

            {filteredResults.length === 0 ? (
              <div className="text-gray-400 text-sm p-4">No results found</div>
            ) : (
              filteredResults.map((item) => (
                <Link
                  to={`/details/${item.id}`}
                  key={item.id}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-start gap-3 px-4 p-3 hover:bg-[#4E4548] transition text-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover mt-1"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 mb-[2px]">
                      {item.type === "addon"
                        ? "Add-On"
                        : item.type === "edition"
                        ? "Edition"
                        : item.type === "demo"
                        ? "Demo"
                        : item.type === "editor"
                        ? "Editor"
                        : "Base Game"}
                    </span>
                    <span className="font-semibold text-sm leading-tight">
                      {item.title}
                    </span>
                  </div>
                </Link>
              ))
            )}

            <button
              className="w-full text-left text-gray-300 font-semibold text-sm px-4 py-2 pb-4 cursor-pointer"
              onClick={() => {
                navigate(`/browse?q=${encodeURIComponent(query)}`);

                setShowDropdown(false);
              }}
            >
              View results →
            </button>
          </div>
        )}
      </div>

      {/* Sağ (Wishlist, Cart) */}
      <div className="hidden md:flex items-center text-sm space-x-4 font-medium">
        <Link
          to="/wishlist"
          onClick={(e) => {
            if (!user) {
              e.preventDefault(); // linkin default davranışını ləğv et
              navigate("/signin");
            }
          }}
          className="text-gray-400 hover:text-white transition"
        >
          Wishlist
        </Link>

                <Link to="/basket" className="text-gray-400 hover:text-white transition">
          Cart
        </Link>
      </div>

      <div className="flex md:hidden items-center space-x-4 text-xl text-gray-400 pl-5">
            <Link
              to="#"
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  navigate("/signin");
                }
              }}
              className="hover:text-white transition"
            >
              <FaRegCheckCircle />
            </Link>

        <Link to="/basket" className="hover:text-white transition">
          <IoCartOutline />
        </Link>
      </div>
    </div>
  </div>
);

}
