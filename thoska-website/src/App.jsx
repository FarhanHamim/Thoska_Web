import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Download,
  Zap,
  Volume2,
  VolumeX,
  Cpu,
  ShieldCheck,
  QrCode,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Smartphone,
  Layers,
  CreditCard,
  Copy,
  Check,
  ChevronRight,
  RefreshCw,
  HelpCircle,
  Lock,
  EyeOff,
  Sun,
  Calculator
} from 'lucide-react';

// Custom GitHub Icon (Lucide v1+ removed brand icons)
const Github = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- 10 THURINGIAN UNIVERSITIES DATA MODEL ---
const UNIVERSITIES = [
  {
    id: 'EAH_JENA',
    shortName: 'EAH JENA',
    fullName: 'Ernst-Abbe-Hochschule Jena',
    city: 'Jena',
    color: '#005A5B',
    accent: '#008080',
    iconType: 'pyramid'
  },
  {
    id: 'FSU_JENA',
    shortName: 'FSU JENA',
    fullName: 'Friedrich-Schiller-Universität Jena',
    city: 'Jena',
    color: '#002F5D',
    accent: '#1E56A0',
    iconType: 'crest'
  },
  {
    id: 'TU_ILMENAU',
    shortName: 'TU ILMENAU',
    fullName: 'Technische Universität Ilmenau',
    city: 'Ilmenau',
    color: '#006633',
    accent: '#FF6600',
    iconType: 'gear'
  },
  {
    id: 'BAUHAUS_WEIMAR',
    shortName: 'BAUHAUS WEIMAR',
    fullName: 'Bauhaus-Universität Weimar',
    city: 'Weimar',
    color: '#E3000B',
    accent: '#FFD700',
    iconType: 'bauhaus'
  },
  {
    id: 'UNI_ERFURT',
    shortName: 'UNI ERFURT',
    fullName: 'Universität Erfurt',
    city: 'Erfurt',
    color: '#A51E37',
    accent: '#D9385A',
    iconType: 'book'
  },
  {
    id: 'FH_ERFURT',
    shortName: 'FH ERFURT',
    fullName: 'Fachhochschule Erfurt',
    city: 'Erfurt',
    color: '#00854A',
    accent: '#2EBD77',
    iconType: 'pillars'
  },
  {
    id: 'HS_SCHMALKALDEN',
    shortName: 'HS SCHMALKALDEN',
    fullName: 'Hochschule Schmalkalden',
    city: 'Schmalkalden',
    color: '#005478',
    accent: '#0088C2',
    iconType: 'shield'
  },
  {
    id: 'HS_NORDHAUSEN',
    shortName: 'HS NORDHAUSEN',
    fullName: 'Hochschule Nordhausen',
    city: 'Nordhausen',
    color: '#004B93',
    accent: '#3B82F6',
    iconType: 'diamond'
  },
  {
    id: 'HFM_WEIMAR',
    shortName: 'HFM WEIMAR',
    fullName: 'Hochschule für Musik Franz Liszt',
    city: 'Weimar',
    color: '#8B0000',
    accent: '#D4AF37',
    iconType: 'lyre'
  },
  {
    id: 'DHGE',
    shortName: 'DHGE',
    fullName: 'Duale Hochschule Gera-Eisenach',
    city: 'Gera / Eisenach',
    color: '#003366',
    accent: '#0066CC',
    iconType: 'link'
  }
];

// --- LCD PALETTES ---
const LCD_PALETTES = [
  {
    id: 'DMG_OLIVE',
    name: 'DMG OLIVE (1989)',
    bg: '#9BBC0F',
    grid: '#8BAC0F',
    ink: '#0A280A',
    mutedInk: '#306230',
    badgeBg: '#0A280A',
    badgeText: '#9BBC0F'
  },
  {
    id: 'POCKET_SILVER',
    name: 'POCKET SILVER (1996)',
    bg: '#C4CFA1',
    grid: '#B3BE91',
    ink: '#181C18',
    mutedInk: '#4A524A',
    badgeBg: '#181C18',
    badgeText: '#C4CFA1'
  },
  {
    id: 'BACKLIT_CYAN',
    name: 'LIGHT CYAN (1998)',
    bg: '#00E5FF',
    grid: '#00CCE6',
    ink: '#001F24',
    mutedInk: '#004D59',
    badgeBg: '#001F24',
    badgeText: '#00E5FF'
  }
];

// --- BUDGET PRESETS ---
const BUDGET_PRESETS = [
  { id: 'coffee', label: 'COFFEE / ESPRESSO', price: 1.40, icon: '☕' },
  { id: 'wash', label: 'WASHING MACHINE', price: 2.00, icon: '🧺' },
  { id: 'classic', label: 'CLASSIC MENSA DISH', price: 2.60, icon: '🍛' },
  { id: 'premium', label: 'PREMIUM MENSA MEAL', price: 3.80, icon: '🥩' }
];

// --- INITIAL SCAN HISTORY LOGS ---
const INITIAL_HISTORY = [
  { id: 1, date: '02.11 21:21', uid: '04:31:56:CA:6C:24:90', bal: 40.40, delta: -1.40, location: 'Mensa Ernst-Abbe-Platz' },
  { id: 2, date: '01.11 12:45', uid: '04:31:56:CA:6C:24:90', bal: 41.80, delta: -3.20, location: 'Mensa Ernst-Abbe-Platz' },
  { id: 3, date: '30.10 14:10', uid: '04:31:56:CA:6C:24:90', bal: 45.00, delta: -1.40, location: 'Cafeteria Carl-Zeiss-Promenade' },
  { id: 4, date: '29.10 11:55', uid: '04:31:56:CA:6C:24:90', bal: 46.40, delta: -2.60, location: 'Mensa Ernst-Abbe-Platz' },
  { id: 5, date: '28.10 09:15', uid: '04:31:56:CA:6C:24:90', bal: 49.00, delta: -1.00, location: 'Aufwerter Top-Up (+50€)' }
];

// --- CUSTOM 8-BIT UNIVERSITY SVG EMBLEMS ---
const UniversityEmblem = ({ type, color = '#005A5B', size = 28 }) => {
  switch (type) {
    case 'pyramid': // EAH Jena Iconic Stacked Triangle Pyramid
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 8,9 16,9" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <polygon points="7.5,10 3.5,17 11.5,17" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <polygon points="16.5,10 12.5,17 20.5,17" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <polygon points="12,17 8.5,10.5 15.5,10.5" fill="#0A0B0E" opacity="0.25" />
          <rect x="3" y="18.5" width="18" height="3" fill={color} stroke="#0A0B0E" strokeWidth="1" />
        </svg>
      );
    case 'crest': // FSU Jena Academic Seal
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9.5" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="6.5" fill="none" stroke="#F4F6F6" strokeWidth="1.2" strokeDasharray="2 2" />
          <rect x="9" y="8" width="6" height="8" fill="#F4F6F6" />
          <path d="M12 6V18M8 12H16" stroke={color} strokeWidth="1.5" />
        </svg>
      );
    case 'gear': // TU Ilmenau Technical Gear/Atom
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="5" y="5" width="14" height="14" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <rect x="8" y="2" width="8" height="3" fill={color} />
          <rect x="8" y="19" width="8" height="3" fill={color} />
          <rect x="2" y="8" width="3" height="8" fill={color} />
          <rect x="19" y="8" width="3" height="8" fill={color} />
          <circle cx="12" cy="12" r="4" fill="#FF6600" stroke="#0A0B0E" strokeWidth="1.2" />
        </svg>
      );
    case 'bauhaus': // Bauhaus Weimar Geometric Blocks
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="9" height="9" fill={color} stroke="#0A0B0E" strokeWidth="1.4" />
          <circle cx="16.5" cy="7.5" r="4.5" fill="#FFD700" stroke="#0A0B0E" strokeWidth="1.4" />
          <polygon points="12,13 5,21 19,21" fill="#005A9C" stroke="#0A0B0E" strokeWidth="1.4" />
        </svg>
      );
    case 'book': // Uni Erfurt Open Book
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M3 6H11V19H3V6Z" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <path d="M13 6H21V19H13V6Z" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <rect x="11" y="5" width="2" height="15" fill="#F4F6F6" stroke="#0A0B0E" strokeWidth="1" />
          <line x1="5" y1="10" x2="9" y2="10" stroke="#F4F6F6" strokeWidth="1.5" />
          <line x1="15" y1="10" x2="19" y2="10" stroke="#F4F6F6" strokeWidth="1.5" />
        </svg>
      );
    case 'pillars': // FH Erfurt Pillars
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <polygon points="12,3 2,8 22,8" fill={color} stroke="#0A0B0E" strokeWidth="1.4" />
          <rect x="4" y="9" width="3.5" height="9" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <rect x="10.25" y="9" width="3.5" height="9" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <rect x="16.5" y="9" width="3.5" height="9" fill={color} stroke="#0A0B0E" strokeWidth="1.2" />
          <rect x="2" y="18.5" width="20" height="3" fill={color} stroke="#0A0B0E" strokeWidth="1.4" />
        </svg>
      );
    case 'shield': // HS Schmalkalden Shield
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path d="M4 4H20V12C20 17 12 21 12 21C12 21 4 17 4 12V4Z" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <path d="M12 4V21" stroke="#F4F6F6" strokeWidth="1.5" />
          <path d="M4 11H20" stroke="#F4F6F6" strokeWidth="1.5" />
        </svg>
      );
    case 'diamond': // HS Nordhausen Diamond Grid
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,12 12,22 2,12" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <polygon points="12,7 17,12 12,17 7,12" fill="#F4F6F6" stroke="#0A0B0E" strokeWidth="1.2" />
        </svg>
      );
    case 'lyre': // HfM Weimar Musical Lyre
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <path d="M8 7V15C8 17 16 17 16 15V7" stroke="#FFD700" strokeWidth="2" />
          <line x1="11" y1="7" x2="11" y2="16" stroke="#F4F6F6" strokeWidth="1.2" />
          <line x1="13" y1="7" x2="13" y2="16" stroke="#F4F6F6" strokeWidth="1.2" />
        </svg>
      );
    case 'link': // DHGE Dual Link
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="11" height="11" fill={color} stroke="#0A0B0E" strokeWidth="1.5" />
          <rect x="10" y="9" width="11" height="11" fill="#0066CC" stroke="#0A0B0E" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="6" fill="#F4F6F6" stroke="#0A0B0E" strokeWidth="1" />
        </svg>
      );
    default: // Neutral Unregistered Cartridge / Chip Icon
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <rect x="4" y="2" width="16" height="20" fill="#2A2F37" stroke="#0A0B0E" strokeWidth="1.8" />
          <rect x="7" y="5" width="10" height="7" fill="#E05A2B" stroke="#0A0B0E" strokeWidth="1.2" />
          <line x1="8" y1="16" x2="8" y2="21" stroke="#FFD700" strokeWidth="2" />
          <line x1="12" y1="16" x2="12" y2="21" stroke="#FFD700" strokeWidth="2" />
          <line x1="16" y1="16" x2="16" y2="21" stroke="#FFD700" strokeWidth="2" />
        </svg>
      );
  }
};

