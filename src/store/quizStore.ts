import { create } from 'zustand';

export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuizCategory = { id: number; name: string };
export type QuizQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  options: string[];
};

interface QuizState {
  category: QuizCategory | null;
  difficulty: Difficulty | null;
  amount: number;
  questions: QuizQuestion[];
  current: number;
  answers: string[];
  score: number;
  status: 'idle' | 'playing' | 'finished';
  setCategory: (category: QuizCategory) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setAmount: (amount: number) => void;
  setQuestions: (questions: QuizQuestion[]) => void;
  answer: (answer: string) => void;
  next: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  category: null,
  difficulty: null,
  amount: 10,
  questions: [],
  current: 0,
  answers: [],
  score: 0,
  status: 'idle',
  setCategory: (category) => set({ category }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setAmount: (amount) => set({ amount }),
  setQuestions: (questions) => set({ questions, current: 0, answers: [], score: 0, status: 'playing' }),
  answer: (answer) => {
    const { questions, current, score, answers } = get();
    const correct = questions[current]?.correct_answer;
    set({
      answers: [...answers, answer],
      score: answer === correct ? score + 1 : score,
    });
  },
  next: () => {
    const { current, questions } = get();
    if (current + 1 < questions.length) {
      set({ current: current + 1 });
    } else {
      set({ status: 'finished' });
    }
  },
  reset: () => set({
    questions: [],
    current: 0,
    answers: [],
    score: 0,
    status: 'idle',
    category: null,
    difficulty: null,
    amount: 10,
  }),
})); 