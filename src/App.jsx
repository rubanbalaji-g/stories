import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Moon, 
  Sun, 
  Sparkles, 
  Languages, 
  Type, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX,
  Compass, 
  ExternalLink,
  ArrowLeft,
  Eye,
  Scroll,
  Clock,
  Layers,
  Search
} from 'lucide-react';

const THEMES = {
  twilight: {
    id: 'twilight',
    name: 'Magritte Twilight',
    bg: 'bg-[#050811]',
    canvasBg: 'surreal-canvas-bg',
    card: 'bg-[#0f172a]/70 border-amber-500/20 backdrop-blur-xl',
    cardHover: 'hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)]',
    text: 'text-[#e2e8f0]',
    textMuted: 'text-slate-400',
    heading: 'text-amber-100',
    accent: 'text-amber-400',
    accentBorder: 'border-amber-400/40',
    progress: 'bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700',
  },
  vellum: {
    id: 'vellum',
    name: 'Dalí Vellum',
    bg: 'bg-[#fdfbf7]',
    canvasBg: 'vellum-canvas-bg',
    card: 'bg-[#f5efe6]/80 border-[#d4c3a3] backdrop-blur-xl',
    cardHover: 'hover:border-[#b45309]/60 hover:shadow-[0_0_35px_rgba(180,83,9,0.15)]',
    text: 'text-[#292524]',
    textMuted: 'text-[#78716c]',
    heading: 'text-[#1c1917]',
    accent: 'text-[#b45309]',
    accentBorder: 'border-[#b45309]/40',
    progress: 'bg-gradient-to-b from-[#d97706] to-[#991b1b]',
  },
  monolith: {
    id: 'monolith',
    name: 'Chirico Monolith',
    bg: 'bg-[#030303]',
    canvasBg: 'bg-[#0a0a0a]',
    card: 'bg-[#141414]/90 border-neutral-800 backdrop-blur-xl',
    cardHover: 'hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(255,255,255,0.1)]',
    text: 'text-neutral-200',
    textMuted: 'text-neutral-400',
    heading: 'text-white',
    accent: 'text-amber-400',
    accentBorder: 'border-neutral-700',
    progress: 'bg-gradient-to-b from-neutral-200 via-amber-400 to-neutral-500',
  }
};

// Curated books showcase
const LIBRARY = [
  {
    id: 'the-invisible-man',
    title: {
      en: 'The Invisible Man',
      ta: 'உருவமற்ற மனிதன்'
    },
    author: {
      en: 'H. G. Wells',
      ta: 'ஹெச். ஜி. வெல்ஸ்'
    },
    year: 1897,
    genres: ['Science Fiction', 'Surrealist Horror', 'Psychological'],
    summary: {
      en: 'A mysterious stranger wrapped entirely in linen bandages arrives at a lonely country inn during a winter blizzard, bearing dark alchemy and an unseen terror.',
      ta: 'கடும் பனிப்புயலின் நடுவே உடலெங்கும் துணிப்பட்டுகளால் சுற்றப்பட்ட ஒரு விசித்திர மனிதன் தனிமையான கிராமத்து விடுதிக்கு வருகிறான். அவனுடன் தொடரும் ரசவாதமும், கண்களுக்குப் புலப்படாத பயமும்...'
    },
    manifestUrl: '/books/the-invisible-man/manifest.json',
    coverArt: 'invisible-man',
    accentHue: 'amber',
    ready: true
  },
  {
    id: 'the-metamorphosis',
    title: {
      en: 'The Metamorphosis',
      ta: 'உருமாற்றம்'
    },
    author: {
      en: 'Franz Kafka',
      ta: 'பிரான்ஸ் காஃப்கா'
    },
    year: 1915,
    genres: ['Absurdism', 'Existential', 'Classics'],
    summary: {
      en: 'One morning, Gregor Samsa woke from anxious dreams to discover he had been transformed in his bed into a monstrous, gargantuan insect.',
      ta: 'ஒரு நாள் காலை அமைதியற்ற கனவுகளிலிருந்து விழித்த கிரிகோர் சாம்சா, படுக்கையில் ஒரு விசித்திர பூச்சியாக தான் உருமாறியிருப்பதைக் கண்டான்.'
    },
    coverArt: 'kafka',
    accentHue: 'emerald',
    ready: false
  },
  {
    id: 'alice-in-wonderland',
    title: {
      en: "Alice's Adventures in Wonderland",
      ta: 'அற்புத உலகத்தில் ஆலிஸ்'
    },
    author: {
      en: 'Lewis Carroll',
      ta: 'லூயிஸ் கரோல்'
    },
    year: 1865,
    genres: ['Dream Logic', 'Surreal Fantasy'],
    summary: {
      en: 'A plunge down a rabbit hole into a subterranean realm of melting logic, grinning felines, and backwards pocket watches.',
      ta: 'முயல் வளைக்குள் விழுந்து உருகும் தர்க்கங்கள், புன்னகைக்கும் பூனைகள் மற்றும் காலமற்ற உலகத்தின் வழியே ஒரு கனவுப் பயணம்.'
    },
    coverArt: 'alice',
    accentHue: 'purple',
    ready: false
  }
];

