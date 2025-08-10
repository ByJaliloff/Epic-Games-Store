import { useContext } from "react";
import { GameContext } from "../context/DataContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HomeAdminPanel() {
  const { games, slides, dlcs } = useContext(GameContext);

  const filteredGamesForDiscount = games?.filter((g) => g.discount > 0) || [];
  const filteredGamesForRating = games || [];
  const filteredDlcsForDiscount = dlcs?.filter((d) => d.discount > 0) || [];

  const commonOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { font: { size: 10 } } },
      title: { display: false },
    },
    scales: {
      x: { ticks: { maxRotation: 45, minRotation: 30, font: { size: 9 } } },
      y: { min: 0 },
    },
  };

  const gameDiscountData = {
    labels: filteredGamesForDiscount.map((g) => g.title),
    datasets: [
      {
        label: "Endirim (%)",
        data: filteredGamesForDiscount.map((g) => g.discount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        barThickness: 10,
      },
    ],
  };

  const gameRatingData = {
    labels: filteredGamesForRating.map((g) => g.title),
    datasets: [
      {
        label: "Reytinq (5 üzərindən)",
        data: filteredGamesForRating.map((g) => g.rating || 0),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        barThickness: 10,
      },
    ],
  };

  const dlcDiscountData = {
    labels: filteredDlcsForDiscount.map((d) => d.title),
    datasets: [
      {
        label: "Endirim (%)",
        data: filteredDlcsForDiscount.map((d) => d.discount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        barThickness: 10,
      },
    ],
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#101014] to-[#1a1a1f] text-white px-4">
      <div className="max-w-7xl w-full p-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Epic_Games_logo.svg/1200px-Epic_Games_logo.svg.png"
            alt="Epic Games Logo"
            className="w-20 h-auto"
          />
        </div>

        <h1 className="text-3xl font-bold mb-4">Admin Panelə Xoş Gəldiniz</h1>
        <p className="text-gray-300 text-lg mb-6">
          Buradan slayderləri, oyunları və digər kontentləri idarə edə bilərsiniz.
        </p>
        <p className="text-sm text-gray-500 italic mb-8">
          🔒 Yalnız adminlər üçün nəzərdə tutulub
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white/10 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Oyunlar</h2>
            <p className="text-2xl font-bold mt-2">{games?.length || 0}</p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl shadow">
            <h2 className="text-xl font-semibold">Slayderlər</h2>
            <p className="text-2xl font-bold mt-2">{slides?.length || 0}</p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl shadow">
            <h2 className="text-xl font-semibold">DLC-lər</h2>
            <p className="text-2xl font-bold mt-2">{dlcs?.length || 0}</p>
          </div>
        </div>

        {/* Chartlar yan-yana */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 mb-20">
          {filteredGamesForDiscount.length > 0 && (
            <div className="flex-1 h-64">
              <h2 className="text-xl font-semibold mb-2">Oyun Endirimləri</h2>
              <Bar data={gameDiscountData} options={commonOptions} />
            </div>
          )}

          {filteredGamesForRating.length > 0 && (
            <div className="flex-1 h-64">
              <h2 className="text-xl font-semibold mb-2">Oyun Reytinqləri (5 üzərindən)</h2>
              <Bar
                data={gameRatingData}
                options={{ ...commonOptions, scales: { ...commonOptions.scales, y: { min: 0, max: 5 } } }}
              />
            </div>
          )}

          {filteredDlcsForDiscount.length > 0 && (
            <div className="flex-1 h-64">
              <h2 className="text-xl font-semibold mb-2">DLC Endirimləri</h2>
              <Bar data={dlcDiscountData} options={commonOptions} />
            </div>
          )}
        </div>

        {/* Slayder şəkilləri */}
        {slides?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Slayder şəkilləri</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-white/10"
                >
                  <img
                    src={slide.image}
                    alt={slide.title || `Slide ${index + 1}`}
                    className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeAdminPanel;
