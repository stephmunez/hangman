"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <p className="text-2xl">{message}</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 mt-4 rounded px-4 py-2 font-bold text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>
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
  const [modalMessage, setModalMessage] = useState("");
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
            className={`${guessedLetters.includes(letter) ? "opacity-100" : "opacity-25"} flex h-[4.125rem] w-10 items-center justify-center rounded-[12px] bg-blue text-[2.5rem] leading-[120%] tracking-[2px] text-white shadow-[inset_0_-2px_0px_3px_rgba(20,14,102,1),_inset_0_1px_0px_6px_rgba(60,116,255,1)] transition-opacity duration-300`}
          >
            {guessedLetters.includes(letter) ? letter : ""}
          </span>,
        );
        currentIndex++;
      }
      display.push(
        <div
          key={currentIndex}
          className="flex w-max max-w-full flex-wrap items-center justify-center gap-2"
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
  const isWinner = () => {
    const wordWithoutSpaces = word.replace(/\s+/g, "");
    return wordWithoutSpaces
      .split("")
      .every((letter) => guessedLetters.includes(letter));
  };

  // Check if the player has lost
  const isLoser = () => {
    return incorrectGuesses >= 6;
  };

  const closeModal = () => {
    setShowModal(false);
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
        setModalMessage("Congratulations! You win!");
      } else if (isLoser()) {
        setShowModal(true);
        setModalMessage(`You lose! The word was: ${word}`);
      }
    }
  }, [guessedLetters, incorrectGuesses]);

  return (
    <main className="relative flex h-auto min-h-full w-full flex-col gap-20 px-6 pb-40 pt-12">
      <div className="z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF]">
            <Image
              src="/images/icon-menu.svg"
              width={16}
              height={14}
              alt="menu icon"
            />
          </button>
          <h1 className="text-[2.5rem] leading-[120%] tracking-[2px] text-white">
            {category}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-4 w-14 rounded-full bg-white p-1">
            <div
              className="h-2 rounded-full bg-dark-navy transition-[width] duration-300"
              style={{ width: `${(1 - incorrectGuesses / 6) * 100}%` }}
            ></div>
          </div>
          <Image
            src="/images/icon-heart.svg"
            width={26}
            height={24}
            alt="heart icon"
          />
        </div>
      </div>
      <div className="z-10 flex w-full flex-col gap-[7.5rem]">
        <div className="flex w-full flex-col items-center gap-3">
          {displayWord()}
        </div>
        <div className="z-10 flex w-max max-w-full flex-wrap items-start gap-x-2 gap-y-6">
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
              className={`${guessedLetters.includes(letter) ? "opacity-25" : "opacity-100"} flex h-14 w-[1.813rem] items-center justify-center rounded-[8px] bg-white text-2xl leading-[150%] tracking-[-0.48px] text-dark-navy transition-opacity duration-300`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#1A043A] from-0% via-[#151278] via-75% to-[#2B1677] to-100% opacity-85"></div>

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </main>
  );
};

export default Game;
