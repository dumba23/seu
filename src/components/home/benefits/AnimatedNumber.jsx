import React, { useState, useEffect } from "react";
import "./Benefits.css";

function AnimatedNumber({ text }) {
  const characters = text.split("");

  const [currentCharacters, setCurrentCharacters] = useState(
    characters.map(() => Math.floor(Math.random() * 9) + 1)
  );

  useEffect(() => {
    let timeout;

    const animateCharacter = (index) => {
      if (index >= characters.length) {
        setTimeout(() => {
          setCurrentCharacters(characters);
        }, 50);
        return;
      }

      timeout = setTimeout(() => {
        setCurrentCharacters((prevChars) => {
          const newChars = [...prevChars];
          newChars[index] = characters[index];
          return newChars;
        });
        animateCharacter(index + 1);
      }, 50 * index);
    };

    animateCharacter(0);

    return () => clearTimeout(timeout);
  }, []);

  const styledCharacters = currentCharacters.map((char, index) => {
    const animationContent = Array.from({ length: 10 }, (_, i) =>
      i === 0 ? char : i
    );

    return (
      <div key={index} className="styled-char">
        <div
          className="slot-machine"
          style={{
            animationDelay: `${index * 200}ms`,
            maxWidth: `${char == "." && "6px"}`,
          }}
        >
          {animationContent.join("\n")}
        </div>
      </div>
    );
  });
  return <div className="styled-string">{styledCharacters}</div>;
}

export default AnimatedNumber;
