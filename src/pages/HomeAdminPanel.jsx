import React, { useContext, useState } from 'react';
import { GameContext } from '../context/DataContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Custom SVG Icons as components
const PlayCircle = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
  </svg>
);

const Image = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
  </svg>
);

const Newspaper = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
  </svg>
);

const Package = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2l3.09 1.26L22 5l-6.16 2.58L12 9l-3.84-1.42L2 5l6.91-1.74L12 2zm0 15l4-1.5v-3L12 14l-4-1.5v3L12 17z"/>
    <path d="M2 12l10 4 10-4v5c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-5z"/>
  </svg>
);

const TrendingUp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

const Percent = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M7.5 4C5.57 4 4 5.57 4 7.5S5.57 11 7.5 11 11 9.43 11 7.5 9.43 4 7.5 4zM16.5 13c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zM19.07 4.93l-14.14 14.14 1.41 1.41L20.48 6.34 19.07 4.93z"/>
  </svg>
);

const LogOut = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
  </svg>
);

const MoreHorizontal = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Import your existing admin panels (you'll need to add these imports)
 import SliderAdminPanel from './SliderAdminPanel';
 import NewsAdminPanel from './NewsAdminPanel'; 
 import GamesAdminPanel from './GamesAdminPanel';
 import DlcAdminPanel from './DlcAdminPanel';

// Placeholder components - replace these with your actual imports

// Dashboard Component (original content)
function Dashboard() {
  const { games, slides, dlcs, news } = useContext(GameContext) || {};
  const contextGames = games || [];
  const contextSlides = slides || [];
  const contextDlcs = dlcs || [];
  const contextNews = news || [];

  const filteredGamesForDiscount = contextGames.filter((g) => g.discount > 0);
  const filteredDlcsForDiscount = contextDlcs.filter((d) => d.discount > 0);

  const stats = [
    {
      title: 'Total Games',
      value: contextGames.length,
      change: '+2.0%',
      changeType: 'positive',
      icon: PlayCircle,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Sliders',
      value: contextSlides.length,
      change: '+1.0%',
      changeType: 'positive',
      icon: Image,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'News Articles',
      value: contextNews.length,
      change: '+4.0%',
      changeType: 'positive',
      icon: Newspaper,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'DLC Content',
      value: contextDlcs.length,
      change: '+12%',
      changeType: 'positive',
      icon: Package,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const gameDiscountData = {
    labels: filteredGamesForDiscount.map((g) => g.title),
    datasets: [
      {
        label: 'Discount (%)',
        data: filteredGamesForDiscount.map((g) => g.discount),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const gameRatingData = {
    labels: contextGames.map((g) => g.title),
    datasets: [
      {
        label: 'Rating (out of 5)',
        data: contextGames.map((g) => g.rating || 0),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const dlcDiscountData = {
    labels: filteredDlcsForDiscount.map((d) => d.title),
    datasets: [
      {
        label: 'DLC Discount (%)',
        data: filteredDlcsForDiscount.map((d) => d.discount),
        backgroundColor: [
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(251, 146, 60, 0.8)',
        ],
        borderColor: [
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(251, 146, 60, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          maxRotation: 45,
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12,
          },
          padding: 20,
        },
      },
    },
  };

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-gradient-to-r ${stat.color} p-6 rounded-xl shadow-lg backdrop-blur-xl`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-white/70 text-sm mt-1">
                    <span className="text-green-200">{stat.change}</span> Last month
                  </p>
                </div>
                <Icon className="w-8 h-8 text-white/60" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Games Discount Chart */}
        {filteredGamesForDiscount.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Percent className="w-5 h-5 mr-2 text-blue-400" />
                Game Discounts
              </h3>
              <button className="text-gray-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="h-64">
              <Bar data={gameDiscountData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Game Ratings Chart */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-400" />
              Game Ratings
            </h3>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64">
            <Bar data={gameRatingData} options={{...chartOptions, scales: {...chartOptions.scales, y: {...chartOptions.scales.y, max: 5}}}} />
          </div>
        </div>
      </div>

      {/* DLC and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* DLC Discounts */}
        {filteredDlcsForDiscount.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Package className="w-5 h-5 mr-2 text-purple-400" />
              DLC Discounts
            </h3>
            <div className="h-48">
              <Doughnut data={dlcDiscountData} options={doughnutOptions} />
            </div>
          </div>
        )}

        {/* Recent Uploads */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm">New Game Assets</span>
              </div>
              <span className="text-xs text-gray-400">Validated</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm">Slider Images</span>
              </div>
              <span className="text-xs text-yellow-400">Pending</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm">DLC Content</span>
              </div>
              <span className="text-xs text-gray-400">Validated</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Free Games</span>
              <span className="font-semibold">{contextGames.filter(g => g.price === 0).length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Games on Sale</span>
              <span className="font-semibold">{filteredGamesForDiscount.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Avg. Rating</span>
              <span className="font-semibold">
                {contextGames.length > 0 ? (contextGames.reduce((sum, game) => sum + (game.rating || 0), 0) / contextGames.length).toFixed(1) : '0.0'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-300">Total Revenue</span>
              <span className="font-semibold text-green-400">$142k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Content Table */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Content</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 font-medium text-gray-300">Content</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Last Updated</th>
                <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contextGames.slice(0, 3).map((game, index) => (
                <tr key={game.id} className="border-b border-gray-700/30 hover:bg-gray-700/30">
                  <td className="py-3 px-4">{game.title}</td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      Game
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400 text-sm">2 hours ago</td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Main Admin Panel Component
function HomeAdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'sliders', label: 'Sliders', icon: Image },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'games', label: 'Games', icon: PlayCircle },
    { id: 'dlc', label: 'DLC', icon: Package },
  ];

  // Function to render the active section content
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'sliders':
        return <SliderAdminPanel />;
      case 'games':
        return <GamesAdminPanel />;
      case 'news':
        return <NewsAdminPanel />;
      case 'dlc':
        return <DlcAdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50 z-50">
        {/* Logo */}
        <div className="flex items-center justify-center py-6 border-b border-gray-700/50 h-[85px]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/1200px-Epic_Games_logo.svg.png"
            alt="Epic Games"
            className="w-12 h-12"
          />
          <span className="ml-3 text-xl font-bold">Epic Admin</span>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
          <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700/50 hover:text-white rounded-lg transition-colors">
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 pt-[85px]">
        <main>
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
}

export default HomeAdminPanel;