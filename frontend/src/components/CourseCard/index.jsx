import { useState } from "react";

const CourseCard = ({ 
  id = "ID_UNKNOWN", 
  title = "TITULO_NAO_DEFINIDO", 
  status = "Iniciado", 
  progress = 0, 
  difficulty = "EASY" 
}) => {
  // Mapeamento de cores para dificuldades
  const difficultyStyles = {
    EASY: "text-tertiary-fixed border-tertiary/30",
    MEDIUM: "text-secondary-fixed border-secondary/30",
    HARD: "text-error border-error/30"
  };

  const currentDiffStyle = difficultyStyles[difficulty.toUpperCase()] || difficultyStyles.EASY;

  return (
    <div className="md:col-span-8 group relative bg-surface-container-low neon-border p-6 border border-primary/20 transition-all hover:bg-surface-container hover:border-primary-fixed-dim/50 gpu-accelerated h-60 md:w-[60%]">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-primary-fixed-dim px-3 py-1 font-label-sm text-[10px] border border-primary/30">
              ID: {id}
            </span>
            <span className={`font-label-sm text-[10px] border px-3 py-1 flex ${currentDiffStyle}`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase group-hover:text-primary transition-colors mt-2 text-xl font-semibold">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-primary-fixed-dim font-label-sm text-label-sm uppercase">
            Status: {status}
          </span>
          <div className="w-3 h-3 rounded-full bg-primary-fixed-dim animate-pulse shadow-[0_0_8px_#00dce6]"></div>
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
