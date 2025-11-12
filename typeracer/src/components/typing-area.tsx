"use client";

import { useGameStore } from "@/utils/store";
import { Card, Flex, TextArea, Text } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

interface TypingAreaProps {
  setTotalKeyStrokes: React.Dispatch<React.SetStateAction<number>>;
  setCorrectKeyStrokes: React.Dispatch<React.SetStateAction<number>>;
}

export function TypingArea({
  setTotalKeyStrokes,
  setCorrectKeyStrokes,
}: TypingAreaProps) {
  const { currentInput, currentRound, setCurrentInput } = useGameStore();

  const previousInputRef = useRef("");

  useEffect(() => {
    setTotalKeyStrokes(0);
    setCorrectKeyStrokes(0);
    previousInputRef.current = "";
  }, [currentRound, setCorrectKeyStrokes, setTotalKeyStrokes]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value;
    const previousValue = previousInputRef.current;

    console.log("INPUT CHANGE", { currentValue, previousValue });

    if (currentValue.length > previousValue.length) {
      const index = currentValue.length - 1;
      const typedChar = currentValue[index];
      const expectedChar = currentRound?.sentence[index];
      console.log("TYPED CHAR", { typedChar, expectedChar });

      if (typedChar === expectedChar) {
        setCorrectKeyStrokes((prev) => prev + 1);
      }
    }

    setTotalKeyStrokes((prev) => prev + 1);
    setCurrentInput(currentValue);
    previousInputRef.current = currentValue;
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const handleCut = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Text
          htmlFor="typing-input"
          size="4"
          weight="bold"
          className="text-gray-900"
        >
          Your Input
        </Text>
        <TextArea
          id="typing-input"
          size="3"
          value={currentInput}
          onChange={(e) => handleInputChange(e)}
          onPaste={handlePaste}
          onCut={handleCut}
          //disabled={timer === 0}
          placeholder="Start typing ..."
          autoComplete="off"
          spellCheck="false"
          className="text-xl"
        />
      </Flex>
    </Card>
  );
}
