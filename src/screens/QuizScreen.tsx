import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../store/quizStore';

const TIMER_SEC = 20;

export default function QuizScreen() {
  const navigate = useNavigate();
  const { questions, current, answer, next, status } = useQuizStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [timer, setTimer] = useState(TIMER_SEC);

  useEffect(() => {
    setTimer(TIMER_SEC);
    setSelected(null);
  }, [current]);

  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  if (status !== 'playing' || !questions.length) return <div>문제가 없습니다.</div>;
  const q = questions[current];

  const handleSubmit = () => {
    answer(selected ?? '');
    if (current + 1 < questions.length) {
      next();
    } else {
      navigate('/result');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>문제 {current + 1} / {questions.length}</h2>
      <div style={{ marginBottom: 16 }}><b>남은 시간: {timer}초</b></div>
      <div style={{ marginBottom: 16 }}>{q.question}</div>
      <div>
        {q.options.map((opt) => (
          <button
            key={opt}
            style={{
              display: 'block',
              margin: '8px 0',
              background: selected === opt ? '#d1eaff' : '#eee',
              width: '100%',
              padding: 8,
              borderRadius: 4,
              border: '1px solid #ccc',
              cursor: 'pointer',
            }}
            onClick={() => setSelected(opt)}
            disabled={!!selected}
          >
            {opt}
          </button>
        ))}
      </div>
      <button style={{ marginTop: 16 }} onClick={handleSubmit} disabled={selected === null}>제출</button>
    </div>
  );
} 