// --- DETERMINISTIC CODE-128 / 1D BARCODE SVG RENDERER ---
const ScannableBarcode = ({ value = '340620344072' }) => {
  const bars = useMemo(() => {
    const clean = (value || '340620344072').padEnd(12, '0');
    const pattern = [2, 1, 1, 2, 3, 1]; // Start guard
    for (let i = 0; i < clean.length; i++) {
      const code = clean.charCodeAt(i);
      pattern.push(((code % 3) + 1), ((code >> 1) % 2) + 1, ((code >> 2) % 3) + 1, 1);
    }
    pattern.push(2, 3, 1, 1, 2); // Stop guard
    return pattern;
  }, [value]);

  let currentX = 10;
  return (
    <svg viewBox="0 0 240 62" className="w-full h-14 bg-white rounded-none border-2 border-[#0A280A]">
      {bars.map((width, idx) => {
        const isBlack = idx % 2 === 0;
        const barWidth = width * 1.9;
        const x = currentX;
        currentX += barWidth;
        return isBlack ? (
          <rect key={idx} x={x} y={6} width={barWidth} height={50} fill="#000000" />
        ) : null;
      })}
    </svg>
  );
};

export default function App() {
  // --- SOUND ENGINE (Native Web Audio API - Zero External Assets) ---
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioCtxRef = useRef(null);

  const playRetroSound = (type) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      if (type === 'coin') {
        // Classic 2-tone Game Boy / Arcade Coin Insert (B5 -> E6)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(987.77, now); // B5
        osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.36);
      } else if (type === 'low_hp') {
        // Rapid 3-beep Low Balance Alert
        [0, 0.11, 0.22].forEach((offset) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(311.13, now + offset);
          gain.gain.setValueAtTime(0.12, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.01, now + offset + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + offset);
          osc.stop(now + offset + 0.08);
        });
      } else if (type === 'click') {
        // Tactile D-Pad / Button Click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.045);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      } else if (type === 'eject') {
        // Power-down Eject Sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(165, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      // Ignore audio errors if browser blocks autoplay
    }
  };

  // --- EMULATOR STATE ---
  // Idle by default: Zero hardcoded personal data before tap!
  const [cardState, setCardState] = useState('IDLE'); // 'IDLE' | 'SCANNED'
  const [simMode, setSimMode] = useState('REGISTERED'); // 'REGISTERED' | 'GUEST' | 'LOW_BALANCE'
  const [lcdView, setLcdView] = useState('MAIN'); // 'MAIN' | 'FLIP_BARCODE' | 'HISTORY' | 'REGISTER_FORM' | 'NO_CARD_WARN'
  const [paletteIdx, setPaletteIdx] = useState(0);
  const [budgetIdx, setBudgetIdx] = useState(0);
  const [activeBtn, setActiveBtn] = useState(null);

  // Dynamic Profile Repository State (bound to UID)
  const [selectedUniId, setSelectedUniId] = useState('EAH_JENA');
  const [profilesByUid, setProfilesByUid] = useState({
    '04:31:56:CA:6C:24:90': {
      cardUid: '04:31:56:CA:6C:24:90',
      holderName: 'STUDENT PROFILE #01',
      matrikelNr: '1045752',
      libraryBarcode: '340620344072',
      validUntil: '01.10.26 - 31.03.27',
      universityId: 'EAH_JENA'
    }
  });

  // Active Scanned Card Telemetry
  const [activeCard, setActiveCard] = useState(null);
  const [scanHistory, setScanHistory] = useState(INITIAL_HISTORY);

  // Registration Form State for Guest Cards
  const [regForm, setRegForm] = useState({
    holderName: '',
    matrikelNr: '',
    libraryBarcode: '',
    validUntil: '01.10.26 - 31.03.27',
    universityId: 'EAH_JENA'
  });

  // Interactive APDU Hex Converter State ("Under the Hood" Section)
  const [apduEuroInput, setApduEuroInput] = useState('40.40');
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Inject Google Fonts ('Press Start 2P', 'JetBrains Mono', 'Inter')
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700;800&family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const currentPalette = LCD_PALETTES[paletteIdx];
  const currentBudget = BUDGET_PRESETS[budgetIdx];

  // Resolve current active profile if a card is scanned
  const activeProfile = useMemo(() => {
    if (cardState !== 'SCANNED' || !activeCard) return null;
    return profilesByUid[activeCard.uid] || null;
  }, [cardState, activeCard, profilesByUid]);

  // Resolve Top-Left University Branding (ONLY shown when a registered card is active!)
  const activeUniversity = useMemo(() => {
    if (!activeProfile) return null;
    return UNIVERSITIES.find((u) => u.id === activeProfile.universityId) || UNIVERSITIES[0];
  }, [activeProfile]);

  const triggerButtonAnim = (btnName) => {
    setActiveBtn(btnName);
    setTimeout(() => setActiveBtn(null), 160);
  };

  // --- CONSOLE ACTIONS ---
  const handleSimulateTap = (overrideMode) => {
    const modeToUse = overrideMode || simMode;
    triggerButtonAnim('START');

    if (modeToUse === 'REGISTERED') {
      playRetroSound('coin');
      const uid = '04:31:56:CA:6C:24:90';
      setActiveCard({
        uid,
        balance: 40.40,
        lastTx: -1.40,
        prevBalance: 41.80,
        aid: '5F8415',
        expiringSoon: false
      });
      setCardState('SCANNED');
      setLcdView('MAIN');
    } else if (modeToUse === 'GUEST') {
      playRetroSound('coin');
      const guestUid = '04:88:B2:19:4F:11:80';
      setActiveCard({
        uid: guestUid,
        balance: 18.60,
        lastTx: -2.60,
        prevBalance: 21.20,
        aid: '5F8415',
        expiringSoon: false
      });
      setCardState('SCANNED');
      setLcdView('MAIN');
    } else if (modeToUse === 'LOW_BALANCE') {
      playRetroSound('low_hp');
      const uid = '04:31:56:CA:6C:24:90';
      setActiveCard({
        uid,
        balance: 2.20,
        lastTx: -3.80,
        prevBalance: 6.00,
        aid: '5F8415',
        expiringSoon: true
      });
      setCardState('SCANNED');
      setLcdView('MAIN');
    }
  };

  const handleButtonA = () => {
    triggerButtonAnim('A');
    playRetroSound('click');
    if (cardState === 'IDLE') {
      setLcdView((prev) => (prev === 'NO_CARD_WARN' ? 'MAIN' : 'NO_CARD_WARN'));
      return;
    }
    if (lcdView === 'FLIP_BARCODE' || lcdView === 'REGISTER_FORM') {
      setLcdView('MAIN');
    } else {
      setLcdView('FLIP_BARCODE');
    }
  };

  const handleButtonB = () => {
    triggerButtonAnim('B');
    playRetroSound('click');
    setLcdView((prev) => (prev === 'HISTORY' ? 'MAIN' : 'HISTORY'));
  };

  const handleSelectEject = () => {
    triggerButtonAnim('SELECT');
    playRetroSound('eject');
    setCardState('IDLE');
    setActiveCard(null);
    setLcdView('MAIN');
  };

  const handleDpadUp = () => {
    triggerButtonAnim('UP');
    playRetroSound('click');
    setBudgetIdx((prev) => (prev - 1 + BUDGET_PRESETS.length) % BUDGET_PRESETS.length);
  };

  const handleDpadDown = () => {
    triggerButtonAnim('DOWN');
    playRetroSound('click');
    setBudgetIdx((prev) => (prev + 1) % BUDGET_PRESETS.length);
  };

  const handleDpadLeft = () => {
    triggerButtonAnim('LEFT');
    playRetroSound('click');
    setPaletteIdx((prev) => (prev - 1 + LCD_PALETTES.length) % LCD_PALETTES.length);
  };

  const handleDpadRight = () => {
    triggerButtonAnim('RIGHT');
    playRetroSound('click');
    setPaletteIdx((prev) => (prev + 1) % LCD_PALETTES.length);
  };

  // Save Guest Card Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!activeCard) return;
    playRetroSound('coin');
    const newProfile = {
      cardUid: activeCard.uid,
      holderName: (regForm.holderName || 'THURINGIA STUDENT').toUpperCase(),
      matrikelNr: regForm.matrikelNr || '1049999',
      libraryBarcode: regForm.libraryBarcode || '340620999999',
      validUntil: regForm.validUntil || '01.10.26 - 31.03.27',
      universityId: regForm.universityId
    };
    setProfilesByUid((prev) => ({
      ...prev,
      [activeCard.uid]: newProfile
    }));
    setSelectedUniId(regForm.universityId);
    setLcdView('FLIP_BARCODE');
  };

  // Switch University from the Showcase Grid
  const handleSelectUniversityFromGrid = (uniId) => {
    playRetroSound('coin');
    setSelectedUniId(uniId);
    // Update the registered demo profile's university and auto-tap if idle so user sees it immediately
    setProfilesByUid((prev) => ({
      ...prev,
      '04:31:56:CA:6C:24:90': {
        ...prev['04:31:56:CA:6C:24:90'],
        universityId: uniId
      }
    }));
    if (cardState === 'IDLE') {
      setSimMode('REGISTERED');
      setActiveCard({
        uid: '04:31:56:CA:6C:24:90',
        balance: 40.40,
        lastTx: -1.40,
        prevBalance: 41.80,
        aid: '5F8415',
        expiringSoon: false
      });
      setCardState('SCANNED');
      setLcdView('MAIN');
    }
  };

  // Export CSV Download
  const handleExportCsv = () => {
    playRetroSound('coin');
    const header = 'Timestamp,CardUID,BalanceEUR,LastTransactionEUR,Terminal\n';
    const rows = scanHistory
      .map((r) => `2026-${r.date}:00,${r.uid},${r.bal.toFixed(2)},${r.delta.toFixed(2)},"${r.location}"`)
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thoska_history.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Little-Endian APDU Byte Calculator
  const apduBreakdown = useMemo(() => {
    const parsed = parseFloat(apduEuroInput.replace(',', '.'));
    const safeEuro = isNaN(parsed) ? 0 : Math.max(0, Math.min(999.99, parsed));
    // Intercard DESFire stores value in 1/1000 € (millicents) as 32-bit signed int little-endian
    const milliEuro = Math.round(safeEuro * 1000);
    const b0 = (milliEuro & 0xff).toString(16).padStart(2, '0').toUpperCase();
    const b1 = ((milliEuro >> 8) & 0xff).toString(16).padStart(2, '0').toUpperCase();
    const b2 = ((milliEuro >> 16) & 0xff).toString(16).padStart(2, '0').toUpperCase();
    const b3 = ((milliEuro >> 24) & 0xff).toString(16).padStart(2, '0').toUpperCase();
    return {
      safeEuro: safeEuro.toFixed(2),
      milliEuro,
      littleEndianHex: `${b0} ${b1} ${b2} ${b3}`,
      bigEndianHex: `0x${b3}${b2}${b1}${b0}`,
      fullRxFrame: `${b0} ${b1} ${b2} ${b3} 91 00`
    };
  }, [apduEuroInput]);

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <div
      className="min-h-screen bg-[#0D0F12] text-[#F4F6F6] selection:bg-[#E05A2B] selection:text-white"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    >
      {/* --- STICKY RETRO HEADER BAR --- */}
      <header className="sticky top-0 z-50 bg-[#0D0F12]/95 backdrop-blur-md border-b-4 border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#E05A2B] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
              <UniversityEmblem type={activeUniversity ? activeUniversity.iconType : 'default'} size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="text-sm sm:text-base tracking-wider text-white font-bold"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  THOSKA BOY
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-extrabold bg-[#9BBC0F] text-[#0A280A] border border-black">
                  v1.2.0-FOSS
                </span>
              </div>
              <p className="text-[11px] font-mono text-gray-400">
                Thuringia Student Card NFC Console • MIFARE DESFire EV1/EV2
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-bold text-gray-300">
            <a href="#emulator" className="hover:text-[#E05A2B] transition-colors">
              [01. EMULATOR]
            </a>
            <a href="#universities" className="hover:text-[#E05A2B] transition-colors">
              [02. 10 UNIVERSITIES]
            </a>
            <a href="#features" className="hover:text-[#E05A2B] transition-colors">
              [03. FEATURES]
            </a>
            <a href="#protocol" className="hover:text-[#E05A2B] transition-colors">
              [04. APDU & GDPR]
            </a>
            <a href="#install" className="hover:text-[#E05A2B] transition-colors">
              [05. INSTALL]
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`px-3 py-2 text-xs font-mono font-bold border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all flex items-center gap-1.5 ${
                soundEnabled ? 'bg-[#9BBC0F] text-[#0A280A]' : 'bg-[#1F242D] text-gray-400'
              }`}
              title="Toggle 8-Bit Web Audio Synthesizer"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'SFX: ON' : 'SFX: MUTE'}</span>
            </button>

            <a
              href="https://github.com/FarhanHamim/Thoska-Reader"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 text-xs font-mono font-extrabold bg-[#E05A2B] hover:bg-[#f06635] text-white border-2 border-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GITHUB</span>
            </a>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION & INTERACTIVE EMULATOR --- */}
      <section id="emulator" className="relative py-10 lg:py-16 border-b-4 border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* LEFT COLUMN: PITCH & DIRECT DOWNLOADS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#161920] border-2 border-[#E05A2B] shadow-[4px_4px_0px_#E05A2B]">
                <span className="w-2.5 h-2.5 bg-[#9BBC0F] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-[#9BBC0F]">
                  100% OFFLINE • ZERO TRACKERS • MIFARE DESFIRE EV1/EV2
                </span>
              </div>

              <h1
                className="text-2xl sm:text-4xl lg:text-[40px] leading-[1.35] font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                TURN YOUR <span className="text-[#E05A2B]">THOSKA</span> INTO A 1990s HANDHELD CONSOLE.
              </h1>

              <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
                An open-source, privacy-first Android NFC utility crafted for all{' '}
                <span className="text-white font-semibold underline decoration-[#E05A2B] decoration-2">
                  10 Thuringian universities
                </span>
                . Check your live Mensa balance in milliseconds, simulate meal budgets with the tactile D-Pad, and flip to your high-brightness library barcode pass—with{' '}
                <span className="text-[#9BBC0F] font-mono font-semibold">zero internet permissions</span>.
              </p>

              {/* PRIMARY CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
                <a
                  href="/ThoskaBoy-release.apk"
                  download="ThoskaBoy-release.apk"
                  className="px-6 py-4 bg-[#E05A2B] hover:bg-[#f26636] text-white font-mono font-extrabold text-sm border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2.5"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>⬇ DIRECT DOWNLOAD APK (v1.1.0)</span>
                </a>

                <a
                  href="obtainium://add/https://github.com/FarhanHamim/Thoska-Reader"
                  className="px-5 py-4 bg-[#005A5B] hover:bg-[#007072] text-white font-mono font-extrabold text-sm border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5 text-[#FFD700]" />
                  <span>⚡ AUTO-UPDATE VIA OBTAINIUM</span>
                </a>

                <a
                  href="https://github.com/FarhanHamim/Thoska-Reader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-4 bg-[#161920] hover:bg-[#222733] text-gray-200 font-mono font-bold text-sm border-2 border-gray-600 shadow-[5px_5px_0px_#000] transition-all flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>★ VIEW REPOSITORY</span>
                </a>
              </div>

              {/* INTERACTIVE CONSOLE GUIDE BOX */}
              <div className="p-4 sm:p-5 bg-[#14181F] border-2 border-[#2D3545] shadow-[6px_6px_0px_#000] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-[#FFD700] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    LIVE IN-BROWSER CONSOLE EMULATOR CONTROLS:
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">Try clicking the console →</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#E05A2B] text-black font-extrabold">START</span>
                    <span className="text-gray-300">Simulate NFC Card Tap (40,40 €)</span>
                  </div>
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#D92B38] text-white font-extrabold">BTN A</span>
                    <span className="text-gray-300">Flip to Library Barcode + 100% Lux</span>
                  </div>
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#D92B38] text-white font-extrabold">BTN B</span>
                    <span className="text-gray-300">5-Scan SQLite Log + CSV Export</span>
                  </div>
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-gray-600 text-white font-extrabold">SELECT</span>
                    <span className="text-gray-300">Eject Card (Reset to Privacy Idle)</span>
                  </div>
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#9BBC0F] text-black font-extrabold">▲ / ▼</span>
                    <span className="text-gray-300">Cycle Mensa Budget Simulator</span>
                  </div>
                  <div className="p-2 bg-[#0D0F12] border border-gray-800 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#00E5FF] text-black font-extrabold">◄ / ►</span>
                    <span className="text-gray-300">Switch LCD Palette (Olive/Silver/Cyan)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE "THOSKA BOY" HANDHELD CONSOLE */}
            <div className="lg:col-span-5 flex flex-col items-center">
              {/* SCENARIO QUICK-TESTER BAR ABOVE CONSOLE */}
              <div className="w-full max-w-[390px] mb-3 bg-[#14181F] p-2.5 border-2 border-black shadow-[4px_4px_0px_#000]">
                <div className="text-[10px] font-mono font-bold text-gray-400 uppercase mb-1.5 flex items-center justify-between">
                  <span>TEST NFC TAP SCENARIOS:</span>
                  <span className="text-[#9BBC0F]">
                    {cardState === 'IDLE' ? '● SLOT EMPTY' : `● UID LOCKED (${simMode})`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => {
                      setSimMode('REGISTERED');
                      handleSimulateTap('REGISTERED');
                    }}
                    className={`py-1.5 px-2 text-[10px] font-mono font-extrabold border border-black transition-all ${
                      cardState === 'SCANNED' && simMode === 'REGISTERED'
                        ? 'bg-[#9BBC0F] text-[#0A280A] shadow-[2px_2px_0px_#000]'
                        : 'bg-[#1F242D] text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    1. REGISTERED CARD
                  </button>
                  <button
                    onClick={() => {
                      setSimMode('GUEST');
                      handleSimulateTap('GUEST');
                    }}
                    className={`py-1.5 px-2 text-[10px] font-mono font-extrabold border border-black transition-all ${
                      cardState === 'SCANNED' && simMode === 'GUEST'
                        ? 'bg-[#FFD700] text-black shadow-[2px_2px_0px_#000]'
                        : 'bg-[#1F242D] text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    2. NEW GUEST CARD
                  </button>
                  <button
                    onClick={() => {
                      setSimMode('LOW_BALANCE');
                      handleSimulateTap('LOW_BALANCE');
                    }}
                    className={`py-1.5 px-2 text-[10px] font-mono font-extrabold border border-black transition-all ${
                      cardState === 'SCANNED' && simMode === 'LOW_BALANCE'
                        ? 'bg-[#FF3333] text-white shadow-[2px_2px_0px_#000]'
                        : 'bg-[#1F242D] text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    3. LOW HP (&lt;5€)
                  </button>
                </div>
              </div>

              {/* PHYSICAL THOSKA BOY HANDHELD SHELL */}
              <div
                className="w-full max-w-[390px] bg-[#E05A2B] rounded-[26px] rounded-br-[58px] p-5 border-4 border-[#0A0B0E] shadow-[14px_14px_0px_#000000] relative select-none"
                style={{
                  boxShadow:
                    'inset 3px 3px 0px rgba(255,255,255,0.28), inset -4px -4px 0px rgba(0,0,0,0.35), 14px 14px 0px #000000'
                }}
              >
                {/* Top Casing Screws */}
                <div className="w-3 h-3 rounded-full bg-[#8D3212] border border-[#0A0B0E] absolute top-3.5 left-3.5 flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-[#0A0B0E] rotate-45" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[#8D3212] border border-[#0A0B0E] absolute top-3.5 right-3.5 flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-[#0A0B0E] -rotate-45" />
                </div>

                {/* TOP BRANDING HEADER (Dynamic University Logo on Left, THOSKA BOY on Right) */}
                <div className="mt-2 mb-3 px-2 flex items-center justify-between border-b-2 border-[#B5421B] pb-2">
                  <div className="flex items-center gap-2">
                    <UniversityEmblem
                      type={activeUniversity ? activeUniversity.iconType : 'default'}
                      color={activeUniversity ? activeUniversity.color : '#2A2F37'}
                      size={26}
                    />
                    <span
                      className="text-xs font-extrabold tracking-tight text-[#0A0B0E]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {activeUniversity ? activeUniversity.shortName : 'THOSKA SYSTEM'}
                    </span>
                  </div>
                  <div
                    className="text-xs sm:text-sm font-black tracking-wider text-[#0A0B0E]"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    THOSKA BOY<sup className="text-[8px] ml-0.5">TM</sup>
                  </div>
                </div>

                {/* DARK EAH TEAL SCREEN BEZEL */}
                <div
                  className="bg-[#005A5B] rounded-xl rounded-br-[32px] p-3.5 border-4 border-[#0A0B0E] shadow-inner"
                  style={{
                    boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.6)'
                  }}
                >
                  {/* Bezel Status Row */}
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-[#C5D6D8] mb-2 px-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full border border-black ${
                          cardState === 'SCANNED'
                            ? 'bg-[#00FF66] shadow-[0_0_8px_#00FF66]'
                            : 'bg-[#FF3B30] shadow-[0_0_6px_#FF3B30]'
                        }`}
                      />
                      <span>BATTERY</span>
                    </div>
                    <span className="tracking-tight">DOT MATRIX WITH STEREO SOUND</span>
                  </div>

                  {/* DOT-MATRIX LCD SCREEN */}
                  <div
                    className="w-full h-[250px] border-4 border-[#0A0B0E] p-3 flex flex-col justify-between relative overflow-hidden transition-colors duration-300"
                    style={{
                      backgroundColor: currentPalette.bg,
                      color: currentPalette.ink,
                      fontFamily: "'JetBrains Mono', monospace",
                      backgroundImage: `linear-gradient(to right, ${currentPalette.grid} 1px, transparent 1px), linear-gradient(to bottom, ${currentPalette.grid} 1px, transparent 1px)`,
                      backgroundSize: '4px 4px',
                      boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.35)'
                    }}
                  >
                    {/* --- VIEW 1: IDLE / NO CARTRIDGE STATE (100% Privacy-First) --- */}
                    {cardState === 'IDLE' && lcdView !== 'NO_CARD_WARN' && lcdView !== 'HISTORY' && (
                      <div className="h-full flex flex-col justify-between items-center text-center py-2">
                        <div className="w-full flex items-center justify-between text-[10px] font-extrabold border-b-2 border-current pb-1">
                          <span>THOSKA BOY OS v1.0</span>
                          <span>[13.56 MHz]</span>
                        </div>

                        <div className="my-auto space-y-3 px-2">
                          <div className="inline-block px-2.5 py-1 text-[10px] font-black border-2 border-current">
                            NO CARTRIDGE LOCKED
                          </div>
                          <p
                            className="text-xs sm:text-sm font-black leading-snug animate-pulse"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            &gt;&gt; INSERT THOSKA CARTRIDGE &lt;&lt;
                          </p>
                          <p className="text-[11px] font-extrabold">
                            Press [START] below to simulate an NFC card tap on the back of your phone.
                          </p>
                        </div>

                        <div className="w-full flex items-center justify-between text-[10px] font-extrabold border-t-2 border-current pt-1">
                          <span>PALETTE: {currentPalette.id}</span>
                          <span>ZERO DATA STORED</span>
                        </div>
                      </div>
                    )}

                    {/* --- VIEW 2: WARNING WHEN PRESSING 'A' BEFORE TAPPING --- */}
                    {lcdView === 'NO_CARD_WARN' && (
                      <div className="h-full flex flex-col justify-between items-center text-center py-3">
                        <div className="w-full text-[10px] font-black border-b-2 border-current pb-1">
                          ! HARDWARE ACCESS DENIED !
                        </div>
                        <div className="space-y-2 px-2">
                          <AlertTriangle className="w-9 h-9 mx-auto stroke-[2.5]" />
                          <p
                            className="text-xs font-black leading-relaxed"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            NO CARD LOCKED
                          </p>
                          <p className="text-xs font-extrabold">
                            TAP YOUR THOSKA CARD FIRST (PRESS [START] TO SIMULATE)
                          </p>
                        </div>
                        <button
                          onClick={() => setLcdView('MAIN')}
                          className="px-3 py-1 text-[10px] font-black border-2 border-current uppercase"
                        >
                          [ PRESS A TO RETURN ]
                        </button>
                      </div>
                    )}

                    {/* --- VIEW 3: ACTIVE SCANNED BALANCE & D-PAD BUDGET SIMULATOR --- */}
                    {cardState === 'SCANNED' && activeCard && lcdView === 'MAIN' && (
                      <div className="h-full flex flex-col justify-between">
                        {/* Top Telemetry Header */}
                        <div className="flex items-center justify-between text-[10px] font-black border-b-2 border-current pb-1">
                          <span>
                            {activeProfile ? `P1: ${activeProfile.holderName}` : `GUEST [UID: ${activeCard.uid.slice(0, 8)}]`}
                          </span>
                          <span
                            className="px-1.5 py-0.2 text-[9px]"
                            style={{
                              backgroundColor: currentPalette.badgeBg,
                              color: currentPalette.badgeText
                            }}
                          >
                            AID:{activeCard.aid}
                          </span>
                        </div>

                        {/* Low Balance / Expiry Alert Banner if triggered */}
                        {activeCard.balance < 5.0 ? (
                          <div
                            className="w-full py-1 px-2 text-[10px] font-black text-center animate-pulse"
                            style={{
                              backgroundColor: currentPalette.badgeBg,
                              color: currentPalette.badgeText
                            }}
                          >
                            ! LOW CREDITS - VISIT AUFWERTER !
                          </div>
                        ) : null}

                        {/* Main Balance Readout */}
                        <div className="my-auto text-center py-1">
                          <div className="text-[10px] font-black tracking-widest uppercase">
                            MENSA CREDIT BALANCE
                          </div>
                          <div
                            className="text-2xl sm:text-3xl font-black tracking-tight my-1"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            {activeCard.balance.toFixed(2).replace('.', ',')} €
                          </div>

                          {/* 10-Segment HP Bar + Last Meal Delta */}
                          <div className="flex items-center justify-center gap-2 text-[11px] font-black">
                            <span>LAST: {activeCard.lastTx.toFixed(2).replace('.', ',')} €</span>
                            <span>|</span>
                            <span>PREV: {activeCard.prevBalance.toFixed(2).replace('.', ',')} €</span>
                          </div>

                          {/* 10-Block Pixel HP Bar */}
                          <div className="mt-1.5 flex items-center justify-center gap-1">
                            <span className="text-[10px] font-black mr-1">HP:</span>
                            {Array.from({ length: 10 }).map((_, idx) => {
                              const filled = idx < Math.ceil((activeCard.balance / 50) * 10);
                              return (
                                <span
                                  key={idx}
                                  className="w-3.5 h-3 border-2 border-current inline-block"
                                  style={{
                                    backgroundColor: filled ? currentPalette.ink : 'transparent'
                                  }}
                                />
                              );
                            })}
                          </div>
                        </div>

                        {/* Interactive D-Pad Budget Simulator Bar */}
                        <div className="border-t-2 border-current pt-1.5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-black">
                            <span>▲▼ BUDGET SIMULATOR:</span>
                            <span
                              className="px-1.5 py-0.5 font-black"
                              style={{
                                backgroundColor: currentPalette.badgeBg,
                                color: currentPalette.badgeText
                              }}
                            >
                              AFFORDS: {Math.floor(activeCard.balance / currentBudget.price)}x
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-extrabold">
                            <span>
                              {currentBudget.icon} {currentBudget.label}
                            </span>
                            <span>@ {currentBudget.price.toFixed(2).replace('.', ',')} €</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- VIEW 4: BUTTON A FLIP CARD (LIBRARY BARCODE OR GUEST REGISTER) --- */}
                    {cardState === 'SCANNED' && activeCard && lcdView === 'FLIP_BARCODE' && (
                      <div className="h-full flex flex-col justify-between">
                        {activeProfile ? (
                          <>
                            <div className="flex items-center justify-between text-[10px] font-black border-b-2 border-current pb-1">
                              <span>{activeUniversity?.shortName} LIBRARY PASS</span>
                              <span className="px-1.5 py-0.5 bg-white text-black font-black flex items-center gap-1 border border-black">
                                <Sun className="w-3 h-3 fill-black" /> 100% LUX
                              </span>
                            </div>

                            {/* High-Contrast Pure White Quiet Zone Barcode Box */}
                            <div className="my-auto bg-white p-2 border-2 border-[#0A280A] text-black text-center shadow-sm">
                              <ScannableBarcode value={activeProfile.libraryBarcode} />
                              <div className="text-xs font-mono font-black tracking-[0.2em] mt-1 text-black">
                                {activeProfile.libraryBarcode}
                              </div>
                            </div>

                            <div className="text-[10px] font-black space-y-0.5 border-t-2 border-current pt-1">
                              <div className="flex justify-between">
                                <span>ID: {activeProfile.matrikelNr}</span>
                                <span>VALID: {activeProfile.validUntil}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <button
                                  onClick={() => {
                                    setRegForm({
                                      holderName: activeProfile.holderName,
                                      matrikelNr: activeProfile.matrikelNr,
                                      libraryBarcode: activeProfile.libraryBarcode,
                                      validUntil: activeProfile.validUntil,
                                      universityId: activeProfile.universityId
                                    });
                                    setLcdView('REGISTER_FORM');
                                  }}
                                  className="underline font-black text-[10px]"
                                >
                                  [EDIT PROFILE]
                                </button>
                                <span>PRESS [A] TO FLIP BACK</span>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Unregistered Guest Card Flip View */
                          <div className="h-full flex flex-col justify-between items-center text-center py-2">
                            <div className="w-full text-[10px] font-black border-b-2 border-current pb-1">
                              UNREGISTERED GUEST THOSKA
                            </div>
                            <div className="space-y-2 px-1">
                              <p className="text-xs font-black">UID: {activeCard.uid}</p>
                              <p className="text-[11px] font-extrabold leading-snug">
                                Personal data on DESFire is AES-128 encrypted. Bind your university & library barcode locally to this UID:
                              </p>
                              <button
                                onClick={() => setLcdView('REGISTER_FORM')}
                                className="px-3 py-2 text-xs font-black border-2 border-current shadow-[3px_3px_0px_#0A280A]"
                                style={{
                                  backgroundColor: currentPalette.badgeBg,
                                  color: currentPalette.badgeText
                                }}
                              >
                                [ + REGISTER THIS CARD ]
                              </button>
                            </div>
                            <div className="w-full text-[10px] font-black border-t-2 border-current pt-1">
                              PRESS [A] TO RETURN TO BALANCE
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* --- VIEW 5: GUEST CARD REGISTRATION MODAL (WITH 10-UNI DROPDOWN) --- */}
                    {cardState === 'SCANNED' && activeCard && lcdView === 'REGISTER_FORM' && (
                      <form onSubmit={handleRegisterSubmit} className="h-full flex flex-col justify-between text-[10px] font-black">
                        <div className="flex justify-between border-b-2 border-current pb-1">
                          <span>BIND UID: {activeCard.uid.slice(0, 11)}</span>
                          <button type="button" onClick={() => setLcdView('MAIN')} className="underline">
                            [CANCEL]
                          </button>
                        </div>

                        <div className="space-y-1.5 my-auto">
                          <div>
                            <label className="block text-[9px] uppercase">1. Select Thuringian University:</label>
                            <select
                              value={regForm.universityId}
                              onChange={(e) => setRegForm({ ...regForm, universityId: e.target.value })}
                              className="w-full p-1 bg-white text-black font-mono font-bold text-[10px] border-2 border-black"
                            >
                              {UNIVERSITIES.map((u) => (
                                <option key={u.id} value={u.id}>
                                  {u.shortName} — {u.city}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-1.5">
                            <div>
                              <label className="block text-[9px] uppercase">2. Student Name:</label>
                              <input
                                type="text"
                                placeholder="E.G. ALEX M."
                                value={regForm.holderName}
                                onChange={(e) => setRegForm({ ...regForm, holderName: e.target.value })}
                                className="w-full p-1 bg-white text-black font-mono font-bold text-[10px] border-2 border-black"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase">3. Matrikel-Nr:</label>
                              <input
                                type="text"
                                placeholder="1045752"
                                value={regForm.matrikelNr}
                                onChange={(e) => setRegForm({ ...regForm, matrikelNr: e.target.value })}
                                className="w-full p-1 bg-white text-black font-mono font-bold text-[10px] border-2 border-black"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase">4. Library Barcode (Back of Card):</label>
                            <input
                              type="text"
                              placeholder="340620344072"
                              value={regForm.libraryBarcode}
                              onChange={(e) => setRegForm({ ...regForm, libraryBarcode: e.target.value })}
                              className="w-full p-1 bg-white text-black font-mono font-bold text-[10px] border-2 border-black"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-1.5 font-black uppercase border-2 border-current"
                          style={{
                            backgroundColor: currentPalette.badgeBg,
                            color: currentPalette.badgeText
                          }}
                        >
                          [ SAVE TO LOCAL SQLITE DB ]
                        </button>
                      </form>
                    )}

                    {/* --- VIEW 6: BUTTON B TRANSACTION HISTORY LOG & CSV EXPORT --- */}
                    {lcdView === 'HISTORY' && (
                      <div className="h-full flex flex-col justify-between text-[10px] font-black">
                        <div className="flex items-center justify-between border-b-2 border-current pb-1">
                          <span>SQLITE SCAN LOG (LAST 5)</span>
                          <button
                            onClick={handleExportCsv}
                            className="px-1.5 py-0.5 underline font-black flex items-center gap-1"
                            style={{
                              backgroundColor: currentPalette.badgeBg,
                              color: currentPalette.badgeText
                            }}
                          >
                            [EXPORT CSV]
                          </button>
                        </div>

                        <div className="space-y-1 my-auto py-1">
                          {scanHistory.map((item, idx) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between border-b border-current/30 pb-0.5 text-[10px]"
                            >
                              <span>
                                #{String(idx + 1).padStart(2, '0')} {item.date}
                              </span>
                              <span className="font-black">{item.bal.toFixed(2)}€</span>
                              <span>[{item.delta.toFixed(2)}€]</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between border-t-2 border-current pt-1">
                          <span>100% OFFLINE ROOM DB</span>
                          <button onClick={() => setLcdView('MAIN')} className="underline">
                            [PRESS B TO CLOSE]
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- PHYSICAL CONTROLS AREA (D-PAD, A/B BUTTONS, SELECT/START) --- */}
                <div className="mt-6 px-2 flex items-center justify-between">
                  {/* INTERACTIVE TACTILE CROSS D-PAD */}
                  <div className="relative w-28 h-28 bg-[#C4491F] rounded-full border-2 border-[#9E3714] flex items-center justify-center shadow-inner">
                    <div className="relative w-24 h-24">
                      {/* UP */}
                      <button
                        onClick={handleDpadUp}
                        aria-label="D-Pad Up - Previous Budget Item"
                        className={`absolute top-0 left-8 w-8 h-8 bg-[#2A2E35] border-2 border-[#0A0B0E] flex items-center justify-center active:translate-y-0.5 ${
                          activeBtn === 'UP' ? 'bg-gray-900' : 'hover:bg-[#373C45]'
                        }`}
                      >
                        <span className="text-[10px] text-gray-300">▲</span>
                      </button>
                      {/* DOWN */}
                      <button
                        onClick={handleDpadDown}
                        aria-label="D-Pad Down - Next Budget Item"
                        className={`absolute bottom-0 left-8 w-8 h-8 bg-[#2A2E35] border-2 border-[#0A0B0E] flex items-center justify-center active:translate-y-0.5 ${
                          activeBtn === 'DOWN' ? 'bg-gray-900' : 'hover:bg-[#373C45]'
                        }`}
                      >
                        <span className="text-[10px] text-gray-300">▼</span>
                      </button>
                      {/* LEFT */}
                      <button
                        onClick={handleDpadLeft}
                        aria-label="D-Pad Left - Previous LCD Palette"
                        className={`absolute top-8 left-0 w-8 h-8 bg-[#2A2E35] border-2 border-[#0A0B0E] flex items-center justify-center active:translate-x-[-1px] ${
                          activeBtn === 'LEFT' ? 'bg-gray-900' : 'hover:bg-[#373C45]'
                        }`}
                      >
                        <span className="text-[10px] text-gray-300">◄</span>
                      </button>
                      {/* RIGHT */}
                      <button
                        onClick={handleDpadRight}
                        aria-label="D-Pad Right - Next LCD Palette"
                        className={`absolute top-8 right-0 w-8 h-8 bg-[#2A2E35] border-2 border-[#0A0B0E] flex items-center justify-center active:translate-x-[1px] ${
                          activeBtn === 'RIGHT' ? 'bg-gray-900' : 'hover:bg-[#373C45]'
                        }`}
                      >
                        <span className="text-[10px] text-gray-300">►</span>
                      </button>
                      {/* CENTER PIVOT */}
                      <div className="absolute top-8 left-8 w-8 h-8 bg-[#2A2E35] flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-[#1C1F24] border border-black/50" />
                      </div>
                    </div>
                  </div>

                  {/* ANGLED A & B GLOSSY RED CONSOLE BUTTONS WITH EXTRA-BOLD LABELS */}
                  <div className="bg-[#C4491F] px-4 py-3 rounded-full border-2 border-[#9E3714] -rotate-[22deg] flex items-center gap-5 shadow-inner">
                    {/* B BUTTON */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleButtonB}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4B55] to-[#B81421] border-3 border-[#0A0B0E] shadow-[3px_4px_0px_#0A0B0E] active:translate-y-1 active:shadow-none flex items-center justify-center transition-transform ${
                          activeBtn === 'B' ? 'translate-y-1 shadow-none' : ''
                        }`}
                      >
                        <span
                          className="text-base font-black text-white"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          B
                        </span>
                      </button>
                      <span className="mt-1.5 text-[10px] font-mono font-black tracking-tight text-[#0A0B0E] bg-[#E05A2B]/90 px-1 rounded">
                        B [HISTORY]
                      </span>
                    </div>

                    {/* A BUTTON */}
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleButtonA}
                        className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#FF4B55] to-[#B81421] border-3 border-[#0A0B0E] shadow-[3px_4px_0px_#0A0B0E] active:translate-y-1 active:shadow-none flex items-center justify-center transition-transform ${
                          activeBtn === 'A' ? 'translate-y-1 shadow-none' : ''
                        }`}
                      >
                        <span
                          className="text-base font-black text-white"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          A
                        </span>
                      </button>
                      <span className="mt-1.5 text-[10px] font-mono font-black tracking-tight text-[#0A0B0E] bg-[#E05A2B]/90 px-1 rounded">
                        A [FLIP CARD]
                      </span>
                    </div>
                  </div>
                </div>

                {/* SELECT [EJECT] & START [TAP CARD] PILL BUTTONS */}
                <div className="mt-7 mb-5 flex items-center justify-center gap-8">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleSelectEject}
                      aria-label="Select Eject Card"
                      className={`w-12 h-4 bg-[#4A525D] rounded-full border-2 border-[#0A0B0E] -rotate-[24deg] shadow-[2px_3px_0px_#0A0B0E] active:translate-y-0.5 transition-transform ${
                        activeBtn === 'SELECT' ? 'translate-y-0.5' : 'hover:bg-[#5B6472]'
                      }`}
                    />
                    <span className="mt-2 text-[11px] font-mono font-black tracking-wider text-[#0A0B0E]">
                      SELECT
                    </span>
                    <span className="text-[9px] font-mono font-black text-[#0A0B0E]">[EJECT]</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleSimulateTap()}
                      aria-label="Start Simulate NFC Tap"
                      className={`w-12 h-4 bg-[#4A525D] rounded-full border-2 border-[#0A0B0E] -rotate-[24deg] shadow-[2px_3px_0px_#0A0B0E] active:translate-y-0.5 transition-transform ${
                        activeBtn === 'START' ? 'translate-y-0.5' : 'hover:bg-[#5B6472]'
                      }`}
                    />
                    <span className="mt-2 text-[11px] font-mono font-black tracking-wider text-[#0A0B0E]">
                      START
                    </span>
                    <span className="text-[9px] font-mono font-black text-[#0A0B0E]">[TAP NFC]</span>
                  </div>
                </div>

                {/* BOTTOM SHELL DYNAMIC TELEMETRY & SPEAKER GRILLE */}
                <div className="pt-2 border-t-2 border-[#B5421B] flex items-end justify-between px-1">
                  <div className="text-[10px] font-mono font-black text-[#0A0B0E] leading-tight">
                    {cardState === 'SCANNED' && activeCard ? (
                      <>
                        <div>
                          STATUS: {activeProfile ? `VALID (${activeProfile.validUntil})` : 'GUEST NFC LOCKED'}
                        </div>
                        <div>
                          {activeProfile
                            ? `${activeProfile.holderName} | ID: ${activeProfile.matrikelNr}`
                            : `UID: ${activeCard.uid}`}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>STATUS: WAITING FOR NFC...</div>
                        <div>SLOT: EMPTY (NO PERSONAL DATA)</div>
                      </>
                    )}
                  </div>

                  {/* Classic 6-Slot Speaker Grille */}
                  <div className="flex items-center gap-1 -rotate-[25deg] pr-2 pb-1">
                    {[1, 2, 3, 4, 5, 6].map((slot) => (
                      <div key={slot} className="w-1 h-6 bg-[#591E0A] rounded-full border border-black/40" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: DYNAMIC 10 THURINGIAN UNIVERSITIES SHOWCASE --- */}
      <section id="universities" className="py-14 lg:py-20 border-b-4 border-[#1F242D] bg-[#0A0C0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-block px-3 py-1 bg-[#005A5B] text-white text-xs font-mono font-extrabold border-2 border-black shadow-[3px_3px_0px_#000] mb-3">
                STUDIERENDENWERK THÜRINGEN NETWORK
              </div>
              <h2
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                10 UNIVERSITIES. ONE CARTRIDGE.
              </h2>
            </div>
            <p className="text-sm font-mono text-gray-400 max-w-md">
              Zero hardcoded university logos in the idle state. Click any institution below to test how Thoska Boy dynamically adapts its 8-bit Canvas emblem and library pass:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {UNIVERSITIES.map((uni) => {
              const isSelected = activeUniversity?.id === uni.id && cardState === 'SCANNED';
              return (
                <button
                  key={uni.id}
                  onClick={() => handleSelectUniversityFromGrid(uni.id)}
                  className={`p-4 text-left border-3 border-black transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#E05A2B] text-black shadow-[6px_6px_0px_#9BBC0F] translate-y-[-2px]'
                      : 'bg-[#151921] hover:bg-[#1D222D] text-white shadow-[5px_5px_0px_#000]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="p-2 bg-[#0D0F12] border-2 border-black">
                      <UniversityEmblem type={uni.iconType} color={uni.color} size={28} />
                    </div>
                    <span
                      className={`text-[10px] font-mono font-extrabold px-2 py-0.5 border border-black ${
                        isSelected ? 'bg-black text-[#9BBC0F]' : 'bg-[#0D0F12] text-gray-400'
                      }`}
                    >
                      {uni.city.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <div className="font-mono font-black text-sm tracking-tight flex items-center justify-between">
                      <span>{uni.shortName}</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                          isSelected ? 'text-black' : 'text-[#E05A2B]'
                        }`}
                      />
                    </div>
                    <p
                      className={`text-xs mt-1 line-clamp-1 ${
                        isSelected ? 'text-black/90 font-semibold' : 'text-gray-400'
                      }`}
                    >
                      {uni.fullName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- SECTION 3: 6 RETRO CARTRIDGE FEATURE CARDS --- */}
      <section id="features" className="py-14 lg:py-20 border-b-4 border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="px-3 py-1 bg-[#E05A2B] text-black font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000]">
              ENGINEERED FOR THURINGIA
            </span>
            <h2
              className="mt-4 text-xl sm:text-3xl font-extrabold text-white leading-snug"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              HARDWARE-LEVEL FEATURES
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base font-mono">
              Every control on the Thoska Boy shell maps to a real student workflow—no bloat, no cloud accounts, and no noisy developer telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#E05A2B] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#E05A2B] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <Cpu className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#9BBC0F] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    ISO-DEP / DESFIRE
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  1. Instant MIFARE DESFire Reader
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Communicates directly with your card&apos;s NXP MIFARE DESFire EV1/EV2 chip via raw ISO-DEP APDUs, selecting Intercard AID{' '}
                  <code className="text-[#FFD700] bg-black px-1">0x5F8415</code> and decoding File{' '}
                  <code className="text-[#FFD700] bg-black px-1">0x01</code> with{' '}
                  <code className="text-xs text-gray-400">FLAG_READER_SKIP_NDEF_CHECK</code>.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#9BBC0F] flex items-center justify-between">
                <span>READ TIME: &lt; 80ms</span>
                <span>2-TONE COIN CHIME</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#9BBC0F] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#9BBC0F] text-[#0A280A] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <EyeOff className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#9BBC0F] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    ZERO PRE-SEEDED DATA
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  2. Privacy-First UID Profile Binding
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Starts 100% blank (<code className="text-white">NO CARTRIDGE</code>). Works immediately as an anonymous balance reader for any friend&apos;s card, with optional local profile binding tied to your 7-byte hardware UID.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#9BBC0F] flex items-center justify-between">
                <span>SELECT = EJECT CARD</span>
                <span>DSGVO / GDPR SAFE</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#00E5FF] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#00E5FF] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <Sun className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00E5FF] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    BUTTON A [FLIP]
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  3. Library Barcode + 100% Lux Boost
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Pressing Button A flips the LCD to render a crisp 1D Library Barcode with a pure-white quiet zone and temporarily boosts Android window brightness to 100% for university self-checkout laser scanners.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#00E5FF] flex items-center justify-between">
                <span>AUTO WINDOW BRIGHTNESS</span>
                <span>1D CODE-128 / 39</span>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#FFD700] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FFD700] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <Calculator className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FFD700] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    D-PAD UP/DOWN/L/R
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  4. Tactile D-Pad Budget Simulator
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Use D-Pad Up/Down to calculate how many coffees (1,40 €), laundry loads (2,00 €), or Mensa meals (2,60 € / 3,80 €) your card buys. Use Left/Right to swap between Olive, Pocket Silver, and Backlit Cyan LCDs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#FFD700] flex items-center justify-between">
                <span>4 STW PRICE PRESETS</span>
                <span>3 LCD PALETTES</span>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#FF3333] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FF3333] text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF3333] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    LOW HP &amp; EXPIRY
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  5. Low-Credit &amp; Validation Alerts
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Never get stuck at the Mensa cashier again. Balances under 5,00 € trigger a flashing{' '}
                  <code className="text-white">! VISIT AUFWERTER !</code> banner and 3-beep low-HP chime, plus a 14-day semester thermal-strip expiry countdown.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#FF3333] flex items-center justify-between">
                <span>&lt; 5,00 € THRESHOLD</span>
                <span>14-DAY VALIDITY CHECK</span>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="w-full h-2 bg-[#005A5B] absolute top-0 left-0" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#005A5B] text-white border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                    <FileSpreadsheet className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00E5FF] bg-[#0D0F12] px-2.5 py-1 border border-gray-800">
                    WIDGET + CSV
                  </span>
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-2">
                  6. Home Widget &amp; Offline CSV Export
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Includes a 3x1 retro LCD Android Home Screen widget showing your last scanned balance at a glance, plus one-tap Storage Access Framework CSV export inside Button B History.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-gray-800 text-xs font-mono text-[#9BBC0F] flex items-center justify-between">
                <span>ZERO STORAGE PERMS</span>
                <span>3x1 APP WIDGET</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: UNDER THE HOOD — LIVE APDU BYTE PARSER & GDPR ARCHITECTURE --- */}
      <section id="protocol" className="py-14 lg:py-20 border-b-4 border-[#1F242D] bg-[#0A0C0E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="px-3 py-1 bg-[#9BBC0F] text-[#0A280A] font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000]">
              REVERSE ENGINEERING &amp; SECURITY
            </span>
            <h2
              className="mt-4 text-xl sm:text-3xl font-extrabold text-white"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              UNDER THE HOOD: DESFIRE APDU &amp; DSGVO
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Interactive Little-Endian Hex Converter */}
            <div className="lg:col-span-7 bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 space-y-5">
              <div className="flex items-center justify-between border-b-2 border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#E05A2B]" />
                  <h3 className="font-mono font-extrabold text-base text-white">
                    LIVE ISO-DEP APDU LITTLE-ENDIAN INSPECTOR
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#9BBC0F]">AID: 0x5F8415</span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed">
                Thuringian <code className="text-[#FFD700]">thoska</code> cards store Mensa credits inside MIFARE DESFire Application <code className="text-[#FFD700]">0x5F8415</code>, File <code className="text-[#FFD700]">0x01</code> as a 32-bit Little-Endian integer denominated in 1/1000 € (millicents). Type any Euro balance below to inspect the raw hex frame decoded by <code className="text-white">DesfireReader.kt</code>:
              </p>

              {/* Interactive Input */}
              <div className="p-4 bg-[#0D0F12] border-2 border-[#E05A2B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-[#E05A2B] uppercase">
                    TEST MENSA BALANCE (EUR):
                  </label>
                  <p className="text-[11px] font-mono text-gray-400">
                    Multiplied by 1000 → 32-bit Little-Endian Hex
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    max="500"
                    value={apduEuroInput}
                    onChange={(e) => setApduEuroInput(e.target.value)}
                    className="w-32 px-3 py-2 bg-[#161920] text-[#9BBC0F] font-mono font-extrabold text-lg border-2 border-[#9BBC0F] focus:outline-none"
                  />
                  <span className="text-lg font-mono font-extrabold text-white">€</span>
                </div>
              </div>

              {/* Step-by-Step APDU Trace */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 bg-[#0D0F12] border border-gray-800">
                  <div className="text-gray-400 mb-1">1. SELECT APPLICATION (INTERCARD AID 0x5F8415):</div>
                  <div className="flex items-center justify-between text-[#00E5FF] font-bold">
                    <span>TX &gt; 90 5A 00 00 03 15 84 5F 00</span>
                    <span className="text-[#9BBC0F]">RX &lt; 91 00 (OK)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#0D0F12] border border-gray-800">
                  <div className="text-gray-400 mb-1">2. READ VALUE FILE 0x01 (CURRENT BALANCE):</div>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-bold">
                    <span className="text-[#00E5FF]">TX &gt; 90 6C 00 00 01 01 00</span>
                    <span className="text-[#FFD700] bg-[#1F242D] px-2 py-0.5 border border-[#FFD700]">
                      RX &lt; {apduBreakdown.fullRxFrame}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-gray-400 flex flex-wrap justify-between gap-2 border-t border-gray-800/80 pt-1.5">
                    <span>Little-Endian Bytes: [{apduBreakdown.littleEndianHex}]</span>
                    <span>Int32: {apduBreakdown.milliEuro} (1/1000 €)</span>
                    <span className="text-[#9BBC0F] font-bold">= {apduBreakdown.safeEuro} €</span>
                  </div>
                </div>

                <div className="p-3 bg-[#0D0F12] border border-gray-800">
                  <div className="text-gray-400 mb-1">3. GET FILE SETTINGS 0x01 (BYTES 12..15 = LAST MEAL COST):</div>
                  <div className="flex items-center justify-between text-[#00E5FF] font-bold">
                    <span>TX &gt; 90 F5 00 00 01 01 00</span>
                    <span className="text-[#E05A2B]">DECODES LAST TRANSACTION DELTA (-1.40 €)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* GDPR / DSGVO Security Architecture Explanation */}
            <div className="lg:col-span-5 bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5 border-b-2 border-gray-800 pb-3">
                  <ShieldCheck className="w-6 h-6 text-[#9BBC0F]" />
                  <h3 className="font-mono font-extrabold text-base text-white">
                    WHY NAMES AREN&apos;T SKIMMED (DSGVO / GDPR)
                  </h3>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Under German data protection standards (DSGVO), the Studierendenwerk Thüringen protects your personal identity file (Full Name, Matrikelnummer, and Library ID) inside a separate DESFire application locked with{' '}
                  <span className="text-white font-semibold">AES-128 cryptographic keys</span>.
                </p>

                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-3 bg-[#0D0F12] border-l-4 border-[#9BBC0F]">
                    <div className="font-extrabold text-[#9BBC0F] mb-0.5">
                      ✓ FREE READ (PUBLIC UNENCRYPTED):
                    </div>
                    <div className="text-gray-300">
                      7-Byte Hardware UID (<code className="text-white">tag.id</code>), Mensa Balance (<code className="text-white">File 0x01</code>), and Last Transaction Cost.
                    </div>
                  </div>

                  <div className="p-3 bg-[#0D0F12] border-l-4 border-[#FF3333]">
                    <div className="font-extrabold text-[#FF3333] mb-0.5">
                      🔒 AES-128 LOCKED (TERMINAL ONLY):
                    </div>
                    <div className="text-gray-300">
                      Student Name, Matrikel-Nr, and Library Number cannot be skimmed by random phones on the tram.
                    </div>
                  </div>

                  <div className="p-3 bg-[#0D0F12] border-l-4 border-[#E05A2B]">
                    <div className="font-extrabold text-[#E05A2B] mb-0.5">
                      ⚡ THOSKA BOY UID BINDING SOLUTION:
                    </div>
                    <div className="text-gray-300">
                      When you tap your card, Thoska Boy matches its unique 7-byte UID against your local offline Room/SharedPreferences profile—giving you instant library barcode access while keeping guest taps 100% anonymous.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#0A280A] border-2 border-[#9BBC0F] text-[#9BBC0F] font-mono text-xs flex items-center gap-2.5">
                <Lock className="w-5 h-5 shrink-0" />
                <span>Zero <code className="underline">android.permission.INTERNET</code> in AndroidManifest.xml.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 5: INSTALLATION & BUILD FROM SOURCE --- */}
      <section id="install" className="py-14 lg:py-20 border-b-4 border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-[#005A5B] text-white font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000]">
              ZERO COST • NO PLAY STORE WAIT
            </span>
            <h2
              className="mt-4 text-xl sm:text-3xl font-extrabold text-white"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              INSTALL ON ANDROID
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Step 1: Direct APK */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-extrabold text-[#E05A2B] mb-2">
                  METHOD 01 // INSTANT DIRECT APK
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-3">
                  Direct Download (v1.1.0)
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  Download the signed <code className="text-[#9BBC0F]">ThoskaBoy-release.apk</code> directly from this website (or via GitHub Releases) and install it on any NFC-enabled Android phone.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="/ThoskaBoy-release.apk"
                  download="ThoskaBoy-release.apk"
                  className="w-full py-3 bg-[#E05A2B] hover:bg-[#f26636] text-white font-mono font-extrabold text-xs border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>DIRECT DOWNLOAD APK</span>
                </a>
                <a
                  href="https://github.com/FarhanHamim/Thoska-Reader/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-[#1F242D] hover:bg-gray-700 text-gray-300 font-mono font-bold text-[11px] border border-gray-700 flex items-center justify-center gap-1.5"
                >
                  <span>OR VIA GITHUB RELEASES</span>
                </a>
              </div>
            </div>

            {/* Step 2: Obtainium */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-extrabold text-[#FFD700] mb-2">
                  METHOD 02 // AUTO-UPDATES
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-3">
                  Track via Obtainium
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">
                  Use <span className="text-white font-semibold">Obtainium</span> to pull signed updates straight from GitHub Releases whenever a new tag is published:
                </p>
                <div className="p-2.5 bg-[#0D0F12] border border-gray-800 font-mono text-xs text-gray-300 flex items-center justify-between mb-4">
                  <span className="truncate">https://github.com/FarhanHamim/Thoska-Reader</span>
                  <button
                    onClick={() => copyText('https://github.com/FarhanHamim/Thoska-Reader', 'repo')}
                    className="ml-2 text-[#9BBC0F] hover:underline shrink-0 flex items-center gap-1"
                  >
                    {copiedCmd === 'repo' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <a
                href="obtainium://add/https://github.com/FarhanHamim/Thoska-Reader"
                className="w-full py-3 bg-[#005A5B] hover:bg-[#007475] text-white font-mono font-extrabold text-xs border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-[#FFD700]" />
                <span>ADD TO OBTAINIUM</span>
              </a>
            </div>

            {/* Step 3: Build from Source */}
            <div className="bg-[#14181F] border-3 border-black shadow-[8px_8px_0px_#000] p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-extrabold text-[#9BBC0F] mb-2">
                  METHOD 03 // BUILD FROM SOURCE (JDK 17)
                </div>
                <h3 className="text-lg font-mono font-extrabold text-white mb-3">
                  Compile with Gradle &amp; ADB
                </h3>
                <div className="p-3 bg-[#0D0F12] border border-gray-800 font-mono text-[11px] text-[#9BBC0F] space-y-1">
                  <div>git clone https://github.com/FarhanHamim/Thoska-Reader.git</div>
                  <div>cd Thoska-Reader</div>
                  <div>./gradlew testDebugUnitTest</div>
                  <div>./gradlew installDebug</div>
                </div>
              </div>
              <button
                onClick={() =>
                  copyText(
                    'git clone https://github.com/FarhanHamim/Thoska-Reader.git && cd Thoska-Reader && ./gradlew installDebug',
                    'gradle'
                  )
                }
                className="mt-4 w-full py-3 bg-[#1F242D] hover:bg-gray-700 text-white font-mono font-extrabold text-xs border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center gap-2"
              >
                {copiedCmd === 'gradle' ? <Check className="w-4 h-4 text-[#9BBC0F]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCmd === 'gradle' ? 'COPIED BUILD COMMANDS!' : 'COPY GRADLE COMMANDS'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & LEGAL DISCLAIMER --- */}
      <footer className="py-10 bg-[#08090C] text-gray-400 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-white font-extrabold flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#E05A2B] inline-block" />
              <span>THOSKA BOY (THOSKAPULSE) — OPEN-SOURCE ANDROID NFC UTILITY</span>
            </div>
            <p className="text-gray-400">
              Engineered by <span className="text-white font-bold">Farhan Zaman Ha-mim</span> (M.Sc. Scientific Instrumentation, Ernst-Abbe-Hochschule Jena).
            </p>
            <p className="text-[11px] text-gray-500 max-w-2xl">
              Disclaimer: Unofficial student-built open-source project. Not affiliated with, endorsed by, or connected to Studierendenwerk Thüringen, Ernst-Abbe-Hochschule Jena, or Intercard GmbH.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/FarhanHamim/Thoska-Reader"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#14181F] hover:bg-[#1F242D] text-white border-2 border-gray-700 flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>FarhanHamim/Thoska-Reader</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
