"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getToken } from "@/lib/auth";

import {
  createWardrobeItem,
  uploadImage,
} from "@/services/wardrobe.service";
import AuthGuard from "@/components/AuthGuard";
import toast from "react-hot-toast";

export default function AddItemPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("");
  const [color, setColor] =
    useState("");
  const [brand, setBrand] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = getToken();

      if (!token) {
        alert("Please login first");
        return;
      }

      let imageUrl = "";
      let imagePublicId = "";

      if (file) {
        const uploadResult =
          await uploadImage(
            token,
            file
          );

        imageUrl =
          uploadResult.imageUrl;

        imagePublicId =
          uploadResult.imagePublicId;
      }

      await createWardrobeItem(
        token,
        {
          name,
          category,
          color,
          brand,
          imageUrl,
          imagePublicId,
        }
      );

      toast.success("Item created successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Failed to create item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
    <div className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Add Item
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) =>
            setColor(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(
              e.target.value
            )
          }
          className="w-full rounded border p-3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFile(
              e.target.files?.[0] ||
                null
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading
            ? "Creating..."
            : "Create Item"}
        </button>
      </form>
    </div>
    </AuthGuard>
  );
}