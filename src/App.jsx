import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  Sparkles, 
  Languages, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Compass, 
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import invisibleManData from './theInvisibleMan.json';

const THEMES = {
  twilight: {
    id: 'twilight',
    name: 'Magritte Twilight',
    bg: 'bg-[#060913]',
    canvasBg: 'surreal-canvas-bg',
    card: 'bg-[#0f172a]/80 border-slate-800 backdrop-blur-xl',
    cardHover: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    text: 'text-[#e2e8f0]',
    heading: 'text-amber-100',
    accent: 'text-amber-400',
    accentBorder: 'border-slate-800',
    border: 'border-slate-800',
    progress: 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700',
  },
  vellum: {
    id: 'vellum',
    name: 'Dalí Vellum',
    bg: 'bg-[#fcfaf6]',
    canvasBg: 'vellum-canvas-bg',
    card: 'bg-[#f4eee4]/90 border-[#e3d7bf] backdrop-blur-xl',
    cardHover: 'hover:border-[#b45309]/50 hover:shadow-[0_0_30px_rgba(180,83,9,0.12)]',
    text: 'text-[#292524]',
    heading: 'text-[#1c1917]',
    accent: 'text-[#b45309]',
    accentBorder: 'border-[#e3d7bf]',
    border: 'border-[#e3d7bf]',
    progress: 'bg-gradient-to-b from-[#d97706] to-[#991b1b]',
  },
  monolith: {
    id: 'monolith',
    name: 'Chirico Monolith',
    bg: 'bg-[#050505]',
    canvasBg: 'bg-[#0a0a0a]',
    card: 'bg-[#121212]/90 border-neutral-800 backdrop-blur-xl',
    cardHover: 'hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]',
    text: 'text-neutral-200',
    heading: 'text-white',
    accent: 'text-amber-400',
    accentBorder: 'border-neutral-800',
    border: 'border-neutral-800',
    progress: 'bg-gradient-to-b from-neutral-200 via-amber-400 to-neutral-500',
  }
};

