"use client";

import { useGameStore } from "@/utils/store";
import { Card, Flex, TextArea, Text } from "@radix-ui/themes";

export function TypingArea() {
  const { currentInput, setCurrentInput } = useGameStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentInput(e.target.value);
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
