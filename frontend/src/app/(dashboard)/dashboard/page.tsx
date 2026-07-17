"use client";

import { useEffect, useState } from "react";

import WardrobeCard from "@/components/WardrobeCard";

import { getToken } from "@/lib/auth";
import { getWardrobeItems } from "@/services/wardrobe.service";

import { WardrobeItem } from "@/types/wardrobe.types";
import Link from "next/link";

export default function DashboardPage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = getToken();

        if (!token) {
          setLoading(false);
          return;
        }

        const data = await getWardrobeItems(token);

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

  if (!items.length) {
    return (
      <div className="p-8">
        <h1 className="mb-4 text-3xl font-bold">
          My Wardrobe
        </h1>

        <p>No clothing items yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
  <h1 className="text-3xl font-bold">
    My Wardrobe
  </h1>

  <Link
    href="/add-item"
    className="rounded bg-black px-4 py-2 text-white"
  >
    + Add Item
  </Link>
</div>

      <div
        className="
          grid
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {items.map((item) => (
          <WardrobeCard
            key={item._id}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}