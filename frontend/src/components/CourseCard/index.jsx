import { useState } from "react";
import { useNavigate } from "react-router";

const CourseCard = ({ 
  id = "ID_UNKNOWN", 
  title = "TITULO_NAO_DEFINIDO", 
  status = "Iniciado", 
  progress = 0, 
  difficulty = "EASY" 
}) => {
  const navigate = useNavigate();
  const isBlocked = status === "BLOQUEADO";
  const isCompleted = status === "CONCLUIDA" || status === "CONCLUIDO";
  const isInactive = isBlocked || isCompleted;

  // Mapeamento de cores para dificuldades
  const difficultyStyles = {
    EASY: "text-secondary-fixed border-secondary/30",
    MEDIUM: "text-primary-fixed border-primary/50",
    HARD: "text-tertiary border-tertiary"
  };

  const currentDiffStyle = difficultyStyles[difficulty.toUpperCase()] || difficultyStyles.EASY;

  return (
    <div 
      onClick={() => !isInactive && navigate('/quiz')}
      className={`md:col-span-8 group relative bg-surface-container-low neon-border p-6 border transition-all gpu-accelerated h-60 md:w-[60%] overflow-hidden ${
        isBlocked 
          ? "border-tertiary/30 cursor-not-allowed bg-tertiary/[0.02]" 
          : isCompleted
            ? "border-secondary/30 cursor-default bg-secondary/[0.02]"
            : "border-primary/20 cursor-pointer hover:bg-surface-container hover:border-primary-fixed-dim/50"
      }`}
    >
      {/* Blocked Overlay Decoration */}
      {isBlocked && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-background/40 backdrop-blur-[2px]">
            <div className="relative flex flex-col items-center">
                {/* Padlock Icon with Glitch Effect */}
                <div className="relative mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-tertiary animate-pulse drop-shadow-[0_0_10px_rgba(255,0,60,0.5)]">
                        <rect x="3" y="11" width="18" height="11" rx="1" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute top-0 left-0 text-tertiary opacity-30 animate-ping">
                        <rect x="3" y="11" width="18" height="11" rx="1" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </div>

                {/* Corrupted Data Label */}
                <div className="bg-tertiary text-background px-3 py-1 font-black text-[10px] tracking-[0.3em] uppercase transform -skew-x-12 shadow-[0_0_15px_rgba(252,238,10,0.2)]">
                    DADO_CORROMPIDO
                </div>

                {/* Floating Binary Bits */}
                <div className="absolute -inset-10 flex flex-wrap justify-around items-center opacity-40 text-[8px] font-code-md text-tertiary select-none">
                    {[...Array(12)].map((_, i) => (
                        <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                            {Math.random() > 0.5 ? '01' : '10'}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Completed Overlay Decoration */}
      {isCompleted && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none bg-background/40 backdrop-blur-[2px]">
            <div className="relative flex flex-col items-center">
                <div className="relative mb-4">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-secondary animate-pulse drop-shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <div className="bg-secondary text-background px-3 py-1 font-black text-[10px] tracking-[0.3em] uppercase transform -skew-x-12 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                    SISTEMA_DESCRIPTOGRAFADO
                </div>
            </div>
        </div>
      )}

      {/* Background Hover Effect */}
      {!isInactive && (
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none"></div>
      )}
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-3 py-1 font-label-sm text-[10px] border ${isInactive ? 'text-white/20 border-white/10' : 'text-primary-fixed-dim border-primary/30'}`}>
              ID: {id}
            </span>
            <span className={`font-label-sm text-[10px] border px-3 py-1 flex ${isInactive ? 'text-white/20 border-white/10' : currentDiffStyle}`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
          <h2 className={`font-headline-lg-mobile text-headline-lg-mobile uppercase transition-colors mt-2 text-xl font-semibold ${
            isInactive ? 'text-white/20' : 'text-on-surface group-hover:text-primary'
          }`}>
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className={`font-label-sm text-sm uppercase ${isBlocked ? 'text-tertiary/40' : isCompleted ? 'text-secondary/40' : 'text-primary-fixed-dim'}`}>
            Status: {status}
          </span>
          {!isInactive && (
            <div className="w-3 h-3 rounded-full bg-primary-fixed-dim animate-pulse shadow-[0_0_8px_#00dce6]"></div>
          )}
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-2">
        <div className="flex justify-between font-label-sm text-sm text-on-surface-variant mb-2">
          <span>PROGRESSO DA DESCRIPTOGRAFIA</span>
          <span className="text-primary-fixed-dim text-sm">{progress}%</span>
        </div>
        
        {/* Segmented Progress Bar Container */}
        <div className="relative h-5 w-full bg-surface-variant/10 border border-primary/10 p-[2px] overflow-hidden">
          {/* Active Progress Overlay (Fills from behind) */}
          <div 
            className="absolute top-0 left-0 bottom-0 bg-primary-container shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all duration-1000 ease-out z-0"
            style={{ width: `${progress}%` }}
          />

          {/* Top Layer: Dividers Grid */}
          <div className="absolute inset-0 flex gap-[2px] z-10">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 h-full border-r-2 border-background/40 bg-transparent" />
            ))}
          </div>

          {/* Background Blocks (Empty Grid - Bottom Layer) */}
          <div className="absolute inset-0 flex gap-[2px] z-[-1]">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="flex-1 h-full bg-surface-container-highest/30" />
            ))}
          </div>
        </div>
        </div>
    </div>
  );
};

export default CourseCard;
