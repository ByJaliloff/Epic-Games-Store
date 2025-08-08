import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import Error from "../pages/Error";


function Card( {games, dlcs, loading, error}) {

  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

const handleWishlist = (item, e) => {
  e.preventDefault();
  e.stopPropagation();

  const exists = wishlistItems.find((i) => i.id === item.id);
  let updatedWishlist;

  if (exists) {
    updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
    toast.info(
  <div className="flex items-center gap-3">
    <img
      src={item.image}
      alt={item.title}
      className="w-10 h-10 object-cover rounded"
    />
    <div>
      <p className="text-white font-semibold">{item.title}</p>
      <p className="text-gray-300 text-sm">Removed from wishlist</p>
    </div>
  </div>
);

  } else {
    updatedWishlist = [...wishlistItems, item];
    toast.success(
  <div className="flex items-center gap-3">
    <img src={item.image} alt="game" className="w-10 h-10 rounded object-cover" />
    <div>
      <p className="font-semibold text-white">{item.title}</p>
      <p className="text-sm text-gray-300">Added to wishlist</p>
    </div>
  </div>
);

  }

  setWishlistItems(updatedWishlist);
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
};

  const handleAddToCartAndNavigate = (item, e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((i) => i.id === item.id);
    if (!exists) {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    navigate("/basket");
  };

  const [startIndexes, setStartIndexes] = useState({
    discover: 0,
    sale: 0,
    free: 0,
    edition: 0,
  });

  const cardsPerPage = 5;

  const typeMapping = {
    basedgame: "Base Game",
    dlc: "DLC",
    expansion: "Expansion",
    edition: "Edition",
    addon: "Addon",
  };

  const today = dayjs();

  const newReleases = [...games]
  .filter((g) => g.type === "basedgame" && g.releaseDate && dayjs(g.releaseDate).isBefore(today))
  .sort((a, b) => dayjs(b.releaseDate).diff(dayjs(a.releaseDate)));

  // Top Rated: rating-i 5-ə ən yaxın olanlar
  const topRated = [...games]
    .filter((g) => g.type === "basedgame" && g.rating)
    .sort((a, b) => Math.abs(5 - a.rating) - Math.abs(5 - b.rating));

  // Coming Soon: releaseDate === "upcoming"
  const comingSoon = [...games].filter((g) => g.releaseDate === "upcoming");

  const filtered = {
    discover: games.filter(
      (g) =>
        g.type === "basedgame" &&
        !(g.price === "Free" || g.price === 0 || g.isFree === true) &&
        !g.discount
    ),
    sale: games.filter(
      (g) =>
        g.type === "basedgame" &&
        !(g.price === "Free" || g.price === 0 || g.isFree === true) &&
        g.discount
    ),
    free: games.filter(
      (g) =>
        g.type === "basedgame" &&
        (g.price === "Free" || g.price === 0 || g.isFree === true)
    ),
    edition: dlcs.filter((d) => d.type === "edition" || d.type === "addon"),

      new: newReleases,
      top: topRated,
      upcoming: comingSoon,

  };

  if (loading) return <Loader />
  if (error) return <Error />

  const handleSlide = (type, direction) => {
    setStartIndexes((prev) => {
      const max = filtered[type].length - cardsPerPage;
      const nextIndex = prev[type] + direction * cardsPerPage;
      return {
        ...prev,
        [type]: Math.max(0, Math.min(nextIndex, max)),
      };
    });
  };

const renderCards = (items, type, isMobile = false) => {
  const containerClass = isMobile
    ? "flex gap-4 overflow-x-auto scrollbar-hide"
    : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6";

  return (
    <div className={containerClass}>
      {items.map((item) => {
        const isDiscounted = item.discount && item.discount > 0;
        const isFree =
          item.price === "Free" || item.price === 0 || item.isFree === true;
        const price = isFree ? 0 : parseFloat(item.price);
        const discountedPrice = isDiscounted
          ? (price - (price * item.discount) / 100).toFixed(2)
          : null;

        const isInWishlist = wishlistItems.some((w) => w.id === item.id);

        const CardContent = (
          <div className="bg-[#101014] rounded-lg overflow-hidden transition duration-300 group cursor-pointer w-full sm:min-w-0 min-w-[200px]">
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[280px] object-cover"
              />
<div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
  <div className="relative group/icon">
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/30 cursor-pointer transition-all duration-300 ${
        isInWishlist ? "animate-glow-custom" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        handleWishlist(item, e);
      }}
    >
      <img
        src={
          isInWishlist
            ? "/icons/check.png"
            : "/icons/wishlist5.png"
        }
        alt="wishlist"
        className="w-6 h-6"
      />
    </div>
    {/* Tooltip (desktop hover üçün) */}
    <div className="absolute top-10 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 z-10 hidden md:block">
      {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    </div>
  </div>
</div>

            </div>

            <div className="p-4 flex flex-col h-[140px] justify-between">
              <div>
                <p className="text-[#ffffffa6] text-[12px] font-semibold mb-1">
                  {typeMapping[item.type] || item.type}
                </p>
                <h2 className="text-[#fff] font-bold text-[16px] leading-tight line-clamp-2">
                  {item.title}
                </h2>
              </div>

              <div className="mt-2">
                {isFree ? (
                  <p className="text-[#0f0] font-semibold text-lg">Free</p>
                ) : isDiscounted ? (
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white text-[12px] px-2 py-0.5 rounded">
                      -{item.discount}%
                    </span>
                    <span className="line-through text-[#888] text-[14px]">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-[#fff] text-[14px] font-semibold">
                      ${discountedPrice}
                    </span>
                  </div>
                ) : (
                  <p className="text-[#fff] text-[14px] font-semibold">
                    ${price.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

        return item.type === "basedgame" ? (
          <Link
            to={`/details/${item.id}`}
            key={item.id}
            className="text-left"
          >
            {CardContent}
          </Link>
        ) : (
          <button
            key={item.id}
            onClick={(e) => handleAddToCartAndNavigate(item, e)}
            className="text-left"
          >
            {CardContent}
          </button>
        );
      })}
    </div>
  );
};


const Section = ({ title, type }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className="py-8">
     <div className="max-w-[90%] sm:max-w-[88%] md:max-w-[85%] lg:max-w-[83%] xl:max-w-[75%] mx-auto flex items-center justify-between mb-6">
        <h2 className="text-[#fff] text-[20px] font-bold group transition-all flex items-center">
          {title}
          <span className="ml-1 flex items-center">
            {type === "discover" && <span>New</span>}
            <span className="transition-all duration-300 group-hover:ml-3 ml-1">
              {">"}
            </span>
          </span>
        </h2>

        <div className="hidden md:flex gap-4">
          <button
            onClick={() => handleSlide(type, -1)}
            disabled={startIndexes[type] === 0}
          >
            <img
              src="/icons/arrow-left.png"
              alt="prev"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition"
            />
          </button>
          <button
            onClick={() => handleSlide(type, 1)}
            disabled={
              startIndexes[type] + cardsPerPage >= filtered[type].length
            }
          >
            <img
              src="/icons/arrow-right.png"
              alt="next"
              className="w-6 h-6 opacity-80 hover:opacity-100 transition"
            />
          </button>
        </div>
      </div>

      <div className="max-w-[90%] sm:max-w-[88%] md:max-w-[85%] lg:max-w-[83%] xl:max-w-[75%] mx-auto">
        {isMobile
          ? renderCards(filtered[type], type, true)
          : renderCards(
              filtered[type].slice(
                startIndexes[type],
                startIndexes[type] + cardsPerPage
              ),
              type,
              false
            )}
      </div>
    </div>
  );
};


  const SectionStatic = ({ title, type, index }) => {
  const items = filtered[type].slice(0, 5);


  return (
    <div
  className={`
    p-0
    2xl:p-4 
    ${index !== 2 && "lg:border-r lg:border-gray-500"} 
    ${index % 2 === 0 && "sm:border-r sm:border-gray-500 lg:border-0"}
  `}
>

      <h2 className="text-white text-[20px] font-bold mb-4 flex items-center gap-2">
        {title} <span className="text-gray-400 text-sm">{'>'}</span>
      </h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const isDiscounted = item.discount && item.discount > 0;
          const isFree =
            item.price === "Free" || item.price === 0 || item.isFree === true;
          const price = isFree ? 0 : parseFloat(item.price);
          const discountedPrice = isDiscounted
            ? (price - (price * item.discount) / 100).toFixed(2)
            : null;
          const isInWishlist = wishlistItems.some((w) => w.id === item.id);

          return (
                <div
                  key={item.id}
                  className="group flex items-center gap-4 p-2 relative rounded-lg hover:bg-[#2a2a2d] transition cursor-pointer"
                >
                  {/* Image Wrapper with Wishlist Icon on top */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-15 h-20 object-cover rounded-md"
                    />
                    <div
                        onClick={(e) => handleWishlist(item, e)}
                        className="absolute top-0 right-0 w-7 h-7 rounded-full backdrop-blur-md bg-white/20 flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100"
                      >

                      <img
                        src={
                          isInWishlist
                            ? "/icons/check.png"
                            : "/icons/wishlist5.png"
                        }
                        alt="wishlist"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div
                        onClick={() => navigate(`/details/${item.id}`)}
                        className="flex flex-col text-white"
                      >
                        <span className="font-semibold text-base line-clamp-1">{item.title}</span>

                        {isFree ? (
                          <span className="text-[#0f0] text-sm font-semibold">Free</span>
                        ) : isDiscounted ? (
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                              -{item.discount}%
                            </span>
                            <span className="text-sm line-through text-gray-400">
                              ${price.toFixed(2)}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              ${discountedPrice}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-white">
                            ${price.toFixed(2)}
                          </span>
                        )}
                      </div>

                </div>

          );
        })}
      </div>
    </div>
  );
};


  

  return (
  <div className="bg-[#0f0f10]">
      <Section title="Discover Something" type="discover" />
      <Section title="Summer Sale Spotlight" type="sale" />
      
    <div className="max-w-[90%] sm:max-w-[88%] md:max-w-[85%] lg:max-w-[83%] xl:max-w-[75%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <SectionStatic title="New Releases" type="new" index={0} />
      <SectionStatic title="Top Player Rated" type="top" index={1} />
      <SectionStatic title="Coming Soon" type="upcoming" index={2} />
    </div>

      <Section title="Top Free Games" type="free" />
      <Section title="Editions & Addons" type="edition" />
  </div>
  );
}

export default Card;