export default function App() {
  const [view, setView] = useState('library'); // 'library' | 'reader'
  const [currentChapterIndex, setCurrentChapterIndex] = useState(3); // Start at Chapter 1
  const [themeKey, setThemeKey] = useState('twilight');
  const [lang, setLang] = useState('ta'); // Default to Tamil
  const [fontSize, setFontSize] = useState(19);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(false);

  const theme = THEMES[themeKey];
  const manifest = invisibleManData;
  const currentChapter = manifest.chapters[currentChapterIndex];

  // Instant content resolution from bundled memory - ZERO network delay
  const rawContent = useMemo(() => {
    if (!currentChapter) return '';
    const chapterData = manifest.content[currentChapter.filename];
    return chapterData ? chapterData[lang] : '';
  }, [currentChapter, lang]);

  // Track scroll progress for melting ribbon
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openBook = () => {
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-500 relative font-serif`}>

      {/* Atmospheric Background Shimmers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-indigo-900/15 blur-3xl animate-celestial" />
        <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full bg-amber-600/10 blur-3xl animate-celestial" style={{ animationDelay: '-8s' }} />
        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Melting Bookmark (Only in Reader) */}
      {view === 'reader' && (
        <div 
          className="fixed top-0 right-3 sm:right-8 z-50 w-2.5 sm:w-3 pointer-events-none transition-all duration-300"
          style={{ height: `${Math.max(50, (scrollProgress / 100) * 320)}px` }}
        >
          <div className={`w-full h-full ${theme.progress} shadow-2xl rounded-b-full melting-ribbon relative`}>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-amber-300 animate-ping opacity-75" />
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <header className={`sticky top-0 z-40 ${theme.card} border-b ${theme.border} px-4 sm:px-8 py-3.5 transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {view === 'reader' && (
              <button
                onClick={() => setView('library')}
                className={`p-2 rounded-xl border ${theme.accentBorder} hover:bg-white/10 transition-all flex items-center gap-1.5 text-xs font-mono`}
                title="Return to Gallery"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Gallery</span>
              </button>
            )}

            {view === 'reader' && (
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className={`p-2 rounded-xl border ${theme.accentBorder} hover:bg-white/10 transition-colors`}
                aria-label="Table of Contents"
              >
                <Menu className="w-4 h-4 text-amber-400" />
              </button>
            )}

            <div 
              onClick={() => setView('library')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-indigo-600 to-purple-800 p-0.5 shadow-lg group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#070a13] rounded-[6px] flex items-center justify-center text-sm">
                  🌌
                </div>
              </div>
              <div>
                <span className="font-display font-bold tracking-widest text-lg uppercase bg-gradient-to-r from-amber-200 via-amber-100 to-amber-400 bg-clip-text text-transparent">
                  STORIES
                </span>
                <span className="hidden md:inline-block ml-2 text-[10px] uppercase font-mono tracking-widest text-amber-400/70 border-l border-amber-500/30 pl-2">
                  Classic Reader
                </span>
              </div>
            </div>
          </div>

          {/* Reader / Gallery Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ta' ? 'en' : 'ta')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${theme.accentBorder} text-xs font-medium tracking-wide hover:border-amber-400 transition-all shadow-sm`}
              title="Toggle Tamil / English"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span className="font-sans font-semibold">{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Font Sizer */}
            {view === 'reader' && (
              <div className={`hidden sm:flex items-center border ${theme.accentBorder} rounded-xl px-2 py-1 gap-1 text-xs`}>
                <button 
                  onClick={() => setFontSize(Math.max(16, fontSize - 1))}
                  className="px-1.5 hover:text-amber-400 transition-colors font-mono"
                  title="Smaller font"
                >
                  A-
                </button>
                <span className="text-[10px] text-slate-400 font-mono">{fontSize}px</span>
                <button 
                  onClick={() => setFontSize(Math.min(26, fontSize + 1))}
                  className="px-1.5 hover:text-amber-400 transition-colors font-mono"
                  title="Larger font"
                >
                  A+
                </button>
              </div>
            )}

            {/* Theme Cycle Button */}
            <button
              onClick={() => {
                const keys = Object.keys(THEMES);
                const next = keys[(keys.indexOf(themeKey) + 1) % keys.length];
                setThemeKey(next);
              }}
              className={`p-2 rounded-xl border ${theme.accentBorder} hover:border-amber-400 transition-all`}
              title={`Switch Theme: ${theme.name}`}
            >
              {themeKey === 'twilight' && <Moon className="w-4 h-4 text-indigo-400" />}
              {themeKey === 'vellum' && <Sun className="w-4 h-4 text-amber-600" />}
              {themeKey === 'monolith' && <Sparkles className="w-4 h-4 text-neutral-100" />}
            </button>

            {/* Ambient Sound */}
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className={`p-2 rounded-xl border ${theme.accentBorder} hover:border-amber-400 transition-all ${ambientAudio ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'}`}
              title={ambientAudio ? "Ambience active" : "Enable ambient ticking / mist"}
            >
              {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </header>

      {/* VIEW 1: CLEAN HOMEPAGE & BOOK GALLERY */}
      {view === 'library' && (
        <main className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-amber-100">
              {lang === 'ta' ? 'செவ்விலக்கியக் கூடம்' : 'The Classic Library'}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-serif">
              {lang === 'ta' 
                ? 'பொதுவெளி செவ்வியல் இலக்கியங்களை இருமொழிகளிலும் வாசிக்கவும்.' 
                : 'Distraction-free bilingual reader for classic public-domain literature.'}
            </p>
          </div>

          {/* Book Card Display with Authentic Cover Art */}
          <div className="max-w-md mx-auto">
            <div 
              onClick={openBook}
              className={`group relative rounded-2xl border ${theme.card} ${theme.cardHover} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 book-spine-3d cursor-pointer hover:-translate-y-2`}
            >
              <div>
                {/* Authentic 1897 Book Cover Image */}
                <div className="w-full aspect-[2/3] rounded-xl overflow-hidden mb-6 relative border border-slate-700/60 shadow-2xl bg-black">
                  <img 
                    src="/invisible-man-cover.jpg" 
                    alt="The Invisible Man Original Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono flex justify-between">
                    <span>H. G. Wells</span>
                    <span>1897</span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-amber-400/80">
                    <span>{manifest.author[lang]}</span>
                    <span>32 Chapters</span>
                  </div>

                  <h2 className="font-display text-2xl font-bold group-hover:text-amber-200 transition-colors">
                    {manifest.title[lang]}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                    {lang === 'ta' 
                      ? 'கடும் பனிப்புயலின் நடுவே உடலெங்கும் துணிப்பட்டுகளால் சுற்றப்பட்ட ஒரு விசித்திர மனிதன் தனிமையான கிராமத்து விடுதிக்கு வருகிறான்...'
                      : 'A strange guest wrapped entirely in linen bandages arrives at a lonely inn during a winter blizzard, bearing dark alchemy and an unseen secret.'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  தமிழ் ⇄ English
                </span>
                
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-sans font-bold text-xs group-hover:bg-amber-300 transition-colors shadow-lg">
                  <span>{lang === 'ta' ? 'வாசிக்க' : 'Read Now'}</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          </div>

        </main>
      )}

      {/* VIEW 2: DISTRACTION-FREE IMMERSIVE READER */}
      {view === 'reader' && (
        <main className="max-w-3xl mx-auto px-5 sm:px-8 py-10 sm:py-16 relative z-10">
          
          {/* Work Heading */}
          <div className="text-center mb-10">
            <h1 className={`font-display text-2xl sm:text-4xl font-bold ${theme.heading} tracking-tight mb-1`}>
              {manifest.title[lang]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-serif">
              {manifest.author[lang]} • 1897
            </p>
          </div>

          {/* Chapter Header Banner */}
          <div className="flex items-center justify-between border-y border-slate-800/80 py-3.5 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80">
                {lang === 'ta' ? `பகுதி ${currentChapter?.index ?? ''}` : `Part ${currentChapter?.index ?? ''}`}
              </span>
              <h2 className={`text-base sm:text-lg font-bold ${theme.heading} mt-0.5 ${lang === 'ta' ? 'font-sans' : 'font-display'}`}>
                {currentChapter?.title[lang]}
              </h2>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentChapterIndex === 0}
                onClick={() => {
                  setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="p-2 rounded-xl border border-slate-800 hover:border-amber-400/40 disabled:opacity-20 disabled:pointer-events-none transition-all"
                title="Previous section"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentChapterIndex === manifest.chapters.length - 1}
                onClick={() => {
                  setCurrentChapterIndex(Math.min(manifest.chapters.length - 1, currentChapterIndex + 1));
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="p-2 rounded-xl border border-slate-800 hover:border-amber-400/40 disabled:opacity-20 disabled:pointer-events-none transition-all"
                title="Next section"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prose Reading Canvas with Clean Normal Typography (NO Colored First-Letter Slop) */}
          <article 
            className={`space-y-6 sm:space-y-7 ${lang === 'ta' ? 'font-sans leading-[2.1]' : 'font-serif leading-[1.85]'} tracking-normal transition-all duration-300`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {rawContent.split('\n\n').map((paragraph, pIdx) => {
              const clean = paragraph.trim();
              if (!clean) return null;
              if (clean.startsWith('#')) {
                return (
                  <h3 key={pIdx} className="font-display text-lg sm:text-xl font-bold text-amber-200 mt-8 mb-4 border-b border-slate-800 pb-2">
                    {clean.replace(/^#+\s*/, '')}
                  </h3>
                );
              }
              if (clean.startsWith('>')) {
                return (
                  <blockquote key={pIdx} className="border-l-2 border-amber-400/70 pl-4 py-1 italic text-slate-300 bg-amber-400/5 rounded-r">
                    {clean.replace(/^>\s*/, '')}
                  </blockquote>
                );
              }
              // Normal clean paragraph rendering
              return (
                <p key={pIdx} className="text-justify indent-6">
                  {clean}
                </p>
              );
            })}
          </article>

          {/* Chapter Navigation Footer */}
          <div className="mt-14 pt-6 border-t border-slate-800/80 flex items-center justify-between">
            <button
              disabled={currentChapterIndex === 0}
              onClick={() => {
                setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 disabled:opacity-20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{lang === 'ta' ? 'முந்தைய அத்தியாயம்' : 'Previous'}</span>
            </button>

            <span className="text-xs font-mono text-slate-500">
              {currentChapterIndex + 1} / {manifest.chapters.length}
            </span>

            <button
              disabled={currentChapterIndex === manifest.chapters.length - 1}
              onClick={() => {
                setCurrentChapterIndex(Math.min(manifest.chapters.length - 1, currentChapterIndex + 1));
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 disabled:opacity-20 transition-colors"
            >
              <span>{lang === 'ta' ? 'அடுத்த அத்தியாயம்' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>
      )}

      {/* Chapter Table of Contents Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className={`relative w-84 max-w-[85vw] ${theme.card} border-r ${theme.border} h-full p-6 flex flex-col z-10 shadow-2xl overflow-y-auto`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-semibold tracking-wide text-sm">
                  {lang === 'ta' ? 'அத்தியாயங்கள்' : 'Table of Contents'}
                </h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-1.5 overflow-y-auto pr-1">
              {manifest.chapters.map((ch, idx) => (
                <button
                  key={ch.filename}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    idx === currentChapterIndex 
                      ? `${theme.accentBorder} bg-amber-400/15 text-amber-300 font-medium` 
                      : `border-transparent hover:border-slate-700 hover:bg-white/5 opacity-80`
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400/70">
                    Section {ch.index}
                  </div>
                  <div className={`text-xs ${lang === 'ta' ? 'font-sans' : 'font-serif'} line-clamp-1`}>
                    {ch.title[lang]}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700/50 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>stories.7400000.xyz</span>
              <Compass className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </aside>
        </div>
      )}

      {/* Clean Global Footer */}
      <footer className="mt-20 border-t border-slate-800/60 py-8 text-center text-xs text-slate-500 font-mono relative z-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} STORIES • Public Domain Classic Literature</p>
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
