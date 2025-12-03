import React, { useState, useEffect } from 'react';
import { GenerationResult, Language } from '../types';
import { STYLES, TRANSLATIONS } from '../constants';

interface ResultGalleryProps {
  results: GenerationResult[];
  language: Language;
}

const ResultGallery: React.FC<ResultGalleryProps> = ({ results, language }) => {
  const [selectedResult, setSelectedResult] = useState<GenerationResult | null>(null);
  const t = TRANSLATIONS[language];

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedResult) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedResult]);

  if (results.length === 0) return null;

  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center space-x-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.galleryTitle}</h2>
          <div className="h-px bg-gray-200 dark:bg-white/20 flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((result, index) => {
            const style = STYLES.find(s => s.id === result.styleId);
            const styleName = style ? (language === 'zh' ? style.name_zh : style.name) : 'Unknown Style';

            return (
              <div 
                key={result.id} 
                className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden group hover:border-gray-400 dark:hover:border-white/30 transition-all duration-300 flex flex-col shadow-sm dark:shadow-none"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div 
                  className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-black/50 cursor-zoom-in"
                  onClick={() => setSelectedResult(result)}
                >
                   {/* Image */}
                   <img 
                     src={result.imageUrl} 
                     alt={result.prompt} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                   
                   {/* Overlay Actions */}
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 pointer-events-none">
                      <span className="text-white font-medium text-sm border border-white/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        Click to Preview
                      </span>
                   </div>

                   {/* Quick Download Button (Prevents modal open) */}
                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <a 
                        href={result.imageUrl} 
                        download={`nano-banana-${result.id}.png`}
                        onClick={(e) => e.stopPropagation()}
                        className="block bg-white text-black p-2 rounded-full hover:bg-yellow-400 hover:scale-110 transition-all shadow-lg"
                        title={t.download}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                   </div>

                   {/* Style Badge */}
                   <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 shadow-sm pointer-events-none">
                     <div className="flex items-center space-x-2">
                       <span className="text-lg">{style?.icon}</span>
                       <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">{styleName}</span>
                     </div>
                   </div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-black/20">
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 italic">"{result.prompt}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedResult && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 animate-fadeIn"
          onClick={() => setSelectedResult(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors z-50"
            onClick={() => setSelectedResult(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedResult.imageUrl} 
              alt={selectedResult.prompt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            
            <div className="mt-6 flex flex-col items-center space-y-4">
              <p className="text-gray-300 text-center max-w-2xl px-4 line-clamp-2">
                {selectedResult.prompt}
              </p>
              <a 
                href={selectedResult.imageUrl} 
                download={`nano-banana-${selectedResult.id}.png`}
                className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-bold transition-transform hover:scale-105 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t.download}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultGallery;