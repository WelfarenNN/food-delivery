import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

export default function DishGrid({ dishes, onDelete }) {
  if (!dishes || dishes.length === 0) {
    return (
      <div className="w-full py-12 text-center text-muted-foreground bg-white rounded-xl border border-gray-100 shadow-sm">
        No dishes found in this category.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {dishes.map((dish) => (
        <div
          key={dish._id}
          className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 relative"
        >
          <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => alert(`Edit item clicked for: ${dish.name}`)}
              className="p-1.5 bg-white text-gray-600 rounded-full shadow hover:text-black hover:bg-gray-50 transition-colors"
              title="Edit food"
            >
              <Pencil size={15} />
            </button>

            <button
              onClick={() => onDelete(dish._id)}
              className="p-1.5 bg-white text-destructive rounded-full shadow hover:bg-red-50 transition-colors"
              title="Delete food"
            >
              <Trash2 size={15} />
            </button>
          </div>

          <div className="relative w-full h-44 bg-gray-50">
            <Image
              src={dish.image || "/placeholder-food.png"}
              alt={dish.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </div>

          <div className="p-4 flex flex-col flex-1 gap-2">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {dish.name}
              </h3>
              <span className="text-emerald-600 font-bold whitespace-nowrap">
                {dish.price?.toLocaleString()} $
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {dish.ingredients?.map((ing, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-2 text-xs text-muted-foreground border-t border-gray-50">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {dish.category?.categoryName || "General"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
