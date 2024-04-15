"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./game.module.css";

const Game = () => {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("");
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

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

  // Function to handle letter guesses
  const handleGuess = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (!word.includes(letter)) {
        setIncorrectGuesses(incorrectGuesses + 1);
      }
    }
  };

  // Function to display word placeholders
  const displayWord = () => {
    return word
      .split("")
      .map((letter, i) => {
        if (letter === " ") {
          return <br key={i} />;
        }
        return guessedLetters.includes(letter) ? letter : "_";
      })
      .map((element, i) => <span key={i}>{element} </span>);
  };

  // Check if the player has won
  const isWinner = () => {
    return word.split("").every((letter) => guessedLetters.includes(letter));
  };

  // Check if the player has lost
  const isLoser = () => {
    return incorrectGuesses >= 6;
  };

  return (
    <main className="flex h-full w-full flex-col gap-20 px-6 pb-40 pt-12">
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
          <h1
            className={`${styles.h1} text-[2.5rem] leading-[120%]  tracking-[2px]`}
          >
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

      <h1>Hangman Game</h1>
      <p>Category: {category}</p>
      <p>Word: {displayWord()}</p>
      <p>Incorrect Guesses: {incorrectGuesses}</p>
      {/* Hangman visual component can be added here */}
      {!isWinner() && !isLoser() && (
        <div>
          {/* Display alphabet buttons for guessing */}
          {Array.from({ length: 26 }, (_, index) =>
            String.fromCharCode(65 + index),
          ).map((letter) => (
            <button
              key={letter}
              onClick={() => handleGuess(letter.toUpperCase())}
            >
              {letter}
            </button>
          ))}
        </div>
      )}
      {isWinner() && <p>You win!</p>}
      {isLoser() && <p>You lose! The word was: {word}</p>}
    </main>
  );
};

export default Game;
