import { createContext, useEffect, useState } from "react";
import {
  getAllGame,
  getAllDlc,
  getAllAchievement,
  getAllSlide,
} from "../service.js/GameService";

// 1. Context yaradılır
export const GameContext = createContext();

// 2. Provider komponenti
export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [dlcs, setDlcs] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Məlumatlar yüklənir
  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesData, dlcData, achievementData, slideData] =
          await Promise.all([
            getAllGame(),
            getAllDlc(),
            getAllAchievement(),
            getAllSlide(),
          ]);

        setGames(gamesData || []);
        setDlcs(dlcData || []);
        setAchievements(achievementData || []);
        setSlides(slideData || []);
      } catch (err) {
        setError("Məlumatlar yüklənərkən xəta baş verdi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);



  // Səbətdən istəyə köçürmək funksiyası
  const moveToWishlist = (item) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const isInWishlist = wishlist.some((w) => w.id === item.id);
    if (!isInWishlist) {
      wishlist.push(item);
    }

    const updatedCart = cart.filter((c) => c.id !== item.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.location.reload();
  };
  

  // 4. Provider return edir
  return (
    <GameContext.Provider
      value={{
        games,
        dlcs,
        achievements,
        slides,
        loading,
        error,
        moveToWishlist,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
