import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllNews, addNews, updateNews, deleteNews } from "../service.js/NewsService";

const NewsAdminPanel = () => {
  const [newsList, setNewsList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    image: "",
    link: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowModal(true);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const data = await getAllNews();
    setNewsList(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateNews(formData.id, formData);
      } else {
        const newItem = { ...formData, id: uuidv4() };
        await addNews(newItem);
      }
      await fetchNews();
      resetForm();
    } catch (error) {
      alert("Əməliyyat zamanı xəta baş verdi");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteNews(id);
      await fetchNews();
    } catch (error) {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      date: "",
      image: "",
      link: ""
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-white">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between my-6">
          <h2 className="text-2xl font-semibold mb-4">Xəbərlər:</h2>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded shadow-md text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 transition-colors"
          >
            + Xəbər Əlavə Et
          </button>
        </div>

        <div className="relative overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-400">
              <tr>
                <th className="px-6 py-3">Başlıq</th>
                <th className="px-6 py-3">Təsvir</th>
                <th className="px-6 py-3">Tarix</th>
                <th className="px-6 py-3">Şəkil</th>
                <th className="px-6 py-3">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((item) => (
                <tr key={item.id} className="bg-[#25252a] border-b border-[#333] hover:bg-[#2d2d32] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
                    </td>
                  <td className="px-6 py-4">
                    {item.description.length > 50 ? item.description.slice(0, 50) + "..." : item.description}
                    </td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4">
                    <img src={item.image} alt="news" className="w-14 h-auto rounded" />
                  </td>
                  <td className="px-3 py-4 text-right">
                     <button
                    onClick={() => openEditModal(item)}
                    className="mr-2 cursor-pointer"
                    title="Redaktə"
                  >
                    <img
                      src="/icons/icons8-edit.png"
                      alt="Redaktə"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                  className="mr-2 cursor-pointer"
                    onClick={() => handleDelete(item.id)}
                    title="Sil"
                  >
                    <img
                      src="/icons/icons8-delete.png"
                      alt="Sil"
                      className="w-8 h-8"
                    />
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/60 backdrop-blur-sm pt-20">
            <div className="bg-[#101014] p-6 rounded-xl max-w-2xl w-full shadow-xl border border-[#2f2f2f]">
              <h2 className="text-xl font-bold mb-4">{isEditing ? "Xəbəri Redaktə Et" : "Xəbər Əlavə Et"}</h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "title", label: "Başlıq" },
                  { name: "image", label: "Şəkil URL" },
                  { name: "link", label: "Xəbər Linki" },
                  { name: "date", label: "Tarix" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex flex-col">
                    <label htmlFor={name} className="mb-2 text-sm text-gray-400 font-medium">
                      {label}
                    </label>
                    <input
                      id={name}
                      name={name}
                      placeholder={label}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      required
                    />
                  </div>
                ))}

                <div className="flex flex-col md:col-span-2">
                  <label htmlFor="description" className="mb-2 text-sm text-gray-400 font-medium">
                    Təsvir
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Təsvir"
                    value={formData.description}
                    onChange={handleChange}
                    className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-28"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium"
                  >
                    Bağla
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-sm font-medium"
                  >
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

export default NewsAdminPanel;
