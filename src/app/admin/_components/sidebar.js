import Router from "next/router";
import Logo from "@/app/Pictures/Logo";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Truck } from "lucide-react";

export default function SideBar() {
  return (
    <div className="w-51.25 h-screen flex flex-col gap-10 py-9 px-5 bg-[#ffffff]">
      <div className="flex gap-2">
        <Logo />
        <div className="flex flex-col ">
          <h1 className="font-semibold text-lg text/text-foreground text-[#09090B]">
            NomNom
          </h1>
          <h4 className="text-xs font-normal text/text-muted-foreground text-[#71717A]">
            Swift delivery
          </h4>
        </div>
      </div>
      <div
        className="flex flex-col gap-6 justify-center items-center
      "
      >
        <button
          type="button"
          className="w-41.25 h-10 text-[#ffffff] flex justify-content py-6 px-6 items-center gap-2.5 rounded-full bg-[#000000]"
          onClick={() => router.foodmenu()}
        >
          <LayoutDashboard />
          <p>Food Menu</p>
        </button>

        <button
          type="button"
          className="w-41.25 h-10 flex items-center gap-2.5 px-6 py-6 rounded-full bg-[#F4F4F5]"
          onClick={() => router.foodorders()}
        >
          <Truck />
          <p>Orders</p>
        </button>
      </div>
    </div>
  );
}
