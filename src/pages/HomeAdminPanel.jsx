
function HomeAdminPanel() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#101014] to-[#1a1a1f] text-white px-4">
      <div className="max-w-3xl w-full p-10 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl text-center">
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
        <p className="text-sm text-gray-500 italic">🔒 Yalnız adminlər üçün nəzərdə tutulub</p>
      </div>
    </div>
  );
}

export default HomeAdminPanel;
