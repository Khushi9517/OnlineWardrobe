"use client";

import { useEffect, useState } from "react";

import { getToken } from "@/lib/auth";
import { getWardrobeItems } from "@/services/wardrobe.service";

import { WardrobeItem } from "@/types/wardrobe.types";

export default function DashboardPage() {
  const [items, setItems] = useState<
    WardrobeItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = getToken();


if (!token) return;

const data =
  await getWardrobeItems(token);
  

setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Wardrobe
      </h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-4"
          >
            <h2 className="font-semibold">
              {item.name}
            </h2>

            <p>
              {item.category}
            </p>

            <p>
              {item.color}
            </p>

            <p>
              {item.brand}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}