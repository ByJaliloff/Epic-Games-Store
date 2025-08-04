import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Wishlist from "./pages/Wishlist"; // <== Əlavə et
import Basket from "./pages/Basket";
import SignIn from "./components/Signin";
import SignUp from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
import Browse from "./pages/Browse";



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="wishlist" element={<Wishlist />} /> {/* Yeni route */}
        <Route path="basket" element={<Basket />} />
        <Route path="browse" element={<Browse />} />
      </Route>

      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
     <ToastContainer toastClassName="custom-toast" position="top-right" autoClose={3000} theme="dark" />
     </>
  );
}

export default App;