export default function App() {
  const [view, setView] = useState('library'); // 'library' | 'reader'
  const [activeBook, setActiveBook] = useState(LIBRARY[0]);
  const [manifest, setManifest] = useState(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(3);
  const [chapterContent, setChapterContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [themeKey, setThemeKey] = useState('twilight');
  const [lang, setLang] = useState('ta');
  const [fontSize, setFontSize] = useState(19);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(false);

  const theme = THEMES[themeKey];

  // Fetch manifest when active book selected
  useEffect(() => {
    if (activeBook && activeBook.manifestUrl) {
      fetch(activeBook.manifestUrl)
        .then(res => res.json())
        .then(data => setManifest(data))
        .catch(err => console.error("Error fetching manifest:", err));
    }
  }, [activeBook]);

  // Fetch chapter text when reading
  useEffect(() => {
    if (view !== 'reader' || !manifest || !manifest.chapters[currentChapterIndex]) return;
    const ch = manifest.chapters[currentChapterIndex];
    setLoading(true);
    fetch(`/books/${activeBook.id}/${lang}/${ch.filename}`)
      .then(res => res.text())
      .then(text => {
        setChapterContent(text);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error loading chapter:", err);
        setLoading(false);
      });
  }, [view, manifest, currentChapterIndex, lang, activeBook]);

  // Track scroll for melting ribbon
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

  const openBook = (book) => {
    if (!book.ready) return;
    setActiveBook(book);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentChapter = manifest?.chapters[currentChapterIndex];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} transition-colors duration-700 relative selection:bg-amber-500/30 font-serif`}>

      {/* Atmospheric Dreamscape Shimmer Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-[35rem] h-[35rem] rounded-full bg-indigo-900/20 blur-3xl animate-celestial" />
        <div className="absolute top-1/3 -right-40 w-[40rem] h-[40rem] rounded-full bg-amber-600/10 blur-3xl animate-celestial" style={{ animationDelay: '-8s' }} />
        <div className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] rounded-full bg-blue-900/15 blur-3xl animate-celestial" style={{ animationDelay: '-14s' }} />
        
        {/* Subtle grid of dreams */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Melting Bookmark (Only in Reader View) */}
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

      {/* Surrealist Floating Header */}
      <header className={`sticky top-0 z-40 ${theme.card} border-b px-4 sm:px-8 py-3.5 transition-colors duration-500`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand & Portal Gateway */}
          <div className="flex items-center gap-3">
            {view === 'reader' && (
              <button
                onClick={() => setView('library')}
                className={`p-2 rounded-xl border ${theme.accentBorder} hover:bg-white/10 transition-all flex items-center gap-1.5 text-xs font-mono`}
                title="Return to Surrealist Gallery"
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
                  Metaphysical Reader
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
              <span className="font-sans">{lang === 'ta' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Font Sizer (Only in Reader) */}
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

            {/* Ambient Soundscape */}
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

      {/* VIEW 1: SURREALIST GALLERY / HOMEPAGE */}
      {view === 'library' && (
        <main className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          
          {/* Surreal Hero Presentation */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 text-xs font-mono uppercase tracking-widest text-amber-300/90 mb-6 bg-amber-950/30 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ta' ? 'பொதுவெளி செவ்விலக்கியக் கூடாரம்' : 'The Metaphysical Library'}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 bg-gradient-to-b from-white via-amber-100 to-amber-300/70 bg-clip-text text-transparent">
              {lang === 'ta' ? 'கனவுவெளிக் கதைக் கூடம்' : 'Doors That Open Into The Sky'}
            </h1>

            <p className="text-base sm:text-xl text-slate-300/90 leading-relaxed font-serif italic max-w-2xl mx-auto">
              {lang === 'ta' 
                ? 'காலத்தைக் கடந்த செவ்வியல் இலக்கியங்களை நவீன இலக்கியத் தமிழிலும் மூல மொழியிலும் அனுபவிக்க ஒரு கனவுவெளி வாசகத் தளம்.' 
                : 'A surrealist literary sanctuary for timeless public-domain masterpieces. Step through the doorway into bilingual immersion.'}
            </p>

            {/* Surrealist Magritte Motif Decorative Line */}
            <div className="mt-8 flex items-center justify-center gap-3 text-amber-400/40">
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber-400/50" />
              <span className="text-lg">☁️</span>
              <span className="text-xl">🎩</span>
              <span className="text-lg">☁️</span>
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber-400/50" />
            </div>
          </div>

          {/* Book Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {LIBRARY.map((book) => {
              const isAvailable = book.ready;
              return (
                <div 
                  key={book.id}
                  onClick={() => openBook(book)}
                  className={`group relative rounded-2xl border ${theme.card} ${theme.cardHover} p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 book-spine-3d ${isAvailable ? 'cursor-pointer hover:-translate-y-2' : 'opacity-70 cursor-not-allowed'}`}
                >
                  {/* Surrealist Floating Glow Accent */}
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md pointer-events-none" />

                  <div>
                    {/* Artistic Book Cover Canvas */}
                    <div className="w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 relative border border-slate-700/60 shadow-2xl bg-gradient-to-b from-slate-900 to-black flex flex-col justify-between p-6">
                      
                      {/* Cover Surrealist Motifs */}
                      {book.coverArt === 'invisible-man' && (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950 via-slate-950 to-black opacity-90" />
                          <div className="relative z-10 flex justify-between items-start text-amber-400/60 font-mono text-[10px] uppercase tracking-widest">
                            <span>Duke Classics</span>
                            <span>1897</span>
                          </div>
                          
                          {/* Surreal Invisible Man Motif */}
                          <div className="relative z-10 my-auto text-center py-4">
                            <div className="inline-block relative">
                              {/* Floating Hat & Dark Spectacles */}
                              <div className="text-4xl sm:text-5xl animate-surreal-float">🎩</div>
                              <div className="text-2xl mt-1 tracking-widest text-amber-400 opacity-90">🕶️</div>
                              <div className="w-16 h-0.5 bg-amber-400/40 mx-auto mt-2 rounded-full blur-[0.5px]" />
                            </div>
                            <div className="text-[11px] font-mono tracking-widest uppercase text-amber-300/80 mt-3">
                              The Unseen Physicist
                            </div>
                          </div>

                          <div className="relative z-10 border-t border-amber-400/20 pt-3 flex justify-between items-end">
                            <div>
                              <div className="text-[10px] text-slate-400 uppercase font-mono">Bilingual Edition</div>
                              <div className="text-xs text-amber-300 font-sans font-medium">தமிழ் ⇄ English</div>
                            </div>
                            <div className="text-xl">🚪</div>
                          </div>
                        </>
                      )}

                      {book.coverArt === 'kafka' && (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950 via-neutral-950 to-black opacity-90" />
                          <div className="relative z-10 flex justify-between items-start text-emerald-400/60 font-mono text-[10px] uppercase tracking-widest">
                            <span>Archival Classic</span>
                            <span>1915</span>
                          </div>
                          <div className="relative z-10 my-auto text-center py-4">
                            <div className="text-5xl animate-surreal-float">🪲</div>
                            <div className="text-[11px] font-mono tracking-widest uppercase text-emerald-300/80 mt-3">
                              The Chitin Dream
                            </div>
                          </div>
                          <div className="relative z-10 border-t border-emerald-400/20 pt-3 text-[10px] text-slate-400 font-mono">
                            Coming to Portal
                          </div>
                        </>
                      )}

                      {book.coverArt === 'alice' && (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950 via-neutral-950 to-black opacity-90" />
                          <div className="relative z-10 flex justify-between items-start text-purple-400/60 font-mono text-[10px] uppercase tracking-widest">
                            <span>Dream Logic</span>
                            <span>1865</span>
                          </div>
                          <div className="relative z-10 my-auto text-center py-4">
                            <div className="text-5xl animate-surreal-float">⏳</div>
                            <div className="text-[11px] font-mono tracking-widest uppercase text-purple-300/80 mt-3">
                              Melting Pocketwatches
                            </div>
                          </div>
                          <div className="relative z-10 border-t border-purple-400/20 pt-3 text-[10px] text-slate-400 font-mono">
                            Coming to Portal
                          </div>
                        </>
                      )}

                    </div>

                    {/* Book Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-amber-400/80">
                        <span>{book.author[lang]}</span>
                        <span>{book.year}</span>
                      </div>

                      <h2 className="font-display text-xl sm:text-2xl font-bold group-hover:text-amber-200 transition-colors">
                        {book.title[lang]}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                        {book.summary[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                      {isAvailable ? '32 Chapters • Full Text' : 'In Preparation'}
                    </span>
                    
                    {isAvailable ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-sans font-bold text-xs group-hover:bg-amber-300 transition-colors shadow-lg">
                        <span>{lang === 'ta' ? 'வாசிக்க' : 'Read'}</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-mono italic">
                        Archived
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </main>
      )}

      {/* VIEW 2: SURREALIST IMMERSIVE READER */}
      {view === 'reader' && (
        <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
          
          {/* Work Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <button
              onClick={() => setView('library')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/30 text-[11px] font-mono uppercase tracking-widest text-amber-400/90 mb-4 bg-amber-950/20 hover:bg-amber-900/30 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{lang === 'ta' ? 'நூலகக் கூடத்திற்குத் திரும்பு' : 'Return to Gallery'}</span>
            </button>

            <h1 className={`font-display text-3xl sm:text-5xl font-bold ${theme.heading} tracking-tight leading-tight mb-2`}>
              {manifest ? manifest.title[lang] : activeBook.title[lang]}
            </h1>
            <p className="text-sm sm:text-base text-slate-400 tracking-wide font-serif italic">
              {manifest ? `${manifest.author[lang]} • 1897` : activeBook.author[lang]}
            </p>
          </div>

          {/* Chapter Header Banner */}
          <div className="flex items-center justify-between border-y border-slate-800/80 py-4 mb-10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80">
                {lang === 'ta' ? `பகுதி ${currentChapter?.index ?? ''}` : `Part ${currentChapter?.index ?? ''}`}
              </span>
              <h2 className={`text-lg sm:text-xl font-bold ${theme.heading} mt-0.5 ${lang === 'ta' ? 'font-sans' : 'font-display'}`}>
                {currentChapter?.title[lang]}
              </h2>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentChapterIndex === 0}
                onClick={() => {
                  setCurrentChapterIndex(Math.max(0, currentChapterIndex - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2 rounded-xl border border-slate-800 hover:border-amber-400/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Previous section"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!manifest || currentChapterIndex === manifest.chapters.length - 1}
                onClick={() => {
                  setCurrentChapterIndex(Math.min(manifest.chapters.length - 1, currentChapterIndex + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-2 rounded-xl border border-slate-800 hover:border-amber-400/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="Next section"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prose Reading Canvas */}
          {loading ? (
            <div className="py-24 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 animate-spin text-amber-400" />
              <span>Summoning manuscript from the ether...</span>
            </div>
          ) : (
            <article 
              className={`space-y-6 sm:space-y-8 ${lang === 'ta' ? 'font-sans leading-[2.1]' : 'font-serif leading-[1.85]'} tracking-normal transition-all duration-300`}
              style={{ fontSize: `${fontSize}px` }}
            >
              {chapterContent.split('\n\n').map((paragraph, pIdx) => {
                const clean = paragraph.trim();
                if (!clean) return null;
                if (clean.startsWith('#')) {
                  return (
                    <h3 key={pIdx} className="font-display text-xl sm:text-2xl font-bold text-amber-200 mt-10 mb-4 border-b border-slate-800 pb-2">
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
                return (
                  <p key={pIdx} className="text-justify first-letter:float-left first-letter:text-3xl sm:first-letter:text-4xl first-letter:pr-2 first-letter:font-display first-letter:text-amber-400">
                    {clean}
                  </p>
                );
              })}
            </article>
          )}

          {/* Chapter Navigation Footer */}
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
      )}

      {/* Chapter Table of Contents Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <aside className={`relative w-84 max-w-[85vw] ${theme.card} border-r h-full p-6 flex flex-col z-10 shadow-2xl overflow-y-auto`}>
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
              {manifest?.chapters.map((ch, idx) => (
                <button
                  key={ch.filename}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </aside>
        </div>
      )}

      {/* Global Surrealist Footer */}
      <footer className="mt-20 border-t border-slate-800/60 py-10 text-center text-xs text-slate-500 font-mono relative z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} STORIES • A Surrealist Sanctuary for Public Domain Literature</p>
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
