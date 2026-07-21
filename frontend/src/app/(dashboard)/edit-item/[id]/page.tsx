"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import AuthGuard from "@/components/AuthGuard";

import { getToken } from "@/lib/auth";

import {
  getWardrobeItem,
  updateWardrobeItem,
} from "@/services/wardrobe.service";
import toast from "react-hot-toast";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();

  const itemId = params.id as string;

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("");
  const [color, setColor] =
    useState("");
  const [brand, setBrand] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = getToken();

        if (!token) return;

        const item =
          await getWardrobeItem(
            token,
            itemId
          );

        setName(item.name);
        setCategory(item.category);
        setColor(item.color);
        setBrand(item.brand);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token = getToken();

      if (!token) return;

      setSaving(true);

      await updateWardrobeItem(
        token,
        itemId,
        {
          name,
          category,
          color,
          brand,
        }
      );

      toast.success("Item updated successfully");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error("Failed to update item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="mx-auto max-w-xl p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Edit Item
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
          />

          <input
            type="text"
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
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-black p-3 text-white"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}