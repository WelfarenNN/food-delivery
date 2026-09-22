"use client";

import Logo from "@/app/Pictures/Logo";
import { LayoutDashboard, Truck } from "lucide-react";
import { useRouter, usePathname } from "next/navigation"; 

export default function SideBar() {
  const router = useRouter();
  const pathname = usePathname(); 

  return (
    <div className="w-51.25 h-screen flex flex-col gap-10 py-9 px-5 bg-[#ffffff] shrink-0 border-r border-gray-100">
      
      <div className="flex gap-2 items-center">
        <Logo />
        <div className="flex flex-col ">
          <h1 className="font-semibold text-lg text-[#09090B] leading-none">
            NomNom
          </h1>
          <h4 className="text-xs font-normal text-[#71717A] mt-1">
            Swift delivery
          </h4>
        </div>
      </div>

  
      <div className="flex flex-col gap-6 justify-center items-center">
        
        <button
          type="button"
          className={`w-41.25 h-12 flex justify-start py-3 px-6 items-center gap-2.5 rounded-full transition-all ${
            pathname === "/admin/food-menu"
              ? "text-[#ffffff] bg-[#000000]" 
              : "text-[#71717A] bg-transparent hover:bg-gray-100"
          }`}
          onClick={() => router.push("/admin/food-menu")}
        >
          <LayoutDashboard size={20} />
          <p className="font-medium text-sm">Food Menu</p>
        </button>

        <button
          type="button"
          className={`w-41.25 h-12 flex justify-start py-3 px-6 items-center gap-2.5 rounded-full transition-all ${
            pathname === "/admin/orders"
              ? "text-[#ffffff] bg-[#000000]" 
              : "text-[#71717A] bg-[#F4F4F5] hover:bg-gray-200"
          }`}
          onClick={() => router.push("/admin/orders")}
        >
          <Truck size={20} />
          <p className="font-medium text-sm">Orders</p>
        </button>

      </div>
    </div>
  );
}
