export interface QuestionData {
  question: string;
  answer: string;
}

export const questionsData: QuestionData[] = [
  { question: "What is your name?", answer: "I am a frontend chatbot." },
  { question: "How are you?", answer: "I'm doing great! Thanks for asking." },
  {
    question: "What can you do?",
    answer: "I can answer your predefined questions.",
  },
  {
    question: "Tell me a joke.",
    answer: "Why don’t skeletons fight each other? They don’t have the guts!",
  },
];
