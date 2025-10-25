"use client";
import { useState, useEffect } from "react";

export default function useAdmin() {
  const [admin, setAdmin] = useState<{ username: string; gramPanchayat: string } | null>(null);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return admin;
}
