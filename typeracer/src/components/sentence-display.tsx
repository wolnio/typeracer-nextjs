import { Card, Flex, Box, Text } from "@radix-ui/themes";

export function SentenceDisplay() {
  return (
    <Card size="3">
      <Flex direction="column" gap="4">
        <Text size="4" weight="bold" className="text-gray-900">
          Text to Type
        </Text>
        <Box className="bg-gray-50 rounded-lg p-6 border border-gray-300 min-h-[120px]">
          <Text size="6" className="font-mono leading-relaxed">
            Sample text
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
