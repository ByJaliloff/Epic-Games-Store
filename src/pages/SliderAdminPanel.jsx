import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getAllSliders, addSlider, updateSlider, deleteSlider } from "../service.js/SlideService";


const SliderAdminPanel = () => {
  const [sliders, setSliders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    price: "",
    logo: "",
    image: "",
    mobImg: "",
    thumbnail: "",
    gameId: "",
    isFree: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const openAddModal = () => {
  resetForm();
  setShowModal(true);
};

const openEditModal = (item) => {
  const isFree = item.price === "Free" || item.price === "$0";
  setFormData({ ...item, isFree });
  setIsEditing(true);
  setShowModal(true);
};


  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    const data = await getAllSliders();
    setSliders(data);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const finalPrice = formData.isFree ? "Free" : formData.price;

    const finalData = {
      ...formData,
      price: finalPrice,
    };

    if (isEditing) {
      await updateSlider(finalData.id, finalData);
    } else {
      const newItem = { ...finalData, id: uuidv4() };
      await addSlider(newItem);
    }

    await fetchSliders();
    resetForm();
  } catch (error) {
    alert("Əməliyyat zamanı xəta baş verdi");
  }
};

;

   const handleDelete = async (id) => {
    if (!window.confirm("Silinməsinə əminsən?")) return;
    try {
      await deleteSlider(id);
      await fetchSliders();
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
  } else if (name === "price") {
    const formattedPrice = value === "0" || value === "0.00" ? "Free" : `$${value}`;
    setFormData((prev) => ({
      ...prev,
      price: formattedPrice,
      isFree: formattedPrice === "Free"
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
};
;


const handleEdit = (item) => {
  openEditModal(item);
};


const resetForm = () => {
  setFormData({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    price: "",
    logo: "",
    image: "",
    mobImg: "",
    thumbnail: "",
    gameId: "",
    isFree: false
  });
  setIsEditing(false);
};



  return (
  <div className="bg-[#1e1e1e] min-h-screen text-white">
    <div className="p-6 max-w-5xl mx-auto">
      
      <div className="flex justify-between my-6">
        <h2 className="text-2xl font-semibold mb-4">Slaydlar:</h2>
        <button
              onClick={openAddModal}
              className="
                px-4 py-2 rounded shadow-md text-white font-semibold
                bg-gradient-to-r from-gray-600 to-gray-700
                hover:from-gray-500 hover:to-gray-600
                transition-colors duration-300
                relative overflow-hidden
              "
            >
              + Slayd Əlavə Et
            </button>
      </div>

      
      <div className="relative overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase bg-[#2a2a2a] text-gray-400">
            <tr>
              <th className="px-6 py-3">Başlıq</th>
              <th className="px-6 py-3">Alt başlıq</th>
              <th className="px-6 py-3">Qiymət</th>
              <th className="px-6 py-3">Thumbnail</th>
              <th className="px-6 py-3 text-center">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {sliders.map((item) => (
              <tr key={item.id} className="bg-[#25252a] border-b border-[#333] hover:bg-[#2d2d32] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                <td className="px-6 py-4 font-medium text-white">{item.subtitle}</td>
                <td className="px-6 py-4 font-medium text-white">{item.price}</td>
                <td className="px-6 py-4 ">
                  <img src={item.thumbnail} alt="thumb" className="w-14 h-auto rounded" />
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEdit(item)}
                    className="mr-4 cursor-pointer"
                    title="Redaktə"
                  >
                    <img
                      src="/icons/icons8-edit.png"
                      alt="Redaktə"
                      className="w-8 h-8"
                    />
                  </button>
                  <button
                  className="mr-4 cursor-pointer"
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
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Slaydı Redaktə Et" : "Slayd Əlavə Et"}
            </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { name: "title", label: "Başlıq" },
                    { name: "subtitle", label: "Alt başlıq" },
                    { name: "logo", label: "Logo URL" },
                    { name: "image", label: "Şəkil URL" },
                    { name: "mobImg", label: "Mobil şəkil URL" },
                    { name: "thumbnail", label: "Thumbnail URL" },
                    { name: "gameId", label: "Oyun ID" },
                  ].map(({ name, label }) => (
                    <div key={name} className="flex flex-col">
                      <label htmlFor={name} className="mb-2 text-sm text-gray-400 font-medium">
                        {label}
                      </label>
                      <input
                        id={name}
                        name={name}
                        placeholder={label}
                        value={
                          name === "price"
                            ? (formData.price || "").replace(/[^0-9.]/g, "")
                            : formData[name] || ""
                        }
                        onChange={handleChange}
                        className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required={name !== "price"}
                        type={name === "price" ? "number" : "text"}
                      />

                    </div>
                  ))}
                  {/* Price inputu + Free checkbox birlikdə */}  
                <div className="flex flex-col md:col-span-3">
                  <label htmlFor="price" className="mb-2 text-sm text-gray-400 font-medium">
                    Qiymət
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="Qiymət"
                    value={
                      formData.isFree
                        ? ""
                        : (formData.price || "").replace(/[^0-9.]/g, "")
                    }
                    onChange={handleChange}
                    className="bg-[#202024] p-3 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={formData.isFree}
                  />

                  {/* Checkbox for Free */}
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      id="isFree"
                      name="isFree"
                      type="checkbox"
                      checked={formData.isFree}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="isFree" className="text-sm font-medium text-gray-300">
                      Bu oyun pulsuzdur (Free)
                    </label>
                  </div>
                </div>


                  {/* Description - tam eni tutur */}
                  <div className="flex flex-col md:col-span-3">
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

                  {/* Buttonlar - alt sağda yerləşir */}
                  <div className="col-span-1 md:col-span-3 flex justify-end gap-4 mt-4">
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

export default SliderAdminPanel;
