import React, { useState, useEffect } from 'react';
import { STYLES, TRANSLATIONS } from './constants';
import { GenerationResult, Language, Theme } from './types';
import { generateStyledImage } from './services/geminiService';
import StyleCard from './components/StyleCard';
import InputSection from './components/InputSection';
import ResultGallery from './components/ResultGallery';

const App: React.FC = () => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [baseImage, setBaseImage] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  // Apply Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleStyle = (id: string) => {
    setSelectedStyles(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id) 
        : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || selectedStyles.length === 0) return;

    setIsGenerating(true);
    setError(null);
    
    const generatePromises = selectedStyles.map(async (styleId) => {
      const style = STYLES.find(s => s.id === styleId);
      if (!style) return null;

      try {
        const imageUrl = await generateStyledImage(prompt, style.promptInstruction, baseImage);
        
        const result: GenerationResult = {
          id: Date.now().toString() + Math.random().toString(),
          styleId: style.id,
          imageUrl,
          prompt,
          timestamp: Date.now()
        };
        return result;
      } catch (err) {
        console.error(`Error generating style ${style.name}:`, err);
        return null; // Return null on failure
      }
    });

    try {
      const newResults = await Promise.all(generatePromises);
      const successfulResults = newResults.filter((r): r is GenerationResult => r !== null);
      
      const t = TRANSLATIONS[language];
      if (successfulResults.length === 0) {
        setError(t.errorApiKey);
      } else {
        setResults(prev => [...successfulResults, ...prev]);
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } catch (globalErr) {
      setError(TRANSLATIONS[language].errorGeneric);
    } finally {
      setIsGenerating(false);
    }
  };

  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 text-gray-900 dark:text-white font-sans selection:bg-yellow-400 selection:text-black transition-colors duration-500">
      {/* Background Ambience (Dark Mode Only) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-600/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Controls (Theme & Lang) */}
        <div className="absolute top-6 right-6 flex items-center space-x-4">
           {/* Language Switch */}
           <button 
             onClick={() => setLanguage(l => l === 'en' ? 'zh' : 'en')}
             className="px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all font-medium text-sm"
           >
             {language === 'en' ? '中文' : 'English'}
           </button>
           
           {/* Theme Switch */}
           <button 
             onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
             className="p-2 rounded-full bg-white/10 dark:bg-white/5 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-all"
             aria-label="Toggle Theme"
           >
             {theme === 'light' ? (
                // Moon icon
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
             ) : (
                // Sun icon
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             )}
           </button>
        </div>

        {/* Header */}
        <header className="mb-16 text-center mt-8 md:mt-0">
          <div className="inline-block p-2 px-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md mb-6 animate-fadeInDown">
            <span className="text-yellow-600 dark:text-yellow-400 font-bold tracking-wider text-xs uppercase">{t.poweredBy}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-500 animate-fadeInUp">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            {t.subtitle}
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Style Selection */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t.selectStyles}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {selectedStyles.length} {t.selected}
              </span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {STYLES.map((style) => (
                <StyleCard 
                  key={style.id} 
                  style={style} 
                  isSelected={selectedStyles.includes(style.id)} 
                  onSelect={toggleStyle} 
                  language={language}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Input & Actions */}
          <div className="lg:col-span-4">
             <div className="lg:sticky lg:top-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t.inputTitle}</h2>
                <InputSection 
                  prompt={prompt}
                  setPrompt={setPrompt}
                  baseImage={baseImage}
                  setBaseImage={setBaseImage}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  selectedCount={selectedStyles.length}
                  language={language}
                />
                
                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 rounded-xl text-sm">
                    {error}
                  </div>
                )}
             </div>
          </div>
        </main>

        {/* Results Section */}
        <div className="mt-24">
          <ResultGallery results={results} language={language} />
        </div>

      </div>
    </div>
  );
};

export default App;