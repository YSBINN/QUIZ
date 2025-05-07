import { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useScoreStore } from '../store/scoreStore';
import { useNavigate } from 'react-router-dom';

export default function ResultScreen() {
  const navigate = useNavigate();
  const { questions, answers, score, reset, category, difficulty } = useQuizStore();
  const addRecord = useScoreStore((s) => s.addRecord);

  useEffect(() => {
    if (questions.length && category && difficulty) {
      addRecord({
        date: new Date().toISOString(),
        score,
        total: questions.length,
        category: category.name,
        difficulty,
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleRetry = () => {
    reset();
    navigate('/');
  };

  const handleShare = () => {
    const text = `내 퀴즈 점수는 ${score}점! (${questions.length}문제 중 ${score}개 정답)`;
    if (navigator.share) {
      navigator.share({ title: '퀴즈 결과', text });
    } else {
      window.prompt('복사해서 친구에게 공유하세요!', text);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>결과</h2>
      <div style={{ fontSize: 24, marginBottom: 16 }}>점수: {score} / {questions.length}</div>
      <div>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correct_answer;
          return (
            <div key={i} style={{ marginBottom: 8, padding: 8, background: isCorrect ? '#e0ffe0' : '#ffe0e0', borderRadius: 4 }}>
              <div><b>Q{i + 1}.</b> {q.question}</div>
              <div>내 답: {answers[i] || '미응답'} {isCorrect ? '✅' : '❌'}</div>
              {!isCorrect && <div>정답: {q.correct_answer}</div>}
            </div>
          );
        })}
      </div>
      <button style={{ marginTop: 16, marginRight: 8 }} onClick={handleRetry}>다시하기</button>
      <button style={{ marginTop: 16 }} onClick={handleShare}>결과 공유</button>
    </div>
  );
} 