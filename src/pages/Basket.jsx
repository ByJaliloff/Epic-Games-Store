import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GameContext } from "../context/DataContext";
import SearchNav from "../components/SearchNav";

export default function Basket() {
  const { removeFromCart, moveToWishlist, } = useContext(GameContext);
  const navigate = useNavigate();

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const totalPrice = Array.isArray(cart)
        ? cart.reduce((total, item) => {
            const price = item.discount
                ? (item.price - (item.price * item.discount) / 100)
                : item.price;
            return total + parseFloat(price);
            }, 0)
        : 0;

const platformIcons = {
  Windows: "/icons/windows.png",
  PS5: "/icons/playstation.png",
  Xbox: "/icons/xbox.png",
  Switch: "/icons/switch.png"
};


const typeMapping = {
  basedgame: "Base Game",
  dlc: "DLC",
  expansion: "Expansion",
  edition: "Edition",
  addon: "Addon",
};

const ageRatingImages = {
  "3+": "/ratings/3plus.png",
  "7+": "/ratings/7plus.png",
  "12+": "/ratings/12plus.png",
  "16+": "/ratings/16plus.png",
  "18+": "/ratings/18plus.png",
};

  return (
    <>
    <SearchNav />
    <div className="bg-[#0f0f10] min-h-screen py-10 text-white">
      <div className="w-[90%] md:max-w-[75%] mx-auto mb-6">
        <h1 className="text-[40px] font-bold text-[#ffffff] mb-10 text-center md:text-left">
          My Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center mt-20 flex flex-col items-center justify-center">
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16"
                viewBox="0 0 45 52"
              >
                <g fill="none" fillRule="evenodd">
                  <path
                    d="M4.058 0C1.094 0 0 1.098 0 4.075v35.922c0 .338.013.65.043.94.068.65-.043 1.934 2.285 2.96 1.553.683 7.62 3.208 18.203 7.573 1.024.428 1.313.529 2.081.529.685.013 1.137-.099 2.072-.53 10.59-4.227 16.66-6.752 18.213-7.573 2.327-1.23 2.097-3.561 2.097-3.899V4.075C44.994 1.098 44.13 0 41.166 0H4.058z"
                    fill="#404044"
                  ></path>
                  <path
                    stroke="#FFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 18l4.91 2.545-2.455 4M25.544 28.705c-1.056-.131-1.806-.14-2.25-.025-.444.115-1.209.514-2.294 1.197M29.09 21.727L25 19.5l2.045-3.5"
                  ></path>
                </g>
              </svg>
            </div>

            <p className="text-white text-[30px] mb-6 font-bold max-w-[90%]">
              Your cart is empty.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-[#26bbff] hover:bg-[#00aaff] text-black font-semibold px-6 py-2 rounded-md text-sm transition"
            >
              Shop for Games & Apps
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {cart.map((item) => (
              <div
                key={item.id}
                className="bg-[#202024] rounded-xl overflow-hidden shadow-md transition duration-300 flex flex-col md:flex-row relative p-3 md:p-5 pb-10"
              >
                {/* Price */}
                <div className="absolute top-3 right-3 flex items-center gap-2 text-white font-semibold text-sm md:text-lg">
                  {item.price === "Free" ? (
                    <span className="text-[#0f0]">Free</span>
                  ) : item.discount ? (
                    <>
                      <span className="bg-[#26bbff] text-black px-1.5 py-0.5 rounded text-[11px] md:text-[12px]">
                        -{item.discount}%
                      </span>
                      <span className="line-through opacity-50 text-[12px] md:text-[14px]">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                      <span className="text-sm md:text-base">
                        ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span>${parseFloat(item.price).toFixed(2)}</span>
                  )}
                </div>

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full md:w-[180px] h-[200px] md:h-[250px] object-cover rounded-md"
                />

                {/* Info */}
                <div className="flex-1 pl-0 md:pl-5 mt-4 md:mt-0 flex flex-col justify-between">
                  <div>
                    <span className="bg-[#414145] text-xs text-white px-2 py-0.5 font-semibold rounded-md inline-block mb-1">
                      {typeMapping[item.type?.toLowerCase()] || "Base Game"}
                    </span>

                    <h2 className="text-white text-lg md:text-xl font-bold mb-4 md:mb-7">
                      {item.title}
                    </h2>

                    {/* Platforms */}
                    {item.platforms && item.platforms.length > 0 && (
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        {item.platforms.map((platform) =>
                          platformIcons[platform] ? (
                            <img
                              key={platform}
                              src={platformIcons[platform]}
                              alt={platform}
                              title={platform}
                              className="w-4 h-4"
                            />
                          ) : null
                        )}
                      </div>
                    )}

                    {/* Age Rating */}
                    {item.ageRating && (
                      <div className="flex items-center gap-3 bg-[#202024] p-2 md:p-3 rounded-md border border-gray-500 hover:border-white mb-3">
                        <img
                          src={ageRatingImages[item.ageRating.label]}
                          alt={item.ageRating.label}
                          className="w-8 h-8 md:w-10 md:h-10 object-contain"
                        />
                        <div>
                          <div className="font-semibold text-white text-sm md:text-base">
                            {item.ageRating.label}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400">
                            {item.ageRating.descriptors?.slice(0, 3).join(", ")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex flex-col md:flex-row gap-3 justify-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#ffffffa6] font-semibold hover:text-white transition text-[14px] text-left md:text-right"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => moveToWishlist(item)}
                      className="bg-[#26bbff] hover:bg-[#00aaff] font-semibold text-black px-4 py-1 rounded-md text-sm"
                    >
                      Move To Wishlist
                    </button>
                  </div>
                </div>
              </div>

                ))}

            </div>

            {/* Summary */}
            <div className="w-full lg:w-[320px]">
              <div className="bg-[#0f0f10] p-6 rounded-xl shadow-md">
                <h2 className="text-[24px] text-[#fff] font-bold mb-6">
                  Games and Apps Summary
                </h2>
                <div className="flex justify-between mb-3 text-[14px] font-semibold">
                  <span>Price</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3 text-[14px] font-semibold">
                  <span>Taxes</span>
                  <span>Calculated at Checkout</span>
                </div>
                <hr className="border-gray-600 my-4" />
                <div className="flex justify-between font-bold text-[14px] mb-6">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#26bbff] hover:bg-[#00aaff] text-black font-semibold py-2 rounded-md">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
