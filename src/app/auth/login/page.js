"use client";

import {LoginForm} from "./Features/login-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex items-center justify-center">
      <LoginForm />
    </div>
    
  );
};
