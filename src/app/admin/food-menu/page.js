"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import CategoryChips from "../dishes/_features/category-chips";
import DishGrid from "../dishes/_features/dish-grid";

const getFoodCategory = async () => {
  const response = await server.get("/food-category/get");
  return response.data.foodCategories || [];
};

const getFoods = async (categoryId) => {
  const url = categoryId ? `/food/get?category=${categoryId}` : "/food/get";
  const response = await server.get(url);
  return response.data.foods || [];
};

export default function FoodMenuPage() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [allDishesForCount, setAllDishesForCount] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchInitialData = async () => {
    try {
      const [catData, dishData] = await Promise.all([
        getFoodCategory(),
        getFoods(null),
      ]);
      setCategories(catData);
      setAllDishesForCount(dishData);
      setDishes(dishData);
    } catch (err) {
      console.error("Initialization error:", err);
    }
  };

  useEffect(() => {
    getFoods(selectedCategory)
      .then((dishData) => setDishes(dishData))
      .catch((err) => console.error("Foods filter fetch error:", err));
  }, [selectedCategory]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchInitialData();
  }, []);

  const handleDeleteFood = async (id) => {
    if (!confirm("Are you sure you want to delete this food item?")) return;
    try {
      await server.delete("/food/delete", { data: { id } });
      setDishes((prev) => prev.filter((dish) => dish._id !== id));
      setAllDishesForCount((prev) => prev.filter((dish) => dish._id !== id));
      alert("Food item deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete food item.");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <CategoryChips
        categories={categories}
        allDishes={allDishesForCount}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onCategoryCreated={fetchInitialData}
      />
      <DishGrid dishes={dishes} onDelete={handleDeleteFood} />
    </div>
  );
}
