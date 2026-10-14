"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import baseUrl from "@/Services/baseUrl";

export default function NavLinksPage() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/categories`);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setCategoryData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <>
      {categoryData.map((cat) => (
        <li key={cat._id}>
          <Link href={`/category/${cat.slug}`}>
            {cat.icon} {cat.name}
          </Link>
        </li>
      ))}
    </>
  );
}