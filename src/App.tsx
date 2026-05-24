import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Lightbulb, 
  Video, 
  LineChart, 
  UserPlus, 
  ArrowUpRight, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Settings, 
  ChevronRight, 
  ChevronLeft,
  Youtube,
  Instagram,
  Twitch,
  Zap,
  Sparkles,
  Phone,
  Mail,
  Send,
  Search,
  Globe,
  Plus,
  Tv,
  Eye,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from './lib/utils';
import RageLogo from './components/RageLogo';
import { LogoLoader } from './components/LogoLoader';

// --- Types ---
interface CaseItem {
  name: string;
  logo: string;
  category: string;
  desc: string;
  results: string;
  link: string;
}

interface BloggerItem {
  name: string;
  followers: string;
  image: string;
  socials: string[];
  engagement: string;
  tag: string;
  youtubeLink?: string;
}

// --- Constants ---

const TOP_BLOGGERS: BloggerItem[] = [
  {
    name: "Краун4к",
    followers: "12,7 тыс. подписчиков",
    image: "/images/kraunchik_logo.jpg",
    socials: ["youtube"],
    engagement: "partner",
    tag: "Гейминг",
    youtubeLink: "https://www.youtube.com/@krayngame/videos"
  },
  {
    name: "EnoT",
    followers: "65 тыс. подписчиков",
    image: "/images/enot_logo.jpg",
    socials: ["youtube"],
    engagement: "partner",
    tag: "Гейминг",
    youtubeLink: "https://www.youtube.com/@EnoT47/videos"
  },
  {
    name: "Mud Flaps На Русском",
    followers: "426 тыс. подписчиков",
    image: "/images/mudflaps_logo.jpg",
    socials: ["youtube"],
    engagement: "exclusive",
    tag: "Майнкрафт",
    youtubeLink: "https://www.youtube.com/@mudflapsrussian"
  },
  {
    name: "Магмуст",
    followers: "63,1 тыс. подписчиков",
    image: "/images/magmust_logo.jpg",
    socials: ["youtube"],
    engagement: "exclusive",
    tag: "Майнкрафт",
    youtubeLink: "https://www.youtube.com/@MagmustX_"
  }
];

const CASES: CaseItem[] = [
  { 
    name: "Дед VPN", 
    logo: "🛡️", 
    category: "Интеграция",
    desc: "Коллаборация с Exile & Deepins. Охватили молодую целевую аудиторию.",
    results: "+240% скачиваний за неделю",
    link: "https://t.me/ragemedia"
  },
  { 
    name: "ZONA51", 
    logo: "🎮", 
    category: "Спецпроект",
    desc: "Серия игровых стримов с брендированием девайсов и эксклюзивными промокодами.",
    results: "Продано 15,000+ девайсов",
    link: "https://t.me/ragemedia"
  },
  { 
    name: "WAR THUNDER", 
    logo: "🎖️", 
    category: "Медиа-кампания",
    desc: "Масштабный турнир среди топ-стримеров СНГ с трансляцией на Twitch.",
    results: "8.5M уникальных просмотров",
    link: "https://t.me/ragemedia"
  },
  { 
    name: "100-балльный репетитор", 
    logo: "🎓", 
    category: "Продвижение",
    desc: "Креативные ролики у подростковых блогеров про эффективную подготовку к ЕГЭ.",
    results: "9,000+ регистраций на курсы",
    link: "https://t.me/ragemedia"
  },
  { 
    name: "Яндекс Маркет", 
    logo: "📦", 
    category: "Амбассадорство",
    desc: "Серия лайфстайл-интеграций в социальные сети с распаковками и обзорами.",
    results: "CTR интеграций вырос на 35%",
    link: "https://t.me/ragemedia"
  }
];

const SERVICES = [
  { icon: <Users size={24} />, title: "Интеграции у блогеров", detail: "Нативное размещение продукта в роликах, стримах и публикациях лидеров мнений." },
  { icon: <LineChart size={24} />, title: "Стратегия и аналитика", detail: "Формирование медиапланов, исследование аудитории и полный аудит эффективности запусков." },
  { icon: <UserPlus size={24} />, title: "Подбор блогеров под задачи", detail: "Собственная база блогеров с разным охватом под фиксированные бюджеты." }
];

// --- Subcomponents ---

interface DiscussModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'RU' | 'EN';
  initialRole?: 'blogger' | 'advertiser';
}

