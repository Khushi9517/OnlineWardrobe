"use client";

import { useEffect, useState } from "react";

import WardrobeCard from "@/components/WardrobeCard";

import { getToken } from "@/lib/auth";
import { getWardrobeItems } from "@/services/wardrobe.service";

import { WardrobeItem } from "@/types/wardrobe.types";
import Link from "next/link";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { removeToken } from "@/lib/auth";
import {
  deleteWardrobeItem,
} from "@/services/wardrobe.service";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] =
  useState("");
  const [selectedCategory, setSelectedCategory] =
  useState("All");
  const [sortBy, setSortBy] =
  useState("newest");
  const handleLogout = () => {
  removeToken();

  router.push("/login");
};

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
  const handleDelete = async (
  itemId: string
) => {
  try {
    const token = getToken();

    if (!token) return;

  const confirmed =
  window.confirm(
    "Are you sure you want to delete this item?"
  );

if (!confirmed) {
  return;
}

    await deleteWardrobeItem(
      token,
      itemId
    );
    toast.success("Item deleted");

    setItems((prev) =>
      prev.filter(
        (item) =>
          item._id !== itemId
      )
    );
  } catch (error) {
    console.error(error);

    toast.error("Failed to delete item");
  }
};

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

  const filteredItems = items
  .filter((item) => {
    const matchesSearch =
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesCategory =
      selectedCategory ===
        "All" ||
      item.category ===
        selectedCategory;

    return (
      matchesSearch &&
      matchesCategory
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(
            a.createdAt
          ).getTime() -
          new Date(
            b.createdAt
          ).getTime()
        );

      case "az":
        return a.name.localeCompare(
          b.name
        );

      case "za":
        return b.name.localeCompare(
          a.name
        );

      default:
        return (
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
        );
    }
  });

  const totalItems = items.length;

const topwearCount =
  items.filter(
    (item) =>
      item.category ===
      "Topwear"
  ).length;

const bottomwearCount =
  items.filter(
    (item) =>
      item.category ===
      "Bottomwear"
  ).length;

const footwearCount =
  items.filter(
    (item) =>
      item.category ===
      "Footwear"
  ).length;

const accessoriesCount =
  items.filter(
    (item) =>
      item.category ===
      "Accessories"
  ).length;

  return (
    <AuthGuard>
    <div className="p-8">
    <div className="mb-6 flex items-center justify-between">
  <h1 className="text-3xl font-bold">
    My Wardrobe
  </h1>

  <div className="flex gap-2">
    <Link
      href="/add-item"
      className="rounded bg-black px-4 py-2 text-white"
    >
      + Add Item
    </Link>
  </div>
</div>

<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">
      Total
    </p>

    <p className="text-2xl font-bold">
      {totalItems}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">
      Topwear
    </p>

    <p className="text-2xl font-bold">
      {topwearCount}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">
      Bottomwear
    </p>

    <p className="text-2xl font-bold">
      {bottomwearCount}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">
      Footwear
    </p>

    <p className="text-2xl font-bold">
      {footwearCount}
    </p>
  </div>

  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">
      Accessories
    </p>

    <p className="text-2xl font-bold">
      {accessoriesCount}
    </p>
  </div>
</div>


<input
  type="text"
  placeholder="Search clothes..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  className="mb-6 w-full rounded-lg border p-3"
/>

<div className="mb-6 flex gap-2 flex-wrap">
  {[
    "All",
    "Topwear",
    "Bottomwear",
    "Footwear",
    "Accessories",
  ].map((category) => (
    <button
      key={category}
      onClick={() =>
        setSelectedCategory(
          category
        )
      }
      className={`rounded-full px-4 py-2 border ${
        selectedCategory ===
        category
          ? "bg-black text-white"
          : ""
      }`}
    >
      {category}
    </button>
  ))}
</div>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  className="mb-6 rounded-lg border p-3"
>
  <option value="newest">
    Newest First
  </option>

  <option value="oldest">
    Oldest First
  </option>

  <option value="az">
    Name A-Z
  </option>

  <option value="za">
    Name Z-A
  </option>
</select>


      {filteredItems.length === 0 ? (
  <div className="py-16 text-center">
    <h2 className="text-2xl font-semibold">
      No items found
    </h2>

    <p className="mt-2 text-gray-500">
      Try another search or filter.
    </p>
  </div>
) : (
  <div
    className="
      grid
      grid-cols-1
      gap-6
      sm:grid-cols-2
      lg:grid-cols-3
    "
  >
    {filteredItems.map((item) => (
      <WardrobeCard
        key={item._id}
        item={item}
        onDelete={handleDelete}
      />
    ))}
  </div>
)}
    </div>
    </AuthGuard>
  );
}