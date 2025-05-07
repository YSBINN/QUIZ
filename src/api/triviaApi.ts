import axios from 'axios';
import { Difficulty, QuizQuestion } from '../store/quizStore';

const API_URL = 'https://opentdb.com';

export async function fetchCategories() {
  const res = await axios.get(`${API_URL}/api_category.php`);
  return res.data.trivia_categories as { id: number; name: string }[];
}

export async function fetchQuestions(
  amount: number,
  category: number,
  difficulty: Difficulty
): Promise<QuizQuestion[]> {
  const res = await axios.get(`${API_URL}/api.php`, {
    params: {
      amount,
      category,
      difficulty,
      type: 'multiple',
      encode: 'url3986',
    },
  });
  type RawQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  return (res.data.results as RawQuestion[]).map((q) => ({
    question: decodeURIComponent(q.question),
    correct_answer: decodeURIComponent(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map((a: string) => decodeURIComponent(a)),
    options: shuffle([
      decodeURIComponent(q.correct_answer),
      ...q.incorrect_answers.map((a: string) => decodeURIComponent(a)),
    ]),
  }));
}

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
} 