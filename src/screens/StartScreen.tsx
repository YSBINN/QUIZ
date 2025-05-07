import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchQuestions } from '../api/triviaApi';
import { useQuizStore, Difficulty } from '../store/quizStore';

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

export default function StartScreen() {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  const [category, setCategory] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [amount, setAmount] = useState(10);
  const setQuizCategory = useQuizStore((s) => s.setCategory);
  const setQuizDifficulty = useQuizStore((s) => s.setDifficulty);
  const setQuizAmount = useQuizStore((s) => s.setAmount);
  const setQuestions = useQuizStore((s) => s.setQuestions);

  const startQuiz = async () => {
    if (!category || !categories) return;
    const selectedCategory = categories.find((c: { id: number; name: string }) => c.id === category);
    if (!selectedCategory) return;
    setQuizCategory(selectedCategory);
    setQuizDifficulty(difficulty);
    setQuizAmount(amount);
    const questions = await fetchQuestions(amount, category, difficulty);
    setQuestions(questions);
    navigate('/quiz');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>퀴즈 시작</h2>
      {isLoading ? (
        <p>카테고리 불러오는 중...</p>
      ) : categories ? (
        <div>
          <label>카테고리</label>
          <select value={category ?? ''} onChange={e => setCategory(Number(e.target.value))}>
            <option value="" disabled>카테고리 선택</option>
            {categories.map((cat: { id: number; name: string }) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      ) : null}
      <div>
        <label>난이도</label>
        <select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)}>
          {difficulties.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div>
        <label>문제 수</label>
        <input type="number" min={1} max={50} value={amount} onChange={e => setAmount(Number(e.target.value))} />
      </div>
      <button style={{ marginTop: 16 }} onClick={startQuiz} disabled={!category}>퀴즈 시작</button>
    </div>
  );
} 