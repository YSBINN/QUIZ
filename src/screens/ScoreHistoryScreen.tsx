import { useScoreStore } from '../store/scoreStore';

export default function ScoreHistoryScreen() {
  const { records, clear } = useScoreStore();

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24, background: '#fff', borderRadius: 8 }}>
      <h2>점수 기록</h2>
      <button style={{ marginBottom: 16 }} onClick={clear}>기록 전체 삭제</button>
      {records.length === 0 ? (
        <div>기록이 없습니다.</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>날짜</th>
              <th>카테고리</th>
              <th>난이도</th>
              <th>점수</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td>{new Date(r.date).toLocaleString()}</td>
                <td>{r.category}</td>
                <td>{r.difficulty}</td>
                <td>{r.score} / {r.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 