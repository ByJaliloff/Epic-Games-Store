import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiGlobe } from "react-icons/fi";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [epicMobileMenuOpen, setEpicMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

useEffect(() => {
  if (isMobileMenuOpen || epicMobileMenuOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto"; // təhlükəsizlik üçün
  };
}, [isMobileMenuOpen, epicMobileMenuOpen]);



useEffect(() => {
  function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  }

  function handleResize() {
    if (window.innerWidth >= 768) {
      setIsMobileMenuOpen(false);
      setEpicMobileMenuOpen(false); // burası əlavə olunub
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  window.addEventListener("resize", handleResize);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    window.removeEventListener("resize", handleResize);
  };
}, []);


  return (
    <header className="bg-[#131317] text-white h-[72px] shadow-md relative z-60">
      <div className="max-w-[97%] mx-auto h-full flex items-center justify-between">
        {/* Sol tərəf */}
        <div className="flex items-center space-x-6">
          {/* Epic logo + dropdown */}
          <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                setEpicMobileMenuOpen(true); // Mobil versiya üçün yeni menyu açılsın
              } else {
                setIsDropdownOpen((prev) => !prev); // Desktop versiyada əvvəlki kimi işləsin
              }
            }}
            className="flex items-center space-x-1 p-[6px] rounded cursor-pointer"
          >
            <img
              src="/icons/epic-logo.png"
              alt="Epic Games Logo"
              className="w-7 h-8"
            />
            <span className="text-base ml-1">{isDropdownOpen ? "▴" : "▾"}</span>
          </button>


            {/* Dropdown menyusu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-1 mt-[2px] bg-gray-600/30 backdrop-blur-lg text-sm text-white rounded-xl shadow-lg w-[700px] grid grid-cols-2 p-6 gap-4 z-50">
                <div className="grid grid-cols-1 gap-6">
                  <div className="border-b">
                    <h4 className="text-white font-bold mb-2 text-[20px]">Play</h4>
                    <ul className="space-y-4 font-semibold">
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/fortnite.svg" className="w-4 h-4" /> Fortnite</Link></li>
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Logo Rocket League Icon.svg" className="w-4 h-4" /> Rocket League</Link></li>
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Fallguys.svg" className="w-4 h-4" /> Fall Guys</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2 text-[20px]">Discover</h4>
                    <ul className="space-y-4 font-semibold">
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/epic-logo.png" className="w-4 h-4" /> Epic Games Store</Link></li>
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Logo Fab Icon.svg" className="w-4 h-4" /> Fab</Link></li>
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/LSketchfab.svg" className="w-4 h-4" /> Sketchfab</Link></li>
                      <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/ArtStation.svg" className="w-4 h-4" /> ArtStation</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="border-l pl-4">
                  <h4 className="text-white font-bold mb-2 text-[20px]">Create</h4>
                  <ul className="space-y-4 font-semibold">
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/unreal.svg" className="w-4 h-4" /> Unreal Engine</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/fortnite.svg" className="w-4 h-4" /> Create in Fortnite</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Metahuman.svg" className="w-4 h-4" /> MetaHuman</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Twinmotion.svg" className="w-4 h-4" /> Twinmotion</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Reality.can.svg" className="w-4 h-4" /> RealityScan</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/epic-logo.png" className="w-4 h-4" /> Epic Online Services</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/epic-logo.png" className="w-4 h-4" /> Publish on Epic Games Store</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/Webservice.svg" className="w-4 h-4" /> Kids Web Services</Link></li>
                    <li><Link to="#" className="hover:underline flex items-center gap-2"><img src="/icons/epic-logo.png" className="w-4 h-4" /> Developer Community</Link></li>
                  </ul>
                </div>
              </div>
            )}
            {epicMobileMenuOpen && (
          <div className="fixed inset-0 bg-[#101014] text-white z-50 flex flex-col px-4 h-screen overflow-y-auto">
            {/* Top Bar */}
            <div className="flex justify-between items-center ">
              <div className="flex items-center space-x-2 h-[72px]">
                <img src="/icons/epic-logo.png" alt="Epic Games Logo" className="w-7 h-8" />
                <span className="text-base ml-1" onClick={() => setEpicMobileMenuOpen(false)}>{epicMobileMenuOpen ? "▴" : "▾"}</span>
              </div>
              <button onClick={() => setEpicMobileMenuOpen(false)} className="text-2xl">✕</button>
            </div>

            {/* Play section */}
            <div className="py-4 flex flex-col gap-8">
             <h2 className="text-[32px] font-extrabold">Epic Games</h2>
            <div>
              <h3 className="text-xl font-bold mb-4">Play</h3>
              <ul className="text-base font-medium">
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/fortnite.svg" className="w-5 h-5" />
                  <span>Fortnite</span>
                </li>
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/Logo Rocket League Icon.svg" className="w-5 h-5" />
                  <span>Rocket League</span>
                </li>
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/Fallguys.svg" className="w-5 h-5" />
                  <span>Fall Guys</span>
                </li>
              </ul>
            </div>

            {/* Discover section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Discover</h3>
              <ul className="text-base font-medium">
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/epic-logo.png" className="w-5 h-5" />
                  <span>Epic Games Store</span>
                </li>
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/Logo Fab Icon.svg" className="w-5 h-5" />
                  <span>Fab</span>
                </li>
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/LSketchfab.svg" className="w-5 h-5" />
                  <span>Sketchfab</span>
                </li>
                <li className="flex items-center gap-3 py-3 px-2">
                  <img src="/icons/ArtStation.svg" className="w-5 h-5" />
                  <span>ArtStation</span>
                </li>
              </ul>
            </div>
              <div>
                  <h3 className="text-xl font-bold mb-4">Create</h3>
                  <ul className="text-base font-medium">
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/unreal.svg" className="w-5 h-5" />
                      <span>Unreal Engine</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/fortnite.svg" className="w-5 h-5" />
                      <span>Create in Fortnite</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/Metahuman.svg" className="w-5 h-5" />
                      <span>MetaHuman</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/Twinmotion.svg" className="w-5 h-5" />
                      <span>Twinmotion</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/Reality.can.svg" className="w-5 h-5" />
                      <span>RealityScan</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/epic-logo.png" className="w-5 h-5" />
                      <span>Epic Online Services</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/epic-logo.png" className="w-5 h-5" />
                      <span>Publish on Epic Games Store</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/Webservice.svg" className="w-5 h-5" />
                      <span>Kids Web Services</span>
                    </li>
                    <li className="flex items-center gap-3 py-3 px-2">
                      <img src="/icons/epic-logo.png" className="w-5 h-5" />
                      <span>Developer Community</span>
                    </li>
                  </ul>
                </div>
          </div>
          </div>
        )}

          </div>

          {/* Store logo */}
          <div>
            <Link to="/" className="hover:text-gray-300">
              <img src="/icons/store.svg" alt="Store" className="w-14 h-14" />
            </Link>
          </div>

          {/* Desktop menyu */}
          <nav className="hidden md:flex items-center text-sm font-semibold">
            <Link to="/support" className="hover:text-gray-300 p-[10px_12px]">Support</Link>
            <div className="relative group">
              <button className="hover:text-gray-300 p-[10px_12px]">Distribute ▾</button>
            </div>
          </nav>
        </div>

        {/* Sağ tərəf */}
        <div className="flex items-center space-x-4">
          <button className="text-xl hover:text-gray-300 hidden md:flex">
            <FiGlobe className="w-5 h-5" />
          </button>

          <Link
            to="/signin"
            className="hidden md:inline bg-[#2a2a2a] text-white text-sm px-3 py-2 rounded hover:bg-[#3a3a3a] transition"
          >
            Sign in
          </Link>

          <a
            href="https://store.epicgames.com/en-US/download"
            className="bg-[#26bbff] text-black font-semibold text-sm px-2 py-1.5 rounded hover:bg-[#00aaff] transition"
          >
            Download
          </a>

          {/* Mobil menyu düyməsi */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobil menyu overlay */}
{isMobileMenuOpen && (
  <div className="fixed inset-0 bg-[#101014] text-white z-50 p-4 pt-0">
    {/* Top header */}
    <div className="flex justify-between items-center h-[72px]">
      <img src="/icons/store.svg" alt="Store"  onClick={() => setIsMobileMenuOpen(false)} className="w-14 h-14" />
      <div className="flex items-center gap-4">
        <a
          href="https://store.epicgames.com/en-US/download"
          className="bg-[#26bbff] text-black font-semibold text-sm px-2 py-1.5 rounded hover:bg-[#00aaff] w-fit"
        >
          Download
        </a>
        <button
          className="text-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
        <div className="flex justify-end mt-auto h-[44px]">
      <div className="flex items-center gap-3">
        <button className="text-white">
          <FiGlobe className="w-5 h-5" />
        </button>
        <Link
          to="/signin"
          className="bg-[#343437] text-white text-sm px-3 py-2 rounded hover:bg-[#636366] font-semibold"
        >
          Sign in
        </Link>
      </div>
    </div>

    {/* Menu links */}
    <div className="flex flex-col  mb-6 pt-4">
      <h3 className="text-[32px] font-bold mb-6">Menu</h3>
      <Link className="hover:text-gray-300 text-base font-semibold p-[12px_8px]">Support</Link>
      <Link className="hover:text-gray-300 flex justify-between text-base font-semibold p-[12px_8px]">
        Distribute <span>›</span>
      </Link>
    </div>

    {/* Language and Sign In aligned right */}
  </div>
)}



    </header>
  );
}

export default Header;
