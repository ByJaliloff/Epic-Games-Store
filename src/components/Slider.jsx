import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function Slider({ slides, games }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

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
    const gameId = activeSlide.gameId;
    const foundGame = games.find((game) => game.id === gameId);
    if (foundGame) {
      navigate(`/details/${foundGame.id}`);
    }
  };

  const isInWishlist = wishlist.some((item) => item.id === activeSlide?.gameId);

const toggleWishlist = () => {
  const gameId = activeSlide.gameId;
  const foundGame = games.find((game) => game.id === gameId);
  if (!foundGame) return;

  let updatedWishlist;

  if (isInWishlist) {
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
  localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
};


 return (
  <div className="bg-[#0f0f10]">
    <div className="hidden md:flex flex-col md:flex-row gap-6 px-[3.5%] py-6 max-w-[82%] mx-auto text-white">
      {/* Böyük slayd */}
      {activeSlide && (
        <div
          onClick={() => {
            if (window.innerWidth < 768) handleBuyNow(); // 768-dən aşağıda kliklə yönləndir
          }}
          className="flex-1 relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] cursor-pointer"
        >
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="w-full h-full object-cover"
          />

          {/* Wishlist ikon — yalnız mobil üçün */}
          <div className="absolute top-3 right-3 md:hidden z-20">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Kart klikini blokla
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

          <div className="absolute inset-0 bg-black/50 p-6 md:p-8 flex flex-col justify-end space-y-4 pointer-events-none md:pointer-events-auto">
            <div className="flex flex-col items-start mb-2">
              {activeSlide.logo && (
                <img
                  src={activeSlide.logo}
                  alt={`${activeSlide.title} logo`}
                  className="h-[60px] md:h-[80px] object-contain mb-5"
                  style={{ alignSelf: "flex-start" }}
                />
              )}
            </div>

            <p className="text-sm md:text-base font-semibold uppercase">{activeSlide.subtitle}</p>
            <p className="text-sm md:text-base md:w-1/2 w-full">{activeSlide.description}</p>
            <p className="text-md font-semibold">{activeSlide.price}</p>

            {/* Buttonlar — yalnız md və yuxarıda görünür */}
            <div className="gap-3 hidden md:flex">
              <button
                onClick={handleBuyNow}
                className="bg-white w-[150px] text-black px-6 py-3 rounded-md text-sm font-medium"
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
      )}

      {/* Thumbnail-lər */}
      <div
        className="mt-4 md:mt-0 md:w-[180px] flex flex-row md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(index)}
            className={`relative flex items-center gap-3 p-3 md:p-4 rounded-lg text-left transition overflow-hidden z-10 min-w-[200px] md:min-w-0 ${
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
  >
    <img
      src={activeSlide.mobImg}
      alt={activeSlide.title}
      className="w-full h-full object-cover"
    />

    {/* Wishlist ikon */}
    <button
      onClick={(event) => {
          event.stopPropagation();
          toggleWishlist();
        }}
      className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 rounded-full p-2 z-10"
    >
      {isInWishlist ? (
        <img src="/icons/check.png" alt="In Wishlist" className="w-5 h-5" />
      ) : (
        <img src="/icons/wishlist5.png" alt="In Wishlist" className="w-5 h-5" />
      )}
    </button>

    {/* Alt overlay yazılar */}
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent text-white">
      <img  src={activeSlide.logo} alt={activeSlide.title} className="w-50 h-20"/>
      <p className="text-[9px] text-white  uppercase  my-2 font-bold">{activeSlide.subtitle}</p>
      <h2 className="text-base font-semibold mb-1">{activeSlide.title}</h2>
      <p className="text-sm opacity-90">{activeSlide.description}</p>
      <p className="mt-2 text-sm font-semibold">{activeSlide.price}</p>
    </div>
  </div>

  {/* Pagination dots */}
  <div className="flex justify-center mt-4 gap-2">
    {slides.map((_, index) => (
      <button
        key={index}
        onClick={() => setActiveIndex(index)}
        className={`w-2 h-2 rounded-full transition ${
          index === activeIndex ? "bg-white" : "bg-gray-400/40"
        }`}
      />
    ))}
  </div>
</div>

  </div>
);

<img src={activeSlide.logo} alt={activeSlide.title} />
}

export default Slider;
