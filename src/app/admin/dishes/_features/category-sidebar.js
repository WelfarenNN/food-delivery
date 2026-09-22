export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full min-h-44 min-w-0 flex flex-col px-6 py-6 gap-4 rounded-xl bg-[#ffffff]">
      <div className="w-full font-semibold text-[#09090B] text-xl">
        Dishes Category
      </div>
      
      {/* Категориудыг хөндлөн гулсдаг (scroll) хэлбэрээр харуулах хэсэг */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {/* БҮХ ХООЛЫГ ХАРАХ ТОВЧ */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
            selectedCategory === null
              ? "bg-black text-white border-black"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent"
          }`}
        >
          All Dishes
        </button>

        {/* БЭКЭНДЭЭС ИРВЭЛ ЖАГСААХ ХЭСЭГ */}
        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => onSelectCategory(cat._id)}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
              selectedCategory === cat._id
                ? "bg-black text-white border-black"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-transparent"
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
}
