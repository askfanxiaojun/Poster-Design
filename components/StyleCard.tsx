import React from 'react';
import { StyleProfile, Language } from '../types';

interface StyleCardProps {
  style: StyleProfile;
  isSelected: boolean;
  onSelect: (id: string) => void;
  language: Language;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onSelect, language }) => {
  return (
    <div
      onClick={() => onSelect(style.id)}
      className={`
        relative group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 ease-in-out
        ${isSelected 
          ? 'border-yellow-400 bg-yellow-50 dark:bg-white/10 shadow-[0_0_20px_rgba(250,204,21,0.3)] scale-[1.02]' 
          : 'border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-50 dark:hover:bg-white/5'}
      `}
    >
      <div 
        className="absolute top-0 right-0 w-16 h-16 opacity-20 pointer-events-none transition-transform duration-500 group-hover:scale-150"
        style={{ background: `radial-gradient(circle, ${style.previewColor} 0%, transparent 70%)` }}
      />
      
      <div className="p-4 flex flex-col h-full relative z-10">
        <div className="flex justify-between items-start mb-3">
          <span className="text-3xl filter drop-shadow-md">{style.icon}</span>
          <div className={`
            w-5 h-5 rounded-full border flex items-center justify-center transition-colors
            ${isSelected ? 'bg-yellow-400 border-yellow-400' : 'border-gray-300 dark:border-white/50 bg-transparent'}
          `}>
            {isSelected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
          </div>
        </div>
        
        <h3 className="font-bold text-lg leading-tight mb-1 text-gray-900 dark:text-white">
          {language === 'zh' ? style.name_zh : style.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
          {language === 'zh' ? style.description_zh : style.description}
        </p>
      </div>
    </div>
  );
};

export default StyleCard;