"use client";
import Image from "next/image";

export default function DishCard({ dish, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border overflow-hidden relative group flex flex-col">
      {/* Хоолны зураг */}
      <div className="w-full h-40 bg-gray-100 relative">
        <Image
          src={dish.image || "https://placehold.co"}
          alt={dish.name}
          className="w-full h-full object-cover"
        />

        {/* Устгах товчлуур (Баруун дээд буланд) */}
        <button
          onClick={() => onDelete(dish._id)}
          className="absolute top-2 right-2 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center shadow hover:bg-red-50 transition text-sm"
        >
          🗑️
        </button>
      </div>

      {/* Нэр, Үнэ, Орц */}
      <div className="p-4 flex flex-col flex-1 gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-sm">{dish.name}</h3>
          <span className="text-red-500 font-bold text-sm">${dish.price}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {dish.ingredients}
        </p>
      </div>
    </div>
  );
}
