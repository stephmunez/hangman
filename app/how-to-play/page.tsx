import Image from "next/image";
import Link from "next/link";
import styles from "./how-to-play.module.css";

const instructions = [
  {
    title: "Choose a category",
    description:
      "First, choose a word category, like animals or movies. The computer then randomly selects a secret word from that topic and shows you blanks for each letter of the word.",
  },
  {
    title: "Guess letters",
    description:
      "Take turns guessing letters. The computer fills in the relevant blank spaces if your guess is correct. If it’s wrong, you lose some health, which empties after eight incorrect guesses.",
  },
  {
    title: "Win or lose",
    description:
      "You win by guessing all the letters in the word before your health runs out. If the health bar empties before you guess the word, you lose.",
  },
];

const HowToPlay = () => {
  return (
    <main className="relative flex min-h-full w-full flex-col gap-20 px-6 pb-[3.75rem] pt-8 md:gap-[6.25rem] md:px-10 md:pb-[6.125rem] md:pt-[3.75rem] xl:gap-16 xl:px-28 xl:pb-[10.438rem] xl:pt-20">
      <div className="relative z-10 flex items-center justify-between md:justify-center">
        <Link
          href="/"
          className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] shadow-[inset_0_-5px_0px_-1px_rgba(157,45,245,0.25)] md:absolute md:left-0 md:h-16 md:w-16 md:shadow-[inset_0_-6px_0px_7px_rgba(157,45,245,0.25)] xl:h-[5.875rem] xl:w-[5.875rem]"
        >
          <Image
            src="/images/icon-back.svg"
            width={18}
            height={16}
            alt="back icon"
            className="z-10 md:h-[26px] md:w-[28px] xl:h-[38px] xl:w-[41px]"
          />
          <span className="pointer-events-none absolute inset-0 h-full w-full rounded-full bg-white opacity-0 shadow-[inset_0_-5px_0px_-1px_rgba(157,45,245,0.25)] transition-opacity duration-300 group-hover:opacity-25 group-active:opacity-25 md:shadow-[inset_0_-6px_0px_7px_rgba(157,45,245,0.25)]"></span>
        </Link>
        <h1
          className={`${styles.h1} text-[3rem] leading-[120%] tracking-[2.4px] md:text-[6.5rem]  md:tracking-[-5.2px] xl:text-[8.5rem]`}
        >
          How To Play
        </h1>
      </div>
      <section className=" z-10 flex w-full flex-col gap-5 md:gap-8 xl:flex-row">
        {instructions.map((item, i) => (
          <div
            key={i}
            className="relative flex flex-col gap-4 rounded-[20px] bg-white p-8 md:justify-center md:rounded-[40px] md:pl-[140px] xl:gap-10 xl:px-12 xl:py-[3.75rem]"
          >
            <div className="flex gap-4 xl:flex-col xl:items-center xl:gap-10">
              <span className="text-2xl leading-[120%] tracking-[1.2px] text-blue md:absolute md:left-8 md:top-[calc(50%-((88px*1.2)/2))] md:text-[5.5rem]  md:tracking-normal xl:static">
                0{i + 1}
              </span>
              <h2 className="text-2xl uppercase leading-[120%] tracking-[1.2px] text-dark-navy md:text-[2.5rem] md:tracking-[2px] xl:text-center xl:text-[3rem] xl:tracking-[2.4px]">
                {item.title}
              </h2>
            </div>
            <p className="text-base leading-[120%] tracking-[0.8px] text-[#887DC0] md:text-[1.25rem] md:tracking-[1px] xl:text-center xl:text-[1.625rem] xl:tracking-[1.3px]">
              {item.description}
            </p>
          </div>
        ))}
      </section>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#1A043A] from-0% via-[#151278] via-75% to-[#2B1677] to-100% opacity-85"></div>
    </main>
  );
};

export default HowToPlay;
