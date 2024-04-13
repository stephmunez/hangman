"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./category.module.css";

const Category = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch categories from data.json
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        setCategories(Object.keys(data.categories));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="relative flex h-full w-full flex-col gap-[6.25rem] px-6 pb-20 pt-8">
      <div className="z-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF]"
        >
          <Image
            src="/images/icon-back.svg"
            width={18}
            height={16}
            alt="back icon"
          />
        </Link>
        <h1
          className={`${styles.h1} text-[3rem] leading-[120%]  tracking-[2.4px]`}
        >
          Pick a Category
        </h1>
      </div>
      <ul className="z-10 flex w-full flex-col gap-4 ">
        {categories.map((item) => (
          <li key={item}>
            <Link
              href="/game"
              className="flex items-center justify-center rounded-[20px] bg-blue py-6 text-2xl uppercase leading-[120%] tracking-[1.2px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)]"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#1A043A] from-0% via-[#151278] via-75% to-[#2B1677] to-100% opacity-85"></div>
    </main>
  );
};

export default Category;
