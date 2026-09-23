"use client";

import { useState } from "react";
import { server } from "@/app/(auth)/_api/api";
import { toast } from "sonner";
import DishCard from "../../_components/dishcard";

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
      await server.post("/food-category/create", {
        categoryName: categoryName.trim(),
      });

      toast.success(`Category "${categoryName}" created successfully!`);

      setCategoryName("");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Create category error:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to create category. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <DishCard />
    </div>
  );
}
