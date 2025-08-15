import { createContext, useEffect, useState } from "react";
import {
  getAllGame,
  getAllDlc,
  getAllAchievement,
  getAllSlide,
  getAllNews
} from "../service.js/GameService";

// ADD THIS: Import getAllUsers from your auth service
import { getAllUsers } from "../service.js/authService"; // or wherever your auth service is located

// 1. Context yaradılır
export const GameContext = createContext();

// 2. Provider komponenti
export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [dlcs, setDlcs] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [slides, setSlides] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Current logged-in user (from localStorage)
  const [user, setUser] = useState(null);
  
  // ADD THIS: All users for admin panel
  const [allUsers, setAllUsers] = useState([]);

  // 3. Məlumatlar yüklənir
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('=== FETCHING ALL DATA ===');
        
        const [gamesData, dlcData, achievementData, slideData, newsData, usersData] =
          await Promise.all([
            getAllGame(),
            getAllDlc(),
            getAllAchievement(),
            getAllSlide(),
            getAllNews(),
            getAllUsers(), // ADD THIS: Fetch all users
          ]);

        console.log('Games:', gamesData?.length || 0);
        console.log('DLCs:', dlcData?.length || 0);
        console.log('Users:', usersData?.length || 0);
        console.log('Raw users data:', usersData);
        
        setGames(gamesData || []);
        setDlcs(dlcData || []);
        setAchievements(achievementData || []);
        setSlides(slideData || []);
        setNews(newsData || []);
        setAllUsers(usersData || []); // Store all users
        
        console.log('=== DATA LOADED SUCCESSFULLY ===');
        
      } catch (err) {
        console.error('=== ERROR FETCHING DATA ===', err);
        setError("Məlumatlar yüklənərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Load current user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log('Current logged-in user:', userData);
      } catch (err) {
        console.error('Error parsing saved user:', err);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log('User logged in:', userData);
  };

  const logout = () => {
    if (user) {
      localStorage.removeItem("user");
      setUser(null);
      console.log('User logged out');
    }
  };

  // Səbətdən istəyə köçürmək funksiyası
  const moveToWishlist = (item) => {
    if (!user) return;
    
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`)) || [];
    const cart = JSON.parse(localStorage.getItem(`cart_${user.id}`)) || [];

    const isInWishlist = wishlist.some((w) => w.id === item.id);
    if (!isInWishlist) {
      wishlist.push(item);
    }

    const updatedCart = cart.filter((c) => c.id !== item.id);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlist));
    localStorage.setItem(`cart_${user.id}`, JSON.stringify(updatedCart));
    window.location.reload();
  };

  // Debug: Log context values when they change
  useEffect(() => {
    console.log('=== CONTEXT STATE UPDATE ===');
    console.log('Current user:', user);
    console.log('All users count:', allUsers.length);
    console.log('Games count:', games.length);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [user, allUsers, games, loading, error]);

  // 4. Provider return edir
  return (
    <GameContext.Provider
      value={{
        games,
        dlcs,
        achievements,
        slides,
        news,
        loading,
        error,
        moveToWishlist,
        user,          // Current logged-in user
        allUsers,      // ADD THIS: All users for admin panel
        login,
        logout,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}