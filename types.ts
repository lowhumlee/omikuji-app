
export interface FortuneResult {
  number: number;
  luck: string;
  kanjiVerse: string;
  japaneseReading: string;
  englishTranslation: string;
  interpretation: string;
  advice: {
    wish: string;
    waitingPerson: string;
    lostItem: string;
    travel: string;
    business: string;
    study: string;
    romance: string;
    health: string;
  };
}

export interface HistoryItem {
  timestamp: number;
  fortune: FortuneResult;
}
