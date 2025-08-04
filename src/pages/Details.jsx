import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SearchNav from "../components/SearchNav";
import GameCard from "../components/GameCard";

function Details() {
  const { id } = useParams();
  const { games, dlcs } = useContext(GameContext);
  const navigate = useNavigate();

  const game = games.find((g) => g.id === id);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const isInCart = cart.some((item) => item.id === game?.id);
  const isInWishlist = wishlist.some((item) => item.id === game?.id);

 const relatedDlcs = dlcs.filter(
  (dlc) =>
    dlc.gameId === id &&
    ["addon", "edition", "editor", "demo"].includes(dlc.type?.toLowerCase())
);

  const [showVideo, setShowVideo] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!game) return <div className="text-white">Oyun tapılmadı...</div>;

  const isFree = game.price === 0 || game.price === "Free" || game.isFree === true;
  const originalPrice = isFree ? 0 : parseFloat(game.price);
  const discountedPrice = game.discount
    ? (originalPrice - (originalPrice * game.discount) / 100).toFixed(2)
    : originalPrice.toFixed(2);

  const getOriginalImageUrl = (url) => url.split("?")[0];

  const typeMapping = {
    basedgame: "Base Game",
    dlc: "DLC",
    addon: "Add-on",
    edition: "Edition",
    expansion: "Expansion",
  };

  const platformIcons = {
  Windows: "/icons/windows.png",
  PS5: "/icons/playstation.png",
  Xbox: "/icons/xbox.png",
  Switch: "/icons/switch.png"
};

  const nextIndex = () => {
    setCurrentIndex((prev) => {
      const maxIndex = game.carouselImages.length - 1;
      return prev === maxIndex ? -1 : prev + 1;
    });
    setShowVideo(false);
  };

  const prevIndex = () => {
    setCurrentIndex((prev) => {
      const maxIndex = game.carouselImages.length - 1;
      return prev === -1 ? maxIndex : prev - 1;
    });
    setShowVideo(false);
  };

  const handleThumbnailClick = (idx) => {
    if (idx === -1) {
      setShowVideo(true);
      setCurrentIndex(-1);
    } else {
      setShowVideo(false);
      setCurrentIndex(idx);
    }
  };

  const addToCart = () => {
    if (!isInCart) {
      const updatedCart = [...cart, game];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (isInWishlist) {
        const updatedWishlist = wishlist.filter((item) => item.id !== game.id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
      window.location.reload();
    }
  };

  const addToWishlist = () => {
    if (!isInWishlist) {
      const updatedWishlist = [...wishlist, game];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      window.location.reload();
    }
  };

  function RatingStars({ rating }) {
    let starsImage = "/stars/1.png";
    if (rating >= 4.5) starsImage = "/stars/5.png";
    else if (rating >= 3.5) starsImage = "/stars/4.png";
    else if (rating >= 2.5) starsImage = "/stars/3.png";
    else if (rating >= 1.5) starsImage = "/stars/2.png";
    return (
      <div className="flex items-center gap-2 mt-1">
        <img src={starsImage} alt={`${rating} stars`} className="w-[100px] h-auto" />
        <span className="text-white text-sm font-medium">{rating}</span>
      </div>
    );
  }


  return (
    <div className="bg-[#0f0f10] min-h-screen">
      <SearchNav />
      <div className="max-w-[82%] mx-auto px-[3.5%] py-8 text-white">
        <div className="flex flex-col">
          <h1 className="text-[40px] font-bold mb-2">{game.title}</h1>
          {activeTab === "overview" && (
            <div className="flex items-center gap-4">
              <RatingStars rating={game.rating} />
              <div className="flex gap-4 text-gray-300 text-sm">
                <div className="flex items-center gap-1 font-semibold">🌐 Diverse Characters</div>
                <div className="flex items-center gap-1 font-semibold">📜 Amazing Storytelling</div>
              </div>
            </div>
          )}
        </div>

        <nav className="flex gap-6 text-white text-sm mt-6">
          {["overview", "Add-ons", "achievements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-[16px] font-semibold text-gray-200 ${
                activeTab === tab ? "border-b-2 border-blue-500 font-medium" : "hover:border-b-2 hover:border-gray-500 hover:text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            {/* Sol Panel */}
            <div className="lg:col-span-2">
                        <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="aspect-video rounded-xl overflow-hidden relative group">
              {(showVideo || currentIndex === -1) ? (
                <ReactPlayer src={game.video} muted playing controls loop width="100%" height="100%" />
              ) : (
                <img
                  src={getOriginalImageUrl(game.carouselImages[currentIndex])}
                  alt={`Selected ${currentIndex + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              )}
              <button onClick={prevIndex} className="absolute top-1/2 left-3 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">&#8592;</button>
              <button onClick={nextIndex} className="absolute top-1/2 right-3 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10">&#8594;</button>
            </div>

            <div className="flex items-center gap-2 mt-2 mx-[40px]">
              <button
                onClick={prevIndex}
                className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              >
                <img src="/icons/arrow-left.png" alt="Previous" className="w-5 h-5" />
              </button>

              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

                {/* YouTube thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${game.video?.split("v=")[1]}/0.jpg`}
                  alt="Video Thumbnail"
                  className={`w-30 h-18 object-cover rounded-lg cursor-pointer transition-filter duration-300 ${currentIndex === -1 ? "brightness-100" : "brightness-50"}`}
                  onClick={() => handleThumbnailClick(-1)}
                />

                {/* Carousel images */}
                {game.carouselImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Slide ${idx + 1}`}
                    className={`w-30 h-18 object-cover rounded-lg cursor-pointer transition-filter duration-300 ${currentIndex === idx ? "brightness-100" : "brightness-50"}`}
                    onClick={() => handleThumbnailClick(idx)}
                  />
                ))}
              </div>

              <button
                onClick={nextIndex}
                className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
              >
                <img src="/icons/arrow-right.png" alt="Next" className="w-5 h-5" />
              </button>
            </div>

            <p className="text-base text-[#fff]">{game.shortDescription}</p>

            <div className="flex flex-col md:flex-row gap-10">
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-2">Genres</h3>
                <div className="flex gap-2 flex-wrap">
                  {game.genre?.map((g, idx) => (
                    <span key={idx} className="bg-[#343437] font-semibold text-sm px-3 py-1 rounded-sm">{g}</span>
                  ))}
                </div>
              </div>
              <div className="border-l-2 border-gray-500/30 pl-6">
                <h3 className="text-gray-400 text-sm font-semibold mb-2">Features</h3>
                <div className="flex gap-2 flex-wrap">
                  {game.features?.map((f, idx) => (
                    <span key={idx} className="bg-[#343437] font-semibold text-sm px-3 py-1 rounded-sm">{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {game.fullDescription?.map((section, idx) => (
              <div key={idx} className="mt-4">
                <h2 className="text-xl font-bold mb-2">{section.heading}</h2>
                <p className="text-gray-300">{section.content}</p>
              </div>
            ))}
          </div>
            </div>
            {/* Sağ Panel */}
<div className="w-full lg:w-[400px]">
  <div className="w-full lg:w-[400px] flex flex-col gap-4">
    <img src={game.logo} alt={`${game.title} Logo`} className="h-50 object-contain" />
    
    <p className="inline-block max-w-max text-sm text-white px-2 py-0.5 bg-gray-600 rounded">
      {typeMapping[game.type?.toLowerCase()] || "Unknown"}
    </p>

    {isFree ? (
      <span className="text-[#0f0] font-semibold text-lg">Free</span>
    ) : game.discount ? (
      <div className="flex items-center gap-4">
        <span className="bg-blue-600 text-sm px-2 py-1 rounded-full">-{game.discount}%</span>
        <span className="line-through text-gray-400">${originalPrice.toFixed(2)}</span>
        <span className="text-white font-semibold">${discountedPrice}</span>
      </div>
    ) : (
      <span className="text-white font-semibold">${originalPrice.toFixed(2)}</span>
    )}

    
    <button className="bg-[#1e90ff] hover:bg-blue-500 text-white py-3 rounded-md font-semibold">
      {isFree ? "Get" : game.releaseDate?.toLowerCase() === "upcoming" ? "Pre-purchase" : "Buy Now"}
    </button>


    {isInCart ? (
      <button onClick={() => navigate("/basket")} className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold">
        View in Cart
      </button>
    ) : (
      <button onClick={addToCart} className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold">
        Add To Cart
      </button>
    )}

    {isInWishlist ? (
      <button onClick={() => navigate("/wishlist")} className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md">
        View in Wishlist
      </button>
    ) : (
      <button onClick={addToWishlist} className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md">
        Add to Wishlist
      </button>
    )}

    {/* Əlavə olunan məlumat sahəsi */}
    <div className="mt-4 text-sm text-white  pt-4 space-y-2">
      <div className="flex justify-between border-b border-gray-600 text-[14px] pb-4 font-semibold">
        <span className="text-gray-400">Developer</span>
        <span className="font-medium">{game.developer || "Unknown"}</span>
      </div>
      <div className="flex justify-between border-b border-gray-600 text-[14px] pb-4 font-semibold">
        <span className="text-gray-400">Publisher</span>
        <span className="font-medium">{game.publisher || "Unknown"}</span>
      </div>
      <div className="flex justify-between border-b border-gray-600 text-[14px] pb-4 font-semibold">
        <span className="text-gray-400">Release Date</span>
        <span className="font-medium">{game.releaseDate || "TBA"}</span>
      </div>
<div className="flex justify-between items-center border-b border-gray-600 text-[14px] pb-4 font-semibold">
  <span className="text-gray-400">Platform</span>
  <div className="flex items-center gap-2 font-medium">
    {game.platforms?.map((platform, index) => (
      <div key={index} className="flex items-center gap-1">
        {platformIcons[platform] && (
          <img
            src={platformIcons[platform]}
            alt={platform}
            className="w-4 h-4"
          />
        )}
      </div>
    ))}
  </div>
</div>


    </div>
  </div>
</div>

          </div>
        )}

        {activeTab === "Add-ons" && (
  <div className="mt-10">
    {relatedDlcs.length === 0 ? (
      <p className="text-gray-400">No add-ons or editions found for this game.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {relatedDlcs.map((dlcItem) => (
          <GameCard key={dlcItem.id} game={dlcItem} />
        ))}
      </div>
    )}
  </div>
)}


        {activeTab === "achievements" && <div className="text-white mt-6">Achievements bölməsi əlavə ediləcək...</div>}
      </div>
    </div>
  );
}

export default Details;
