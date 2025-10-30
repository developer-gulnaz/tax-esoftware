"use client";
import { useEffect, useState } from "react";

export default function useAdmin() {
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const storedAdmin = sessionStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  return admin;
}
