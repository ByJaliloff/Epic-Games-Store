import { useContext, useState, useEffect, useRef } from "react";
import { GameContext } from "../context/DataContext";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import SearchNav from "../components/SearchNav";
import GameCard from "../components/GameCard";
import { toast } from "react-toastify";
import Error from "./Error";


function Details() {
  const { id } = useParams();
  const { games, dlcs, error } = useContext(GameContext);
   if (error) return <Error />;
  const navigate = useNavigate();


  const game = games.find((g) => g.id === id);
   if (!game) return <Error />;


  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  setIsInCart(cart.some((item) => item.id === game?.id));
  setIsInWishlist(wishlist.some((item) => item.id === game?.id));
}, [game]);

 const relatedDlcs = dlcs.filter(
  (dlc) =>
    dlc.gameId === id &&
    ["addon", "edition", "editor", "demo"].includes(dlc.type?.toLowerCase())
);

  const [showVideo, setShowVideo] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isInCart, setIsInCart] = useState(false);
const [isInWishlist, setIsInWishlist] = useState(false);

useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  setIsInCart(cart.some((item) => item.id === game?.id));
  setIsInWishlist(wishlist.some((item) => item.id === game?.id));
}, [game]);

  const [activeTab, setActiveTab] = useState("overview");
  const [mobileIndex, setMobileIndex] = useState(0);

 const touchStartX = useRef(null);
const touchEndX = useRef(null);
const length = game?.carouselImages?.length ?? 0;

