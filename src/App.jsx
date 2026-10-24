import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  Compass, 
  Languages, 
  Type, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Sparkles,
  ExternalLink,
  BookMarked
} from 'lucide-react';

const THEMES = {
  twilight: {
    id: 'twilight',
    name: 'Magritte Twilight',
    bg: 'bg-[#070a13]',
    surface: 'bg-[#0f172a]/85 backdrop-blur-md border-slate-800',
    text: 'text-[#cbd5e1]',
    heading: 'text-amber-100',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400',
    border: 'border-slate-800',
    progress: 'bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700',
  },
  vellum: {
    id: 'vellum',
    name: 'Dalí Vellum',
    bg: 'bg-[#fdfbf7]',
    surface: 'bg-[#f5efe6]/90 backdrop-blur-md border-[#e5dec9]',
    text: 'text-[#292524]',
    heading: 'text-[#1c1917]',
    accent: 'text-[#b45309]',
    accentBg: 'bg-[#b45309]',
    border: 'border-[#e5dec9]',
    progress: 'bg-gradient-to-b from-[#b45309] to-[#991b1b]',
  },
  monolith: {
    id: 'monolith',
    name: 'Chirico Monolith',
    bg: 'bg-[#050505]',
    surface: 'bg-[#121212]/90 backdrop-blur-md border-[#262626]',
    text: 'text-[#e5e5e5]',
    heading: 'text-white',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400',
    border: 'border-[#262626]',
    progress: 'bg-gradient-to-b from-amber-400 to-amber-600',
  }
};

