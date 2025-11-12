"use client";

import { usePlayer } from "@/hooks/use-player";
import {
  Button,
  Card,
  Heading,
  Text,
  Flex,
  Box,
  Container,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

export function RegisterUser() {
  const [username, setUsername] = useState("");
  const { createPlayer } = usePlayer();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!username.trim()) return;

    createPlayer(username.trim());
  };

  return (
    <Box className="min-h-screen  flex items-center justify-center p-8">
      <Container size="1">
        <Card size="4" className="w-full max-w-md shadow-xl">
          <Flex direction="column" gap="5">
            <Heading size="7" align="center" className="text-gray-900">
              Welcome to TypeRacer!
            </Heading>

            <Flex direction="column" gap="2">
              <Text size="3" align="center" className="text-gray-600">
                Choose a username to start competing with other typers
              </Text>
              <Text size="2" align="center" className="text-gray-500">
                Your progress will be tracked in real-time
              </Text>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Flex direction="column" gap="4">
                <Flex direction="column" gap="2">
                  <Text size="2" weight="bold" className="text-gray-700">
                    Username
                  </Text>
                  <TextField.Root
                    size="3"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    maxLength={20}
                    autoFocus
                    required
                  />
                  <Text size="1" className="text-gray-500">
                    Max 20 characters
                  </Text>
                </Flex>

                <Button
                  type="submit"
                  size="3"
                  color="purple"
                  disabled={!username.trim()}
                  className="w-full"
                >
                  Start Racing
                </Button>
              </Flex>
            </form>
          </Flex>
        </Card>
      </Container>
    </Box>
  );
}
