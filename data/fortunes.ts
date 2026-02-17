
import { FortuneResult } from '../types';

export const fortunes: FortuneResult[] = [
  {
    number: 1,
    luck: "Great Luck (Daikichi)",
    kanjiVerse: "更解洗塵埃\n千花自此開\n水流何處急\n風送彩帆來",
    japaneseReading: "Sarani toite jin-ai o arai, senka kore yori hiraku. Mizu nagarete izuku ni ka isogashiku, kaze wa saihan o okuri kitaru.",
    englishTranslation: "Wash away the dust of the world; a thousand flowers shall bloom from here. Where the water flows swiftly, the wind brings the colorful sails home.",
    interpretation: "A fresh start is upon you. By clearing away old worries, immense growth is possible. Success arrives as naturally as spring flowers or a ship with a following wind.",
    advice: {
      wish: "Will be granted beyond expectations.",
      waitingPerson: "Will arrive soon.",
      lostItem: "Will be found in the north.",
      travel: "Very auspicious.",
      business: "Great profit ahead.",
      study: "Success through diligence.",
      romance: "A perfect match appears.",
      health: "Full recovery expected."
    }
  },
  {
    number: 2,
    luck: "Luck (Kichi)",
    kanjiVerse: "泰華玉波心\n佳期不易尋\n萬方皆自化\n千里信難吟",
    japaneseReading: "Taika gyokuha no shin, kaki tazune gatashi. Manpo mina jika shi, senri shin ginji gatashi.",
    englishTranslation: "In the heart of the great waves, the perfect moment is hard to find. All things change of their own accord; the long journey is hard to put into song.",
    interpretation: "Opportunities are rare and precious. Do not rush; allow circumstances to mature naturally. Your hard work is building a foundation that will soon yield results.",
    advice: {
      wish: "Patience is required.",
      waitingPerson: "Will arrive later than expected.",
      lostItem: "Hard to find, look high up.",
      travel: "Good, but avoid water routes.",
      business: "Steady growth, no shortcuts.",
      study: "Focus on the basics.",
      romance: "Do not force the connection.",
      health: "Maintain a balanced lifestyle."
    }
  },
  {
    number: 3,
    luck: "Small Luck (Shokichi)",
    kanjiVerse: "月出照園林\n花開満地金\n前程無阻隔\n好事自相尋",
    japaneseReading: "Tsuki idete enrin o terashi, hana hiraite manchi no kin. Zentei sogaku naku, kouji mizukara ai tazunu.",
    englishTranslation: "The moon rises to light the forest; flowers bloom like gold across the ground. The path ahead has no obstacles; good things will seek you out.",
    interpretation: "Small but steady progress. Like moonlight gradually illuminating the dark, clarity is coming. You don't need to chase success; it is moving toward you.",
    advice: {
      wish: "Will be granted slowly.",
      waitingPerson: "Will come with good news.",
      lostItem: "Found near a garden or park.",
      travel: "Safe and pleasant.",
      business: "Small profits accumulate.",
      study: "Stay consistent and you pass.",
      romance: "A quiet, gentle love grows.",
      health: "Improving day by day."
    }
  },
  {
    number: 4,
    luck: "Bad Luck (Kyo)",
    kanjiVerse: "衣食雖然足\n前程未可知\n且宜多謹慎\n免受此災危",
    japaneseReading: "Ishoku suide ni taru to iedomo, zentei imada shirubekarazu. Katsu yoroshiku tsutsushimi o ookusu beshi, kono saiki o ukuru o manukan.",
    englishTranslation: "Though food and clothing are sufficient, the path ahead is unknown. It is best to be extremely cautious to avoid impending danger.",
    interpretation: "Do not be complacent. Even if your current needs are met, hidden risks exist in future plans. Stay humble, avoid risky investments, and lie low for a while.",
    advice: {
      wish: "Will not be granted yet.",
      waitingPerson: "Will not come.",
      lostItem: "Unlikely to return.",
      travel: "Postpone if possible.",
      business: "Risk of loss, be careful.",
      study: "Distractions are hindering you.",
      romance: "Conflicts may arise.",
      health: "Watch out for sudden illness."
    }
  }
];

export const getFortune = (number: number): FortuneResult => {
  // Cycle through the available fortunes based on the number drawn (1-100)
  const baseFortune = fortunes[(number - 1) % fortunes.length];
  return {
    ...baseFortune,
    number: number
  };
};
