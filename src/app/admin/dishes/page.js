"use client";

import { useEffect, useState } from "react";
import { server } from "@/app/_api/api";
import SideBar from "../_components/sidebar";
import { useRouter } from "next/navigation";
import CategorySidebar from "./_features/category-sidebar";
import DishGrid from "./_features/dish-grid";

const getFoodCategory = async () => {
  const response = await server.get("/food-category/get");
  return response.data.foodCategory;
};

export default function Admin() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getFoodCategory().then((data) => {
      setData(data).catch((err) => {
        console.log(err);
      });
    });
  }, []);
  return (
    <div className="w-full min-h-screen flex gap-6 bg-[#F4F4F5] p-0 m-0 ">
      <SideBar />
      <div className="w-full flex-1 flex flex-col gap-6 pt-6 pr-10 ">
        <div className="self-end bg-[#000000] w-9 h-9 rounded-full"></div>
        <div className="w-full flex flex-col gap-6 pt-21">
          <CategorySidebar />
          <DishGrid />
        </div>
      </div>
    </div>
  );
}
