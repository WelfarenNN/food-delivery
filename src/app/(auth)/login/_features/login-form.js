"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "../_components/field-error";
import { server } from "@/app/_api/api";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .regex(/\.(com|mn)$/, "Email must end with .com or .mn"),

  password: z.string().trim().min(6, "Incorrect password. Please try again."),
});

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const clearMessages = () => {
    setServerError("");
  };

  const onSubmit = async (data) => {
    clearMessages();

    try {
      const response = await server.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      if (!response.data?.user?.email) {
        setServerError("Unexpected server response");
        return;
      }

      router.push("/admin/food-menu");
    } catch (error) {
      const message = error.response?.data?.message;

      if (typeof message === "string") {
        setServerError(message);
      } else if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
        setServerError("Request timed out. Please try again.");
      } else if (error.response) {
        setServerError("Login failed. Please try again.");
      } else {
        setServerError(
          "Cannot connect to the server. Check that the back-end is running.",
        );
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mb-4"
              aria-label="Go back"
              onClick={() => router.back()}
            >
              <ChevronLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">Log in</h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Log in to enjoy your favorite meals.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit, clearMessages)}
            onChange={clearMessages}
            className="mt-8 space-y-4"
            noValidate
            aria-busy={isSubmitting}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="w-full h-9"
                placeholder="Enter your email address"
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full h-9 pr-10"
                  placeholder="Password"
                  {...register("password")}
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
              <FieldError message={errors.password?.message} />
            </div>

            {serverError && (
              <p
                role="alert"
                className="text-sm text-[#EF4444] dark:text-red-400"
              >
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              className="h-9 w-full hover:bg-[#494949] transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-[#2563EB] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden w-1/2 p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image
            src="/Biker.png"
            alt="Login"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
