import { formatTime } from "@/utils/utils";
import { Card, Flex, Separator, Box, Progress, Text } from "@radix-ui/themes";

interface TimerProps {
  timeRemaining: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  currentSentenceLength: number;
}

export function Timer({
  timeRemaining,
  totalKeystrokes,
  correctKeystrokes,
  currentSentenceLength,
}: TimerProps) {
  const isUrgent = timeRemaining <= 10;

  const realAccuracy =
    totalKeystrokes > 0 ? correctKeystrokes / totalKeystrokes : 0;

  const progressPercent = Math.min(
    (correctKeystrokes / currentSentenceLength) * 100,
    100
  );

  return (
    <Card size="3">
      <Flex direction="column" gap="6">
        <Flex justify="between" align="center">
          <Flex direction="column" align="center" flexGrow="1">
            <Text
              size="1"
              className="text-gray-600 uppercase tracking-wide mb-2"
            >
              Time Left
            </Text>
            <Text
              size="9"
              weight="bold"
              className={isUrgent ? "text-red-600" : "text-gray-900"}
            >
              {formatTime(timeRemaining)}
            </Text>
          </Flex>

          <Separator orientation="vertical" size="4" />

          <Flex direction="column" align="center" flexGrow="1">
            <Text
              size="1"
              className="text-gray-600 uppercase tracking-wide mb-2"
            >
              WPM
            </Text>
            <Text size="9" weight="bold" className="text-purple-600">
              0
            </Text>
          </Flex>

          <Separator orientation="vertical" size="4" />

          <Flex direction="column" align="center" flexGrow="1">
            <Text
              size="1"
              className="text-gray-600 uppercase tracking-wide mb-2"
            >
              Accuracy
            </Text>
            <Text size="9" weight="bold" className="text-green-600">
              {(realAccuracy * 100).toFixed(0)}%
            </Text>
          </Flex>
        </Flex>

        {/* Progress Bar */}
        <Box>
          <Flex justify="between" mb="2">
            <Text size="1" className="text-gray-600">
              Progress
            </Text>
            <Text size="1" className="text-gray-500">
              {Math.round(progressPercent)}%
            </Text>
          </Flex>
          <Progress value={progressPercent} size="3" className="w-full" />
        </Box>
      </Flex>
    </Card>
  );
}
