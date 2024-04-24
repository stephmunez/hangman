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
    <main className="relative flex min-h-full w-full flex-col gap-[6.25rem] px-6 pb-20 pt-8 md:px-10 md:pb-[7rem] md:pt-[3.75rem] xl:gap-[9.688rem] xl:px-[7rem] xl:pb-[12.25rem] xl:pt-20">
      <div className="relative z-10 flex items-center justify-between md:justify-center">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] md:absolute md:left-0 md:h-16 md:w-16 xl:h-[5.875rem] xl:w-[5.875rem]"
        >
          <Image
            src="/images/icon-back.svg"
            width={18}
            height={16}
            alt="back icon"
            className="md:h-[26px] md:w-[28px] xl:h-[38px] xl:w-[41px]"
          />
        </Link>
        <h1
          className={`${styles.h1} text-[3rem] leading-[120%] tracking-[2.4px] md:text-[6.5rem]  md:tracking-[-5.2px] xl:text-[8.5rem]`}
        >
          Pick a Category
        </h1>
      </div>
      <ul className="z-10 flex w-full flex-col gap-4 md:grid md:grid-cols-2 md:gap-8 xl:grid-cols-3 xl:gap-x-8 xl:gap-y-[3.125rem]">
        {categories.map((item) => (
          <li key={item}>
            <Link
              href={{
                pathname: "/game",
                query: { category: item },
              }}
              className="flex items-center justify-center rounded-[20px] bg-blue py-6 text-2xl uppercase leading-[120%] tracking-[1.2px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)] md:rounded-[40px] md:py-16 md:text-[3rem] md:tracking-[2.4px]"
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
