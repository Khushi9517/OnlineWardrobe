"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/auth.service";
import { saveToken } from "@/lib/auth";
import { toast } from "react-hot-toast/headless";

export default function RegisterPage() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");
  const [loading, setLoading] =
  useState(false);

const router = useRouter();  

const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response =
      await registerUser({
        name,
        email,
        password,
      });

    saveToken(response.token);

    toast.success("Registration successful");
    router.push("/dashboard");
  } catch (error: any) {
  console.error(error);

  toast.error("Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          Create Account
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
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            {loading
  ? "Creating Account..."
  : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}