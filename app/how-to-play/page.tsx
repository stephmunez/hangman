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
    <main className="relative flex h-full w-full flex-col gap-20 px-6 pb-[3.75rem] pt-8">
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
          How To Play
        </h1>
      </div>
      <section className="z-10 flex w-full flex-col gap-5">
        {instructions.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-[20px] bg-white p-8"
          >
            <div className="flex gap-4">
              <span className="text-2xl leading-[120%] tracking-[1.2px] text-blue">
                0{i + 1}
              </span>
              <h2 className="text-2xl uppercase leading-[120%] tracking-[1.2px] text-dark-navy">
                {item.title}
              </h2>
            </div>
            <p className="text-base leading-[120%] tracking-[0.8px] text-[#887DC0]">
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