import React, { useState } from 'react';

interface OmikujiBoxProps {
  onDraw: (number: number) => void;
  isDrawing: boolean;
}

const OmikujiBox: React.FC<OmikujiBoxProps> = ({ onDraw, isDrawing }) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleDraw = () => {
    if (isDrawing || isShaking) return;
    setIsShaking(true);
    
    // Simulate ritual duration
    setTimeout(() => {
      setIsShaking(false);
      const randomNumber = Math.floor(Math.random() * 100) + 1;
      onDraw(randomNumber);
    }, 2200);
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div 
        className={`relative group cursor-pointer select-none transition-all duration-300
          ${isShaking ? 'animate-shake' : 'hover:scale-105 active:scale-95'}
        `}
        onClick={handleDraw}
      >
        {/* The Box Body */}
        <div className="w-32 h-64 bg-[#6b1c1c] rounded-md shadow-2xl border-x-4 border-[#521313] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          
          {/* Decorative Labels */}
          <div className="absolute inset-x-0 top-12 flex justify-center">
            <div className="bg-[#fdfcf0] text-[#6b1c1c] px-2 py-6 rounded-sm font-bold text-xl vertical-rl shadow-md">
              <span>御神籤</span>
            </div>
          </div>

          {/* Golden Trims */}
          <div className="absolute top-0 inset-x-0 h-2 bg-[#d4af37]"></div>
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[#d4af37]"></div>
          
          {/* Exit Hole */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full ring-2 ring-[#d4af37]"></div>
        </div>

        {/* The Stick appearing during shake */}
        <div className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-24 bg-[#d2b48c] transition-all duration-700 ease-in-out pointer-events-none z-[-1]
          ${isShaking ? 'translate-y-full opacity-100' : 'translate-y-0 opacity-0'}
        `}>
          <div className="absolute bottom-0 inset-x-0 h-4 bg-[#9b2226]"></div>
        </div>
      </div>

      <button
        onClick={handleDraw}
        disabled={isDrawing || isShaking}
        className={`mt-16 px-10 py-4 rounded-full text-white font-bold text-xl shadow-2xl transform transition-all tracking-wider
          ${isDrawing || isShaking 
            ? 'bg-stone-400 cursor-not-allowed translate-y-1' 
            : 'bg-[#9b2226] hover:bg-[#ae2012] hover:-translate-y-1 hover:shadow-[#9b2226]/50 shadow-lg active:translate-y-0'}
        `}
      >
        {isShaking ? 'CONSULTING SPIRITS...' : 'DRAW FORTUNE'}
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-8deg) translateY(-5px); }
          20%, 40%, 60%, 80% { transform: rotate(8deg) translateY(5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out infinite;
        }
        .vertical-rl { writing-mode: vertical-rl; }
      `}</style>
    </div>
  );
};

export default OmikujiBox;
