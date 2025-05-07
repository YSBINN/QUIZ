import { Routes, Route, Link } from 'react-router-dom';
import StartScreen from './screens/StartScreen';
import QuizScreen from './screens/QuizScreen';
import ResultScreen from './screens/ResultScreen';
import ScoreHistoryScreen from './screens/ScoreHistoryScreen';
import './App.css'

function App() {
  return (
    <>
      <nav style={{ padding: 16, background: '#f5f5f5', marginBottom: 24 }}>
        <Link to="/" style={{ marginRight: 16 }}>퀴즈 시작</Link>
        <Link to="/scores">점수 기록</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/scores" element={<ScoreHistoryScreen />} />
      </Routes>
    </>
  );
}

export default App;
