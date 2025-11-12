"use client";

import { LeaderboardTable } from "@/components/leaderboard-table";
import { PersonalStats } from "@/components/personal-stats";
import { RegisterUser } from "@/components/register-user";
import { SentenceDisplay } from "@/components/sentence-display";
import { Timer } from "@/components/timer";
import { TypingArea } from "@/components/typing-area";
import { useGame } from "@/hooks/use-game";
import { useGameStore } from "@/utils/store";
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";

export default function Home() {
  const {
    currentPlayer,
    currentRound,
    currentInput,
    timeRemaining,
    setCurrentInput,
  } = useGameStore();
  useGame();

  const [totalKeyStrokes, setTotalKeyStrokes] = useState(0);
  const [correctKeyStrokes, setCorrectKeyStrokes] = useState(0);

  if (!currentPlayer) {
    return <RegisterUser />;
  }

  if (!currentRound) {
    return (
      <Box className="min-h-screen p-8">
        <Container size={{ sm: "3", lg: "4" }}>
          <Card>
            <Box p="4">
              <Text size="6" weight="bold" mb="3">
                Error
              </Text>
              <Text className="text-red-500">
                Failed to load game. Please refresh the page.
              </Text>
            </Box>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="min-h-screen p-8">
      <Container size={{ sm: "3", lg: "4" }}>
        {/* Header */}
        <Flex direction="column" align="center" gap="4" mb="8">
          <Text size="9" weight="bold" className="text-gray-900">
            TypeRacer
          </Text>
          <Badge size="3" color="purple" variant="soft" radius="full">
            <Flex gap="2" align="center">
              <Text size="2">Current Round:</Text>
              <Text size="3" weight="bold">
                #{currentRound?.round_number}
              </Text>
            </Flex>
          </Badge>
        </Flex>

        {/* Main Game Area */}
        <Grid columns={{ md: "2", sm: "1" }} gap="3" width="auto">
          <Flex direction="column" gapY="6">
            <Timer
              timeRemaining={timeRemaining}
              totalKeystrokes={totalKeyStrokes}
              correctKeystrokes={correctKeyStrokes}
            />
            <SentenceDisplay
              sentence={currentRound.sentence}
              currentInput={currentInput}
            />
            <TypingArea
              setCorrectKeyStrokes={setCorrectKeyStrokes}
              setTotalKeyStrokes={setTotalKeyStrokes}
            />
          </Flex>

          <Box>
            <Flex direction="column" gap="6">
              <PersonalStats />
              <LeaderboardTable />
            </Flex>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}
