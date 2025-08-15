import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GameContext } from "../context/DataContext";

function Slider({ slides, games }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { user } = useContext(GameContext);
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
      setWishlist(saved);
    } else {
      setWishlist([]);
    }
  }, [user]);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides]);

  const activeSlide = slides[activeIndex];

  const getButtonLabel = (price) => {
    if (!price) return "Buy Now";
    const lowerPrice = price.toLowerCase();
    if (lowerPrice === "free") return "Play for Free";
    if (lowerPrice === "varies") return "Save Now";
    return "Buy Now";
  };

  const handleBuyNow = () => {
    if (!activeSlide) return;
    
    const gameId = activeSlide.gameId;
    const foundGame = games.find((game) => game.id === gameId);
    if (foundGame) {
      navigate(`/details/${foundGame.id}`);
    }
  };

  // Enhanced thumbnail click handler
  const handleThumbnailClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance) {
      // Swiped left - go to next slide
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 400);
    }
    
    if (distance < -minSwipeDistance) {
      // Swiped right - go to previous slide
      setIsAnimating(true);
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  // Fixed wishlist check - now properly checks by ID
  const isInWishlist = activeSlide
    ? wishlist.some((item) => item.id === activeSlide.gameId)
    : false;

  const toggleWishlist = () => {
    if (!user) {
      navigate("/signin");
      return;
    }

    if (!activeSlide) return;

    const gameId = activeSlide.gameId;
    const foundGame = games.find((game) => game.id === gameId);
    if (!foundGame) return;

    let updatedWishlist;

    if (isInWishlist) {
      // Remove from wishlist by filtering out the game with matching ID
      updatedWishlist = wishlist.filter((item) => item.id !== gameId);

      toast.info(
        <div className="flex items-center gap-3">
          <img
            src={foundGame.image}
            alt={foundGame.title}
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <p className="font-semibold text-white">{foundGame.title}</p>
            <p className="text-sm text-gray-300">Removed from wishlist</p>
          </div>
        </div>
      );
    } else {
      // Add to wishlist - store the full game object
      updatedWishlist = [...wishlist, foundGame];

      toast.success(
        <div className="flex items-center gap-3">
          <img
            src={foundGame.image}
            alt={foundGame.title}
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <p className="font-semibold text-white">{foundGame.title}</p>
            <p className="text-sm text-green-400">Added to wishlist</p>
          </div>
        </div>
      );
    }

    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(updatedWishlist));
  };

  // Safety check - don't render if no active slide
  if (!activeSlide) {
    return <div className="bg-[#0f0f10] min-h-[400px]"></div>;
  }

  return (
    <div className="bg-[#0f0f10]">
      {/* Add mobile animation CSS */}
      <style jsx>{`
        .mobile-slide-enter {
          opacity: 0;
          transform: scale(0.95);
        }
        
        .mobile-slide-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .mobile-content-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .mobile-content-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s,
                      transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
        }
      `}</style>

      <div className="hidden md:flex flex-col md:flex-row gap-6 px-0 xl:px-[3.5%] py-6 max-w-[90%] sm:max-w-[88%] md:max-w-[85%] lg:max-w-[82%] mx-auto text-white">
        {/* Böyük slayd */}
        <div
          onClick={() => {
            if (window.innerWidth < 768) handleBuyNow();
          }}
          className="flex-1 relative rounded-2xl overflow-hidden cursor-pointer"
          style={{ height: `${slides.length * 88}px` }} // 88px per thumbnail (84px height + 4px gap)
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover"
            key={`${activeSlide.id}-${activeIndex}`}
          />

          {/* Wishlist ikon — yalnız mobil üçün */}
          <div className="absolute top-3 right-3 md:hidden z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist();
              }}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${
                isInWishlist ? "bg-white/20" : "bg-black/50 hover:bg-black/60"
              }`}
            >
              {isInWishlist ? (
                <img src="/icons/check.png" alt="In Wishlist" className="w-5 h-5" />
              ) : (
                <span className="text-xl text-white">＋</span>
              )}
            </button>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end space-y-4 pointer-events-none md:pointer-events-auto">
            <div className="flex flex-col items-start mb-2">
              {activeSlide.logo && (
                <img
                  src={activeSlide.logo}
                  alt={`${activeSlide.title} logo`}
                  className="h-[60px] md:h-[80px] object-contain mb-5"
                  style={{ alignSelf: "flex-start" }}
                  key={`logo-${activeSlide.id}-${activeIndex}`}
                />
              )}
            </div>

            <div>
              <p className="text-sm  font-semibold uppercase mb-4">{activeSlide.subtitle}</p>
              <p className="text-sm md:text-base md:w-1/2 w-full mb-6">{activeSlide.description}</p>
              <p className="text-md font-semibold">{activeSlide.price}</p>

              {/* Buttonlar — yalnız md və yuxarıda görünür */}
              <div className="gap-3 hidden md:flex mt-4">
                <button
                  onClick={handleBuyNow}
                  className="bg-white w-[150px] text-black px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {getButtonLabel(activeSlide.price)}
                </button>

                {activeSlide.price?.toLowerCase() !== "varies" && (
                  <button
                    onClick={toggleWishlist}
                    className={`flex items-center gap-1 text-sm px-4 py-2 rounded transition w-[150px] ${
                      isInWishlist
                        ? "bg-white/10 text-gray-300 hover:bg-white/20"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {isInWishlist ? (
                      <img src="/icons/check.png" alt="In Wishlist" className="w-5 h-5" />
                    ) : (
                      <span className="text-xl">＋</span>
                    )}
                    {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail-lər */}
        <div
          className="mt-4 md:mt-0 md:w-[180px] flex flex-row md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible scrollbar-none"
          style={{ 
            scrollbarWidth: "none",
            height: `${slides.length * 88}px` // Match the big slider height
          }}
        >
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex items-center gap-3 p-3 md:p-4 rounded-lg text-left transition-all duration-300 overflow-hidden z-10 min-w-[200px] md:min-w-0 h-[84px] cursor-pointer ${
                index === activeIndex
                  ? "bg-white/10"
                  : "hover:bg-white/5 text-white/80"
              }`}
            >
              <img
                src={slide.thumbnail}
                alt={slide.title}
                className="w-10 h-12 object-cover rounded z-10"
              />
              <span className="text-sm z-10">{slide.title}</span>

              {index === activeIndex && (
                <span className="absolute bottom-0 left-0 h-[84px] bg-gradient-to-r from-[#3a3a3a] to-[#5a5a5a] transition-all duration-75 ease-linear animate-slideProgress w-full z-0" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobil Slider — 768px-dən aşağı üçün */}
      <div className="md:hidden w-full px-4 py-6 bg-[#0f0f10]">
        <div
          className="w-full h-[440px] rounded-2xl overflow-hidden relative cursor-pointer"
          onClick={handleBuyNow}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={activeSlide.mobImg}
            alt={activeSlide.title}
            className={`w-full h-full object-cover ${
              isAnimating ? 'mobile-slide-enter mobile-slide-enter-active' : ''
            }`}
            key={`mobile-${activeSlide.id}-${activeIndex}`}
          />

          {/* Wishlist ikon */}
          <button
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist();
            }}
            className="absolute top-3 right-3 rounded-full p-2 z-10"
          >
            {isInWishlist ? (
              <img src="/icons/check.png" alt="In Wishlist" className="w-5 h-5" />
            ) : (
              <img src="/icons/wishlist5.png" alt="Add to Wishlist" className="w-5 h-5" />
            )}
          </button>

          {/* Alt overlay yazılar */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
            {activeSlide.logo && (
              <img 
                src={activeSlide.logo} 
                alt={activeSlide.title} 
                className={`w-50 h-20 mb-5 ${
                  isAnimating ? 'mobile-content-enter mobile-content-enter-active' : ''
                }`}
                key={`mobile-logo-${activeSlide.id}-${activeIndex}`}
              />
            )}
            <div className={`${isAnimating ? 'mobile-content-enter mobile-content-enter-active' : ''}`}>
              <p className="text-[9px] text-white uppercase my-2 font-bold">{activeSlide.subtitle}</p>
              <h2 className="text-base font-semibold mb-1">{activeSlide.title}</h2>
              <p className="text-sm opacity-90 mb-5">{activeSlide.description}</p>
              <p className="mt-2 text-sm font-semibold">{activeSlide.price}</p>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-4 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? "bg-white" : "bg-gray-400/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;