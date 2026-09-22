"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { server } from "@/app/_api/api";

import StepOne from "./_features/step-one";
import StepTwo from "./_features/step-two";

const signupSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Please enter a valid email")
      .regex(/\.(com|mn)$/, "Email must end with .com or .mn"),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .regex(/^\d{8}$/, "Phone number must be exactly 8 digits"),
    address: z.string().trim().min(1, "Address is required"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character (@, $, !, %, etc.)",
      ),

    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const nextStep = async () => {
    const isValid = await trigger(["name", "email"]);

    if (!isValid) return;

    setServerError("");
    setStep(2);
  };

  const onSubmit = async (data) => {
    setServerError("");

    const { confirmPassword, ...signupData } = data;

    try {
      await server.post("/auth/sign-up", signupData);

      router.push("/login");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <>
      {step === 1 && (
        <StepOne register={register} errors={errors} onNext={nextStep} />
      )}

      {step === 2 && (
        <StepTwo
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          serverError={serverError}
          onBack={() => {
            setServerError("");
            setStep(1);
          }}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
