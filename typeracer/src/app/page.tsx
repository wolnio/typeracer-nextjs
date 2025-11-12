import { LeaderboardTable } from "@/components/leaderboard-table";
import { PersonalStats } from "@/components/personal-stats";
import { RegisterUser } from "@/components/register-user";
import { SentenceDisplay } from "@/components/sentence-display";
import { Timer } from "@/components/timer";
import { TypingArea } from "@/components/typing-area";
import { Badge, Box, Container, Flex, Grid, Text } from "@radix-ui/themes";

export default function Home() {
  if (false) {
    return <RegisterUser />;
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
                #1
              </Text>
            </Flex>
          </Badge>
        </Flex>

        {/* Main Game Area */}
        <Grid columns={{ md: "2", sm: "1" }} gap="3" width="auto">
          <Flex direction="column" gapY="6">
            <Timer />
            <SentenceDisplay />
            <TypingArea />
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
