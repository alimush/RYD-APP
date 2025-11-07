"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // أول ما تفتح الصفحة، يحولك إلى صفحة تسجيل الدخول
    router.push("/login");
  }, [router]);

}