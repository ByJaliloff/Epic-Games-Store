import { useState } from 'react'
import { FaGamepad, FaRegNewspaper } from 'react-icons/fa'
import { IoMenu, IoClose } from 'react-icons/io5'
import {  MdSendTimeExtension } from 'react-icons/md'
import { TfiLayoutSlider } from "react-icons/tfi";
import { Link, useLocation } from 'react-router-dom'



function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const menuItems = [
    { name: 'Slider', path: '/admin/slider', icon: <TfiLayoutSlider size={20} /> },
    { name: 'News', path: '/admin/news', icon: <FaRegNewspaper size={20} /> },
    { name: 'Games', path: '/admin/games', icon: <FaGamepad size={20} /> },
    { name: 'DLCs', path: '/admin/dlcs', icon: <MdSendTimeExtension size={20} /> }
  ];


  return (
    <>
      <div className='w-full h-[70px] bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#101014] shadow-lg fixed top-0 z-[100]'>
        <header className='w-[95%] mx-auto px-[15px] sm:px-[30px] flex justify-between items-center h-full'>
          {/* Left Side - Logo and Menu */}
          <div className='flex items-center gap-4 sm:gap-8'>
            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className='lg:hidden text-white hover:text-blue-200 transition-colors p-2'
            >
              <IoMenu size={28} />
            </button>

            {/* Logo */}
            <Link to="/">
              <div className="relative group w-[60px] h-[60px] flex items-center justify-center">
                <div className="absolute inset-0 rounded-lg blur-md opacity-40 group-hover:opacity-70 transition duration-500 bg-white/20 animate-pulse" />
                
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/1200px-Epic_Games_logo.svg.png" 
                  alt="Epic Games Logo" 
                  className="relative w-[55px] h-auto z-10 transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center gap-6'>
            {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-[#292929] shadow-[0_0_10px_#0ea5e9] text-blue-400'
                      : 'text-white hover:bg-[#292929] hover:shadow-[0_0_10px_#0ea5e9]'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
          </nav>

          {/* Right Side - User Actions */}
            <div className='flex items-center gap-3'>
              {/* Admin Badge with Link */}
              <Link to="/admin" className="hidden sm:flex items-center gap-2 bg-[#1f1f1f] px-4 py-1.5 rounded-full border border-[#2a2a2a] shadow-inner hover:bg-[#292929] hover:shadow-[0_0_10px_#0ea5e9] text-white font-semibold justify-center transition-all duration-300">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping relative">
                  <div className="absolute w-full h-full rounded-full bg-green-400"></div>
                </div>
                <span className="text-white text-sm font-semibold tracking-wide">Orxan (Admin)</span>
              </Link>

              {/* Profile Button with Link */}
              <Link to="/admin">
                <button className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1f1f1f] border border-[#2a2a2a] hover:bg-[#292929] hover:shadow-[0_0_10px_#0ea5e9] text-white font-semibold flex items-center justify-center transition-all duration-300">
                  O
                </button>
              </Link>
            </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-50 z-[90] lg:hidden'
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-[280px] bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#101014] transform transition-transform duration-300 ease-in-out z-[100] lg:hidden shadow-2xl ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Mobile Header */}
        <div className='flex justify-between items-center p-6 border-b border-gray-700'>
          <div className='flex items-center gap-3'>
           
            <div>
              <h2 className='text-white font-bold text-lg'>Admin</h2>
              <p className='text-blue-200 text-xs'>Panel</p>
            </div>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className='text-white hover:text-gray-200 transition-colors p-2'
          >
            <IoClose size={24} />
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <nav>
          <div className='flex flex-col'>
            {menuItems.map((item, index) => (
              <Link
                to={item.path}
                key={index}
                onClick={toggleMobileMenu}
                className={`flex items-center gap-4 px-6 py-4 border-b border-gray-700 transition-all duration-300 font-medium ${
                  location.pathname === item.path
                    ? 'bg-gray-700 text-blue-400'
                    : 'text-white hover:text-blue-200 hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span className='text-lg'>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Footer */}
          <div className='absolute bottom-6 left-6 right-6'>
            <div className='flex items-center gap-3 bg-gray-700 px-4 py-3 rounded-lg'>
              <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse'></div>
              <div>
                <p className='text-white font-medium'>Administrator</p>
                <p className='text-blue-200 text-xs'>Online</p>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Content Spacer */}
      <div className='h-[70px]'></div>
    </>
  )
}

export default AdminHeader