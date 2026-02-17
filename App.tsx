import React, { useState, useEffect } from 'react';
import { FortuneResult, HistoryItem } from './types';
import { getFortune } from './data/fortunes';
import OmikujiBox from './components/OmikujiBox';
import FortuneCard from './components/FortuneCard';
import { History, X, Info, ScrollText, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentFortune, setCurrentFortune] = useState<FortuneResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('omikuji_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleDraw = (number: number) => {
    setIsLoading(true);
    // Add a slight delay for dramatic effect before showing the card
    setTimeout(() => {
      try {
        const result = getFortune(number);
        setCurrentFortune(result);
        
        const newHistoryItem: HistoryItem = {
          timestamp: Date.now(),
          fortune: result
        };
        const updatedHistory = [newHistoryItem, ...history].slice(0, 15);
        setHistory(updatedHistory);
        localStorage.setItem('omikuji_history', JSON.stringify(updatedHistory));
      } catch (err) {
        console.error("Error drawing fortune:", err);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const clearCurrent = () => setCurrentFortune(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#fefaf6]">
      {/* Decorative Shrine Header */}
      <header className="shrine-bg text-[#fefaf6] p-6 shadow-2xl relative z-40 border-b-4 border-[#d4af37]">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#d4af37] rounded-sm flex items-center justify-center shadow-lg transform -rotate-3">
              <Sparkles className="text-[#9b2226]" size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-serif font-black tracking-widest uppercase">元三大師</h1>
              <p className="text-[10px] md:text-xs tracking-[0.2em] opacity-80 uppercase font-bold">The 100 Fortunes Digital Shrine</p>
            </div>
          </div>
          <button 
            onClick={() => setShowHistory(true)}
            className="group flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/20"
          >
            <History size={18} className="group-hover:rotate-[-45deg] transition-transform" />
            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Past Visions</span>
            {history.length > 0 && (
              <span className="bg-[#d4af37] text-[#9b2226] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 relative z-10 min-h-[80vh] flex flex-col items-center justify-center">
        {!currentFortune ? (
          <div className="w-full flex flex-col items-center text-center space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-8xl font-serif font-black text-[#9b2226] drop-shadow-sm leading-tight">
                Seek Ancient <br className="md:hidden" /> Guidance
              </h2>
              <p className="text-lg md:text-2xl text-stone-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
                "Cleanse the spirit and focus on the void. The Ganzan Daishi Hyakusen holds the wisdom of a thousand years."
              </p>
            </div>

            <OmikujiBox onDraw={handleDraw} isDrawing={isLoading} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-8">
              {[
                { 
                  title: "Traditional Root", 
                  text: "Authentic 100 fortunes established by Ryogen (Ganzan Daishi) at Enryaku-ji temple.", 
                  icon: <ScrollText className="text-[#d4af37]" size={28} /> 
                },
                { 
                  title: "Sacred Pattern", 
                  text: "Each verse consists of five-character lines in classical Chinese poetry format.", 
                  icon: <Sparkles className="text-[#d4af37]" size={28} /> 
                },
                { 
                  title: "Modern Path", 
                  text: "Detailed English interpretations to bridge ancient wisdom with modern living.", 
                  icon: <Info className="text-[#d4af37]" size={28} /> 
                },
              ].map((feature, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border-t-2 border-[#d4af37] hover:shadow-2xl transition-all duration-300">
                  <div className="mb-6 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-black mb-3 text-[#9b2226] uppercase tracking-wider">{feature.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-serif">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-bottom-12 duration-700 cubic-bezier(0.23, 1, 0.32, 1)">
            <FortuneCard fortune={currentFortune} onClose={clearCurrent} />
          </div>
        )}
      </main>

      {/* History Drawer */}
      {showHistory && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowHistory(false)} 
          />
          <div className="relative w-full max-w-md bg-[#fefaf6] h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b shrine-bg text-white flex justify-between items-center shadow-lg">
              <h3 className="text-2xl font-serif font-black flex items-center space-x-3 tracking-widest">
                <History /><span>VISIONS</span>
              </h3>
              <button 
                onClick={() => setShowHistory(false)} 
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={28} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {history.length === 0 ? (
                <div className="text-center py-24 text-stone-300 flex flex-col items-center">
                  <Sparkles size={64} className="mb-6 opacity-20" />
                  <p className="font-serif italic text-lg tracking-widest">The scrolls are currently empty.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div 
                    key={item.timestamp} 
                    className="group bg-white p-5 rounded-xl shadow-md border-l-8 border-[#d4af37] hover:border-[#9b2226] hover:shadow-lg transition-all cursor-pointer transform hover:-translate-x-1"
                    onClick={() => { setCurrentFortune(item.fortune); setShowHistory(false); }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <span className="text-[#9b2226] font-black text-sm px-2 py-0.5 bg-stone-100 rounded">
                        No. {item.fortune.number}
                      </span>
                    </div>
                    <div className="font-serif font-black text-2xl text-stone-800 mb-2 group-hover:text-[#9b2226] transition-colors">
                      {item.fortune.luck}
                    </div>
                    <p className="text-xs text-stone-500 italic line-clamp-2 border-t pt-2 mt-2">
                      "{item.fortune.englishTranslation}"
                    </p>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-8 border-t bg-stone-50">
              <button 
                onClick={() => { if(confirm('Clear all history?')) { setHistory([]); localStorage.removeItem('omikuji_history'); } }} 
                className="w-full py-4 text-[#9b2226] font-black text-sm border-2 border-[#9b2226] rounded-xl hover:bg-[#9b2226] hover:text-white transition-all uppercase tracking-[0.2em]"
              >
                Purge History
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="py-12 text-center text-stone-400 text-[10px] tracking-[0.3em] uppercase relative z-10">
        <p>© {new Date().getFullYear()} Ganzan Daishi Hyakusen • Digital Shrine</p>
      </footer>
    </div>
  );
};

export default App;
