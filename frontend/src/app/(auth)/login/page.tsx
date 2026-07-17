"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginUser } from "@/services/auth.service";
import { saveToken } from "@/lib/auth";

export default function LoginPage() {
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
        await loginUser({
          email,
          password,
        });

      saveToken(response.token);

      router.push("/dashboard");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
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
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}