export default function App() {
  const [themeKey, setThemeKey] = useState('twilight');
  const [lang, setLang] = useState('ta'); // Default to contemporary Tamil
  const [fontSize, setFontSize] = useState(19);
  const [manifest, setManifest] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(3); // Chapter 1 starts at index 3
  const [chapterContent, setChapterContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(false);

  const theme = THEMES[themeKey];

  // Fetch manifest
  useEffect(() => {
    fetch('/books/the-invisible-man/manifest.json')
      .then(res => res.json())
      .then(data => {
        setManifest(data);
      })
      .catch(err => console.error("Could not load manifest:", err));
  }, []);

  // Fetch chapter content on chapter/lang change
  useEffect(() => {
    if (!manifest || !manifest.chapters[currentChapterIndex]) return;
    const ch = manifest.chapters[currentChapterIndex];
    setLoading(true);
    fetch(`/books/the-invisible-man/${lang}/${ch.filename}`)
      .then(res => res.text())
      .then(text => {
        setChapterContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading chapter:", err);
        setLoading(false);
      });
  }, [manifest, currentChapterIndex, lang]);

  // Track scroll progress for melting ribbon
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentChapter = manifest?.chapters[currentChapterIndex];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 relative selection:bg-amber-500/30`}>
      
      {/* Melting Bookmark Scroll Progress */}
      <div 
        className="fixed top-0 right-3 sm:right-8 z-50 w-2.5 sm:w-3 pointer-events-none transition-all duration-300"
        style={{ height: `${Math.max(48, (scrollProgress / 100) * 320)}px` }}
      >
        <div className={`w-full h-full ${theme.progress} shadow-lg rounded-b-full melting-ribbon relative`}>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-75" />
        </div>
      </div>

      {/* Atmospheric Background Shimmers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden surreal-grain">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-900/15 blur-3xl animate-drift" />
        <div className="absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-amber-900/10 blur-3xl animate-drift" style={{ animationDelay: '-5s' }} />
      </div>

      {/* Header Portal Navigation */}
      <header className={`sticky top-0 z-40 ${theme.surface} border-b ${theme.border} px-4 sm:px-8 py-3.5 transition-colors duration-500`}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className={`p-2 rounded-lg border ${theme.border} hover:bg-white/5 transition-colors focus:ring-2 focus:ring-amber-400`}
              aria-label="Open Chapter Drawer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🌌</span>
              <span className="font-display font-bold tracking-widest text-lg sm:text-xl uppercase bg-gradient-to-r from-amber-200 via-amber-100 to-amber-400 bg-clip-text text-transparent">
                Stories
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-wider px-2 py-0.5 rounded border border-amber-500/30 text-amber-300/80 font-mono">
                {manifest ? manifest.title[lang] : "Surrealist Reader"}
              </span>
            </div>
          </div>

          {/* Reader Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${theme.border} text-xs font-medium tracking-wide hover:border-amber-400/50 transition-all`}
              title="Toggle Tamil / English"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Font Sizer */}
            <div className={`hidden sm:flex items-center border ${theme.border} rounded-lg px-2 py-1 gap-1 text-xs`}>
              <button 
                onClick={() => setFontSize(Math.max(16, fontSize - 1))}
                className="px-1.5 hover:text-amber-400 transition-colors"
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-[10px] text-slate-400 font-mono">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(Math.min(26, fontSize + 1))}
                className="px-1.5 hover:text-amber-400 transition-colors"
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Theme Selector */}
            <button
              onClick={() => {
                const keys = Object.keys(THEMES);
                const nextIdx = (keys.indexOf(themeKey) + 1) % keys.length;
                setThemeKey(keys[nextIdx]);
              }}
              className={`p-2 rounded-lg border ${theme.border} hover:border-amber-400/50 transition-all`}
              title={`Theme: ${theme.name}`}
            >
              {themeKey === 'twilight' && <Moon className="w-4 h-4 text-indigo-400" />}
              {themeKey === 'vellum' && <Sun className="w-4 h-4 text-amber-600" />}
              {themeKey === 'monolith' && <Sparkles className="w-4 h-4 text-white" />}
            </button>

            {/* Ambient Sound */}
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className={`p-2 rounded-lg border ${theme.border} hover:border-amber-400/50 transition-all ${ambientAudio ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'}`}
              title={ambientAudio ? "Ambience active" : "Enable atmospheric ambience"}
            >
              {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </header>

      {/* Chapter Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className={`relative w-84 max-w-[85vw] ${theme.surface} border-r ${theme.border} h-full p-6 flex flex-col z-10 shadow-2xl overflow-y-auto`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-semibold tracking-wide text-sm">
                  {lang === 'ta' ? 'அத்தியாயங்கள்' : 'Table of Contents'}
                </h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-1.5 overflow-y-auto pr-1">
              {manifest?.chapters.map((ch, idx) => (
                <button
                  key={ch.filename}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                    idx === currentChapterIndex 
                      ? `${theme.border} bg-amber-400/15 border-amber-400/50 text-amber-300 font-medium` 
                      : `border-transparent hover:border-slate-700 hover:bg-white/5 opacity-80`
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/70">
                    Section {ch.index}
                  </div>
                  <div className={`text-xs ${lang === 'ta' ? 'font-tamil' : 'font-serif'} line-clamp-1`}>
                    {ch.title[lang]}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700/50 text-[11px] text-slate-400 flex items-center justify-between">
              <span>stories.7400000.xyz</span>
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </aside>
        </div>
      )}

      {/* Main Surrealist Reading Canvas */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
        
        {/* Book Meta Card */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/30 text-[11px] font-mono uppercase tracking-widest text-amber-400/90 mb-4 bg-amber-950/20">
            <span>{manifest ? manifest.author[lang] : "H. G. Wells"}</span>
            <span>•</span>
            <span>1897</span>
          </div>

          <h1 className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold ${theme.heading} tracking-tight leading-tight mb-3`}>
            {manifest ? manifest.title[lang] : "The Invisible Man"}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 tracking-wide font-serif italic">
            {lang === 'ta' ? "நவீன செவ்விலக்கிய உரைநடைத் தமிழாக்கம்" : "A Grotesque Romance — Duke Classics"}
          </p>
        </div>

        {/* Chapter Header */}
        <div className="flex items-center justify-between border-y border-slate-800/80 py-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80">
              {lang === 'ta' ? `பகுதி ${currentChapter?.index ?? ''}` : `Part ${currentChapter?.index ?? ''}`}
            </span>
            <h2 className={`text-lg sm:text-xl font-bold ${theme.heading} mt-0.5 ${lang === 'ta' ? 'font-tamil' : 'font-display'}`}>
              {currentChapter?.title[lang]}
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={currentChapterIndex === 0}
              onClick={() => {
                setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded border border-slate-800 hover:border-amber-400/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={!manifest || currentChapterIndex === manifest.chapters.length - 1}
              onClick={() => {
                setCurrentChapterIndex(Math.min(manifest.chapters.length - 1, currentChapterIndex + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded border border-slate-800 hover:border-amber-400/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Next chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prose Reading Canvas */}
        {loading ? (
          <div className="py-20 text-center text-slate-500 font-mono text-xs flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
            <span>Loading chapter manuscript...</span>
          </div>
        ) : (
          <article 
            className={`space-y-6 sm:space-y-8 ${lang === 'ta' ? 'font-tamil leading-[2.1]' : 'font-serif leading-[1.85]'} tracking-normal transition-all duration-300`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {chapterContent.split('\n\n').map((paragraph, pIdx) => {
              const cleanP = paragraph.trim();
              if (!cleanP) return null;
              if (cleanP.startsWith('#')) {
                return (
                  <h3 key={pIdx} className="font-display text-xl sm:text-2xl font-bold text-amber-200 mt-8 mb-4 border-b border-slate-800 pb-2">
                    {cleanP.replace(/^#+\s*/, '')}
                  </h3>
                );
              }
              if (cleanP.startsWith('>')) {
                return (
                  <blockquote key={pIdx} className="border-l-2 border-amber-400/70 pl-4 py-1 italic text-slate-300 bg-amber-400/5 rounded-r">
                    {cleanP.replace(/^>\s*/, '')}
                  </blockquote>
                );
              }
              return (
                <p key={pIdx} className="text-justify first-letter:float-left first-letter:text-3xl sm:first-letter:text-4xl first-letter:pr-2 first-letter:font-display first-letter:text-amber-400">
                  {cleanP}
                </p>
              );
            })}
          </article>
        )}

        {/* Chapter Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex items-center justify-between">
          <button
            disabled={currentChapterIndex === 0}
            onClick={() => {
              setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 disabled:opacity-20 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{lang === 'ta' ? 'முந்தைய அத்தியாயம்' : 'Previous'}</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {currentChapterIndex + 1} / {manifest ? manifest.chapters.length : 32}
          </span>

          <button
            disabled={!manifest || currentChapterIndex === manifest.chapters.length - 1}
            onClick={() => {
              setCurrentChapterIndex(Math.min(manifest.chapters.length - 1, currentChapterIndex + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 disabled:opacity-20 transition-colors"
          >
            <span>{lang === 'ta' ? 'அடுத்த அத்தியாயம்' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-800/60 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Stories Portal • Public Domain Classics</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/rubanbalaji-g/stories" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <span>stories.7400000.xyz</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
