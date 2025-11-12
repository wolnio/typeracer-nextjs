import { Card, Flex, Separator, Text } from "@radix-ui/themes";

export function PersonalStats() {
  return (
    <Card
      size="3"
      className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300"
    >
      <Flex direction="column" gap="4">
        <Flex align="center" gap="2">
          <Text size="6">🏆</Text>
          <Text size="4" weight="bold" className="text-yellow-700">
            Your Best Score
          </Text>
        </Flex>
        <Flex direction="column" gap="3">
          <Flex justify="between" align="center">
            <Text className="text-gray-700">WPM:</Text>
            <Text size="8" weight="bold" className="text-yellow-700">
              35
            </Text>
          </Flex>
          <Separator size="4" className="bg-yellow-300" />
          <Flex justify="between" align="center">
            <Text className="text-gray-700">Accuracy:</Text>
            <Text size="8" weight="bold" className="text-yellow-700">
              95%
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
