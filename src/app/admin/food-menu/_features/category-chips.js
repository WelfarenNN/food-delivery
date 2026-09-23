"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddCategoryDialog from "../../dishes/_features/dish-form-dialog";

export default function CategoryChips({
  categories,
  allDishes,
  selectedCategory,
  onSelectCategory,
  onCategoryCreated,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  
  const getCategoryCount = (categoryId) => {
    if (!allDishes) return 0;
    return allDishes.filter((dish) => dish.category?._id === categoryId).length;
  };

  return (
    <div className="w-full min-h-44 flex flex-col px-6 py-6 gap-4 rounded-xl bg-white border border-gray-100 shadow-sm relative">
      <div className="w-full font-semibold text-[#09090B] text-xl">
        Dishes Category
      </div>

      <div className="flex flex-wrap items-center gap-3 overflow-x-auto pb-2">
       
        <button
          type="button"
          onClick={() => onSelectCategory(null)} 
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
            selectedCategory === null
              ? "bg-[#09090B] text-white border-[#09090B]"
              : "bg-[#F4F4F5] text-[#71717A] hover:bg-gray-200 border-transparent"
          }`}
        >
          <span>All Dishes</span>
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedCategory === null ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            {allDishes ? allDishes.length : 0}
          </span>
        </button>

        {categories && categories.map((cat) => {
          const isSelected = selectedCategory === cat._id;
          const count = getCategoryCount(cat._id);
          
          return (
            <button
              key={cat._id}
              type="button"
              onClick={() => onSelectCategory(cat._id)} 
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                isSelected
                  ? "bg-[#09090B] text-white border-[#09090B]"
                  : "bg-[#F4F4F5] text-[#71717A] hover:bg-gray-200 border-transparent"
              }`}
            >
              <span>{cat.categoryName}</span>
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isSelected ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition-colors flex items-center justify-center shrink-0"
          title="Add New Category"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <AddCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={onCategoryCreated}
      />
    </div>
  );
}
