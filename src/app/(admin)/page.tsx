"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    let token = "";

    if (authData) {
      try {
        const parsedAuthData = JSON.parse(authData);
        token = parsedAuthData?.token ?? "";
      } catch {
        token = "";
      }
    }

    router.replace(token ? "/users" : "/signin");
  }, [router]);

  return null;
}
