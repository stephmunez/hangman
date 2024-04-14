"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <main>
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
