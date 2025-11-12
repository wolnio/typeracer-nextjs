"use client";

import { Card, Flex, Box, Text } from "@radix-ui/themes";

interface SentenceDisplayProps {
  sentence: string;
  currentInput: string;
}

export function SentenceDisplay({
  sentence,
  currentInput,
}: SentenceDisplayProps) {
  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold" className="text-gray-900">
          Text to Type
        </Text>
        <Box className="bg-gray-50 rounded-lg p-6 border border-gray-300 min-h-[120px]">
          <Text size="6" className="font-mono leading-relaxed">
            {sentence.split("").map((char, index) => {
              let className = "transition-colors";

              if (index < currentInput.length) {
                // Character has been typed
                if (currentInput[index] === char) {
                  className += " text-green-500"; // Correct
                } else {
                  className += " text-red-500 bg-red-100 dark:bg-red-900/20"; // Incorrect
                }
              } else if (index === currentInput.length) {
                // Current cursor position
                className += " bg-primary/20 animate-pulse";
              } else {
                // Not yet typed
                className += " text-muted-foreground";
              }

              return (
                <span key={index} className={className}>
                  {char}
                </span>
              );
            })}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
