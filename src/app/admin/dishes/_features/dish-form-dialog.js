"use client";

import { useState } from "react";
import { server } from "@/app/_api/api";
import { X } from "lucide-react";
import { toast } from "sonner"; // 1. ЗӨВХӨН ЭНД ТОАСТ ИМПОРТЛОНО

export default function AddCategoryDialog({ isOpen, onClose, onSuccess }) {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    setLoading(true);
    setErrorMessage("");

    try {
      await server.post("/food-category/create", { categoryName: categoryName.trim() });
      
      // 2. ЗАСАХ: Хуучин alert-ийг устгаж, зөвхөн гоёмсог тоаст харуулна
      toast.success(`Category "${categoryName}" created successfully!`);
      
      setCategoryName("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Create category error:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to create category. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // ... ТАНЫ ХУУЧИН RETURN ДОТОРХ UI ДИЗАЙН ХЭВЭЭРЭЭ ҮЛДЭНЭ ...
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
       {/* Модал доторх код */}
    </div>
  );
}
