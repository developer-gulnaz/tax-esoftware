"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in when app first loads
    router.replace("/sign-in");
  }, [router]);

  return null; // nothing to show, just redirect
}
