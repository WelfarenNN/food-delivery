"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/(auth)/_api/api";
import { useRouter } from "next/navigation";
import CategorySidebar from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

const getFoodCategory = async () => {
  const response = await server.get("/food-category/get");
  
  return response.data.foodCategories || []; 
};

const getFoods = async (categoryId) => {
  const url = categoryId ? `/food/get?category=${categoryId}` : "/food/get";
  const response = await server.get(url);
  return response.data.foods || [];
};

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    getFoodCategory()
      .then((catData) => setCategories(catData))
      .catch((err) => console.log("Category fetch error:", err));
  }, []);

  useEffect(() => {
    getFoods(selectedCategory)
      .then((dishData) => setDishes(dishData))
      .catch((err) => console.log("Foods fetch error:", err));
  }, [selectedCategory]);

  return (
    <div className="w-full min-h-screen flex gap-6 bg-[#F4F4F5] p-0 m-0 ">
      
      <div className="w-full flex-1 flex flex-col gap-6 pt-6 ">
        <div className="w-full flex flex-col gap-6">
          <CategorySidebar 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <DishGrid dishes={dishes} />
        </div>
      </div>
    </div>
  );
}
