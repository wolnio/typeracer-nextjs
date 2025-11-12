//AI GENERATED CODE

export const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "A journey of a thousand miles begins with a single step.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "Practice makes perfect, but nobody is perfect.",
  "The early bird catches the worm.",
  "Actions speak louder than words every time.",
  "Knowledge is power when applied with wisdom.",
  "Time flies like an arrow; fruit flies like a banana.",
  "The pen is mightier than the sword always.",
] as const;

/**
 * Get sentence for a given round number (sequential)
 */
export function getSentenceForRound(roundNumber: number): string {
  const index = (roundNumber - 1) % SENTENCES.length;
  return SENTENCES[index];
}
