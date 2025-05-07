import { create } from 'zustand';

export interface ScoreRecord {
  date: string;
  score: number;
  total: number;
  category: string;
  difficulty: string;
}

interface ScoreState {
  records: ScoreRecord[];
  addRecord: (record: ScoreRecord) => void;
  clear: () => void;
}

const STORAGE_KEY = 'quiz_scores';

function loadScores(): ScoreRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveScores(records: ScoreRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export const useScoreStore = create<ScoreState>((set, get) => ({
  records: loadScores(),
  addRecord: (record) => {
    const updated = [record, ...get().records];
    set({ records: updated });
    saveScores(updated);
  },
  clear: () => {
    set({ records: [] });
    saveScores([]);
  },
})); 