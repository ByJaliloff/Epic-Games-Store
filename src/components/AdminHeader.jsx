import React from 'react';
import { IoSearch, IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';

function AdminPanelHeader() {
  return (
    <header className="fixed top-0 left-64 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 h-[85px] px-8 py-4 z-[60]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your Epic Games Store content</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Dashboard"
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <IoNotifications className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <FaUser className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-white">Orxan</p>
              <p className="text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminPanelHeader;