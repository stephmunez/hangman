"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import styles from "./game.module.css";

interface ModalProps {
  message: string;
  onContinue: () => void;
  showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ message, onContinue, showModal }) => {
  return (
    <div
      className={`${showModal ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 z-50 flex items-center justify-center px-6 py-40 transition-opacity duration-300 md:px-[5.5rem] md:py-[15.313rem]`}
    >
      <div className="relative z-10 flex w-full flex-col items-center gap-8 rounded-[48px] bg-gradient-to-b from-[#344ABA] to-[#001479]/[0.83] px-6 pb-[5.5rem] pt-[6.5rem] shadow-[inset_0_-8px_0px_4px_rgba(20,14,102,1),_inset_0_6px_0px_8px_rgba(38,99,255,1)] md:px-36 md:pb-[4.5rem] md:pt-[7.5rem]">
        <span
          className={`${styles.modalMessage} absolute -top-14 text-[6.25rem] leading-[120%] tracking-[-4.7px] md:-top-[5.5rem] md:text-[8.375rem] md:tracking-[-6.7px]`}
        >
          {message}
        </span>

        <button
          className="w-full rounded-[40px] bg-blue px-16 py-3 text-center text-[2rem] uppercase leading-[120%] tracking-[1.6px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)]"
          onClick={onContinue}
        >
          Continue
        </button>
        <Link
          href="/category"
          className="w-full rounded-[40px] bg-blue px-16 py-3 text-center text-[2rem] uppercase leading-[120%] tracking-[1.6px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)]"
        >
          New Category
        </Link>
        <Link
          href="/"
          className="w-full rounded-[40px] bg-gradient-to-b from-[#FE71FE] to-[#7199FF] px-16 py-3 text-center text-[2rem] uppercase leading-[120%] tracking-[1.6px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(198,66,251,1)]"
        >
          Quit Game
        </Link>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#1A043A] from-0% via-[#151278] via-75% to-[#2B1677] to-100% opacity-75"></div>
    </div>
  );
};