useEffect(() => {
  if (!game?.carouselImages) return; // carouselImages yoxdursa interval qurma

  const interval = setInterval(() => {
    setMobileIndex((prev) =>
      prev === game.carouselImages.length ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, [game?.carouselImages?.length ?? 0]);



const handleTouchStart = (e) => {
  touchStartX.current = e.touches[0].clientX;
};

const handleTouchEnd = (e) => {
  touchEndX.current = e.changedTouches[0].clientX;
  handleSwipeGesture();
};

const handleSwipeGesture = () => {
  if (!touchStartX.current || !touchEndX.current) return;
  if (!game?.carouselImages) return;

  const delta = touchStartX.current - touchEndX.current;
  const threshold = 50;

  if (delta > threshold) {
    setMobileIndex((prev) =>
      prev === game.carouselImages.length ? 0 : prev + 1
    );
  } else if (delta < -threshold) {
    setMobileIndex((prev) =>
      prev === 0 ? game.carouselImages.length : prev - 1
    );
  }

  touchStartX.current = null;
  touchEndX.current = null;
};

useEffect(() => {
  if (!game?.carouselImages) return;  // Əgər carouselImages yoxdursa interval yaratma

  const length = game.carouselImages.length;

  const interval = setInterval(() => {
    setMobileIndex((prev) =>
      prev === length ? 0 : prev + 1
    );
  }, 4000); // hər 4 saniyədə dəyişsin

  return () => clearInterval(interval);
}, [game?.carouselImages?.length ?? 0]);


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
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!cart.find((item) => item.id === game.id)) {
    const updatedCart = [...cart, game];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsInCart(true);

    toast.success(
      <div className="flex items-center gap-3">
        <img src={game.image} alt="game" className="w-10 h-10 rounded object-cover" />
        <div>
          <p className="font-semibold text-white">{game.title}</p>
          <p className="text-sm text-gray-300">Added to cart</p>
        </div>
      </div>
    );
  }

  if (wishlist.find((item) => item.id === game.id)) {
    const updatedWishlist = wishlist.filter((item) => item.id !== game.id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(false);
  }
};


const addToWishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  if (!wishlist.find((item) => item.id === game.id)) {
    const updatedWishlist = [...wishlist, game];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setIsInWishlist(true);

    toast.success(
      <div className="flex items-center gap-3">
        <img src={game.image} alt="game" className="w-10 h-10 rounded object-cover" />
        <div>
          <p className="font-semibold text-white">{game.title}</p>
          <p className="text-sm text-gray-300">Added to wishlist</p>
        </div>
      </div>
    );
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
     <div className="max-w-[93%] md:max-w-[82%] mx-auto px-[3.5%] py-8 text-white">
        <div className="flex flex-col">
          <h1 className="text-[40px] font-bold mb-2">{game.title}</h1>
          {activeTab === "overview" && (
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
              {/* Mobil üçün əvvəl: textlər */}
              <div className="flex gap-4 text-gray-300 text-sm order-1 md:order-2">
                <div className="flex items-center gap-1 font-semibold">🌐 Diverse Characters</div>
                <div className="flex items-center gap-1 font-semibold">📜 Amazing Storytelling</div>
              </div>

              {/* Rating ulduzları */}
              <div className="order-2 md:order-1">
                <RatingStars rating={game.rating} />
              </div>
            </div>

          )}
        </div>

        <nav className="flex gap-6 text-white text-sm mt-6">
          {["overview", "Add-ons"].map((tab) => (
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
  <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 mt-10">
    {/* Sol Panel */}
     <div className="order-2 lg:order-1 lg:col-span-2 w-full flex flex-col gap-8">
      {/* Video və Carousel */}
      <div className="hidden md:flex aspect-video rounded-xl overflow-hidden relative group">
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

      {/* Thumbnail Scroll */}
      <div className="hidden md:flex items-center gap-2 mt-2 overflow-x-auto px-1 scrollbar-hide justify-center max-w-[600px] mx-auto">
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
        <button onClick={prevIndex} className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 shrink-0">
          <img src="/icons/arrow-left.png" alt="Previous" className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          <img
            src={`https://img.youtube.com/vi/${game.video?.split("v=")[1]}/0.jpg`}
            alt="Video Thumbnail"
            className={`w-24 h-16 object-cover rounded-lg cursor-pointer ${currentIndex === -1 ? "brightness-100" : "brightness-50"}`}
            onClick={() => handleThumbnailClick(-1)}
          />
          {game.carouselImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Slide ${idx + 1}`}
              className={`w-24 h-16 object-cover rounded-lg cursor-pointer ${currentIndex === idx ? "brightness-100" : "brightness-50"}`}
              onClick={() => handleThumbnailClick(idx)}
            />
          ))}
        </div>
        <button onClick={nextIndex} className="bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 shrink-0">
          <img src="/icons/arrow-right.png" alt="Next" className="w-5 h-5" />
        </button>
      </div>
      {/* Mobile Thumbnail Slider */}
          <div className="md:hidden mt-4 relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >

              {/* Digər şəkillər */}
              {game.carouselImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-48 object-cover flex-shrink-0 cursor-pointer"
                  onClick={() => handleThumbnailClick(idx)}
                />
              ))}
            </div>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {[...Array(game.carouselImages.length)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === mobileIndex ? "bg-white" : "bg-gray-500"
                    }`}
                    onClick={() => setMobileIndex(i)}
                  />
                ))}
              </div>

          </div>


      

      {/* Short Description */}
      <p className="text-base text-white">{game.shortDescription}</p>

      {/* Genre və Features */}
      <div className="flex flex-col md:flex-row gap-6">
        <div>
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Genres</h3>
          <div className="flex gap-2 flex-wrap">
            {game.genre?.map((g, idx) => (
              <span key={idx} className="bg-[#343437] text-sm px-3 py-1 rounded-sm">{g}</span>
            ))}
          </div>
        </div>
        <div className="md:border-l-2 border-gray-500/30 md:pl-6">
          <h3 className="text-gray-400 text-sm font-semibold mb-2">Features</h3>
          <div className="flex gap-2 flex-wrap">
            {game.features?.map((f, idx) => (
              <span key={idx} className="bg-[#343437] text-sm px-3 py-1 rounded-sm">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Full Description */}
      {game.fullDescription?.map((section, idx) => (
        <div key={idx} className="mt-4">
          <h2 className="text-xl font-bold mb-2">{section.heading}</h2>
          <p className="text-gray-300">{section.content}</p>
        </div>
      ))}
    </div>

    {/* Sağ Panel */}
    <div className="order-1 lg:order-2 w-full lg:w-[400px] flex flex-col gap-4">
      <img src={game.logo} alt={`${game.title} Logo`} className="h-40 object-contain" />

      <p className="inline-block max-w-max text-sm text-white px-2 py-0.5 bg-gray-600 rounded">
        {typeMapping[game.type?.toLowerCase()] || "Unknown"}
      </p>

      {/* Price Section */}
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

      {/* Buttons */}
      <button className="bg-[#1e90ff] hover:bg-blue-500 text-white py-3 rounded-md font-semibold">
        {isFree ? "Get" : game.releaseDate?.toLowerCase() === "upcoming" ? "Pre-purchase" : "Buy Now"}
      </button>

      {isInCart ? (
            <button
              type="button"
              onClick={() => navigate("/basket")}
              className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold"
            >
              View in Cart
            </button>
          ) : (
            <button
              type="button"
              onClick={addToCart}
              className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold"
            >
              Add To Cart
            </button>
          )}

          {isInWishlist ? (
            <button
              type="button"
              onClick={() => navigate("/wishlist")}
              className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold"
            >
              View in Wishlist
            </button>
          ) : (
            <button
              type="button"
              onClick={addToWishlist}
              className="bg-gray-700 hover:bg-[#636366] text-white py-3 rounded-md font-semibold"
            >
              Add to Wishlist
            </button>
          )}


      {/* Texniki Məlumatlar */}
      <div className="mt-4 text-sm text-white pt-4 space-y-2">
        <div className="flex justify-between border-b border-gray-600 pb-4 font-semibold">
          <span className="text-gray-400">Developer</span>
          <span>{game.developer || "Unknown"}</span>
        </div>
        <div className="flex justify-between border-b border-gray-600 pb-4 font-semibold">
          <span className="text-gray-400">Publisher</span>
          <span>{game.publisher || "Unknown"}</span>
        </div>
        <div className="flex justify-between border-b border-gray-600 pb-4 font-semibold">
          <span className="text-gray-400">Release Date</span>
          <span>{game.releaseDate || "TBA"}</span>
        </div>
        <div className="flex justify-between border-b border-gray-600 pb-4 font-semibold">
          <span className="text-gray-400">Platform</span>
          <div className="flex items-center gap-2">
            {game.platforms?.map((platform, index) => (
              <div key={index}>
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
)}


{activeTab === "Add-ons" && (
  <div className="mt-10">
    {relatedDlcs.length === 0 ? (
      <p className="text-gray-400">No add-ons or editions found for this game.</p>
    ) : (
      <div className="grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">

        {relatedDlcs.map((dlcItem) => (
          <GameCard key={dlcItem.id} game={dlcItem} />
        ))}
      </div>
    )}
  </div>
)}



      </div>
    </div>
  );
}

export default Details;
