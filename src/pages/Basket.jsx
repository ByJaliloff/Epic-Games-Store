import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/DataContext";
import SearchNav from "../components/SearchNav";
import { toast } from "react-toastify";
import OrderModal from "../components/OrderModal";

export default function Basket() {
  const { user, moveToWishlist } = useContext(GameContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Load user-specific cart on component mount and when user changes
  useEffect(() => {
    if (!user?.id) {
      setCart([]);
      return;
    }
    
    const userCart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];
    setCart(userCart);
  }, [user?.id]);

  const removeFromCart = (item) => {
    if (!user?.id) {
      toast.error("Please log in to manage your cart");
      return;
    }

    setCart(prevCart => {
      const updatedCart = prevCart.filter(p => String(p.id) !== String(item.id));
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));

      // Toast notification
      toast.info(
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={item.title}
            className="w-10 h-10 object-cover rounded"
          />
          <div>
            <p className="text-white font-semibold">{item.title}</p>
            <p className="text-gray-300 text-sm">Removed from cart</p>
          </div>
        </div>
      );

      return updatedCart;
    });
  };

  // If user is not logged in, show login prompt
  if (!user?.id) {
    return (
      <>
        <SearchNav />
        <div className="bg-[#0f0f10] min-h-screen py-10 text-white">
          <div className="w-[90%] md:max-w-[75%] mx-auto mb-6">
            <h1 className="text-[40px] font-bold text-[#ffffff] mb-10 text-center md:text-left">
              My Cart
            </h1>
            <div className="text-center mt-20 flex flex-col items-center justify-center gap-4">
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
                Please log in to view your cart.
              </p>

              <button
                onClick={() => navigate("/signin")}
                className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] font-semibold px-6 py-2 rounded-md text-sm transition mr-4"
              >
                Log In
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-[#26bbff] hover:bg-[#00aaff] text-black font-semibold px-6 py-2 rounded-md text-sm transition mr-4"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

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
        <div className="w-[90%] md:max-w-[85%] lg:max-w-[75%] mx-auto mb-6">
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

              <p className="text-white text-xl sm:text-2xl md:text-[30px] mb-6 font-bold max-w-[90%]">
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
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* Cart Items */}
              <div className="flex-1 space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#202024] rounded-xl overflow-hidden shadow-md transition duration-300 flex flex-col md:flex-row"
                  >
                    {/* Image Container - Fixed aspect ratio */}
                    <div className="w-full md:w-[200px] md:min-w-[200px] relative">
                      <div className="aspect-[16/9] md:aspect-[3/4] overflow-hidden rounded-t-xl md:rounded-l-xl md:rounded-t-none">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 p-4 md:p-6 flex flex-col">
                      {/* Top Section with Type and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                        <div className="flex-1">
                          <span className="bg-[#414145] text-xs text-white px-2 py-1 font-semibold rounded-md inline-block mb-2">
                            {typeMapping[item.type?.toLowerCase()] || "Base Game"}
                          </span>
                          
                          <h2 className="text-white text-lg md:text-xl font-bold mb-3 line-clamp-2">
                            {item.title}
                          </h2>
                        </div>

                        {/* Price Section */}
                        <div className="flex items-center gap-2 text-white font-semibold text-sm md:text-base ml-0 sm:ml-4 mb-3 sm:mb-0">
                          {item.price === "Free" ? (
                            <span className="text-[#0f0] text-lg">Free</span>
                          ) : item.discount ? (
                            <div className="flex items-center gap-2">
                              <span className="bg-[#26bbff] text-black px-2 py-1 rounded text-xs font-bold">
                                -{item.discount}%
                              </span>
                              <div className="flex flex-col items-end">
                                <span className="line-through opacity-50 text-xs">
                                  ${parseFloat(item.price).toFixed(2)}
                                </span>
                                <span className="text-lg font-bold">
                                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-lg">${parseFloat(item.price).toFixed(2)}</span>
                          )}
                        </div>
                      </div>

                      {/* Age Rating */}
                      {item.ageRating && (
                        <div className="flex items-center gap-3 bg-[#2a2a2e] p-3 rounded-md border border-gray-600 hover:border-gray-400 mb-4 transition-colors">
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
                              {item.ageRating.descriptors?.slice(0, 2).join(", ")}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Section with Platforms and Actions */}
                      <div className="mt-auto">
                        {/* Platform Icons */}
                        {item.platforms && item.platforms.length > 0 && (
                          <div className="flex gap-2 mb-4">
                            {item.platforms.map((platform) =>
                              platformIcons[platform] ? (
                                <img
                                  key={platform}
                                  src={platformIcons[platform]}
                                  alt={platform}
                                  title={platform}
                                  className="w-5 h-5 opacity-70"
                                />
                              ) : null
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-red-400 md:text-[#ffffffa6] font-semibold hover:text-red-400 transition text-sm text-left"
                          >
                            Remove from Cart
                          </button>

                          <div className="flex gap-2">
                            <button
                              onClick={() => moveToWishlist(item)}
                              className="flex-1 sm:flex-none bg-[#26bbff] hover:bg-[#00aaff] font-semibold text-black px-6 py-2 rounded-md text-sm transition"
                            >
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="w-full lg:w-[320px] lg:min-w-[320px]">
                <div className="bg-[#1a1a1e] p-4 sm:p-6 rounded-xl shadow-lg border border-gray-700 sticky top-4">
                  <h2 className="text-xl sm:text-[24px] text-[#fff] font-bold mb-6">
                    Games and Apps Summary
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-300">Price</span>
                      <span className="text-white">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-300">Taxes</span>
                      <span className="text-gray-400 text-xs">Calculated at Checkout</span>
                    </div>
                  </div>
                  
                  <hr className="border-gray-600 my-4" />
                  
                  <div className="flex justify-between font-bold text-base mb-6">
                    <span className="text-white">Subtotal</span>
                    <span className="text-white text-lg">${totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <button 
                    onClick={() => setShowModal(true)} 
                    className="w-full bg-[#26bbff] hover:bg-[#00aaff] text-black font-bold py-3 rounded-md text-sm transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    Check Out
                  </button>
                  
                  {/* Additional info */}
                  <div className="mt-4 p-3 bg-[#0f0f10] rounded-md">
                    <p className="text-xs text-gray-400 text-center">
                      Epic Games protects your payment information with industry-leading security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <OrderModal subtotal={totalPrice} userId={user.id} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}