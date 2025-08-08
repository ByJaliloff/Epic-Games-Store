import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getAllGames,
  addGames,
  updateGames,
  deleteGames,
} from "../service.js/GamesService";

const GamesAdminPanel = () => {
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    logo: "",
    image: "",
    price: "",
    discount: "",
    isFree: false,
  });

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    const data = await getAllGames();
    setGames(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalData = { ...formData };

      // Qiymət yoxdursa və ya 0-dırsa isFree true olsun
      if (parseFloat(finalData.price) === 0 || finalData.isFree) {
        finalData.price = "Free";
        finalData.isFree = true;
        finalData.discount = 0;
      }

      if (isEditing) {
        await updateGames(finalData.id, finalData);
      } else {
        await addGames({ ...finalData, id: uuidv4() });
      }

      await fetchGames();
      resetForm();
    } catch (err) {
      alert("Xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsiniz?")) return;
    try {
      await deleteGames(id);
      await fetchGames();
    } catch {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      logo: "",
      image: "",
      price: "",
      discount: "",
      isFree: false,
    });
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="p-6 text-white bg-[#1e1e1e] min-h-screen">
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Oyunlar:</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded shadow-md text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 transition-colors"
        >
          + Oyun əlavə et
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-400">
            <tr>
              <th className="px-6 py-3">Başlıq</th>
              <th className="px-6 py-3">Sekil</th>
              <th className="px-6 py-3">Qiymət</th>
              <th className="px-6 py-3">Endirim(%)</th>
              <th className="px-6 py-3">Logo</th>
              <th className="px-6 py-3">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {games.map((item) => (
              <tr key={item.id} className="bg-[#25252a] border-b border-[#333]">
                <td className="px-6 py-4">
                  {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
                </td>
                <td className="px-6 py-4">
                  <img src={item.image} alt="image" className="w-9 h-12 rounded" />
                </td>
                <td className="px-6 py-4">{item.isFree ? "Free" : item.price}</td>
                <td className="px-6 py-4">{item.discount}%</td>
                <td className="px-6 py-4">
                  <img src={item.logo} alt="logo" className="w-15 h-auto rounded" />
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button onClick={() => openEditModal(item)} title="Redaktə et">
                    <img src="/icons/icons8-edit.png" className="w-6 h-6" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} title="Sil">
                    <img src="/icons/icons8-delete.png" className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#101014] p-6 rounded-lg w-full max-w-2xl border border-[#333]">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Oyun Redaktə Et" : "Yeni Oyun Əlavə Et"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["title", "logo", "image"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label htmlFor={field} className="text-sm mb-1 capitalize text-gray-400">
                    {field}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="bg-[#202024] p-2 rounded-md text-white text-sm"
                    required
                  />
                </div>
              ))}

              <div className="flex flex-col">
                <label className="text-sm mb-1 text-gray-400">Qiymət</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="bg-[#202024] p-2 rounded-md text-white text-sm"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm mb-1 text-gray-400">Endirim (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  disabled={parseFloat(formData.price) === 0 || formData.price === "Free"}
                  className="bg-[#202024] p-2 rounded-md text-white text-sm disabled:opacity-50"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={handleChange}
                />
                <label className="text-sm text-gray-300">Bu oyun pulsuzdur (Free)</label>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button type="button" onClick={resetForm} className="bg-gray-600 px-4 py-2 rounded">
                  Bağla
                </button>
                <button type="submit" className="bg-green-600 px-4 py-2 rounded">
                  {isEditing ? "Yadda saxla" : "Əlavə et"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default GamesAdminPanel;
