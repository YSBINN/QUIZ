import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../api/triviaApi';
import { useQuizStore, Difficulty } from '../store/quizStore';

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: '쉬움' },
  { value: 'medium', label: '보통' },
  { value: 'hard', label: '어려움' },
];

const categories = [
  { id: 9, name: '일반 상식' },
  { id: 10, name: '책' },
  { id: 11, name: '영화' },
  { id: 12, name: '음악' },
  { id: 13, name: '뮤지컬 & 연극' },
  { id: 14, name: '텔레비전' },
  { id: 15, name: '비디오 게임' },
  { id: 16, name: '보드 게임' },
  { id: 17, name: '과학 & 자연' },
  { id: 18, name: '컴퓨터 과학' },
  { id: 19, name: '수학' },
  { id: 20, name: '과학 도구' },
  { id: 21, name: '신화' },
  { id: 22, name: '스포츠' },
  { id: 23, name: '지리' },
  { id: 24, name: '역사' },
  { id: 25, name: '정치' },
  { id: 26, name: '예술' },
  { id: 27, name: '유명인' },
  { id: 28, name: '동물' },
  { id: 29, name: '교통수단' },
  { id: 31, name: '일본 애니메이션 & 만화' },
  { id: 32, name: '만화 & 애니메이션' },
];

export default function StartScreen() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [amount, setAmount] = useState(10);
  const setQuizCategory = useQuizStore((s) => s.setCategory);
  const setQuizDifficulty = useQuizStore((s) => s.setDifficulty);
  const setQuizAmount = useQuizStore((s) => s.setAmount);
  const setQuestions = useQuizStore((s) => s.setQuestions);

  const startQuiz = async () => {
    if (!category) return;
    const selectedCategory = categories.find(c => c.id === category);
    if (!selectedCategory) return;
    setQuizCategory(selectedCategory);
    setQuizDifficulty(difficulty);
    setQuizAmount(amount);
    const questions = await fetchQuestions(amount, category, difficulty);
    setQuestions(questions);
    navigate('/quiz');
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">퀴즈 시작</h2>
      <div className="mb-4">
        <label className="block mb-1 font-medium">카테고리</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category ?? ''}
          onChange={e => setCategory(Number(e.target.value))}
        >
          <option value="" disabled>카테고리 선택</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">난이도</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value as Difficulty)}
        >
          {difficulties.map(d => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium">문제 수</label>
        <input
          type="number"
          min={1}
          max={50}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <button
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition disabled:bg-gray-300"
        onClick={startQuiz}
        disabled={!category}
      >
        퀴즈 시작
      </button>
    </div>
  );
} 