import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Wishlist from "./pages/Wishlist"; // <== Əlavə et
import Basket from "./pages/Basket";
// import Signup from "./components/Signup";
// import Signin from "./components/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import Browse from "./pages/Browse";
import ScrollToTop from "./ScrollToTop";
import AdminLayout from "./layout/AdminLayout";
import NewsSection from "./pages/NewsSection";
import SliderAdminPanel from "./pages/SliderAdminPanel";
import HomeAdminPanel from "./pages/HomeAdminPanel";
import NewsAdminPanel from "./pages/NewsAdminPanel";
import DlcAdminPanel from "./pages/DlcAdminPanel";
import GamesAdminPanel from "./pages/GamesAdminPanel";




function App() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="wishlist" element={<Wishlist />} /> {/* Yeni route */}
        <Route path="basket" element={<Basket />} />
        <Route path="browse" element={<Browse />} />
        <Route path="news" element={<NewsSection />} />
      </Route>
       <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<HomeAdminPanel />} />
          <Route path="slider" element={<SliderAdminPanel />} />
          <Route path="news" element={<NewsAdminPanel />} />
          <Route path="dlcs" element={<DlcAdminPanel />} />
          <Route path="games" element={<GamesAdminPanel />} />
      </Route>
      {/* <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} /> */}
    </Routes>
     <ToastContainer toastClassName="custom-toast" position="top-right" autoClose={3000} theme="dark" />
     </>
  );
}

export default App;