const Game = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("Paused");
  const [isGameOver, setIsGameOver] = useState(false);
  const letterButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Function to display word placeholders
  const displayWord = () => {
    let display = [];
    let wordArray = word.split("");
    let currentIndex = 0;
    while (currentIndex < wordArray.length) {
      let line = [];
      while (
        currentIndex < wordArray.length &&
        wordArray[currentIndex] !== " "
      ) {
        const letter = wordArray[currentIndex];
        line.push(
          <span
            key={currentIndex}
            className={`${guessedLetters.includes(letter) ? "opacity-100" : "opacity-25"} flex h-[4.125rem] w-10 items-center justify-center rounded-[12px] bg-blue text-[2.5rem] leading-[120%] tracking-[2px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)] transition-opacity duration-300 md:h-[7rem] md:w-[5.5rem] md:rounded-[32px] md:text-[4rem] md:tracking-[3.2px] xl:h-32 xl:w-28 xl:rounded-[40px] xl:text-[5.5rem] xl:tracking-normal`}
          >
            {guessedLetters.includes(letter) ? letter : ""}
          </span>,
        );
        currentIndex++;
      }
      display.push(
        <div
          key={currentIndex}
          className="flex w-max max-w-full flex-wrap items-center justify-center gap-2 md:gap-3 xl:gap-4"
        >
          {line}
        </div>,
      );
      while (
        currentIndex < wordArray.length &&
        wordArray[currentIndex] === " "
      ) {
        currentIndex++;
      }
    }
    return display;
  };

  // Function to handle letter guesses
  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }
    }
  };

  // Check if the player has won
  const isWinner = useCallback(() => {
    const wordWithoutSpaces = word.replace(/\s+/g, "");
    return wordWithoutSpaces
      .split("")
      .every((letter) => guessedLetters.includes(letter));
  }, [word, guessedLetters]);

  // Check if the player has lost
  const isLoser = useCallback(() => {
    return incorrectGuesses >= 8;
  }, [incorrectGuesses]);

  const openModal = () => {
    setShowModal(true);
  };

  const handleContinue = async () => {
    if (isGameOver) {
      try {
        // Fetch new word
        const res = await fetch("/data.json");
        const data = await res.json();
        const chosenCategory = searchParams.get("category") || "";
        if (chosenCategory) {
          const words = data.categories[chosenCategory];
          const randomIndex = Math.floor(Math.random() * words.length);
          const randomWord = words[randomIndex].name.toUpperCase();
          setWord(randomWord);
          setIsGameOver(false);
          setGuessedLetters([]);
          setIncorrectGuesses(0);
          setShowModal(false); // Close modal
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      setShowModal(false); // Close modal
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/data.json");
        const data = await res.json();
        const chosenCategory = searchParams.get("category") || "";
        setCategory(chosenCategory);
        if (chosenCategory) {
          const words = data.categories[chosenCategory];
          const randomIndex = Math.floor(Math.random() * words.length);
          const randomWord = words[randomIndex].name.toUpperCase();
          setWord(randomWord);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key) && !guessedLetters.includes(key)) {
        const button: HTMLButtonElement | null =
          letterButtonsRef.current[key.charCodeAt(0) - 65];
        if (button) {
          button.click();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [guessedLetters]);

  // useEffect hook to display the modal when winning or losing
  useEffect(() => {
    if (guessedLetters.length > 0) {
      // Check if the user has made any guesses
      if (isWinner()) {
        setShowModal(true);
        setIsGameOver(true);
        setModalMessage("You Win");
      } else if (isLoser()) {
        setShowModal(true);
        setIsGameOver(true);
        setModalMessage(`You Lose`);
      }
    }
  }, [guessedLetters, incorrectGuesses, isLoser, isWinner]);

  return (
    <main className="relative flex h-auto min-h-full w-full flex-col gap-20 px-6 pb-40 pt-12 md:px-8 md:pb-[7.125rem] md:pt-[3.75rem] xl:gap-[5.5rem] xl:px-[7rem] xl:pb-[4.875rem] xl:pt-[3.75rem]">
      <div className="z-10 flex items-center justify-between md:px-2 xl:px-0">
        <div className="flex items-center gap-4 md:gap-8 xl:gap-14">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] md:h-16 md:w-16 xl:h-[5.875rem] xl:w-[5.875rem]"
            onClick={openModal}
          >
            <Image
              src="/images/icon-menu.svg"
              width={16}
              height={14}
              alt="menu icon"
              className="md:h-[22px] md:w-[26px] xl:h-[32px] xl:w-[38px]"
            />
          </button>
          <h1 className="text-[2.5rem] uppercase leading-[120%] tracking-[2px] text-white md:text-[3rem] md:tracking-[2.4px] xl:text-[5.5rem] xl:capitalize xl:tracking-normal">
            {category}
          </h1>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="h-4 w-14 rounded-full bg-white p-1 md:h-[1.938rem] md:w-40 md:px-[0.688rem] md:py-[0.563rem] xl:w-60">
            <div
              className="h-2 rounded-full bg-dark-navy transition-[width] duration-300 md:h-[0.813rem]"
              style={{ width: `${(1 - incorrectGuesses / 8) * 100}%` }}
            ></div>
          </div>
          <Image
            src="/images/icon-heart.svg"
            width={26}
            height={24}
            alt="heart icon"
            className="md:h-[48px] md:w-[54px]"
          />
        </div>
      </div>
      <div className="z-10 flex w-full flex-col gap-[7.5rem] md:gap-[8.5rem] xl:gap-[7.5rem]">
        <div className="flex w-full flex-col items-center gap-3 md:gap-4 md:px-2 xl:px-0">
          {displayWord()}
        </div>

        <div className="z-10 flex w-max max-w-full flex-wrap items-start gap-x-2 gap-y-6 md:gap-x-4 xl:gap-6 xl:pl-7">
          {Array.from({ length: 26 }, (_, index) =>
            String.fromCharCode(65 + index),
          ).map((letter, index) => (
            <button
              key={letter}
              ref={(ref: HTMLButtonElement | null) => {
                if (ref) {
                  letterButtonsRef.current[index] = ref;
                } else {
                  return undefined;
                }
              }}
              onClick={() => handleGuess(letter.toUpperCase())}
              className={`${guessedLetters.includes(letter) ? "opacity-25" : "opacity-100"} flex h-14 w-[1.813rem] items-center justify-center rounded-[8px] bg-white text-2xl leading-[150%] tracking-[-0.48px] text-dark-navy transition-opacity duration-300 md:h-[5.25rem] md:w-16 md:rounded-[24px] md:text-[3rem] md:tracking-[2.4px] xl:h-[5.25rem] xl:w-[6.813rem]`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#1A043A] from-0% via-[#151278] via-75% to-[#2B1677] to-100% opacity-85"></div>

      <Modal
        message={modalMessage}
        onContinue={handleContinue}
        showModal={showModal}
      />
    </main>
  );
};

const GamePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Game />
    </Suspense>
  );
};

export default GamePage;
