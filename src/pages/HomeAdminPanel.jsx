import React, { useContext, useState, useEffect } from 'react';
import { GameContext } from '../context/DataContext';
import { getUserLibrary } from '../service.js/OrderService';
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

const Users = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 7c0-2.21-1.79-4-4-4S8 4.79 8 7s1.79 4 4 4 4-1.79 4-4zm-4 6c-4.42 0-8 1.79-8 4v3h16v-3c0-2.21-3.58-4-8-4z"/>
  </svg>
);

const ShoppingBag = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
  </svg>
);

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// Import your existing admin panels (you'll need to add these imports)
import SliderAdminPanel from './SliderAdminPanel';
import NewsAdminPanel from './NewsAdminPanel'; 
import GamesAdminPanel from './GamesAdminPanel';
import DlcAdminPanel from './DlcAdminPanel';

// Dashboard Component (original content)
function Dashboard() {
  const { games, slides, dlcs, news, user } = useContext(GameContext) || {};
  const [usersWithPurchases, setUsersWithPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const contextGames = games || [];
  const contextSlides = slides || [];
  const contextDlcs = dlcs || [];
  const contextNews = news || [];
  // Extract users array from the user object
  let contextUsers = [];
  
  console.log('Raw user data from context:', user);
  
  if (user) {
    // Try different possible structures
    if (Array.isArray(user)) {
      contextUsers = user;
    } else if (user.users && Array.isArray(user.users)) {
      contextUsers = user.users;
    } else if (user.data && Array.isArray(user.data)) {
      contextUsers = user.data;
    } else if (typeof user === 'object') {
      // If it's an object, check what properties it has
      console.log('User object properties:', Object.keys(user));
      // Try to find an array property
      const arrayProperty = Object.keys(user).find(key => Array.isArray(user[key]));
      if (arrayProperty) {
        console.log('Found array property:', arrayProperty);
        contextUsers = user[arrayProperty];
      } else {
        // If no array found, maybe it's a single user object, wrap it in array
        contextUsers = [user];
      }
    }
  }
  
  console.log('Processed contextUsers:', contextUsers);
  console.log('contextUsers is array:', Array.isArray(contextUsers), 'length:', contextUsers.length);

  // Fetch user purchases
 useEffect(() => {
    const fetchUserPurchases = async () => {
      // Check if contextUsers exists and is an array
      if (!contextUsers || !Array.isArray(contextUsers) || contextUsers.length === 0) {
        console.log('No users available or contextUsers is not an array:', contextUsers);
        setLoading(false);
        return;
      }

      try {
        console.log('Users from context:', contextUsers);
        console.log('Users type:', typeof contextUsers, 'Is array:', Array.isArray(contextUsers));
        console.log('Games from context:', contextGames);
        console.log('DLCs from context:', contextDlcs);

        const usersWithLibrary = await Promise.all(
          contextUsers.map(async (user) => {
            try {
              // Use getUserLibrary from OrderService to get user's purchases
              const userLibraryResponse = await getUserLibrary(user.id);
              console.log(`Library response for user ${user.id}:`, userLibraryResponse);
              
              // Handle the specific structure returned by getUserLibrary
              let gameIds = [];
              if (userLibraryResponse && userLibraryResponse.success && userLibraryResponse.gameIds) {
                gameIds = userLibraryResponse.gameIds;
              }
              
              console.log(`Game IDs for user ${user.id}:`, gameIds);
              
              // Map IDs to actual game objects - games have matching IDs
              const purchasedGames = gameIds
                .map(id => contextGames.find(game => game.id === id))
                .filter(Boolean);
                
              // Map IDs to actual DLC objects - DLCs also have matching IDs in the same gameIds array
              const purchasedDlcs = gameIds
                .map(id => contextDlcs.find(dlc => dlc.id === id))
                .filter(Boolean);
              
              console.log(`Purchased games for user ${user.id}:`, purchasedGames);
              console.log(`Purchased DLCs for user ${user.id}:`, purchasedDlcs);

              // Calculate total spent from purchased games and DLCs
              let totalSpent = 0;
              purchasedGames.forEach(game => {
                if (game && game.price) {
                  totalSpent += parseFloat(game.price);
                }
              });
              purchasedDlcs.forEach(dlc => {
                if (dlc && dlc.price) {
                  totalSpent += parseFloat(dlc.price);
                }
              });

              // Since your OrderService doesn't provide purchase dates, 
              // we'll set lastPurchase to null or current date if they have purchases
              let lastPurchase = null;
              if (purchasedGames.length > 0 || purchasedDlcs.length > 0) {
                lastPurchase = new Date(); // or null if you don't want to show a date
              }

              return {
                ...user,
                purchasedGames,
                purchasedDlcs,
                totalItems: purchasedGames.length + purchasedDlcs.length,
                totalSpent,
                lastPurchase
              };
            } catch (error) {
              console.error(`Error fetching library for user ${user.id}:`, error);
              return {
                ...user,
                purchasedGames: [],
                purchasedDlcs: [],
                totalItems: 0,
                totalSpent: 0,
                lastPurchase: null
              };
            }
          })
        );

        console.log('Users with purchases:', usersWithLibrary);
        setUsersWithPurchases(usersWithLibrary);
      } catch (error) {
        console.error('Error fetching user purchases:', error);
        setUsersWithPurchases([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPurchases();
  }, [contextUsers.length, contextGames.length, contextDlcs.length]);// Use lengths instead of full objects to prevent infinite renders

 const filteredGamesForDiscount = contextGames.filter((g) => g.discount > 0);
  const filteredDlcsForDiscount = contextDlcs.filter((d) => d.discount > 0);

  // Calculate total revenue from all users
  const totalRevenue = usersWithPurchases.reduce((sum, user) => sum + user.totalSpent, 0);
  const totalPurchases = usersWithPurchases.reduce((sum, user) => sum + user.totalItems, 0);

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
      title: 'Active Users',
      value: contextUsers.length,
      change: '+5.2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Purchases',
      value: totalPurchases,
      change: '+8.1%',
      changeType: 'positive',
      icon: ShoppingBag,
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
              <span className="font-semibold text-green-400">${totalRevenue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Users and Purchases Table */}
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700/50 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Users & Their Purchases
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-gray-300">Loading user purchases...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 px-4 font-medium text-gray-300">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Games Owned</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">DLCs Owned</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Total Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Last Purchase</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersWithPurchases.length > 0 ? usersWithPurchases.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/30 hover:bg-gray-700/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                          {user.username ? user.username.charAt(0).toUpperCase() : 
                           user.name ? user.name.charAt(0).toUpperCase() :
                           user.email ? user.email.charAt(0).toUpperCase() : '?'}
                        </div>
                        <span className="font-medium">{user.firstName || user.name || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{user.email || 'No email'}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs mb-1 text-center">
                          {user.purchasedGames.length}
                        </span>
                        {user.purchasedGames.length > 0 && (
                          <div className="text-xs text-gray-400 max-w-32 truncate" title={user.purchasedGames.map(g => g.title).join(', ')}>
                            {user.purchasedGames.map(g => g.title).join(', ')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs mb-1 text-center">
                          {user.purchasedDlcs.length}
                        </span>
                        {user.purchasedDlcs.length > 0 && (
                          <div className="text-xs text-gray-400 max-w-32 truncate" title={user.purchasedDlcs.map(d => d.title).join(', ')}>
                            {user.purchasedDlcs.map(d => d.title).join(', ')}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-green-400 font-semibold">
                        ${user.totalSpent.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {user.lastPurchase ? user.lastPurchase.toLocaleDateString() : 'No purchases'}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        className="text-gray-400 hover:text-white"
                        title={`Total purchases: ${user.totalItems}`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="py-8 px-4 text-center text-gray-400">
                      {!contextUsers ? 'Users not loaded from context' : 
                       !Array.isArray(contextUsers) ? 'Users data is not in array format' :
                       contextUsers.length === 0 ? 'No users found in context' : 
                       'No purchase data available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Purchase Summary */}
        {usersWithPurchases.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{usersWithPurchases.length}</div>
                <div className="text-sm text-gray-400">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {usersWithPurchases.reduce((sum, user) => sum + user.purchasedGames.length, 0)}
                </div>
                <div className="text-sm text-gray-400">Games Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {usersWithPurchases.reduce((sum, user) => sum + user.purchasedDlcs.length, 0)}
                </div>
                <div className="text-sm text-gray-400">DLCs Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  ${totalRevenue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total Revenue</div>
              </div>
            </div>
          </div>
        )}
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