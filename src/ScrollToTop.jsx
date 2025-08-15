import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Brauzerin refresh zamanı scroll-u saxlamasını söndür
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Refresh və ilk yüklənmədə başdan göstər
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Route dəyişəndə başdan göstər
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
