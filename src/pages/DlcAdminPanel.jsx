import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllDlcs, addDlcs, updateDlcs, deleteDlcs } from "../service.js/DlcService"; // xidmət funksiyalarını özün yaratmalısın

const DlcAdminPanel = () => {
  const [dlcList, setDlcList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    gameId: "",
    title: "",
    image: "",
    description: "",
    price: "",
    discount: "",
    type: ""
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
    fetchDlc();
  }, []);

  const fetchDlc = async () => {
    const data = await getAllDlcs();
    setDlcList(data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const finalData = { ...formData };

    // Əlavə məntiq: Əgər qiymət 0-dırsa, qiyməti "Free" et və endirimi false elə
    if (parseFloat(finalData.price) === 0) {
      finalData.price = "Free";
      finalData.discount = false;
    }

    if (isEditing) {
      await updateDlcs(finalData.id, finalData);
    } else {
      const newItem = { ...finalData, id: uuidv4() };
      await addDlcs(newItem);
    }

    await fetchDlc();
    resetForm();
  } catch (error) {
    alert("Əməliyyat zamanı xəta baş verdi");
  }
};

  const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteDlcs(id);
      await fetchDlc();
    } catch (error) {
      alert("Silinmə zamanı xəta baş verdi");
    }
  };

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === "checkbox" && name === "isFree") {
    setFormData((prev) => ({
      ...prev,
      isFree: checked,
      price: checked ? "Free" : "",
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const resetForm = () => {
    setFormData({
      id: "",
      gameId: "",
      title: "",
      image: "",
      description: "",
      price: "",
      discount: "",
      isFree: false,
      type: ""
    });
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="bg-[#1e1e1e] min-h-screen text-white">
      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between my-6">
          <h2 className="text-2xl font-semibold mb-4">DLC-lər:</h2>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded shadow-md text-white font-semibold bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 transition-colors"
          >
            + DLC Əlavə et
          </button>
        </div>

        <div className="relative overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-400">
              <tr>
                <th className="px-6 py-3">Başlıq</th>
                <th className="px-6 py-3">Tipi</th>
                <th className="px-6 py-3">Qiymət</th>
                <th className="px-6 py-3">Endirim (%)</th>
                <th className="px-6 py-3">Şəkil</th>
                <th className="px-6 py-3 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {dlcList.map((item) => (
                <tr key={item.id} className="bg-[#25252a] border-b border-[#333] hover:bg-[#2d2d32] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
                  </td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.discount}%</td>
                  <td className="px-6 py-4">
                    <img src={item.image} alt="dlc" className="w-14 h-auto rounded" />
                  </td>
                  <td className="px-3 py-4 text-right">
                    <button onClick={() => openEditModal(item)} className="mr-2 cursor-pointer" title="Redaktə">
                      <img src="/icons/icons8-edit.png" alt="Redaktə" className="w-8 h-8" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="cursor-pointer" title="Sil">
                      <img src="/icons/icons8-delete.png" alt="Sil" className="w-8 h-8" />
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
              <h2 className="text-xl font-bold mb-4">{isEditing ? "DLC Redaktə Et" : "Yeni DLC Əlavə Et"}</h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col md:col-span-2">
                        <label htmlFor="type" className="mb-2 text-sm text-gray-400 font-medium">
                            Type
                        </label>
                            <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="bg-[#202024] p-3 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            >
                            <option value="" disabled hidden>
                                Type seçin
                            </option>
                            <option value="addon">Addon</option>
                            <option value="edition">Edition</option>
                            <option value="demo">Demo</option>
                            <option value="editor">Editor</option>
                            </select>
                        </div>

               {/* Digər inputlar (gameId, title, image) map ilə çıxa bilər */}

                    {["gameId", "title", "image"].map((field) => (
                    <div key={field} className="flex flex-col">
                        <label htmlFor={field} className="mb-2 text-sm text-gray-400 font-medium">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        <input
                        id={field}
                        name={field}
                        placeholder={field}
                        value={formData[field] || ""}
                        onChange={handleChange}
                        className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        required
                        />
                    </div>
                    ))}

                    {/* Price input */}
                    <div className="flex flex-col">
                    <label htmlFor="price" className="mb-2 text-sm text-gray-400 font-medium">
                        Price
                    </label>
                    <input
                            id="price"
                            name="price"
                            placeholder="Qiymət"
                            value={formData.isFree ? "Free" : formData.price}
                            onChange={handleChange}
                            className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            disabled={formData.isFree}
                            />
                    </div>

                    {/* Discount input */}
                    <div className="flex flex-col">
                    <label htmlFor="discount" className="mb-2 text-sm text-gray-400 font-medium">
                        Discount (%)
                    </label>
                    <input
                        id="discount"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={handleChange}
                        disabled={parseFloat(formData.price) === 0 || formData.price === "Free"}
                        className={`bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        parseFloat(formData.price) === 0 || formData.price === "Free"
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        type="number"
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
                    className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-15"
                    required
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                  <button type="button" onClick={resetForm} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm font-medium">
                    Bağla
                  </button>
                  <button type="submit" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-sm font-medium">
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

export default DlcAdminPanel;
