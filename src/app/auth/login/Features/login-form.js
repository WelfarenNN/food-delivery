"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { FieldError } from "./Components/field-error";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Zod Схем тодорхойлох (Цэвэр JavaScript)
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email. Use a format like example@email.com."),
  password: z
    .string()
    .trim()
    .min(6, "Incorrect password. Please try again."),
});

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // 2. React Hook Form тохируулга
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Form илгээх функц
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    // Энд нэвтрэх API хүсэлтээ бичнэ
  };

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
      {/* Нэвтрэх хэсэг */}
      <div className="flex flex-col justify-center items-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-104 flex flex-col gap-6">
          {/* Буцах товч */}
          <div className="self-start">
            <button
              type="button"
              onClick={() => router.back()}
              className="p-2 border rounded-lg border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Header */}
          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-[32px] font-bold text-gray-900 tracking-tight">
              Log in
            </h2>
            <p className="text-gray-500 text-[16px]">
              Log in to enjoy your favorite dishes.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <CardContent className="p-0">
              {/* 4. handleSubmit холбох */}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                
                {/* Email Input */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="w-full h-9"
                    placeholder="Enter your email address"
                    {...register("email")} // <-- Хуучны html required-ийн оронд register ашиглана
                  />
                  {errors.email?.message && (
                    <FieldError message={errors.email.message} />
                  )}
                </div>

                {/* Password Input */}
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full h-9 pr-10"
                      placeholder="Password"
                      {...register("password")} // <-- Register холболт
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password?.message && (
                    <FieldError message={errors.password.message} />
                  )}
                </div>

                {/* Нэвтрэх товч */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-9 mt-2 bg-[#000000] hover:bg-[#494949] text-white font-medium rounded-lg transition-colors"
                >
                  {isSubmitting ? "Loading..." : "Let's Go"}
                </Button>
              </form>
            </CardContent>

            <button 
              type="button" 
              className="text-left inline-block text-sm underline-offset-4 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex gap-1.5 items-center justify-center text-sm mt-2">
            <span className="text-gray-500">Don&apos;t have an account?</span>
            <button type="button" className="text-[#007AFF] font-medium hover:underline">
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Баруун талын зураг */}
      <div className="hidden md:block p-6 relative h-full">
        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <Image
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
