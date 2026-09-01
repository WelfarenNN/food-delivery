"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* ЗҮҮН ТАЛ: НЭВТРЭХ ХЭСЭГ */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-104 flex flex-col gap-6">
          {/* Буцах товч */}
          <div className="self-start">
            <button
              onClick={() => router.back()}
              className="p-2 border rounded-lg border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Гарчиг болон Тайлбар */}
          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-[32px] font-bold text-gray-900 tracking-tight">
              Log in
            </h2>
            <p className="text-gray-500 text-[16px]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          {/* Форм (Оролтууд) */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-12 px-4 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full h-12 px-4 border border-gray-200 rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Нууц үг мартсан */}
            <button className="text-left text-sm text-gray-900 font-medium underline mt-1 hover:text-gray-600 w-max">
              Forgot password?
            </button>
          </div>

          {/* Үндсэн товч */}
          <Button className="w-full h-12 mt-2 bg-[#D1D1D6] hover:bg-gray-400 text-white font-medium rounded-lg transition-colors">
            Let&apos;s Go
          </Button>

          {/* Бүртгүүлэх хэсэг */}
          <div className="flex gap-1.5 items-center justify-center text-sm mt-2">
            <span className="text-gray-500">Don&apos;t have an account?</span>
            <button className="text-[#007AFF] font-medium hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* БАРУУН ТАЛ: ЗУРАГТ ХЭСЭГ */}
      <div className="hidden md:block p-6 relative h-full">
  <div className="relative w-full h-full overflow-hidden rounded-2xl">
    <img
      src="/food-delivery.png"
      alt="Delivery Background"
      fill
      priority
      className="object-cover"
    />
  </div>
</div>
    </div>
  );
};
