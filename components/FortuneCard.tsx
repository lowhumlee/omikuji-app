import React, { useState, useRef } from 'react';
import { FortuneResult } from '../types';
import { RefreshCw, Download, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';

interface FortuneCardProps {
  fortune: FortuneResult;
  onClose: () => void;
}

const FortuneCard: React.FC<FortuneCardProps> = ({ fortune, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#fdfcf0',
        useCORS: true,
        logging: false,
        ignoreElements: (el) => el.classList.contains('no-print')
      });
      const link = document.createElement('a');
      link.download = `omikuji-${fortune.number}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error(err);
      alert('Failed to save image.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in duration-500">
      <div 
        ref={cardRef} 
        className="bg-[#fdfcf0] shadow-2xl border-[12px] border-[#9b2226] p-6 md:p-12 relative overflow-hidden"
      >
        {/* Ornamental Corners */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-8 border-l-8 border-[#d4af37] -m-1" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-8 border-r-8 border-[#d4af37] -m-1" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-8 border-l-8 border-[#d4af37] -m-1" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-8 border-r-8 border-[#d4af37] -m-1" />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20L0 20M20 0L20 20' stroke='%239b2226' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2 text-[#9b2226]">
              <Sparkles size={16} />
              <h2 className="text-sm uppercase tracking-[0.3em] font-bold">Ganzan Daishi Hyakusen</h2>
              <Sparkles size={16} />
            </div>
            
            <div className="flex flex-col items-center mb-6">
              <span className="text-stone-400 text-xs mb-1">Fortune No.</span>
              <span className="text-5xl font-serif font-black text-[#6b1c1c]">{fortune.number}</span>
            </div>

            <div className="inline-block relative">
              <div className="bg-[#9b2226] text-[#fdfcf0] px-12 py-3 text-3xl font-bold rounded shadow-xl border-2 border-[#d4af37]">
                {fortune.luck}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
            {/* The Verse Section */}
            <div className="md:col-span-5 bg-white/50 p-6 rounded-lg border border-stone-200 flex flex-col items-center">
              <h3 className="text-[#9b2226] text-xs font-bold mb-6 border-b border-[#9b2226] pb-1 w-full text-center">DIVINE VERSE</h3>
              <div className="vertical-rl text-3xl md:text-4xl leading-relaxed font-serif tracking-widest text-stone-800 mb-6 min-h-[12rem]">
                {fortune.kanjiVerse}
              </div>
              <p className="text-[10px] text-stone-400 italic text-center max-w-[200px] leading-tight">
                {fortune.japaneseReading}
              </p>
            </div>

            {/* The Meaning Section */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-6">
              <div className="border-l-4 border-[#d4af37] pl-6 py-2">
                <h3 className="text-[#9b2226] text-xs font-bold mb-2 uppercase tracking-tighter">Translation</h3>
                <p className="text-xl italic font-serif text-stone-700 leading-snug">
                  "{fortune.englishTranslation}"
                </p>
              </div>
              
              <div className="bg-stone-100/50 p-6 rounded-lg">
                <h3 className="text-[#9b2226] text-xs font-bold mb-3 uppercase tracking-tighter">Divine Interpretation</h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  {fortune.interpretation}
                </p>
              </div>
            </div>
          </div>

          {/* Advice Grid */}
          <div className="border-t-2 border-dashed border-stone-300 pt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(fortune.advice).map(([key, value]) => (
              <div key={key} className="bg-white p-3 rounded border border-stone-100 shadow-sm flex flex-col items-center text-center">
                <span className="text-[9px] uppercase font-bold text-[#9b2226] mb-1 opacity-70">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-xs text-stone-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 no-print">
        <button 
          onClick={onClose} 
          className="flex items-center space-x-3 bg-[#9b2226] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#ae2012] transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <RefreshCw size={20} />
          <span className="font-bold">RETURN TO SHRINE</span>
        </button>
        
        <button 
          onClick={handleDownload} 
          disabled={isExporting}
          className="flex items-center space-x-3 bg-white text-stone-700 border-2 border-stone-200 px-8 py-3 rounded-full shadow-lg hover:bg-stone-50 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          {isExporting ? <Loader2 className="animate-spin" size={20} /> : <ImageIcon size={20} />}
          <span className="font-bold">SAVE AMULET</span>
        </button>
      </div>
    </div>
  );
};

export default FortuneCard;
