"use client";

import SideBar from "./_components/sidebar";
import { User } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="w-full min-h-screen flex bg-[#F4F4F5] p-0 m-0 text-[#09090B]">
      {/* 1. ТАНЫ ӨӨРИЙН СИДЕБАР КОМПОНЕНТ */}
      <SideBar />

      {/* 2. ҮНДСЭН АГУУЛГА БОЛОН АВАТАР ХЭСЭГ */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Аватар (Баруун дээд буланд байрлах) */}
        <header className="w-full h-16 flex items-center justify-end px-10 shrink-0">
          <div className="bg-[#000000] w-9 h-9 rounded-full flex items-center justify-center text-white border border-gray-200 shadow-sm cursor-pointer hover:opacity-90">
            <User size={16} />
          </div>
        </header>

        {/* Хуудсууд (Food menu, Orders) солигдож харагдах хэсэг */}
        <main className="flex-1 px-10 pb-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
