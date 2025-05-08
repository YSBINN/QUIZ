import { useScoreStore } from '../store/scoreStore';

const difficultyMap: { [key: string]: string } = {
  'easy': '쉬움',
  'medium': '보통',
  'hard': '어려움',
};

export default function ScoreHistoryScreen() {
  const { records, clear } = useScoreStore();

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">점수 기록</h2>
      <button
        className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded transition"
        onClick={clear}
      >
        기록 전체 삭제
      </button>
      {records.length === 0 ? (
        <div className="text-center text-gray-500">기록이 없습니다.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3">날짜</th>
                <th className="py-2 px-3">카테고리</th>
                <th className="py-2 px-3">난이도</th>
                <th className="py-2 px-3">점수</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 px-3 whitespace-nowrap">{new Date(r.date).toLocaleString()}</td>
                  <td className="py-2 px-3">{r.category}</td>
                  <td className="py-2 px-3">{difficultyMap[r.difficulty] || r.difficulty}</td>
                  <td className="py-2 px-3 font-semibold">{r.score} / {r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 