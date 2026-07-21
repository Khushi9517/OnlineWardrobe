"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { removeToken } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <h1 className="text-xl font-bold">
          Online Wardrobe
        </h1>

        <div className="flex gap-4">
          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/add-item">
            Add Item
          </Link>

          <button
            onClick={handleLogout}
            className="text-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}