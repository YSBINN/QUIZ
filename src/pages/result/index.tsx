import { useEffect } from 'react';
import { useQuizStore } from '../../store/quizStore';
import { useScoreStore } from '../../store/scoreStore';
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
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">결과</h2>
      <div className="text-2xl font-bold mb-8 text-center">점수: <span className="text-blue-600">{score}</span> / {questions.length}</div>
      <div className="space-y-4 mb-8">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correct_answer;
          return (
            <div key={i} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}` }>
              <div className="font-semibold mb-1"><b>Q{i + 1}.</b> {q.question}</div>
              <div className="mb-1">내 답: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{answers[i] || '미응답'}</span> {isCorrect ? '✅' : '❌'}</div>
              {!isCorrect && <div className="text-sm text-gray-500">정답: {q.correct_answer}</div>}
            </div>
          );
        })}
      </div>
      <div className="flex gap-4">
        <button
          className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
          onClick={handleRetry}
        >
          다시하기
        </button>
        <button
          className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded transition"
          onClick={handleShare}
        >
          결과 공유
        </button>
      </div>
    </div>
  );
} 