import React, { useRef, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface InputSectionProps {
  prompt: string;
  setPrompt: (val: string) => void;
  baseImage: File | null;
  setBaseImage: (file: File | null) => void;
  isGenerating: boolean;
  onGenerate: () => void;
  selectedCount: number;
  language: Language;
}

const InputSection: React.FC<InputSectionProps> = ({
  prompt,
  setPrompt,
  baseImage,
  setBaseImage,
  isGenerating,
  onGenerate,
  selectedCount,
  language
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const t = TRANSLATIONS[language];

  // Paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // Don't intercept if pasting into a text input (except the prompt textarea is fine usually, but we prioritize image paste)
      // Actually, if pasting text into prompt, we should let it happen.
      // We check if the paste contains a file.
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          e.preventDefault(); // Prevent default if we found an image
          const blob = items[i].getAsFile();
          if (blob) {
            setBaseImage(blob);
            // Optional: Provide visual feedback or toast
          }
          break; // Only take the first image
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [setBaseImage]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setBaseImage(file);
    }
  };

  const removeImage = () => {
    setBaseImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6 bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-none">
      
      {/* Text Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
          {t.promptLabel} <span className="text-red-500 dark:text-red-400">*</span>
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={t.promptPlaceholder}
          className="w-full h-32 bg-gray-50 dark:bg-black/30 border border-gray-300 dark:border-white/20 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none text-lg"
          disabled={isGenerating}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
          {t.imageLabel}
        </label>
        
        {!baseImage ? (
          <div 
            className={`
              relative border-2 border-dashed rounded-xl h-32 flex flex-col items-center justify-center transition-colors cursor-pointer
              ${dragActive ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-400/10" : "border-gray-300 dark:border-white/20 hover:border-gray-400 dark:hover:border-white/40 hover:bg-gray-50 dark:hover:bg-white/5"}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <div className="flex flex-col items-center space-y-2 text-gray-500 dark:text-gray-400 text-center px-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">{t.uploadText}</span>
            </div>
          </div>
        ) : (
          <div className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-white/20 bg-gray-100 dark:bg-black h-32 w-full flex items-center justify-center">
             {/* Simple preview */}
             <img 
               src={URL.createObjectURL(baseImage)} 
               alt="Reference" 
               className="h-full w-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={(e) => { e.stopPropagation(); removeImage(); }}
                  className="bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full backdrop-blur-md transition-transform transform hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
             </div>
             <span className="absolute bottom-2 left-3 text-xs text-white/80 font-mono bg-black/50 px-2 py-1 rounded">
                {baseImage.name}
             </span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim() || selectedCount === 0}
        className={`
          w-full py-4 rounded-xl font-bold text-lg tracking-wide uppercase transition-all duration-300 relative overflow-hidden
          ${(isGenerating || !prompt.trim() || selectedCount === 0)
            ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-50'
            : 'bg-yellow-400 text-black hover:bg-yellow-300 shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_50px_rgba(250,204,21,0.6)] transform hover:-translate-y-1'
          }
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{t.generating}</span>
          </span>
        ) : (
          <span>
            {t.generate} {selectedCount > 0 ? `(${selectedCount})` : ''}
          </span>
        )}
      </button>

      {(!prompt.trim() && selectedCount > 0) && (
        <p className="text-red-500 dark:text-red-400/80 text-center text-sm">{t.noPrompt}</p>
      )}
      {(selectedCount === 0) && (
        <p className="text-yellow-600 dark:text-yellow-400/80 text-center text-sm">{t.noStyle}</p>
      )}
    </div>
  );
};

export default InputSection;