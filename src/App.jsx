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
  ExternalLink
} from 'lucide-react';

// Themes matching design.md
const THEMES = {
  twilight: {
    id: 'twilight',
    name: 'Magritte Twilight',
    bg: 'bg-[#070a13]',
    surface: 'bg-[#0f172a]/80 backdrop-blur-md border-slate-800',
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

// Demo sample for reader engine verification (Zero-Upload compliant)
const SAMPLE_LORE = {
  title: {
    en: "The Metaphysics of an Unseen Stranger",
    ta: "கண்ணுக்குத் தெரியாத ஒருவனின் விசித்திர இருப்பு"
  },
  subtitle: {
    en: "A Surrealist Literary Reading Shell",
    ta: "நவீன இலக்கிய உரைநடைக்கான கனவுவெளி வாசகத் தளம்"
  },
  chapters: [
    {
      id: 1,
      title: { en: "Prologue: The Arrival Through the Veil", ta: "முன்னுரை: பனித்திரை ஊடுருவிய வரவு" },
      content: {
        en: `The stranger came early in February, through the biting wind and driving snow, walking over the down from Bramblehurst railway station. He carried a little black portmanteau in his thickly gloved hand, wrapped up from head to foot, and the brim of his soft felt hat hid every inch of his face but the shiny tip of his nose.\n\nHe staggered into the "Coach and Horses" more dead than alive, flinging his luggage upon the parlor table. "A fire," he cried with unearthly hollow breath, "in the name of human charity! A room and a fire!"\n\nMrs. Hall, having stoked the hearth, found herself gazing at a visage bound completely in white linen bandages—dark spectacles concealing eyes that seemed to look nowhere, yet saw into the marrow of everything.`,
        ta: `கடும் குளிர்காற்றும் சுழன்றடிக்கும் பனிமழையும் நிலவிய பிப்ரவரி மாதத்தின் ஒரு காலைப்பொழுதில், பிராம்பிள்ஹர்ஸ்ட் ரயில் நிலையத்திலிருந்து நடந்து அந்த விசித்திர மனிதன் வந்து சேர்ந்தான். அடர்த்தியான கம்பளி கையுறையணிந்த அவனது கையில் ஒரு சிறிய கறுப்புப் பெட்டி இருந்தது; உடலெங்கும் கம்பளி ஆடைகளால் மூடி மறைக்கப்பட்டிருந்த அவனது தொப்பியின் விளிம்பு, பளபளத்த மூக்கு நுனியைத் தவிர முகத்தின் எந்தப் பகுதியையும் வெளிக்காட்டவில்லை.\n\nஅவன் தள்ளாடியபடி "கோச் அண்ட் ஹார்சஸ்" விடுதிக்குள் நுழைந்தான்; கிட்டத்தட்ட உயிரற்றவன் போலத் தோன்றியவன், தனது பயணப்பெட்டியை மேஜை மீது வீசி எறிந்தான். "மனிதநேயத்தின் பெயரால் எனக்கு ஒரு நெருப்பும் அறையும் வேண்டும்!" என்று மனித உலகிற்கு அப்பாற்பட்ட விசித்திரக் குரலில் அவன் கூவினான்.\n\nஅடுப்பில் கனலை மூட்டிய திருமதி ஹால், வெள்ளை நிறத் துணிப்பட்டுகளால் முற்றிலும் சுற்றப்பட்ட அவனது விசித்திரத் தோற்றத்தைக் கண்டு திகைத்துப் போனாள்—இருண்ட கண்ணாடிக்கு அப்பால் இருந்த அவனது கண்கள் எங்குமே பார்ப்பதாகத் தெரியவில்லை, ஆனால் அனைத்தின் ஆன்மாவையும் ஊடுருவிப் பார்ப்பது போல் அமைந்திருந்தன.`
      }
    },
    {
      id: 2,
      title: { en: "The Thousand and One Vials", ta: "ஆயிரத்தொரு கண்ணாடிக் குடுவைகள்" },
      content: {
        en: `The parlour was transformed into an alchemical labyrinth. Crates and boxes arrived from the station, unpacked into rows of transparent glass vials containing strange liquids—some luminous emerald, others dark as sepia.\n\n"Do not disturb my experiments," the muffled voice echoed from behind locked mahogany doors. Outside the arched window, clouds drifted across a cobalt horizon like bowler hats floating in an impossible sky.`,
        ta: `அந்த வரவேற்பறை ஒரு ரசவாத மாயக்கூடமாக உருமாறியிருந்தது. ரயில் நிலையத்திலிருந்து வந்த மரப்பெட்டிகள் பிரிக்கப்பட்டு, விசித்திர திரவங்கள் நிறைந்த நூற்றுக்கணக்கான கண்ணாடிக் குடுவைகளாக மேஜைகளில் வரிசைப்படுத்தப்பட்டன—சில பச்சை மரகதம் போல மின்னின, மற்றவை இருண்ட மை போலக் காட்சியளித்தன.\n\n"எனது ஆய்வுகளை யாரும் தொந்தரவு செய்யக்கூடாது," என்று பூட்டிய மரக்கதவுகளுக்குப் பின்னாலிருந்து அந்த வெற்று மனிதனின் அழுத்தமான குரல் ஒலித்தது. வளைந்த ஜன்னலுக்கு வெளியே, கோபால்ட் நீல வானில் தொப்பிகள் மிதப்பது போல மெதுவான வெண்மேகங்கள் நீந்திக் கொண்டிருந்தன.`
      }
    }
  ]
};

export default function App() {
  const [themeKey, setThemeKey] = useState('twilight');
  const [lang, setLang] = useState('ta'); // Default to Tamil
  const [fontSize, setFontSize] = useState(19);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ambientAudio, setAmbientAudio] = useState(false);

  const theme = THEMES[themeKey];
  const chapter = SAMPLE_LORE.chapters[currentChapterIndex];

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
          
          {/* Logo & Portal Identity */}
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
                Surrealist Canvas
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

            {/* Theme Selector Cycle */}
            <button
              onClick={() => {
                const keys = Object.keys(THEMES);
                const nextIdx = (keys.indexOf(themeKey) + 1) % keys.length;
                setThemeKey(keys[nextIdx]);
              }}
              className={`p-2 rounded-lg border ${theme.border} hover:border-amber-400/50 transition-all`}
              title={`Theme: ${theme.name} (Click to switch)`}
            >
              {themeKey === 'twilight' && <Moon className="w-4 h-4 text-indigo-400" />}
              {themeKey === 'vellum' && <Sun className="w-4 h-4 text-amber-600" />}
              {themeKey === 'monolith' && <Sparkles className="w-4 h-4 text-white" />}
            </button>

            {/* Ambient Sound Mock Toggle */}
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
          <aside className={`relative w-80 max-w-[85vw] ${theme.surface} border-r ${theme.border} h-full p-6 flex flex-col z-10 shadow-2xl overflow-y-auto`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-semibold tracking-wide text-sm">Table of Contents</h3>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 flex-1 space-y-2">
              {SAMPLE_LORE.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapterIndex(idx);
                    setIsDrawerOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    idx === currentChapterIndex 
                      ? `${theme.border} bg-amber-400/10 border-amber-400/50 text-amber-300 font-medium` 
                      : `border-transparent hover:border-slate-700 hover:bg-white/5 opacity-80`
                  }`}
                >
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400/70 mb-0.5">
                    Section {ch.id}
                  </div>
                  <div className={`text-sm ${lang === 'ta' ? 'font-tamil' : 'font-serif'}`}>
                    {ch.title[lang]}
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-700/50 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Domain: stories.7400000.xyz</span>
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </aside>
        </div>
      )}

      {/* Main Surrealist Reading Canvas */}
      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12 sm:py-20 relative z-10">
        
        {/* Book / Work Meta Card */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-400/30 text-[11px] font-mono uppercase tracking-widest text-amber-400/90 mb-4 bg-amber-950/20">
            <span>Classics Portal</span>
            <span>•</span>
            <span>பொதுவெளி இலக்கியம்</span>
          </div>

          <h1 className={`font-display text-2xl sm:text-4xl md:text-5xl font-bold ${theme.heading} tracking-tight leading-tight mb-3`}>
            {SAMPLE_LORE.title[lang]}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 tracking-wide font-serif italic">
            {SAMPLE_LORE.subtitle[lang]}
          </p>
        </div>

        {/* Chapter Header */}
        <div className="flex items-center justify-between border-y border-slate-800/80 py-4 mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80">Chapter {chapter.id}</span>
            <h2 className={`text-lg sm:text-xl font-bold ${theme.heading} mt-0.5 ${lang === 'ta' ? 'font-tamil' : 'font-display'}`}>
              {chapter.title[lang]}
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
              disabled={currentChapterIndex === SAMPLE_LORE.chapters.length - 1}
              onClick={() => {
                setCurrentChapterIndex(Math.min(SAMPLE_LORE.chapters.length - 1, currentChapterIndex + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2 rounded border border-slate-800 hover:border-amber-400/40 disabled:opacity-30 disabled:pointer-events-none transition-all"
              title="Next chapter"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prose Reading Canvas with Custom Typographic Scale */}
        <article 
          className={`space-y-6 sm:space-y-8 ${lang === 'ta' ? 'font-tamil leading-[2.1]' : 'font-serif leading-[1.85]'} tracking-normal transition-all duration-300`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {chapter.content[lang].split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="text-justify first-letter:float-left first-letter:text-3xl sm:first-letter:text-4xl first-letter:pr-2 first-letter:font-display first-letter:text-amber-400">
              {paragraph}
            </p>
          ))}
        </article>

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
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            {currentChapterIndex + 1} / {SAMPLE_LORE.chapters.length}
          </span>

          <button
            disabled={currentChapterIndex === SAMPLE_LORE.chapters.length - 1}
            onClick={() => {
              setCurrentChapterIndex(Math.min(SAMPLE_LORE.chapters.length - 1, currentChapterIndex + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 disabled:opacity-20 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      {/* Metaphysical Footer */}
      <footer className="mt-20 border-t border-slate-800/60 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Stories Portal • Designed for timeless public-domain literature</p>
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
