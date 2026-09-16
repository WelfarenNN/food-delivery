"use client";


import Link from "next/link";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function StepOne({ register, errors, onNext }) {
  const router = useRouter();

  

  return (
    <div className="flex min-h-screen">
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded size-4"
            onClick={() => router.back()}
          >
            <ChevronLeft size={18} />
          </Button>


          <h1 className="text-2xl font-bold">Create an account</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to explore your favorite dishes.
          </p>

          <div className="mt-8 space-y-4">
           
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />

              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

          
        
            <Button type="button" className="h-9 w-full" onClick={onNext}>
              Lets Go!
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#2563EB]">
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