function DiscussModal({ isOpen, onClose, lang, initialRole = 'advertiser' }: DiscussModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    role: 'advertiser',
    budget: '500k-1m',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, role: initialRole }));
    }
  }, [isOpen, initialRole]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Form Container */}
        <motion.div 
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          className="relative bg-black border-2 border-rage-brand p-8 md:p-12 w-full max-w-xl select-none shadow-[8px_8px_0px_#FF00FF] z-10"
        >
          {/* Close trigger */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-rage-brand transition-colors p-2"
          >
            <X size={28} />
          </button>

          {!isDone ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-rage-pink font-display text-sm font-bold tracking-widest uppercase block mb-1">
                  {lang === 'RU' ? 'Обсудить проект' : 'Discuss Project'}
                </span>
                <h3 className="text-3xl font-display font-black text-white uppercase tracking-tighter leading-none mb-6">
                  {lang === 'RU' ? 'ГОТОВЫ СДЕЛАТЬ ШУМ?' : 'READY TO MAKE NOISE?'}
                </h3>
              </div>

              {/* Role switch */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-white/5 border border-white/10 rounded-sm">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'advertiser' }))}
                  className={cn(
                    "py-2 text-xs font-bold uppercase transition-all tracking-wider rounded-xs",
                    formData.role === 'advertiser' ? "bg-rage-brand text-black" : "text-white/60 hover:text-white"
                  )}
                >
                  {lang === 'RU' ? 'Я рекламодатель' : 'I am Advertiser'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: 'blogger' }))}
                  className={cn(
                    "py-2 text-xs font-bold uppercase transition-all tracking-wider rounded-xs",
                    formData.role === 'blogger' ? "bg-rage-brand text-black" : "text-white/60 hover:text-white"
                  )}
                >
                  {lang === 'RU' ? 'Я блогер' : 'I am Blogger'}
                </button>
              </div>

              {/* Input fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-bold text-white/50 block mb-1">ФИО / Имя</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Алексей"
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-white/50 block mb-1">Telegram / Телефон</label>
                  <input 
                    type="text" 
                    required
                    placeholder="@username или +7..."
                    value={formData.contact}
                    onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-sm"
                  />
                </div>

                {formData.role === 'advertiser' && (
                  <div>
                    <label className="text-xs uppercase font-bold text-white/50 block mb-1">Рекламный бюджет</label>
                    <select 
                      value={formData.budget}
                      onChange={e => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full bg-[#121212] border border-white/10 p-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-sm"
                    >
                      <option value="100k-500k">100,000 ₽ — 500,000 ₽</option>
                      <option value="500k-1m">500,000 ₽ — 1,000,000 ₽</option>
                      <option value="1m-3m">1,000,000 ₽ — 3,000,000 ₽</option>
                      <option value="3m+">Более 3,000,000 ₽</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="text-xs uppercase font-bold text-white/50 block mb-1">Пара слов о проекте</label>
                  <textarea 
                    rows={3}
                    placeholder="Хотим охватить СНГ аудиторию с новым продуктом..."
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-sm resize-none"
                  />
                </div>
              </div>

              {/* Submit trigger */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-primary h-14 justify-center text-sm tracking-widest relative overflow-hidden flex items-center gap-3 group"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {lang === 'RU' ? 'ОТПРАВИТЬ ЗАЯВКУ' : 'SUBMIT REQUEST'}
                    <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-rage-brand/10 text-rage-brand rounded-full flex items-center justify-center mx-auto mb-6 border border-rage-brand animate-bounce">
                <CheckCircle size={36} />
              </div>
              <h4 className="text-2xl font-display font-black text-white uppercase mb-3">
                {lang === 'RU' ? 'ЗАЯВКА ОТПРАВЛЕНА!' : 'SUBMITTED SUCCESSFULLY!'}
              </h4>
              <p className="text-white/60 text-sm max-w-sm mx-auto mb-8">
                {lang === 'RU' 
                  ? 'Мы напишем вам в Telegram или перезвоним в течение 15 минут. Давайте делать разницу!' 
                  : 'We will contact you via Telegram or phone within 15 minutes. Let\'s make difference!'}
              </p>
              <button 
                onClick={() => {
                  setIsDone(false);
                  onClose();
                }}
                className="border-2 border-white/20 hover:border-white text-white px-8 py-2.5 font-bold uppercase text-xs"
              >
                {lang === 'RU' ? 'ОТЛИЧНО' : 'GREAT'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

const renderCaseGraphic = (name: string) => {
  switch (name) {
    case "Дед VPN":
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
          {/* Radial grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(172,255,42,0.02)_1px,transparent_1px)] bg-[size:12px_12px]" />
          
          {/* Neon green ambient glow behind glasses */}
          <div className="absolute w-44 h-44 rounded-full bg-[#ACFF2A]/5 blur-3xl group-hover:bg-[#ACFF2A]/10 transition-all duration-500" />
          
          <div className="relative flex flex-col items-center">
            {/* Outline Crest / Beard */}
            <svg className="w-28 h-28 text-white/10 group-hover:text-white/15 transition-colors filter drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M20 30 C20 45 35 60 50 85 C65 60 80 45 80 30 C75 25 25 25 20 30 Z" opacity="0.1" />
              <path d="M35 15 C35 15 50 5 65 15 C75 30 75 50 50 78 C25 50 25 30 35 15 Z" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
            
            {/* Cyberpunk sunglasses with Lime Green glow */}
            <div className="absolute top-[38px] flex gap-1 z-10 group-hover:scale-110 transition-transform duration-500">
              <div className="w-9 h-4.5 bg-[#ACFF2A] border border-black shadow-[0_0_20px_#ACFF2A] transform -skew-x-12 relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <div className="w-2 h-0.5 bg-[#ACFF2A] self-center" />
              <div className="w-9 h-4.5 bg-[#ACFF2A] border border-black shadow-[0_0_20px_#ACFF2A] transform -skew-x-12 relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
            </div>
            
            {/* Santa Hat outline with pink glow */}
            <svg className="absolute -top-[12px] w-22 h-11 text-rage-pink/40 animate-pulse" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M 15 50 C 15 20, 50 10, 80 40 L 85 30" />
              <circle cx="85" cy="30" r="4" fill="currentColor" />
            </svg>
          </div>
        </div>
      );
    case "ZONAS1":
        case "ZONA51":
          return (
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-black/90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(172,255,42,0.03)_1px,transparent_1px)] bg-[size:12px_12px] z-10 pointer-events-none" />
              {/* Subtle neon green glow aura in the center background */}
              <div className="absolute w-36 h-36 bg-[#ACFF2A]/10 rounded-full blur-2xl group-hover:bg-[#ACFF2A]/20 transition-all duration-500 z-0" />
              <img
                src="/images/zone51_logo.jpg"
                alt="ZONA51 Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100 z-0"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        case "WAR THUNDER":
          return (
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-black/90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.03)_1px,transparent_1px)] bg-[size:12px_12px] z-10 pointer-events-none" />
              {/* Subtle pink glow aura in the center background */}
              <div className="absolute w-36 h-36 bg-rage-pink/10 rounded-full blur-2xl group-hover:bg-rage-pink/20 transition-all duration-500 z-0" />
              <img
                src="/images/warthunder_logo.jpg"
                alt="War Thunder Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100 z-0"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        case "100-балльный репетитор":
          return (
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-black/90">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,0,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* Ultra deep pink glow */}
              <div className="absolute w-44 h-44 rounded-full bg-[#FF00FF]/5 blur-3xl group-hover:bg-[#FF00FF]/15 transition-all duration-500" />
              <div className="absolute w-[120px] h-[120px] rounded-full border border-[#FF00FF]/5 bg-[#FF00FF]/2 filter blur-md animate-pulse" />
              
              <div className="relative z-10 font-display font-black text-7xl sm:text-8xl text-rage-pink drop-shadow-[0_0_35px_rgba(255,0,255,0.75)] tracking-tighter group-hover:scale-110 transition-transform duration-500">
                100
              </div>
            </div>
          );
        case "Яндекс Маркет":
          return (
            <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden bg-black/90">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(172,255,42,0.03)_1px,transparent_1px)] bg-[size:12px_12px] z-10 pointer-events-none" />
              {/* Subtle neon yellow-green glow aura in the center background */}
              <div className="absolute w-36 h-36 bg-[#ACFF2A]/10 rounded-full blur-2xl group-hover:bg-[#ACFF2A]/20 transition-all duration-500 z-0" />
              <img
                src="/images/yandexmarket_logo.png"
                alt="Yandex Market Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100 z-0"
                referrerPolicy="no-referrer"
              />
            </div>
          );
    default:
      return (
        <div className="relative w-full h-full flex items-center justify-center select-none">
          <div className="absolute w-36 h-36 rounded-full bg-white/5 blur-3xl" />
          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">💼</span>
        </div>
      );
  }
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const [activeTab, setActiveTab] = useState<'blogger' | 'advertiser'>('blogger');
  const [theme, setTheme] = useState<'dark' | 'neon'>('dark');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDiscussOpen, setIsDiscussOpen] = useState(false);
  const [modalRole, setModalRole] = useState<'blogger' | 'advertiser'>('advertiser');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const openDiscussWithRole = (role: 'blogger' | 'advertiser') => {
    setModalRole(role);
    setIsDiscussOpen(true);
  };

  // Carousel Indexes
  const [caseIndex, setCaseIndex] = useState(0);
  const [bloggerIndex, setBloggerIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter cases based on search or interaction
  const filteredCases = CASES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNextCase = () => {
    setCaseIndex(prev => (prev + 1) % CASES.length);
  };

  const handlePrevCase = () => {
    setCaseIndex(prev => (prev - 1 + CASES.length) % CASES.length);
  };

  const handleNextBlogger = () => {
    setBloggerIndex(prev => (prev + 1) % TOP_BLOGGERS.length);
  };

  const handlePrevBlogger = () => {
    setBloggerIndex(prev => (prev - 1 + TOP_BLOGGERS.length) % TOP_BLOGGERS.length);
  };

  return (
    <div className={cn(
      "text-white min-h-screen relative overflow-x-hidden selection:bg-rage-brand selection:text-black",
      theme === 'neon' ? "theme-neon" : ""
    )}>
      
      {/* Intro Loader Animation */}
      <AnimatePresence>
        {loading && <LogoLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {/* 24/7 Scrollable Site Background Image with Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 bg-repeat-y bg-top"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(4, 4, 6, 0.25), rgba(4, 4, 6, 0.35)), url('/images/site_background.png')",
          backgroundSize: "100% auto",
        }}
      />
      
      {/* 1. HEADER (Navbar) */}
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 flex items-center justify-between",
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent"
      )}>
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <RageLogo className="scale-95 md:scale-100 hover:scale-[1.03] transition-transform" />
        </div>

        {/* Right HUD Interactive Items */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Блогер / Рекламодатель pills */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => openDiscussWithRole('blogger')}
              className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 bg-rage-brand text-black hover:scale-105 cursor-pointer"
            >
              {lang === 'RU' ? 'Блогер' : 'Blogger'}
            </button>
            <button 
              onClick={() => openDiscussWithRole('advertiser')}
              className="px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 bg-transparent border border-white text-white hover:bg-white/10 hover:scale-105 cursor-pointer"
            >
              {lang === 'RU' ? 'Рекламодатель' : 'Advertiser'}
            </button>
          </div>

          {/* SEARCH TRIGGER */}
          <div className="relative">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-10 h-10 rounded-full border border-white/10 hover:border-rage-brand hover:text-rage-brand flex items-center justify-center transition-all bg-[#121212]/20"
              title="Поиск"
            >
              <Search size={16} />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-12 bg-black border border-rage-brand p-3 w-64 shadow-[4px_4px_0px_#FF00FF] flex gap-2 z-50 rounded-sm"
                >
                  <input 
                    type="text" 
                    placeholder={lang === 'RU' ? 'Искать кейсы...' : 'Search cases...'}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="bg-white/5 border border-white/10 p-2 text-xs text-white placeholder-white/40 outline-none w-full focus:border-rage-brand"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-white/50 hover:text-white text-xs">Clear</button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* THEME TOGGLE: солнце/луна */}
          

          {/* LANG DROPDOWN: RU/EN */}
          <div className="relative group">
            <button className="h-10 px-4 rounded-full border border-white/15 hover:border-white flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-tight transition-all bg-black/40 hover:bg-white/[0.04]">
              <span>{lang}</span>
              <span className="text-[8px] opacity-60">▼</span>
            </button>
            <div className="absolute right-0 top-11 bg-[#0a0a0a] border border-white/10 py-1 w-24 hidden group-hover:block rounded-md shadow-xl z-50">
              <button 
                onClick={() => setLang('RU')}
                className={cn("w-full py-2 px-4 text-xs font-bold text-left hover:bg-rage-brand hover:text-black transition-colors rounded-sm", lang === 'RU' ? "text-rage-brand" : "text-white")}
              >
                Русский
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={cn("w-full py-2 px-4 text-xs font-bold text-left hover:bg-rage-brand hover:text-black transition-colors rounded-sm", lang === 'EN' ? "text-rage-brand" : "text-white")}
              >
                English
              </button>
            </div>
          </div>

          {/* HAMBURGER TRIGGER */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-full border border-white/10 hover:border-rage-brand hover:text-rage-brand flex items-center justify-center transition-all bg-[#121212]/20 relative z-50"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Dynamic Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="fixed inset-0 bg-black/98 z-40 flex flex-col items-center justify-center gap-8 min-h-screen px-6"
            >
              <div className="absolute top-1/4 -left-1/4 w-80 h-80 bg-rage-pink/10 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-1/4 -right-1/4 w-80 h-80 bg-rage-brand/10 blur-[100px] pointer-events-none" />

              <div className="text-center space-y-2">
                <span className="text-rage-pink text-xs uppercase tracking-widest font-black">Menu</span>
                <div className="w-10 h-1.5 bg-rage-brand mx-auto mb-10" />
              </div>

              {[
                { title: lang === 'RU' ? 'ГЛАВНАЯ' : 'MAIN', href: '#' },
                { title: lang === 'RU' ? 'КЕЙСЫ' : 'CASES', href: '#cases' },
                { title: lang === 'RU' ? 'УСЛУГИ' : 'SERVICES', href: '#services' },
                { title: lang === 'RU' ? 'БЛОГЕРЫ' : 'BLOGGERS', href: '#bloggers' },
                { title: lang === 'RU' ? 'КОНТАКТЫ' : 'CONTACTS', href: '#contacts' }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-display text-4xl sm:text-5xl font-black text-white hover:text-rage-brand uppercase tracking-tighter transition-colors select-none"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  {item.title}
                </motion.a>
              ))}

              <div className="mt-12 flex gap-6">
                <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="btn-primary">
                  {lang === 'RU' ? 'ОБСУДИТЬ ПРОЕКТ' : 'DISCUSS PROJECT'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. HERO / MAIN CONTENT SECTION */}
       <section className="relative min-h-screen pt-32 pb-48 md:pb-64 lg:pb-80 xl:pb-[340px] px-6 overflow-hidden flex flex-col justify-center">
         {/* Abstract spray splatter and cyber web wireframe behind megaphone and title */}
         <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
           {/* Neon glows */}
           <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-rage-brand/12 blur-[130px] rounded-full mix-blend-screen" />
           <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-rage-pink/12 blur-[100px] rounded-full mix-blend-screen" />
           
           {/* SVG Spiderweb Geo Net */}
           <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
             {/* Green lines & coordinates */}
             <path d="M 50,-10 L 150,120 L 80,280 L -10,180 Z M 150,120 L -10,180 M 50,-10 L 80,280" stroke="#CCFF00" strokeWidth="0.5" fill="none" opacity="0.12" />
             <path d="M 450,100 L 620,180 L 510,360 L 380,290 Z M 620,180 L 380,290 M 450,100 L 510,360" stroke="#CCFF00" strokeWidth="0.5" fill="none" opacity="0.1" />
             
             {/* Pink spiderweb grid behind content */}
             <path d="M 850,220 L 1050,140 L 1180,310 L 980,420 Z L 850,220 L 1180,310 M 1050,140 L 980,420" stroke="#FF007A" strokeWidth="0.6" fill="none" opacity="0.15" />
             <path d="M 900,180 L 1120,270 L 1020,490 Z" stroke="#FF007A" strokeWidth="0.5" fill="none" opacity="0.08" />
             
             {/* Nodes */}
             <circle cx="150" cy="120" r="1.5" fill="#CCFF00" opacity="0.3" />
             <circle cx="80" cy="280" r="1.5" fill="#CCFF00" opacity="0.3" />
             <circle cx="620" cy="180" r="1.5" fill="#CCFF00" opacity="0.25" />
             <circle cx="380" cy="290" r="1.5" fill="#CCFF00" opacity="0.25" />
             <circle cx="850" cy="220" r="2" fill="#FF007A" opacity="0.4" />
             <circle cx="1050" cy="140" r="2" fill="#FF007A" opacity="0.4" />
             <circle cx="1180" cy="310" r="2" fill="#FF007A" opacity="0.4" />
             <circle cx="980" cy="420" r="2" fill="#FF007A" opacity="0.4" />
           </svg>
         </div>

         {/* Background Hero Image - only visible on desktop */}
         <div className="hidden lg:block absolute bottom-[-110px] sm:bottom-[-150px] md:bottom-[-180px] lg:bottom-[-200px] xl:bottom-[-240px] left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-[80px] xl:-right-[140px] 2xl:-right-[180px] w-[130vw] sm:w-[110vw] lg:w-[160vw] xl:w-[180vw] 2xl:w-[200vw] max-w-[620px] sm:max-w-[750px] lg:max-w-[1250px] xl:max-w-[1500px] 2xl:max-w-[1700px] origin-bottom select-none z-0 pointer-events-none">
           <img 
             src="/images/hero_megaphone_photoroom.png" 
             alt="Rage Media Slogan and Megaphone"
             className="w-full h-auto object-contain opacity-100"
             referrerPolicy="no-referrer"
           />
         </div>

         <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Text / CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 max-w-2xl relative z-20 pb-12 lg:pb-0"
            >
              {/* Main heading exactly as ref image */}
              <h1 className="section-title mb-6 text-white text-5xl sm:text-6xl md:text-7.5xl leading-[0.9] tracking-tighter uppercase font-black">
                МЫ ДЕЛАЕМ <br />
                <span className="text-rage-brand block text-6xl sm:text-7xl md:text-8.5xl mt-1 tracking-tighter">
                  РАЗНИЦУ
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 leading-relaxed font-sans max-w-lg">
                Rage Media — это не просто реклама. <br />
                Это влияние. Это культура. Это результат.
              </p>

              {/* Interactive Custom Styled CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => openDiscussWithRole('advertiser')}
                  className="btn-primary group font-extrabold cursor-pointer"
                >
                  {lang === 'RU' ? 'Хочу рекламу' : 'I want ads'}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                
                <button 
                  onClick={() => openDiscussWithRole('blogger')}
                  className="px-7 py-3 bg-transparent border-2 border-rage-pink text-white font-extrabold rounded-full uppercase tracking-tight text-xs sm:text-sm transition-all hover:bg-rage-pink/10 active:scale-95 flex items-center gap-2 group cursor-pointer"
                >
                  {lang === 'RU' ? 'Я блогер' : 'Become blogger'}
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Right Centered Artwork: Combined Megaphone and Slogan Artwork (Image 1) - empty placeholder for grid balance */}
             <div className="lg:col-span-7 min-h-[0px] sm:min-h-[0px] lg:min-h-[720px] xl:min-h-[850px]"></div>

         </div>

       </section>

      {/* 4. CASES / ГРОМКИЕ ПРОЕКТЫ SECTION */}
      <section id="cases" className="py-24 px-6 relative mt-12 bg-black/15 backdrop-blur-xs border-t border-b border-white/5">
        <div className="container mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
            <div>
              <h2 className="section-title text-white">
                {lang === 'RU' ? 'КЕЙСЫ' : 'CASE STUDIES'}
              </h2>
              <span className="text-rage-pink font-sans text-sm sm:text-base font-black uppercase tracking-widest block mt-2">
                {lang === 'RU' ? 'громкие проекты' : 'loud projects'}
              </span>
            </div>
            
            <p className="text-white/60 max-w-sm text-sm leading-relaxed self-end py-1">
              {lang === 'RU' 
                ? 'Мы работаем с топовыми брендами и делаем из рекламы — искусство.' 
                : 'We collaborate with the absolute top tier brands and shape commercials into contemporary art.'}
            </p>

            {/* Slider triggers */}
            <div className="flex gap-3">
              <button 
                onClick={handlePrevCase}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all bg-[#121212]/30 rounded-xs cursor-pointer active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextCase}
                className="w-12 h-12 border border-rage-brand text-rage-brand bg-rage-brand/5 flex items-center justify-center hover:bg-rage-brand hover:text-black transition-all rounded-xs cursor-pointer active:scale-90 shadow-[0_0_10px_rgba(204,255,0,0.15)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards Display */}
          <div className="relative min-h-[380px]">
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredCases.length > 0 ? filteredCases : CASES)
                  .slice(caseIndex, caseIndex + 3)
                  .concat(
                    (filteredCases.length > 0 ? filteredCases : CASES).slice(
                      0,
                      Math.max(0, 3 - (filteredCases.length > 0 ? filteredCases : CASES).slice(caseIndex, caseIndex + 3).length)
                    )
                  )
                  .slice(0, Math.min(3, (filteredCases.length > 0 ? filteredCases : CASES).length))
                  .map((project, i) => (
                    <motion.div 
                      key={project.name + i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      whileHover={{ 
                        y: -8,
                        boxShadow: project.name.includes("Дед") || project.name.includes("ZONA") || project.name.includes("Яндекс")
                          ? "0 15px 35px -10px rgba(172,255,42,0.18)"
                          : "0 15px 35px -10px rgba(255,0,127,0.22)"
                      }}
                      className="group relative bg-[#09090b]/85 border border-white/5 hover:border-white/15 hover:bg-[#050505] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-500 h-[340px] sm:h-[370px] md:h-[400px] cursor-pointer select-none"
                    >
                      {/* Top interactive immersive visual section */}
                      <div className="flex-1 w-full relative flex items-center justify-center bg-gradient-to-b from-black/20 to-black/60 overflow-hidden">
                        {renderCaseGraphic(project.name)}
                      </div>

                      {/* Bottom Sleek Integrated Title & Metrics */}
                      <div className="p-5 bg-black/65 border-t border-white/5 flex items-center justify-between backdrop-blur-md relative z-10">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter group-hover:text-rage-brand transition-colors duration-300">
                            {project.name}
                          </h3>
                          <span className="text-[10px] sm:text-[11px] font-mono uppercase text-rage-pink font-extrabold tracking-widest flex items-center gap-1.5 opacity-95">
                            <Zap size={11} className="text-rage-pink animate-pulse shrink-0" />
                            {project.results}
                          </span>
                        </div>

                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-black group-hover:bg-rage-brand group-hover:border-rage-brand transition-all duration-300 group-hover:scale-105 shrink-0">
                          <ArrowUpRight size={18} className="transform group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                      </div>
                    </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {CASES.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCaseIndex(i)}
                className={cn(
                  "h-1.5 transition-all outline-none rounded-full cursor-pointer",
                  caseIndex === i ? "bg-rage-brand w-8" : "bg-white/10 hover:bg-white/20 w-1.5"
                )} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. STATS / ЦИФРЫ ГОВОРЯТ ЗА НАС SECTION */}
      <section className="py-24 px-6 border-y border-white/5 bg-transparent relative overflow-hidden">
        {/* Constellation background grid behind stats */}
        <div className="absolute inset-0 pointer-events-none opacity-25 select-none z-0">
          <svg className="w-full h-full text-rage-brand" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120,50 L 250,150 L 50,220 Z M 50,220 L 320,310 L 450,180 M 250,150 L 450,180" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M 750,120 L 980,60 L 1100,240 L 850,290 Z M 980,60 L 850,290" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="120" cy="50" r="1.5" fill="currentColor" />
            <circle cx="250" cy="150" r="1.5" fill="currentColor" />
            <circle cx="50" cy="220" r="1.5" fill="currentColor" />
            <circle cx="320" cy="310" r="1.5" fill="currentColor" />
            <circle cx="450" cy="180" r="1.5" fill="currentColor" />
            <circle cx="750" cy="120" r="1.5" fill="currentColor" />
            <circle cx="980" cy="60" r="1.5" fill="currentColor" />
            <circle cx="1100" cy="240" r="1.5" fill="currentColor" />
            <circle cx="850" cy="290" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="mb-16">
            <h2 className="section-title text-white">
              {lang === 'RU' ? 'ЦИФРЫ' : 'STATISTICS'}
            </h2>
            <span className="text-rage-pink font-sans text-sm sm:text-base font-black uppercase tracking-widest block mt-2">
              {lang === 'RU' ? 'говорят за нас' : 'speak for us'}
            </span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: lang === 'RU' ? "успешных кампаний" : "active campaigns", value: "50+", detail: "Каждый кейс в плюс" },
                            { label: lang === 'RU' ? "охват аудитории" : "audience reach", value: "5M+", detail: "Рекордная виральность" },
                            { label: lang === 'RU' ? "топовых блогеров" : "exclusive creators", value: "50+", detail: "Все таланты" },
              { label: lang === 'RU' ? "довольных клиентов" : "customer retention", value: "98%", detail: "Возвращаются за добавкой" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                className="lg:border-l border-white/10 lg:pl-8 first:border-none first:pl-0"
              >
                <div className="text-5xl md:text-6.5xl font-display font-black text-rage-brand mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(172,255,42,0.4)]">
                  {stat.value}
                </div>
                <div className="text-white font-bold text-xs uppercase tracking-widest mb-1">
                  {stat.label}
                </div>
                <div className="text-white/40 text-xs font-mono">
                  {stat.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES / УСЛУГИ SECTION */}
      <section id="services" className="py-24 px-6 relative overflow-hidden bg-transparent flex items-center min-h-[720px] lg:min-h-[850px] border-b border-white/5">
        {/* Pink network geometric mesh backing */}
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none z-0">
          <svg className="w-full h-full text-rage-pink" xmlns="http://www.w3.org/2000/svg">
            <path d="M 680,220 L 800,100 L 920,280 L 780,350 Z M 800,100 L 780,350" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M 150,420 L 300,560 L 50,490 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="680" cy="220" r="1.5" fill="currentColor" />
            <circle cx="800" cy="100" r="1.5" fill="currentColor" />
            <circle cx="920" cy="280" r="1.5" fill="currentColor" />
            <circle cx="780" cy="350" r="1.5" fill="currentColor" />
            <circle cx="150" cy="420" r="1.5" fill="currentColor" />
            <circle cx="300" cy="560" r="1.5" fill="currentColor" />
            <circle cx="50" cy="490" r="1.5" fill="currentColor" />
          </svg>
        </div>

        {/* Massive full-height retro TV background block spanning exactly the top and bottom of the section */}
        <div className="absolute right-0 top-0 bottom-0 h-full z-0 select-none pointer-events-none flex items-center justify-end overflow-hidden w-full lg:w-auto opacity-45 sm:opacity-60 lg:opacity-100">
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full w-auto"
          >
            <img 
              src="/images/tv_photoroom_new.png" 
              alt="Authentic cyberpunk-grunge retro CRT television" 
              className="h-full w-auto object-contain object-right pointer-events-none filter brightness-[1.08] contrast-[1.08] saturate-[1.02]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
            
            {/* Left Col: Lists */}
            <div className="lg:col-span-6 relative z-10">
              <div className="mb-12">
                <h2 className="section-title text-white">
                  {lang === 'RU' ? 'УСЛУГИ' : 'SERVICES'}
                </h2>
                <span className="text-rage-pink font-sans text-sm sm:text-base font-black uppercase tracking-widest block mt-2">
                  {lang === 'RU' ? 'что мы делаем' : 'what we do'}
                </span>
              </div>

              <div className="space-y-3 mb-12">
                {SERVICES.map((s, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setSelectedService(selectedService === i ? null : i)}
                    className={cn(
                      "p-5 transition-all duration-300 border cursor-pointer rounded-xs relative group flex flex-col justify-center backdrop-blur-xs",
                      selectedService === i 
                        ? "bg-[#0c0c0c]/95 border-rage-brand shadow-[0_0_15px_rgba(172,255,42,0.15)]"
                        : "bg-black/85 md:bg-black/75 border-white/10 hover:border-rage-pink/40 hover:bg-[#0f0f0f]/95"
                    )}
                  >
                    <div className="flex items-center justify-between pointer-events-none">
                      <div className="flex items-center gap-4">
                        <span className="text-rage-brand transition-colors">
                          {s.icon}
                        </span>
                        <span className="font-display font-black uppercase tracking-tight text-sm sm:text-base text-white">
                          {s.title}
                        </span>
                      </div>
                      <ArrowUpRight 
                        size={18} 
                        className={cn(
                          "text-rage-brand transition-transform duration-300",
                          selectedService === i ? "rotate-45 scale-110" : "rotate-0"
                        )} 
                        id={`arrow-icon-${i}`}
                      />
                    </div>

                    <AnimatePresence>
                      {selectedService === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-white/70 text-sm leading-relaxed font-sans pr-6">
                            {s.detail}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => setIsDiscussOpen(true)}
                className="btn-primary group"
              >
                {lang === 'RU' ? 'Все услуги' : 'All services'}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right Col: Reserves space on desktop */}
            <div className="lg:col-span-6 relative z-10 w-full">
              {/* Desktop spacer to ensure lists are spaced cleanly on the left column */}
              <div className="hidden lg:block h-[500px]" />
            </div>

          </div>
        </div>
      </section>

      {/* 7. BLOGGERS / НАШИ БЛОГЕРЫ SECTION */}
      <section id="bloggers" className="py-24 px-6 bg-transparent relative overflow-hidden border-b border-white/5">
        {/* Network geometric mesh backing */}
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none z-0">
          <svg className="w-full h-full text-rage-brand" xmlns="http://www.w3.org/2000/svg">
            <path d="M 120,500 L 250,600 L 50,670 Z M 250,600 L 450,580" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <path d="M 850,420 L 1000,560 L 750,490 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
            <circle cx="120" cy="500" r="1.5" fill="currentColor" />
            <circle cx="250" cy="600" r="1.5" fill="currentColor" />
            <circle cx="50" cy="670" r="1.5" fill="currentColor" />
            <circle cx="450" cy="580" r="1.5" fill="currentColor" />
            <circle cx="850" cy="420" r="1.5" fill="currentColor" />
            <circle cx="1000" cy="560" r="1.5" fill="currentColor" />
            <circle cx="750" cy="490" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section banner row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 relative z-10">
            <div>
              <h2 className="section-title text-white">
                {lang === 'RU' ? 'НАШИ' : 'EXCLUSIVES'}
              </h2>
              <span className="text-rage-pink font-sans text-sm sm:text-base font-black uppercase tracking-widest block mt-2">
                {lang === 'RU' ? 'блогеры' : 'creators'}
              </span>
            </div>
            
            <p className="text-white/60 max-w-sm text-sm leading-relaxed self-end py-1">
              {lang === 'RU' 
                ? 'Только проверенные лица. Только жёсткий результат.' 
                : 'Only proven faces with highly authenticated metrics. Hard outcomes guaranteed.'}
            </p>

            {/* Slider control buttons */}
            <div className="flex gap-3">
              <button 
                onClick={handlePrevBlogger}
                className="w-12 h-12 border border-white/10 flex items-center justify-center hover:bg-white/5 text-white transition-all bg-[#121212]/30 rounded-xs cursor-pointer active:scale-90"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNextBlogger}
                className="w-12 h-12 border border-rage-pink text-rage-pink bg-rage-pink/5 flex items-center justify-center hover:bg-rage-pink hover:text-black transition-all rounded-xs cursor-pointer active:scale-90 shadow-[0_0_10px_rgba(255,0,122,0.15)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards slider Grid */}
          <div className="relative min-h-[460px]">
            <AnimatePresence mode="wait">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {TOP_BLOGGERS
                  .slice(bloggerIndex, bloggerIndex + 3)
                  .concat(
                    TOP_BLOGGERS.slice(
                      0,
                      Math.max(0, 3 - TOP_BLOGGERS.slice(bloggerIndex, bloggerIndex + 3).length)
                    )
                  )
                  .slice(0, Math.min(3, TOP_BLOGGERS.length))
                  .map((blogger, i) => (
                    <motion.div 
                      key={blogger.name + i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="group relative h-full flex flex-col justify-between bg-[#0b0b0b] border border-white/5 overflow-hidden rounded-xs"
                    >
                      {/* Image Frame */}
                      <div className="aspect-[4/5] relative overflow-hidden bg-black flex items-center justify-center">
                        <img 
                          src={blogger.image} 
                          alt={blogger.name}
                          className="w-full h-full object-cover filter contrast-[1.05] grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />

                        {/* Top corner category tags */}
                        <div className="absolute top-16 left-4 flex gap-2 z-20">
                          <span className="text-[9px] font-mono tracking-wider font-extrabold bg-black/85 backdrop-blur-md text-white border border-white/10 px-2.5 py-1 rounded-xs uppercase tracking-widest">
                            {blogger.tag}
                          </span>
                        </div>

                        {/* Status Brand Badge overlay */}
                        <div className="absolute top-16 right-4 z-20">
                          <span className={cn(
                            "text-[9px] font-mono tracking-widest font-black px-2.5 py-1 rounded-xs uppercase border shadow-md",
                                                        blogger.engagement === "exclusive"
                                                          ? "bg-rage-pink text-white border-rage-pink/30 shadow-rage-pink/20"
                                                          : "bg-[#ACFF2A] text-black border-black shadow-[#ACFF2A]/20"
                                                      )}>
                                                        {blogger.engagement === "exclusive"
                                                          ? (lang === 'RU' ? 'ЭКСКЛЮЗИВ' : 'ALL TALENTS')
                                                          : blogger.engagement === "partner"
                                                          ? (lang === 'RU' ? 'ПАРТНЁР' : 'PARTNER')
                              : blogger.engagement}
                          </span>
                        </div>

                        {/* Green tag positioned над (above) the photo */}
                        <div className="absolute top-4 left-4 bg-rage-brand text-black px-4 py-1.5 font-display font-black text-xl rotate-[-2deg] z-30 transform uppercase tracking-tighter shadow-[0_0_15px_#ACFF2A] border border-black rounded-xs">
                          {blogger.name}
                        </div>

                        {/* Floating visual decorations */}
                        {blogger.name === "GENSYXA" && (
                          <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="absolute right-4 top-28 z-30"
                          >
                            <Zap size={32} className="text-rage-pink fill-rage-pink drop-shadow-[0_0_12px_#FF00FF]" />
                          </motion.div>
                        )}

                        {blogger.name === "DEEPINS" && (
                          <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute right-4 top-28 z-30"
                          >
                            <Sparkles size={28} className="text-rage-pink drop-shadow-[0_0_10px_#FF00FF]" />
                          </motion.div>
                        )}

                        {blogger.name === "EXILE" && (
                          <div className="absolute right-5 top-28 z-30">
                            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                              <div className="w-2.5 h-2.5 rounded-full bg-rage-pink drop-shadow-[0_0_8px_#FF00FF] animate-pulse" />
                            </div>
                          </div>
                        )}

                        {/* Stretched bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 py-20 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-10" />

                        {/* Social overlays / details on absolute placement */}
                        <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                          <p className="text-[#ACFF2A] font-display font-black text-lg mb-2 leading-none uppercase tracking-tight">
                            {blogger.followers}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-3 border-t border-white/10">
                            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-white/50 hover:text-rage-brand transition-colors flex items-center gap-1 text-xs font-mono">
                                                          <Youtube size={14} /> YouTube
                                                        </a>
                          </div>
                        </div>
                      </div>

                      {/* Hot glow accent */}
                      <div className="absolute inset-0 border border-transparent group-hover:border-rage-pink/20 transition-all duration-300 pointer-events-none" />
                    </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
          
          {/* Pagination control dots */}
          <div className="flex justify-center gap-2 mt-12">
            {TOP_BLOGGERS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setBloggerIndex(i)}
                className={cn(
                  "h-1.5 transition-all outline-none rounded-full cursor-pointer",
                  bloggerIndex === i ? "bg-rage-pink w-8" : "bg-white/10 hover:bg-white/20 w-1.5"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOOTER / CONTACTS SECTION */}
      <footer id="contacts" className="pt-32 pb-12 px-6 relative bg-black/20 backdrop-blur-xs overflow-hidden border-t border-white/5">
        {/* Giant visual logo in background with slight opacity */}
        <div className="absolute -bottom-32 -right-32 pointer-events-none opacity-[0.04] select-none z-0">
          <div className="font-display font-black text-[220px] md:text-[340px] leading-none uppercase tracking-tighter text-white">
            RAGE
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
            
            {/* Left Column: Action Call Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <h3 className="section-title mb-6 max-w-sm text-white font-display text-4xl leading-[0.9] tracking-tighter uppercase">
                {lang === 'RU' ? 'Готовы сделать что-то' : 'Ready to make something'} <br />
                <span className="text-rage-brand block my-2">по-настоящему</span> 
                <span className="underline decoration-[#FF00FF] decoration-6 underline-offset-8">громкое?</span>
              </h3>
              <p className="text-white/50 text-xs max-w-sm leading-relaxed mt-4 font-sans">
                {lang === 'RU' 
                  ? 'Оставьте заявку или свяжитесь с нами напрямую. Наша команда перезвонит вам в течение 10-15 минут.' 
                  : 'Submit a feedback ticket or reach out using channels below. We are on hold 24/7.'}
              </p>
            </motion.div>

            {/* Center Column: Practical contact handles */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-4">
                <a 
                  href="tel:+79991234567" 
                  className="flex items-center gap-4 text-lg font-bold font-display hover:text-rage-brand transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#121212]/30 group-hover:border-rage-brand group-hover:text-rage-brand transition-all">
                    <Phone size={16} className="text-rage-brand" />
                  </div>
                  <span className="text-white group-hover:text-white transition-colors">+7 (999) 123-45-67</span>
                </a>

                <a 
                  href="mailto:hello@ragemedia.ru" 
                  className="flex items-center gap-4 text-lg font-bold font-display hover:text-rage-brand transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#121212]/30 group-hover:border-rage-brand group-hover:text-rage-brand transition-all">
                    <Mail size={16} className="text-rage-brand" />
                  </div>
                  <span className="text-white group-hover:text-white transition-colors">hello@ragemedia.ru</span>
                </a>

                <a 
                  href="https://t.me/ragemedia" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 text-lg font-bold font-display hover:text-rage-brand transition-colors group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#121212]/30 group-hover:border-rage-brand group-hover:text-rage-brand transition-all">
                    <Send size={16} className="text-rage-brand" />
                  </div>
                  <span className="text-white group-hover:text-white transition-colors">t.me/ragemedia</span>
                </a>
              </div>

              {/* Submit CTA trigger opens contact popup */}
              <button 
                onClick={() => openDiscussWithRole('advertiser')}
                className="btn-primary group relative overflow-hidden cursor-pointer"
              >
                {lang === 'RU' ? 'Обсудить проект' : 'Discuss project'}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right Column: Multi-layered graffiti logo with neon indicator arrow */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center relative select-none pt-12 lg:pt-0">
              {/* Logo from uploaded asset with floating/glow animation */}
              <div className="pt-8 flex justify-center lg:justify-end">
                <motion.img 
                  src="/images/rage_logo_uploaded.png"
                  alt="Rage Media Logo"
                  className="h-12 md:h-16 w-auto object-contain cursor-pointer filter drop-shadow-[0_0_12px_rgba(172,255,42,0.15)] hover:drop-shadow-[0_0_25px_rgba(172,255,42,0.45)] transition-shadow"
                  referrerPolicy="no-referrer"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, -1, 1, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 2,
                  }}
                  whileTap={{ scale: 0.95 }}
                />
              </div>
            </div>

          </div>

          {/* Legal references row */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-mono">
            <div>© 2026 Rage Media. {lang === 'RU' ? 'Все права защищены.' : 'All rights reserved.'}</div>
            <div className="flex gap-6 sm:gap-8">
              <a href="#privacy" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#terms" className="hover:text-white transition-colors">Публичная оферта</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 9. CONTACT MODAL OVERLAY */}
      <DiscussModal 
        isOpen={isDiscussOpen} 
        onClose={() => setIsDiscussOpen(false)} 
        lang={lang}
      />

    </div>
  );
}
