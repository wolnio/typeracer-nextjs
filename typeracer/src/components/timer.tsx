import { Card, Flex, Separator, Box, Progress, Text } from "@radix-ui/themes";

export function Timer() {
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
            <Text size="9" weight="bold" className="text-gray-900">
              1:00
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
              100%
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
              00%
            </Text>
          </Flex>
          <Progress value={0} size="3" className="w-full" />
        </Box>
      </Flex>
    </Card>
  );
}
