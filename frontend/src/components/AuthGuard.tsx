"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getToken } from "@/lib/auth";

interface Props {
  children: React.ReactNode;
}

export default function AuthGuard({
  children,
}: Props) {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const token = getToken();

  if (!token) {
    return null;
  }

  return <>{children}</>;
}