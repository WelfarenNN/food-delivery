"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function StepTwo({
  register,
  errors,
  handleSubmit,
  onBack,
  onSubmit,
  serverError,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="mb-4"
            onClick={onBack}
          >
            <ChevronLeft size={18} />
          </Button>

          <h1 className="text-2xl font-bold">Complete your profile</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Enter your contact details and create a strong password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                {...register("phone")}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter your delivery address"
                {...register("address")}
                className={errors.address ? "border-destructive" : ""}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password")}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onCheckedChange={(checked) => setShowPassword(checked === true)}
                className="rounded-sm border border-input"
              />
              <Label htmlFor="show-password" className="font-normal">
                Show password
              </Label>
            </div>

            {serverError && (
              <p
                role="alert"
                className="text-sm text-center text-destructive font-medium pt-1"
              >
                {serverError}
              </p>
            )}

            <Button type="submit" className="h-9 w-full">
              Lets go
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#2563EB] hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden w-1/2 p-4 lg:block">
        <div className="relative h-full w-full overflow-hidden rounded-xl">
          <Image src="/Biker.png" alt="Sign up" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
