import { Routes, Route, Link } from 'react-router-dom';
import StartScreen from './pages/start';
import QuizScreen from './pages/quiz';
import ResultScreen from './pages/result';
import ScoreHistoryScreen from './pages/scores';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-center gap-6 py-4 bg-white shadow-md mb-8">
        <Link to="/" className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition">퀴즈 시작</Link>
        <Link to="/scores" className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition">점수 기록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/scores" element={<ScoreHistoryScreen />} />
      </Routes>
    </div>
  );
}

export default App;
