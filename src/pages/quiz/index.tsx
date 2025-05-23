import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';

const TIMER_SEC = 20;

interface GoogleTranslateElement {
  new (options: {
    pageLanguage: string;
    includedLanguages: string;
    layout: number;
    autoDisplay: boolean;
  }, elementId: string): void;
  InlineLayout: {
    SIMPLE: number;
  };
}

interface GoogleTranslate {
  translate: {
    TranslateElement: GoogleTranslateElement;
  };
}

// window.google 타입 선언
declare global {
  interface Window {
    google: unknown;
  }
}

// 타입 가드 함수
function isGoogleTranslate(obj: unknown): obj is GoogleTranslate {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'translate' in obj &&
    typeof (obj as { translate: unknown }).translate === 'object' &&
    (obj as { translate: { TranslateElement: unknown } }).translate.TranslateElement !== undefined
  );
}

export default function QuizScreen() {
  const navigate = useNavigate();
  const { questions, current, answer, next, status } = useQuizStore();
  const [selected, setSelected] = useState<string | null>(null);
  const [timer, setTimer] = useState(TIMER_SEC);

  // 번역 위젯 강제 재실행
  useEffect(() => {
    if (isGoogleTranslate(window.google)) {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'ko,en,ja,zh-CN',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    }
  }, []);

  useEffect(() => {
    setTimer(TIMER_SEC);
    setSelected(null);
  }, [current]);

  const submitAnswer = useCallback(() => {
    answer(selected ?? '');
  }, [answer, selected]);

  const moveToNext = useCallback(() => {
    if (current + 1 < questions.length) {
      next();
    } else {
      navigate('/result');
    }
  }, [current, questions.length, next, navigate]);

  const handleSubmit = useCallback(() => {
    submitAnswer();
    moveToNext();
  }, [submitAnswer, moveToNext]);

  useEffect(() => {
    if (timer === 0) {
      answer(''); // 시간 초과시 빈 답변으로 처리
      next();
      return;
    }
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, answer, next]);

  useEffect(() => {
    if (status === 'finished') {
      navigate('/result');
    }
  }, [status, navigate]);

  if (status !== 'playing' || !questions.length) return <div className="text-center mt-16 text-gray-500">문제가 없습니다.</div>;
  const q = questions[current];

  const handleAnswerClick = (opt: string) => {
    setSelected(selected === opt ? null : opt);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-blue-700">문제 {current + 1} / {questions.length}</h2>
      <div className="mb-4 text-right text-sm text-gray-500"><b>남은 시간: <span className={timer <= 5 ? 'text-red-500' : ''}>{timer}</span>초</b></div>
      <div className="mb-6 text-lg font-medium min-h-[48px]">{q.question}</div>
      <div className="flex justify-center mb-4">
        <div id="google_translate_element"></div>
      </div>
      <div className="space-y-3 mb-6">
        {q.options.map((opt) => (
          <button
            key={opt}
            className={`w-full py-2 rounded border text-left px-4 font-semibold transition
              ${selected === opt ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 hover:bg-blue-50'}
              cursor-pointer`}
            onClick={() => handleAnswerClick(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition disabled:bg-gray-300"
        onClick={handleSubmit}
        disabled={selected === null}
      >
        {current + 1 < questions.length ? '제출 & 다음' : '제출 & 결과보기'}
      </button>
    </div>
  );
} 