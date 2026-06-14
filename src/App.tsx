import React, { useState, useEffect, useRef } from 'react';
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
  ChevronRight,
  ChevronLeft,
  Youtube,
  Send,
  Zap,
  Sparkles,
  Phone,
  Mail,
  CheckCircle,
  HelpCircle,
  Megaphone,
  Palette,
  Volume2,
  Lock,
  Layers,
  Star,
  Flame,
  Award,
  Sun,
  Moon,
  ChevronDown,
  Briefcase,
  Eye
} from 'lucide-react';
import { cn } from './lib/utils';
import RageLogo from './components/RageLogo';
import { LogoLoader } from './components/LogoLoader';
import TornStrip from './components/TornStrip';

// --- Types ---
interface CaseItem {
  name: string;
  categoryRU: string;
  categoryEN: string;
  descRU: string;
  descEN: string;
  resultsRU: string;
  resultsEN: string;
  link: string;
  badgeColor: string;
  glowColor: string;
  accentText: string;
}

interface BloggerItem {
  name: string;
  followers: string;
  tagRU: string;
  tagEN: string;
  engagement: 'exclusive' | 'partner';
  platform: 'youtube' | 'twitch' | 'telegram';
  color: string;
  link: string;
}

// --- Constants ---
const CASES: CaseItem[] = [
  {
    name: "War Thunder",
    categoryRU: "Медиа-кампания",
    categoryEN: "Media Campaign",
    descRU: "На регулярной основе реализуем рекламный бюджет через размещения у тематических авторов, тестируя новые форматы и связки с инфлюенсерами.",
    descEN: "We regularly run advertising campaigns with gaming creators, testing new formats and influencer combinations.",
    resultsRU: "12M+ Охватов",
    resultsEN: "12M+ Reach",
    link: "#contacts",
    badgeColor: "bg-orange-600 text-white",
    glowColor: "shadow-[0_0_20px_rgba(234,88,12,0.45)] hover:border-orange-500",
    accentText: "text-orange-500"
  },
  {
    name: "Zona51",
    categoryRU: "Спецпроект",
    categoryEN: "Special Project",
    descRU: "Ежемесячно организуем размещения на бартерной основе более чем у 15 авторов, обеспечивая стабильное присутствие бренда в инфлюенс-маркетинге.",
    descEN: "Monthly organize barter-based integrations with over 15 creators, ensuring a stable brand presence in influencer marketing.",
    resultsRU: "15k+ Продаж",
    resultsEN: "15k+ Sales",
    link: "#contacts",
    badgeColor: "bg-lime-500 text-black",
    glowColor: "shadow-[0_0_20px_rgba(172,255,42,0.45)] hover:border-rage-brand",
    accentText: "text-rage-brand"
  },
  {
    name: "Playerok",
    categoryRU: "Инфлюенс-кампания",
    categoryEN: "Influence Campaign",
    descRU: "Регулярно запускаем интеграции у релевантных авторов, тестируя различные рекламные форматы и подходы к подаче.",
    descEN: "Regularly launch integrations with relevant creators, testing various ad formats and messaging angles.",
    resultsRU: "+180% Лидов",
    resultsEN: "+180% Leads",
    link: "#contacts",
    badgeColor: "bg-blue-500 text-white",
    glowColor: "shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:border-blue-500",
    accentText: "text-blue-500"
  },
  {
    name: "Block Blast",
    categoryRU: "Запуск",
    categoryEN: "Launch",
    descRU: "Запустили кампанию с размещением рекламных роликов в коротком видеоконтенте (Shorts / TikTok).",
    descEN: "Launched a campaign with video placements in short-form content (Shorts / TikTok).",
    resultsRU: "500k+ Установок",
    resultsEN: "500k+ Installs",
    link: "#contacts",
    badgeColor: "bg-[#f72689] text-white",
    glowColor: "shadow-[0_0_20px_rgba(247,38,137,0.45)] hover:border-[#f72689]",
    accentText: "text-[#f72689]"
  },
  {
    name: "Radmir RP",
    categoryRU: "Интеграция",
    categoryEN: "Integration",
    descRU: "Запустили кампанию с полноценными рекламными роликами у релевантных авторов для целевой аудитории проекта.",
    descEN: "Launched a campaign with full-length video integrations with creators relevant to the project's target audience.",
    resultsRU: "50k+ Игроков",
    resultsEN: "50k+ Players",
    link: "#contacts",
    badgeColor: "bg-pink-500 text-white",
    glowColor: "shadow-[0_0_20px_rgba(236,72,153,0.45)] hover:border-pink-500",
    accentText: "text-pink-500"
  },
  {
    name: "100 Балльный Репетитор",
    categoryRU: "Продвижение",
    categoryEN: "Promotion",
    descRU: "Протестировали формат баннерных интеграций в коротких видео (Shorts / TikTok).",
    descEN: "Tested banner integrations format in short-form videos (Shorts / TikTok).",
    resultsRU: "+250% Конверсия",
    resultsEN: "+250% Conversion",
    link: "#contacts",
    badgeColor: "bg-rose-500 text-white",
    glowColor: "shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:border-rose-500",
    accentText: "text-rose-500"
  },
  {
    name: "Ded VPN",
    categoryRU: "Коллаборация",
    categoryEN: "Collaboration",
    descRU: "Привлекли аудиторию через интеграции на YouTube с акцентом на релевантные тематические площадки.",
    descEN: "Acquired audience through YouTube integrations focusing on relevant niche channels.",
    resultsRU: "300k+ Лидов",
    resultsEN: "300k+ Leads",
    link: "#contacts",
    badgeColor: "bg-emerald-500 text-white",
    glowColor: "shadow-[0_0_20px_rgba(16,185,129,0.45)] hover:border-emerald-500",
    accentText: "text-emerald-500"
  },
  {
    name: "Arizona RP",
    categoryRU: "Медиа-кампания",
    categoryEN: "Media Campaign",
    descRU: "Реализовали размещение прероллов в контенте игровых нарезчиков стримеров.",
    descEN: "Implemented pre-roll placements within gaming streamer highlight channels.",
    resultsRU: "80k+ Активаций",
    resultsEN: "80k+ Activations",
    link: "#contacts",
    badgeColor: "bg-red-500 text-white",
    glowColor: "shadow-[0_0_20px_rgba(239,68,68,0.45)] hover:border-red-500",
    accentText: "text-red-500"
  },
  {
    name: "Arknights Endfield",
    categoryRU: "Запуск",
    categoryEN: "Launch",
    descRU: "Организовали размещения у профильных авторов в игровой тематике, обеспечив конкурентную стоимость размещений.",
    descEN: "Organized placements with dedicated gaming creators, securing competitive ad rates.",
    resultsRU: "2.5M+ Предрегистраций",
    resultsEN: "2.5M+ Pre-registrations",
    link: "#contacts",
    badgeColor: "bg-amber-600 text-white",
    glowColor: "shadow-[0_0_20px_rgba(217,119,6,0.45)] hover:border-amber-500",
    accentText: "text-amber-500"
  },
  {
    name: "NTE",
    categoryRU: "Спецпроект",
    categoryEN: "Special Project",
    descRU: "Провели рекламную кампанию в ограниченные сроки на релизе проекта, пробив KPI, разместившись по 0,1 CPV",
    descEN: "Conducted a time-restricted ad campaign at launch, beating KPIs with a 0.1 CPV rate.",
    resultsRU: "5M+ Просмотров",
    resultsEN: "5M+ Views",
    link: "#contacts",
    badgeColor: "bg-teal-500 text-black",
    glowColor: "shadow-[0_0_20px_rgba(20,184,166,0.45)] hover:border-teal-500",
    accentText: "text-teal-500"
  }
];

const BLOGGERS: BloggerItem[] = [
  { name: "Неркин", followers: "225k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-emerald-500 to-teal-700", link: "https://www.youtube.com/@Nerkin" },
  { name: "PWGood", followers: "3M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-blue-500 to-indigo-700", link: "https://www.youtube.com/@pwgood" },
  { name: "40 Литров Пива", followers: "700k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-amber-500 to-orange-700", link: "https://www.youtube.com/@40_JIuTpoB_IIuBa" },
  { name: "SKIJL", followers: "415k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-[#f72689] to-pink-700", link: "https://www.youtube.com/@SKIJL" },
  { name: "Шут", followers: "600k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-red-500 to-rose-700", link: "https://www.youtube.com/@шут-228" },
  { name: "Honey", followers: "120k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-pink-500 to-rose-700", link: "https://www.youtube.com/@Honey_l1fe" },
  { name: "Лолотрек", followers: "225k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-green-500 to-emerald-700", link: "https://www.youtube.com/@lolotrack_minecraft" },
  { name: "Квист", followers: "250k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-cyan-500 to-blue-700", link: "https://www.youtube.com/@kW1sst" },
  { name: "Магмуст", followers: "700k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-teal-500 to-emerald-700", link: "https://www.youtube.com/@MagmustX" },
  { name: "Mud Flaps На Русском", followers: "2.5M", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-yellow-500 to-amber-700", link: "https://youtube.com/@mudflapsrussian" },
  { name: "Myles На Русском", followers: "250k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "exclusive", platform: "youtube", color: "from-indigo-500 to-[#f72689]", link: "https://youtube.com/@mylesmcrussian" },
  { name: "Нео", followers: "115k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-[#f72689] to-pink-700", link: "https://www.youtube.com/@neo_archangel" },
  { name: "Гельмо", followers: "50k", tagRU: "Майнкрафт", tagEN: "Minecraft", engagement: "partner", platform: "youtube", color: "from-rose-500 to-red-700", link: "https://www.youtube.com/@Gelmo" },
  { name: "KtoWho", followers: "95k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-slate-500 to-neutral-700", link: "https://youtube.com/@ktowho" },
  { name: "Мэншен", followers: "100k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-fuchsia-500 to-pink-700", link: "https://www.youtube.com/@itsmansion/videos" },
  { name: "ReyZone", followers: "100k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-blue-600 to-indigo-800", link: "https://www.youtube.com/@ReyZone" },
  { name: "Soilinf", followers: "120k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-lime-500 to-emerald-700", link: "https://youtube.com/@soilinf" },
  { name: "Краун4к", followers: "180k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "exclusive", platform: "youtube", color: "from-orange-500 to-red-700", link: "https://www.youtube.com/@krayngame" },
  { name: "EnoT", followers: "300k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-emerald-600 to-teal-800", link: "https://www.youtube.com/@EnoT47" },
  { name: "Tearz", followers: "60k", tagRU: "Гейминг", tagEN: "Gaming", engagement: "partner", platform: "youtube", color: "from-pink-600 to-rose-800", link: "https://www.youtube.com/@Tearzed" }
];

const SERVICES = [
  {
    titleRU: "Интеграции у блогеров",
    titleEN: "Blogger Integrations",
    detailRU: "Подберем лучших под портрет вашей аудитории.",
    detailEN: "We will select the best creators matching your audience profile.",
    icon: <Users size={28} />,
    doodle: "🔥",
    doodleText: "ХИТ",
    color: "border-rage-brand",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(172,255,42,0.25)]",
    tag: "blogger"
  },
  {
    titleRU: "Медиабаинг",
    titleEN: "Media Buying",
    detailRU: "Закупаем трафик по низу рынка и пробиваем планку KPI.",
    detailEN: "We buy traffic at the lowest rates and exceed KPI targets.",
    icon: <LineChart size={28} />,
    doodle: "📈",
    doodleText: "ROI",
    color: "border-white",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]",
    tag: "media"
  },
  {
    titleRU: "Стратегия и консалтинг",
    titleEN: "Strategy & Consulting",
    detailRU: "Выстраиваем систему роста бренда.",
    detailEN: "We build growth systems for your brand.",
    icon: <Lightbulb size={28} />,
    doodle: "🧠",
    doodleText: "PLAN",
    color: "border-rage-brand",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(172,255,42,0.25)]",
    tag: "strategy"
  },
  {
    titleRU: "Запуск совместных проектов",
    titleEN: "Launch of Joint Projects",
    detailRU: "Идея ваша. Реализация и рост — наши.",
    detailEN: "Your idea. Our implementation and growth.",
    icon: <UserPlus size={28} />,
    doodle: "⭐",
    doodleText: "LAUNCH",
    color: "border-rage-pink",
    glowColor: "group-hover:shadow-[0_0_30px_rgba(247,38,137,0.25)]",
    tag: "projects"
  }
];

// --- Count Up Animation Component ---
function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, ''), 10) || 0;
  const suffix = value.replace(/[\d]/g, '');
  const ref = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);

    let timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, numericValue, duration]);

  return (
    <div ref={ref} className="inline-block">
      {count}
      {suffix}
    </div>
  );
}

// --- Brand and Collaboration Logos mapping ---
const BLOGGER_AVATARS: Record<string, string> = {
  "Магмуст": "/images/magmust_logo.jpg",
  "Mud Flaps На Русском": "/images/mudflaps_logo.jpg",
  "Краун4к": "/images/kraunchik_logo.jpg",
  "EnoT": "/images/enot_logo.jpg",
  "Honey": "/images/honey_logo.jpg",
  "Неркин": "/images/av_u2uq5_logo.jpg",
  "Tearz": "/images/tearz_logo.jpg",
  "ReyZone": "/images/reyzone_logo.jpg",
  "Soilinf": "/images/soilinf_logo.jpg",
  "Шут": "/images/av_hk47u6_logo.jpg",
  "Лолотрек": "/images/av_icq1u_logo.jpg",
  "Гельмо": "/images/av_3li6bs_logo.jpg",
  "Нео": "/images/av_tbmyvd_logo.jpg",
  "PWGood": "/images/pwgood_logo.jpg",
  "40 Литров Пива": "/images/40_logo.jpg",
  "SKIJL": "/images/skijl_logo.jpg",
  "Квист": "/images/av_584l4_logo.jpg",
  "Мэншен": "/images/av_iabpv_logo.jpg",
  "KtoWho": "/images/ktowho_logo.jpg",
  "Myles На Русском": "/images/myles_logo.jpg"
};

const CASE_LOGOS: Record<string, string> = {
  "War Thunder": "/images/warthunder_logo.jpg",
  "Zona51": "/images/zone51_logo.jpg",
  "Playerok": "/images/Playerok.png",
  "Arknights Endfield": "/images/Arknights.jpg",
  "NTE": "/images/NTE.png",
  "Ded VPN": "/images/Дед ВПН.jpg",
  "100 Балльный Репетитор": "/images/100 бальный.png",
  "Arizona RP": "/images/Arizona RP.png",
  "Block Blast": "/images/Block blast.jpg",
  "Radmir RP": "/images/Radmir RP.jpg"
};


interface AutoScrollContainerProps {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  speed?: number;
  className?: string;
  showArrows?: boolean;
}

function AutoScrollContainer({
  children,
  direction = 'ltr',
  speed = 0.6,
  className,
  showArrows = false
}: AutoScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInteractingRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  // Drag/swipe tracking refs
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const scrollLeftStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const momentumRafRef = useRef<number | null>(null);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopInteraction = () => {
    if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
    interactionTimeoutRef.current = setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        let totalWidth = container.scrollWidth;
        let visibleWidth = container.clientWidth;
        let oneThird = totalWidth / 3;
        const currentScroll = container.scrollLeft;
        if (currentScroll >= oneThird * 2) {
          container.scrollLeft -= oneThird;
        } else if (currentScroll <= oneThird) {
          container.scrollLeft += oneThird;
        }
      }
      isInteractingRef.current = false;
    }, 2000);
  };

  const handleManualScroll = (dir: 'left' | 'right') => {
    const container = containerRef.current;
    if (container) {
      isInteractingRef.current = true;
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);

      const scrollOffset = dir === 'left' ? -380 : 380;
      container.scrollBy({ left: scrollOffset, behavior: 'smooth' });
      stopInteraction();
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = direction === 'ltr' ? speed : -speed;
    let totalWidth = container.scrollWidth;
    let visibleWidth = container.clientWidth;
    let oneThird = totalWidth / 3;

    const updateDimensions = () => {
      if (container) {
        totalWidth = container.scrollWidth;
        visibleWidth = container.clientWidth;
        oneThird = totalWidth / 3;
      }
    };

    window.addEventListener('resize', updateDimensions);

    // Set initial scroll position to the center to allow seamless looping
    const setInitialScroll = () => {
      if (container) {
        totalWidth = container.scrollWidth;
        visibleWidth = container.clientWidth;
        oneThird = totalWidth / 3;
        container.scrollLeft = (totalWidth - visibleWidth) / 2;
      }
    };

    const timer = setTimeout(setInitialScroll, 100);

    const wrapScroll = () => {
      if (!container) return;
      const currentScroll = container.scrollLeft;
      if (currentScroll >= oneThird * 2) {
        container.scrollLeft -= oneThird;
      } else if (currentScroll <= oneThird) {
        container.scrollLeft += oneThird;
      }
    };

    const animate = () => {
      if (!isInteractingRef.current && container) {
        container.scrollLeft += scrollAmount;
        wrapScroll();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // --- Touch handlers (we let the browser handle native scrolling on mobile) ---
    const handleTouchStart = () => {
      isInteractingRef.current = true;
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
    };

    const handleTouchEnd = () => {
      stopInteraction();
    };

    const handleScroll = () => {
      wrapScroll();
    };

    // --- Mouse drag handlers (desktop) ---
    const handleMouseDown = (e: MouseEvent) => {
      isInteractingRef.current = true;
      isDraggingRef.current = true;
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      startXRef.current = e.clientX;
      scrollLeftStartRef.current = container.scrollLeft;
      lastXRef.current = e.clientX;
      lastTimeRef.current = Date.now();
      velocityRef.current = 0;
      container.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = startXRef.current - x;
      container.scrollLeft = scrollLeftStartRef.current + walk;
      const now = Date.now();
      const dt = now - lastTimeRef.current;
      if (dt > 0) {
        velocityRef.current = (lastXRef.current - x) / dt;
      }
      lastXRef.current = x;
      lastTimeRef.current = now;
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.style.cursor = '';
      let v = velocityRef.current * 15;
      const decel = 0.95;
      const applyMomentum = () => {
        if (Math.abs(v) < 0.5) {
          stopInteraction();
          return;
        }
        container.scrollLeft += v;
        v *= decel;
        wrapScroll();
        momentumRafRef.current = requestAnimationFrame(applyMomentum);
      };
      momentumRafRef.current = requestAnimationFrame(applyMomentum);
    };

    const handleMouseLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        container.style.cursor = '';
      }
      stopInteraction();
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    container.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed]);

  const classes = className ? className.split(' ') : [];
  const outerClasses = ['relative', 'group/scroll-container', 'w-screen', 'left-1/2', 'right-1/2', '-ml-[50vw]', '-mr-[50vw]', 'overflow-visible'];
  const innerClasses = ['overflow-x-auto', 'scrollbar-none', 'flex', 'select-none', 'cursor-grab', 'active:cursor-grabbing', 'w-full'];

  classes.forEach(c => {
    if (c.startsWith('mb-') || c.startsWith('mt-') || c.startsWith('my-') || c.startsWith('m-')) {
      outerClasses.push(c);
    } else if (c.startsWith('p-') || c.startsWith('px-') || c.startsWith('py-') || c.startsWith('gap-')) {
      innerClasses.push(c);
    }
  });

  return (
    <div className={cn(outerClasses)}>
      {/* Left Navigation Arrow (shown only on desktop on container hover) */}
      {showArrows && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleManualScroll('left');
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/85 hover:bg-rage-brand text-white hover:text-black border border-white/10 hover:border-rage-brand flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-0 group-hover/scroll-container:opacity-100 transition-all duration-300 hidden md:flex active:scale-95 animate-fade-in"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Navigation Arrow (shown only on desktop on container hover) */}
      {showArrows && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleManualScroll('right');
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/85 hover:bg-rage-brand text-white hover:text-black border border-white/10 hover:border-rage-brand flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.5)] opacity-0 group-hover/scroll-container:opacity-100 transition-all duration-300 hidden md:flex active:scale-95 animate-fade-in"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <div
        ref={containerRef}
        className={cn(innerClasses)}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      >
        {children}
      </div>
    </div>
  );
}

// --- Blogger Card Component for Hover Effects ---
function BloggerCard({
  blg,
  paper,
  lang
}: {
  blg: BloggerItem;
  paper: {
    img: string;
    imgHover: string;
    badgeColor: string;
    followersColor: string;
    tagColor: string;
  };
  lang: 'RU' | 'EN';
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={blg.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, rotate: 1 }}
      className="w-[220px] sm:w-[480px] h-[85px] sm:h-[156px] px-4 py-3 sm:px-10 sm:py-6 flex items-center gap-2 sm:gap-6 shrink-0 cursor-pointer bg-transparent border-none shadow-none overflow-visible text-black select-none"
      style={{
        backgroundImage: `url('${isHovered ? paper.imgHover : paper.img}')`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {BLOGGER_AVATARS[blg.name] ? (
        <img
          src={BLOGGER_AVATARS[blg.name]}
          alt={blg.name}
          className="w-9 h-9 sm:w-[72px] sm:h-[72px] rounded-full object-cover shrink-0 border border-black/10 shadow-sm"
        />
      ) : (
        <div className={cn("w-9 h-9 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center font-display font-black text-base sm:text-2xl uppercase shrink-0 shadow-inner border", paper.badgeColor)}>
          {blg.name[0]}
        </div>
      )}

      <div className="text-black text-left">
        <h4 className="font-display font-black text-xs sm:text-xl uppercase text-black leading-none mb-1 truncate max-w-[110px] sm:max-w-[320px]">
          {blg.name}
        </h4>
        <div className="flex items-center gap-1 sm:gap-3 mt-0.5 sm:mt-1">
          <span className={cn(
            "text-[8px] sm:text-[16px] font-sans uppercase font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded-sm flex items-center justify-center border leading-none shadow-sm ring-1 ring-black/20",
            blg.engagement === 'exclusive' ? "bg-rage-pink text-white border-rage-pink" : "bg-neutral-400 text-white border-neutral-400"
          )}>
            {blg.engagement === 'exclusive' ? 'Э' : 'П'}
          </span>
          <span className="text-[10px] sm:text-[20px] font-mono uppercase font-black tracking-wider text-black/85 leading-none flex items-center gap-0.5 sm:gap-1"><Eye size={10} className="sm:w-[18px] sm:h-[18px] text-black/60" />{blg.followers}</span>
          <span className={cn("text-[8px] sm:text-[16px] font-sans uppercase border px-1 py-0.5 sm:px-2 sm:py-1 rounded-sm leading-none", paper.tagColor)}>{lang === 'RU' ? blg.tagRU : blg.tagEN}</span>
        </div>
      </div>
    </motion.a>
  );
}

// --- Case Card helper ---
const getCasePaper = (index: number) => {
  const papers = [
    {
      normal: "/images/case_paper_lime.png",
      hover: "/images/case_paper_lime_hover.png",
      badgeColor: "bg-black text-rage-brand border-black/15",
      accentText: "text-black",
      filterId: "torn-paper-0"
    },
    {
      normal: "/images/case_paper_pink.png",
      hover: "/images/case_paper_pink_hover.png",
      badgeColor: "bg-black text-rage-pink border-black/15",
      accentText: "text-black",
      filterId: "torn-paper-1"
    },
    {
      normal: "/images/case_paper_white.png",
      hover: "/images/case_paper_white_hover.png",
      badgeColor: "bg-black text-white border-black/15",
      accentText: "text-black",
      filterId: "torn-paper-2"
    }
  ];
  return papers[index % 3];
};

// --- Case Card Component for Hover Effects ---
function CaseCard({
  item,
  paper,
  lang,
  onSelect
}: {
  item: CaseItem;
  paper: {
    normal: string;
    hover: string;
    badgeColor: string;
    accentText: string;
    filterId: string;
  };
  lang: 'RU' | 'EN';
  onSelect: (item: CaseItem) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      onClick={(e) => {
        e.preventDefault();
        onSelect(item);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03, rotate: -0.5 }}
      className="w-[280px] sm:w-[360px] h-[220px] sm:h-[260px] bg-transparent flex flex-col justify-between transition-all duration-300 group shrink-0 relative overflow-visible cursor-pointer select-none text-black p-6 sm:p-8 border-none shadow-none"
    >
      {/* Background with SVG torn paper filter applied */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 pointer-events-none"
        style={{
          backgroundImage: `url('${isHovered ? paper.hover : paper.normal}')`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: `url(#${paper.filterId})`
        }}
      />

      <div className="relative z-10 flex flex-col h-full w-full pointer-events-none">
        {/* Main avatar and name row */}
        <div className="flex items-center gap-4 text-left">
          {CASE_LOGOS[item.name] ? (
            <img
              src={CASE_LOGOS[item.name]}
              alt={item.name}
              className="w-20 h-20 rounded-2xl object-cover border border-black/10 shrink-0 shadow-sm"
            />
          ) : (
            <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center font-display font-black text-3xl uppercase shrink-0 shadow-inner border", paper.badgeColor)}>
              {item.name[0]}
            </div>
          )}
          <div>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-black leading-none mb-1">
              {item.name}
            </h3>
          </div>
        </div>

        <div className="text-left mt-3 flex-grow">
          <p className="text-black text-sm sm:text-base line-clamp-3 leading-normal font-bold">
            {lang === 'RU' ? item.descRU : item.descEN}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

// --- Case Modal Component for Detailed View ---
function CaseModal({
  item,
  lang,
  onClose,
  onAction
}: {
  item: CaseItem;
  lang: 'RU' | 'EN';
  onClose: () => void;
  onAction?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20, rotate: -1 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.9, y: 20, rotate: -1 }}
        className="w-full max-w-2xl relative p-8 sm:p-14 text-black cursor-default overflow-visible shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background paper texture wrapper */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: "url('/images/white_torn_paper.png')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent"
          }}
        />

        {/* Diagonal tapes (aesthetic duct tape on corners) */}
        <div className="absolute top-4 left-[-35px] w-32 bg-rage-brand text-black text-[8px] font-mono font-black uppercase tracking-widest text-center py-1.5 rotate-[-45deg] border-y border-black/10 z-10">
          CASE DETS
        </div>
        <div className="absolute bottom-4 right-[-35px] w-32 bg-rage-pink text-white text-[8px] font-mono font-black uppercase tracking-widest text-center py-1.5 rotate-[-45deg] border-y border-white/10 z-10">
          RAGE CORE
        </div>

        {/* Tape pins */}
        <div className="absolute top-[-8px] right-24 w-12 h-6 bg-black/15 border border-black/5 shadow-md z-20 backdrop-blur-xs rotate-[4deg] pointer-events-none" />
        <div className="absolute bottom-[-8px] left-24 w-12 h-6 bg-black/15 border border-black/5 shadow-md z-20 backdrop-blur-xs rotate-[-6deg] pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-black/40 hover:text-black hover:scale-110 transition-all cursor-pointer font-black font-display text-xl z-20"
        >
          ✕
        </button>

        <div className="relative z-10 flex flex-col gap-6 text-left">

          {/* Header Row: Big Avatar + Name */}
          <div className="flex items-center gap-6">
            {CASE_LOGOS[item.name] ? (
              <img
                src={CASE_LOGOS[item.name]}
                alt={item.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-black/10 shadow-md shrink-0 bg-white"
              />
            ) : (
              <div className={cn("w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center font-display font-black text-3xl sm:text-4xl uppercase shrink-0 shadow-md border-2 border-black/10", item.badgeColor)}>
                {item.name[0]}
              </div>
            )}
            <div>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-black/50 block mb-1">
                {lang === 'RU' ? item.categoryRU : item.categoryEN}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tighter text-black leading-none mb-2">
                {item.name}
              </h2>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-black/10 pt-6">
            <h4 className="font-mono text-xs font-black uppercase tracking-widest text-black/40 mb-2">
              {lang === 'RU' ? 'ОПИСАНИЕ КЕЙСА' : 'CASE DETAILS'}
            </h4>
            <p className="text-black text-base sm:text-lg md:text-xl leading-relaxed font-sans font-bold">
              {lang === 'RU' ? item.descRU : item.descEN}
            </p>
          </div>

          {/* Action Trigger inside modal */}
          <div className="flex justify-end pt-4">
            <button
              onClick={() => {
                onClose();
                if (onAction) onAction();
                const formElement = document.getElementById('contacts');
                if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-black text-white font-display font-black text-xs uppercase tracking-wider rounded-md border-2 border-black shadow-[4px_4px_0px_#ACFF2A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#f72689] transition-all cursor-pointer"
            >
              {lang === 'RU' ? 'ХОЧУ ТАК ЖЕ' : 'I WANT THIS'}
            </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}


// --- Stat Card Component for Crumpled Hover Effect ---
function StatCard({
  title,
  desc,
  paper,
  rotateClass,
  children
}: {
  title: string;
  desc: string;
  paper: {
    normal: string;
    hover: string;
    filterId: string;
  };
  rotateClass: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group/card flex flex-col">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ rotate: rotateClass.includes('-') ? -0.5 : 0.5, scale: 1.02 }}
        className={cn(
          "sticker-card text-black min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-4 sm:p-6 flex flex-col justify-center items-center text-center border-none shadow-none overflow-visible relative",
          rotateClass
        )}
      >
        {/* Background with SVG torn paper filter applied */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: `url('${isHovered ? paper.hover : paper.normal}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: `url(#${paper.filterId})`
          }}
        />

        <div className="relative z-10 flex flex-col items-center justify-center max-w-[85%] pointer-events-none text-center">
          <span className="font-mono text-[9px] font-black uppercase tracking-widest block mb-0.5 opacity-70">
            {title}
          </span>
          {children}
          <p className="font-sans font-black uppercase text-[10px] sm:text-xs tracking-tight leading-tight text-black/95">
            {desc}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'RU' | 'EN'>(() => (localStorage.getItem('rage_lang') as 'RU' | 'EN') || 'RU');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCareer, setHoveredCareer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    role: 'advertiser', // advertiser | blogger
    desc: '',
    budget: '500k-1m',
    customBudget: '',
    niche: '',
    metrics: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  // Carousel manual control index
  const [caseIndex, setCaseIndex] = useState(0);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('rage_lang', lang);
  }, [lang]);

  useEffect(() => {
    const imagesToPreload = [
      "/images/lime_torn_paper.png",
      "/images/lime_torn_paper_hover.png",
      "/images/pink_torn_paper.png",
      "/images/pink_torn_paper_hover.png",
      "/images/white_torn_paper.png",
      "/images/white_torn_paper_hover.png",
      "/images/case_paper_lime.png",
      "/images/case_paper_lime_hover.png",
      "/images/case_paper_pink.png",
      "/images/case_paper_pink_hover.png",
      "/images/case_paper_white.png",
      "/images/case_paper_white_hover.png",
      "/images/blogger_paper_lime.png",
      "/images/blogger_paper_lime_hover.png",
      "/images/blogger_paper_pink.png",
      "/images/blogger_paper_pink_hover.png",
      "/images/blogger_paper_white.png",
      "/images/blogger_paper_white_hover.png",
      "/images/service_paper_lime.png",
      "/images/service_paper_lime_hover.png",
      "/images/service_paper_pink.png",
      "/images/service_paper_pink_hover.png",
      "/images/service_paper_white.png",
      "/images/service_paper_white_hover.png"
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Generate text message for Telegram bot
    const typeText = formData.role === 'advertiser'
      ? (lang === 'RU' ? 'Рекламодатель' : 'Advertiser')
      : (lang === 'RU' ? 'Блогер' : 'Blogger');

    const budgetValue = formData.budget === 'other'
      ? (formData.customBudget || (lang === 'RU' ? 'Свой бюджет' : 'Custom budget'))
      : formData.budget;

    const detailText = formData.role === 'advertiser'
      ? (lang === 'RU'
        ? `\nОписание: ${formData.desc || 'Не указано'}\nБюджет: ${budgetValue}`
        : `\nDescription: ${formData.desc || 'Not specified'}\nBudget: ${budgetValue}`)
      : (lang === 'RU'
        ? `\nНиша: ${formData.niche || 'Не указано'}\nСсылка на канал: ${formData.metrics || 'Не указано'}`
        : `\nNiche: ${formData.niche || 'Not specified'}\nChannel Link: ${formData.metrics || 'Not specified'}`);

    const message = lang === 'RU'
      ? `⚡️ Новая заявка RAGE MEDIA!\n👤 Имя: ${formData.name}\n🏷 Роль: ${typeText}\n📞 Контакты: ${formData.contact}${detailText}`
      : `⚡️ New RAGE MEDIA Request!\n👤 Name: ${formData.name}\n🏷 Role: ${typeText}\n📞 Contacts: ${formData.contact}${detailText}`;

    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8661662093:AAEGFaoQuvZfuoDY-NPf3I59u4NRzk_jbS4';
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || '7592708940';

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          contact: '',
          role: formData.role,
          desc: '',
          budget: '500k-1m',
          customBudget: '',
          niche: '',
          metrics: ''
        });
      } else {
        console.error('Telegram API error:', await response.text());
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitViaTelegram = () => {
    // Generate text message for Telegram bot link
    const typeText = formData.role === 'advertiser'
      ? (lang === 'RU' ? 'Рекламодатель' : 'Advertiser')
      : (lang === 'RU' ? 'Блогер' : 'Blogger');
    const budgetValue = formData.budget === 'other'
      ? (formData.customBudget || (lang === 'RU' ? 'Свой бюджет' : 'Custom budget'))
      : formData.budget;
    const detailText = formData.role === 'advertiser'
      ? (lang === 'RU'
        ? `%0AОписание: ${formData.desc || 'Не указано'}%0AБюджет: ${budgetValue}`
        : `%0ADescription: ${formData.desc || 'Not specified'}%0ABudget: ${budgetValue}`)
      : (lang === 'RU'
        ? `%0AНиша: ${formData.niche || 'Не указано'}%0AСсылка на канал: ${formData.metrics || 'Не указано'}`
        : `%0ANiche: ${formData.niche || 'Not specified'}%0AChannel Link: ${formData.metrics || 'Not specified'}`);

    const message = lang === 'RU'
      ? `Новая заявка RAGE MEDIA!%0AИмя: ${formData.name || 'Не указано'}%0AРоль: ${typeText}%0AКонтакты: ${formData.contact || 'Не указано'}${detailText}`
      : `New RAGE MEDIA Request!%0AName: ${formData.name || 'Not specified'}%0ARole: ${typeText}%0AContacts: ${formData.contact || 'Not specified'}${detailText}`;

    // Redirect to Telegram
    window.open(`https://t.me/ragemedia?text=${message}`, '_blank');
  };

  // Split bloggers into 3 groups for rows
  const bloggersRow1 = BLOGGERS.slice(0, 7);
  const bloggersRow2 = BLOGGERS.slice(7, 13);
  const bloggersRow3 = BLOGGERS.slice(13);

  const getBloggerPaper = (index: number) => {
    const papers = [
      {
        img: "/images/blogger_paper_lime.png",
        imgHover: "/images/blogger_paper_lime_hover.png",
        badgeColor: "bg-black text-rage-brand border-rage-brand/20",
        followersColor: "text-black/80",
        tagColor: "border-black/20 text-black/70 font-semibold"
      },
      {
        img: "/images/blogger_paper_pink.png",
        imgHover: "/images/blogger_paper_pink_hover.png",
        badgeColor: "bg-black text-rage-pink border-rage-pink/20",
        followersColor: "text-black/80",
        tagColor: "border-black/20 text-black/70 font-semibold"
      },
      {
        img: "/images/blogger_paper_white.png",
        imgHover: "/images/blogger_paper_white_hover.png",
        badgeColor: "bg-black text-white border-white/20",
        followersColor: "text-black/80",
        tagColor: "border-black/20 text-black/70 font-semibold"
      }
    ];
    return papers[index % 3];
  };

  const getServicePaperImages = (idx: number) => {
    const mapping = [
      {
        normal: "/images/service_paper_lime.png",
        hover: "/images/service_paper_lime_hover.png",
        textColor: "text-black",
        iconColor: "text-black",
        iconBg: "bg-black/10 border-black/15",
        arrowBg: "border-black/25 text-black/60 group-hover:bg-black group-hover:text-rage-brand group-hover:border-black",
        doodleColor: "text-rage-pink border-black/15 bg-black/5"
      },
      {
        normal: "/images/service_paper_pink.png",
        hover: "/images/service_paper_pink_hover.png",
        textColor: "text-black",
        iconColor: "text-black",
        iconBg: "bg-black/10 border-black/15",
        arrowBg: "border-black/25 text-black/60 group-hover:bg-black group-hover:text-rage-pink group-hover:border-black",
        doodleColor: "text-black border-black/15 bg-black/5"
      },
      {
        normal: "/images/service_paper_white.png",
        hover: "/images/service_paper_white_hover.png",
        textColor: "text-black",
        iconColor: "text-black",
        iconBg: "bg-black/10 border-black/15",
        arrowBg: "border-black/25 text-black/60 group-hover:bg-black group-hover:text-white group-hover:border-black",
        doodleColor: "text-rage-brand border-black/15 bg-black/5"
      },
      {
        normal: "/images/service_paper_lime.png",
        hover: "/images/service_paper_lime_hover.png",
        textColor: "text-black",
        iconColor: "text-black",
        iconBg: "bg-black/10 border-black/15",
        arrowBg: "border-black/25 text-black/60 group-hover:bg-black group-hover:text-rage-brand group-hover:border-black",
        doodleColor: "text-rage-pink border-black/15 bg-black/5"
      },
      {
        normal: "/images/service_paper_pink.png",
        hover: "/images/service_paper_pink_hover.png",
        textColor: "text-black",
        iconColor: "text-black",
        iconBg: "bg-black/10 border-black/15",
        arrowBg: "border-black/25 text-black/60 group-hover:bg-black group-hover:text-rage-pink group-hover:border-black",
        doodleColor: "text-black border-black/15 bg-black/5"
      }
    ];
    return mapping[idx % 5];
  };

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden selection:bg-rage-brand selection:text-black bg-transparent">

      {/* SVG Filters for procedurally generated torn paper edges */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="torn-paper-0">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="4" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="torn-paper-1">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.035" numOctaves="4" seed="45" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="torn-paper-2">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.045" numOctaves="4" seed="89" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* 1. INTRO LOADER ANIMATION */}
      <AnimatePresence>
        {loading && <LogoLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Cyber ambient glow backgrounds */}
      <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-rage-pink/5 via-rage-brand/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[1200px] left-[-300px] w-[600px] h-[600px] bg-rage-brand/3 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[2800px] right-[-300px] w-[600px] h-[600px] bg-rage-pink/3 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* 2. HEADER (Navbar) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/85 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo with click to top */}
          <div className="cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <RageLogo className="scale-95 md:scale-100 hover:scale-[1.03] transition-transform" />
          </div>

          {/* Right menu triggers / widgets - Designed like Photo 2 */}
          <div className="flex items-center gap-4 sm:gap-6 ml-auto">
            {/* Vacancies / Career button link */}
            <a
              href="/career"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#121212] border border-white/10 hover:border-rage-brand/30 rounded-md text-[11px] font-black uppercase tracking-wider text-white hover:text-rage-brand transition-all cursor-pointer shadow-sm"
            >
              <Briefcase size={11} className="opacity-80" />
              <span>{lang === 'RU' ? 'Вакансии' : 'Careers'}</span>
            </a>

            {/* Lang dropdown switcher pill */}
            <button
              onClick={() => setLang(l => l === 'RU' ? 'EN' : 'RU')}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#121212] border border-white/10 rounded-md text-[11px] font-black uppercase tracking-wider text-white hover:text-rage-brand hover:border-rage-brand/30 transition-all cursor-pointer shadow-sm"
            >
              {lang}
              <ChevronDown size={11} className="opacity-60" />
            </button>

            {/* Hamburger menu button (Always visible on all screen sizes to match Photo 2) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-rage-brand transition-all cursor-pointer bg-white/5 shadow-sm"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Universal Navigation overlay (opens when hamburger is clicked) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 flex flex-col p-6 gap-6 z-40 select-none overflow-hidden"
            >


              <div className="flex flex-col items-center gap-4 font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter text-center">
                <a href="#cases" onClick={() => setIsMenuOpen(false)} className="hover:text-rage-brand transition-colors">{lang === 'RU' ? 'Кейсы' : 'Cases'}</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-rage-pink transition-colors">{lang === 'RU' ? 'Услуги' : 'Services'}</a>
                <a href="#bloggers" onClick={() => setIsMenuOpen(false)} className="hover:text-rage-brand transition-colors">{lang === 'RU' ? 'Блогеры' : 'Bloggers'}</a>
                <a href="/career" onClick={() => setIsMenuOpen(false)} className="hover:text-rage-pink transition-colors">{lang === 'RU' ? 'Карьера' : 'Career'}</a>
                <a href="#contacts" onClick={() => setIsMenuOpen(false)} className="hover:text-rage-brand transition-colors">{lang === 'RU' ? 'Контакты' : 'Contacts'}</a>
              </div>
              <a
                href="#contacts"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full justify-center max-w-sm mx-auto"
              >
                {lang === 'RU' ? 'ОБСУДИТЬ ПРОЕКТ' : 'DISCUSS PROJECT'}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 3. BLOCK 1. HERO — Megaphone as full-bleed background element on the right */}
      <section className="relative min-h-screen pt-36 pb-20 px-6 flex flex-col justify-center items-center overflow-hidden border-b border-white/5">

        {/* === Megaphone artwork — absolute positioned background element === */}
        <div className="absolute right-0 top-1/2 -translate-y-[28%] lg:top-0 lg:bottom-0 lg:translate-y-0 w-[95%] sm:w-[70%] md:w-[55%] lg:w-[60%] xl:w-[55%] flex items-center justify-end pointer-events-none select-none z-0 opacity-30 lg:opacity-90 overflow-hidden">
          <div className="relative h-auto w-full lg:h-[85%] max-h-[420px] sm:max-h-[520px] lg:max-h-[750px] aspect-[2146/1336] flex items-center justify-end mr-[-10%] lg:mr-[-2%]">
            {/* 1. Megaphone Base (lightnings static, RAGE text erased) */}
            <img
              src="/images/hero_megaphone_no_rage.png"
              alt="Rage Media Megaphone Artwork"
              className="w-full h-full object-contain opacity-95 drop-shadow-[0_25px_80px_rgba(0,0,0,0.7)] animate-megaphone-float"
            />
            {/* 2. Base static RAGE text */}
            <img
              src="/images/hero_rage_text_only.png"
              alt="Rage Text Base"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            {/* 3. Glitching overlay 1 (Pink/Red shift) */}
            <img
              src="/images/hero_rage_text_only.png"
              alt="Rage Text Glitch 1"
              className="absolute inset-0 w-full h-full object-contain animate-rage-glitch-1 mix-blend-screen pointer-events-none"
            />
            {/* 4. Glitching overlay 2 (Cyan/Blue shift) */}
            <img
              src="/images/hero_rage_text_only.png"
              alt="Rage Text Glitch 2"
              className="absolute inset-0 w-full h-full object-contain animate-rage-glitch-2 mix-blend-screen pointer-events-none"
            />
          </div>
        </div>

        {/* === Text content overlaid on top === */}
        <div className="container mx-auto max-w-7xl z-10 w-full relative">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Huge typography */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[7rem] leading-[0.85] uppercase tracking-tighter text-white select-none flex flex-col gap-4 relative">
              {lang === 'RU'
                ? 'Результат важнее слов'
                : 'Results speak louder than words'}
            </h1>

            {/* Subtext description below */}
            <p className="text-white/75 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed font-sans font-medium text-left mt-8">
              {lang === 'RU' ? (
                <>
                  Rage Media — это не просто реклама.<br />
                  Это влияние. Это культура. Это результат.
                </>
              ) : (
                <>
                  Rage Media is not just advertising.<br />
                  It is influence. It is culture. It is the result.
                </>
              )}
            </p>

            {/* Action triggers */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#contacts"
                className="px-8 py-3.5 bg-rage-brand text-black font-extrabold rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(172,255,42,0.6)] active:scale-95 flex items-center gap-2 border border-black cursor-pointer"
              >
                {lang === 'RU' ? 'Хочу рекламу' : 'I want ads'}
                <ArrowUpRight size={16} className="text-black" />
              </a>
              <a
                href="#contacts"
                onClick={() => setFormData(p => ({ ...p, role: 'blogger' }))}
                className="px-8 py-3.5 bg-transparent border border-rage-pink text-rage-pink font-extrabold rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:bg-rage-pink/5 hover:shadow-[0_0_25px_rgba(247,38,137,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {lang === 'RU' ? 'Я блогер' : 'I am a blogger'}
                <ArrowUpRight size={16} className="text-rage-pink" />
              </a>
              <a
                href="/career"
                className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-extrabold rounded-full uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 hover:scale-105 hover:bg-white/5 hover:border-white/40 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                {lang === 'RU' ? 'Вакансии' : 'Careers'}
                <ArrowUpRight size={16} className="text-white/60" />
              </a>
            </div>


          </div>
        </div>



        {/* Floating background decorative coordinates */}
        <div className="absolute bottom-10 left-10 font-mono text-[9px] text-white/20 hidden md:block z-10">
          SYS_LOC: [55.7558° N, 37.6173° E] // ACTIVE_AGENCY_PORTAL
        </div>
        <div className="absolute bottom-10 right-10 font-mono text-[9px] text-white/20 hidden md:block z-10">
          STATUS: INFLUENCE_LEVEL_99 // GAMING_SECTOR_ONLINE
        </div>
      </section>

      {/* 4. BLOCK 2. CASES (Reference Photo #1 styling & infinite automatic marquee) */}
      <section id="cases" className="py-28 px-6 bg-transparent border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(247,38,137,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="container mx-auto mb-16 relative z-10">
          <span className="text-rage-brand font-mono text-xs font-black uppercase tracking-widest block mb-2">
            PROJECTS SHOWCASE
          </span>
          <h2 className="section-title text-white">
            {lang === 'RU' ? 'ГРОМКИЕ КЕЙСЫ' : 'LOUD CASES'}
          </h2>
        </div>

        {/* Automatic infinite horizontal scroll (custom animation & swipeable on mobile) */}
        <AutoScrollContainer
          direction="ltr"
          speed={0.6}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-4 px-6 gap-6"
          showArrows={true}
        >
          {[...CASES, ...CASES, ...CASES].map((item, i) => {
            const originalIndex = CASES.findIndex(c => c.name === item.name);
            return (
              <CaseCard
                key={item.name + '-' + i}
                item={item}
                paper={getCasePaper(originalIndex)}
                lang={lang}
                onSelect={setSelectedCase}
              />
            );
          })}
        </AutoScrollContainer>
      </section>

      {/* 5. BLOCK 3. STATS (Reference Photo #2 sticker/poster aesthetic & counting animation) */}
      <section className="py-28 px-6 bg-transparent relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20 select-none z-0">
          {/* Tech graph coordinate vector lines */}
          <svg className="w-full h-full text-rage-brand" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M -100 200 L 400 400 L 800 200 L 1200 500 L 1600 300" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
            <circle cx="400" cy="400" r="4" fill="currentColor" />
            <circle cx="800" cy="200" r="4" fill="currentColor" />
            <circle cx="1200" cy="500" r="4" fill="currentColor" />
          </svg>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="mb-20">
            <span className="text-rage-pink font-mono text-xs font-black uppercase tracking-widest block mb-2">
              METRICS & DATA
            </span>
            <h2 className="section-title text-white">
              {lang === 'RU' ? 'ЦИФРЫ, КОТОРЫЕ ИМЕЮТ ВЕС' : 'NUMBERS THAT MATTER'}
            </h2>
          </div>

          {/* Sticker layout from Reference Photo #2 Option 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Sticker 1: Lime Green card */}
            <div className="relative group/card flex flex-col">
              <motion.div
                onMouseEnter={() => setHoveredStat(0)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ rotate: 1, scale: 1.02 }}
                className="sticker-card text-black rotate-[-1.5deg] min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-4 sm:p-6 flex flex-col justify-center items-center text-center border-none shadow-none overflow-visible relative"
              >
                {/* Background image container that changes to crumpled version on hover */}
                <div
                  className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url('${hoveredStat === 0 ? "/images/lime_torn_paper_hover.png" : "/images/lime_torn_paper.png"}')`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "transparent"
                  }}
                />
                <div className="flex flex-col items-center justify-center max-w-[85%] z-10 relative pointer-events-none">
                  <div className="font-display font-black text-5xl sm:text-6xl leading-none tracking-tighter mb-1.5 text-black">
                    <Counter value="100+" />
                  </div>
                  <p className="font-sans font-black uppercase text-[10px] sm:text-xs tracking-tight leading-tight text-black/95">
                    {lang === 'RU' ? 'Успешных рекламных кампаний под ключ' : 'Successful turnkey ad campaigns'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sticker 2: Neon Pink card */}
            <div className="relative group/card flex flex-col">
              <motion.div
                onMouseEnter={() => setHoveredStat(1)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ rotate: -1, scale: 1.02 }}
                className="sticker-card text-black rotate-[1deg] min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-4 sm:p-6 flex flex-col justify-center items-center text-center border-none shadow-none overflow-visible relative"
              >
                {/* Background image container that changes to crumpled version on hover */}
                <div
                  className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url('${hoveredStat === 1 ? "/images/pink_torn_paper_hover.png" : "/images/pink_torn_paper.png"}')`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "transparent",
                    filter: "hue-rotate(15deg) saturate(1.1) brightness(0.98)"
                  }}
                />
                <div className="flex flex-col items-center justify-center max-w-[85%] z-10 relative pointer-events-none">
                  <div className="font-display font-black text-5xl sm:text-6xl leading-none tracking-tighter mb-1.5 text-black whitespace-nowrap flex items-baseline justify-center">
                    <Counter value="50+" />
                    <span className="text-xl sm:text-2xl ml-1 font-display font-black">{lang === 'RU' ? 'МЛН' : 'M'}</span>
                  </div>
                  <p className="font-sans font-black uppercase text-[10px] sm:text-xs tracking-tight leading-tight text-black/95">
                    {lang === 'RU' ? 'Охвата аудитории на YouTube ежемесячно' : 'Audience reach on YouTube monthly'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Sticker 3: Industrial Dark gray / paper sticker card */}
            <div className="relative group/card flex flex-col">
              <motion.div
                onMouseEnter={() => setHoveredStat(2)}
                onMouseLeave={() => setHoveredStat(null)}
                whileHover={{ rotate: 2, scale: 1.02 }}
                className="sticker-card text-black rotate-[-2deg] min-h-[240px] sm:min-h-[260px] md:min-h-[280px] p-4 sm:p-6 flex flex-col justify-center items-center text-center border-none shadow-none overflow-visible relative"
              >
                {/* Background image container that changes to crumpled version on hover */}
                <div
                  className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none"
                  style={{
                    backgroundImage: `url('${hoveredStat === 2 ? "/images/white_torn_paper_hover.png" : "/images/white_torn_paper.png"}')`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "transparent"
                  }}
                />
                <div className="flex flex-col items-center justify-center max-w-[85%] z-10 relative pointer-events-none">
                  <div className="font-display font-black text-5xl sm:text-6xl leading-none tracking-tighter mb-1.5 text-black">
                    <Counter value="60+" />
                  </div>
                  <p className="font-sans font-black uppercase text-[10px] sm:text-xs tracking-tight leading-tight text-black/95">
                    {lang === 'RU' ? 'Блогеров в нашей эксклюзивной сети' : 'Bloggers in our exclusive network'}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. BLOCK 4. SERVICES (Reference Photo #3 vertical cards & doodles) */}
      <section id="services" className="py-28 px-6 relative overflow-hidden bg-transparent border-b border-white/5">

        {/* TV backdrop graphic layout from Reference 3 */}
        <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 h-[90%] z-0 select-none pointer-events-none hidden md:block">
          <div className="relative h-full w-auto flex items-center justify-center">
            {/* TV Casing */}
            <img
              src="/images/tv_casing_only.png"
              alt="Cyberpunk CRT TV monitor casing"
              className="h-full w-auto object-contain filter brightness-[1.1] contrast-[1.1] saturate-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Animated Green RAGE Graffiti overlay */}
            <img
              src="/images/tv_rage_text.png"
              alt="Rage Media animated screen text"
              className="absolute inset-0 w-full h-full object-contain animate-tv-glitch"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Col: Text & Accordion style Card Lists */}
            <div className="lg:col-span-7">
              <div className="mb-14">
                <span className="text-rage-brand font-mono text-xs font-black uppercase tracking-widest block mb-2">
                  OUR ARSENAL OF INFLUENCE
                </span>
                <h2 className="section-title text-white">
                  {lang === 'RU' ? 'Наш арсенал влияния' : 'Our Arsenal of Influence'}
                </h2>
              </div>

              {/* Service Cards from Reference Photo #3 layout */}
              <div className="space-y-4 w-full max-w-3xl">
                {SERVICES.map((srv, idx) => (
                  <motion.a
                    href="#contacts"
                    onClick={() => {
                      setFormData(p => ({
                        ...p,
                        role: 'advertiser',
                        desc: lang === 'RU'
                          ? `Меня интересует услуга: ${srv.titleRU}. `
                          : `I am interested in the service: ${srv.titleEN}. `
                      }));
                    }}
                    onMouseEnter={() => setHoveredService(idx)}
                    onMouseLeave={() => setHoveredService(null)}
                    key={srv.titleRU}
                    whileHover={{ x: 8 }}
                    className="flex flex-row items-center justify-between gap-3 sm:gap-4 min-h-[100px] sm:min-h-[160px] p-4 sm:p-8 relative select-none text-black cursor-pointer bg-transparent border-none shadow-none overflow-visible group"
                    style={{
                      backgroundImage: `url('${hoveredService === idx ? getServicePaperImages(idx).hover : getServicePaperImages(idx).normal}')`,
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 relative z-10">
                      <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0 flex items-center justify-center border transition-all duration-300", getServicePaperImages(idx).iconBg, getServicePaperImages(idx).textColor)}>
                        {srv.icon}
                      </div>

                      <div>
                        <h3 className="font-display font-black text-sm sm:text-lg uppercase tracking-tight text-black leading-tight">
                          {lang === 'RU' ? srv.titleRU : srv.titleEN}
                        </h3>
                        <p className="text-black/75 text-[11px] sm:text-sm font-sans mt-0.5 max-w-[580px] font-medium leading-tight">
                          {lang === 'RU' ? srv.detailRU : srv.detailEN}
                        </p>
                      </div>
                    </div>

                    {/* Doodle graphic overlay matching photo #3 */}
                    <div className="flex items-center gap-2 sm:gap-3 relative z-10 self-center sm:self-auto flex-shrink-0">
                      <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300", getServicePaperImages(idx).arrowBg)}>
                        <ArrowUpRight size={14} className={cn("transition-transform duration-300", hoveredService === idx && "rotate-45")} />
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right space spacer */}
            <div className="lg:col-span-5 hidden lg:block" />

          </div>
        </div>
      </section>

      {/* 7. BLOCK 5. BLOGGERS (Double row infinite marquees & custom media kit banner) */}
      <section id="bloggers" className="py-28 px-6 bg-transparent relative overflow-hidden border-b border-white/5 select-none">

        <div className="container mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-rage-pink font-mono text-xs font-black uppercase tracking-widest block mb-2">
                OUR BLOGGERS
              </span>
              <h2 className="section-title text-white">
                {lang === 'RU' ? 'Наши блогеры' : 'Our Bloggers'}
              </h2>
            </div>
          </div>
        </div>

        {/* Marquee Row 1 (Left-to-Right scrolling & swipeable on mobile) */}
        <AutoScrollContainer
          direction="ltr"
          speed={0.6}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-2 px-4 gap-5 mb-6"
        >
          {[...bloggersRow1, ...bloggersRow1, ...bloggersRow1].map((blg, i) => (
            <BloggerCard
              key={blg.name + '-r1-' + i}
              blg={blg}
              paper={getBloggerPaper(i)}
              lang={lang}
            />
          ))}
        </AutoScrollContainer>

        {/* Marquee Row 2 (Right-to-Left scrolling & swipeable on mobile) */}
        <AutoScrollContainer
          direction="rtl"
          speed={0.6}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-2 px-4 gap-5 mb-6"
        >
          {[...bloggersRow2, ...bloggersRow2, ...bloggersRow2].map((blg, i) => (
            <BloggerCard
              key={blg.name + '-r2-' + i}
              blg={blg}
              paper={getBloggerPaper(i + 1)}
              lang={lang}
            />
          ))}
        </AutoScrollContainer>

        {/* Marquee Row 3 (Left-to-Right scrolling & swipeable on mobile) */}
        <AutoScrollContainer
          direction="ltr"
          speed={0.6}
          className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-2 px-4 gap-5 mb-16"
        >
          {[...bloggersRow3, ...bloggersRow3, ...bloggersRow3].map((blg, i) => (
            <BloggerCard
              key={blg.name + '-r3-' + i}
              blg={blg}
              paper={getBloggerPaper(i + 2)}
              lang={lang}
            />
          ))}
        </AutoScrollContainer>

        {/* Premium Additional Banner */}
        <div className="container mx-auto max-w-5xl">
          <div className="relative bg-gradient-to-r from-rage-pink/10 to-rage-brand/10 border-2 border-white/10 rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">

            {/* Ambient vector spray inside banner */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-rage-brand/10 blur-[80px] pointer-events-none rounded-full" />
            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-rage-pink/10 blur-[80px] pointer-events-none rounded-full" />

            <div className="max-w-2xl relative z-10 text-center md:text-left">
              <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mb-4 leading-tight">
                {lang === 'RU' ? 'Список носит ознакомительный характер' : 'This list is for reference only'}
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans max-w-lg">
                {lang === 'RU'
                  ? 'Запросите медиакит и персональную подборку блогеров под ваш бренд и портрет ЦА прямо сейчас.'
                  : 'Request our media kit and a personalized blogger selection for your brand and target audience right now.'}
              </p>
            </div>

            <a
              href="#contacts"
              onClick={() => setFormData(p => ({
                ...p,
                role: 'advertiser',
                desc: lang === 'RU'
                  ? 'Заявка на получение полного медиакита и подборки блогеров.'
                  : 'Request for the complete media kit and blogger selection.'
              }))}
              className="btn-primary shrink-0 relative z-10 py-4 px-8"
            >
              <span>{lang === 'RU' ? 'Получить медиакит' : 'Get Media Kit'}</span>
              <ArrowUpRight size={16} />
            </a>

          </div>
        </div>
      </section>

      {/* 8. BLOCK 6. CAREER IN RAGE MEDIA (Reference Photo #4 style, underground flyer) */}
      <section className="py-28 px-6 bg-transparent relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-transparent pointer-events-none z-10" />

        {/* Graphic elements */}
        <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-5 pointer-events-none select-none font-display font-black text-[22vw] text-white">
          CULTURE
        </div>

        <div className="container mx-auto max-w-5xl relative z-20">

          {/* Music label flyer graphic card */}
          <motion.a
            href="/career"
            onMouseEnter={() => setHoveredCareer(true)}
            onMouseLeave={() => setHoveredCareer(false)}
            whileHover={{ y: -6, rotate: 0.5 }}
            className="block relative p-8 sm:p-14 rounded-3xl overflow-visible shadow-3xl group cursor-pointer"
          >
            {/* Background image container for crumpled torn paper */}
            <div
              className="absolute inset-0 z-0 transition-all duration-300 pointer-events-none"
              style={{
                backgroundImage: `url('${hoveredCareer ? "/images/white_torn_paper_hover.png" : "/images/white_torn_paper.png"}')`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "transparent"
              }}
            />

            {/* Diagonal tape corner markings for underground look */}
            <div className="absolute top-4 left-[-35px] w-32 bg-rage-brand text-black text-[8px] font-mono font-black uppercase tracking-widest text-center py-1.5 rotate-[-45deg] border-y border-black/10 z-10">
              JOIN US
            </div>
            <div className="absolute bottom-4 right-[-35px] w-32 text-white text-[8px] font-mono font-black uppercase tracking-widest text-center py-1.5 rotate-[-45deg] border-y border-white/10 z-10" style={{ backgroundColor: '#FF00FF' }}>
              RAGE UNIT
            </div>

            {/* Simulated tape pins */}
            <div className="absolute top-[-8px] right-24 w-12 h-6 bg-black/15 border border-black/5 shadow-md z-20 backdrop-blur-xs rotate-[4deg] pointer-events-none" />
            <div className="absolute bottom-[-8px] left-24 w-12 h-6 bg-black/15 border border-black/5 shadow-md z-20 backdrop-blur-xs rotate-[-6deg] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="max-w-2xl text-center md:text-left">
                <span className="font-hand font-bold text-lg block mb-2 rotate-[-1deg]" style={{ color: '#FF00FF' }}>
                  // JOIN THE MOVEMENT
                </span>

                <h2 className="font-display font-black text-3.5xl sm:text-5xl md:text-6xl leading-[0.85] uppercase tracking-tighter text-black mb-6">
                  {lang === 'RU' ? (
                    <>
                      СТРОИМ НЕ АГЕНТСТВО. <br />
                      <span style={{ color: '#FF00FF', WebkitTextStroke: '1.5px black', paintOrder: 'stroke fill' }}>СТРОИМ КУЛЬТУРУ.</span>
                    </>
                  ) : (
                    <>
                      NOT BUILDING AN AGENCY. <br />
                      <span style={{ color: '#FF00FF', WebkitTextStroke: '1.5px black', paintOrder: 'stroke fill' }}>BUILDING A CULTURE.</span>
                    </>
                  )}
                </h2>

                <p className="text-black/80 text-sm sm:text-base leading-relaxed font-sans font-medium max-w-lg">
                  {lang === 'RU'
                    ? 'Если тебе близок наш подход — нам есть о чем поговорить. Мы ищем тех, кто готов гореть проектами и выходить за рамки.'
                    : 'If you share our approach, we should talk. We are looking for those ready to burn for projects and push boundaries.'}
                </p>
              </div>

              {/* Action Button flyer style */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                <div className="px-8 py-4 bg-black text-white font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-md border-2 border-black shadow-[6px_6px_0px_#ACFF2A] group-hover:translate-y-[-2px] group-hover:shadow-[8px_8px_0px_#FF00FF] transition-all">
                  {lang === 'RU' ? 'Карьера в Rage Media' : 'Career at Rage Media'}
                </div>

                {/* Hand-drawn graffiti element */}
                <div className="flex flex-col items-center mt-1 select-none pointer-events-none">
                  {/* Sketchy hand-drawn arrows pointing up towards the button */}
                  <svg className="w-16 h-8 fill-none stroke-current animate-pulse" style={{ color: '#FF00FF' }} viewBox="0 0 60 20">
                    <path d="M15,16 Q12,8 18,3 M18,3 L12,2 M18,3 L20,9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M45,16 Q48,8 42,3 M42,3 L48,2 M42,3 L40,9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                  {/* Graffiti-style text: "вступай к нам" / "join us" */}
                  <span className="font-hand font-black text-[22px] sm:text-2xl rotate-[-3.5deg] tracking-wide leading-none mt-1" style={{ color: '#FF00FF' }}>
                    {lang === 'RU' ? 'вступай к нам' : 'join us'}
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* 9. BLOCK 7. FINAL FORM & FOOTER (Reference Photo #5 layout & state logic) */}
      <footer id="contacts" className="pt-28 pb-12 px-6 relative bg-gradient-to-t from-black via-black/80 to-transparent overflow-hidden border-t border-white/5">

        {/* Giant footer watermark logo */}
        <div className="absolute bottom-[-100px] right-[-100px] pointer-events-none opacity-[0.03] select-none z-0">
          <div className="font-display font-black text-[220px] md:text-[380px] leading-none uppercase tracking-tighter text-white">
            RAGE
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">

            {/* Left Col: Contact info and Heading */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-rage-brand font-mono text-xs font-black uppercase tracking-widest block mb-2">
                  GET IN TOUCH
                </span>
                <h3 className="font-display font-black text-4xl sm:text-5xl leading-[0.9] uppercase tracking-tighter text-white">
                  {lang === 'RU' ? (
                    <>
                      ГОТОВЫ СДЕЛАТЬ <br />
                      ЧТО-ТО ПО-НАСТОЯЩЕМУ <br />
                      <span className="text-rage-pink underline decoration-[#ACFF2A] decoration-4 underline-offset-6">ГРОМКОЕ?</span>
                    </>
                  ) : (
                    <>
                      READY TO CREATE <br />
                      SOMETHING TRULY <br />
                      <span className="text-rage-pink underline decoration-[#ACFF2A] decoration-4 underline-offset-6">LOUD?</span>
                    </>
                  )}
                </h3>

              </div>

              {/* Direct channels links */}
              <div className="hidden lg:block space-y-4 font-display">
                <a
                  href="https://vk.ru/rage_media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm sm:text-base font-bold text-blue-400 hover:text-blue-300 transition-all group w-fit cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 group-hover:bg-blue-500/10 group-hover:border-blue-400 transition-all">
                    <Users size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-blue-500 font-extrabold leading-none mb-1">
                      VK
                    </span>
                    <span>vk.ru/rage_media</span>
                  </div>
                </a>

                <a
                  href="mailto:hello@ragemedia.ru"
                  className="flex items-center gap-4 text-sm sm:text-base font-bold hover:text-rage-pink transition-all group w-fit"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-rage-pink group-hover:text-rage-pink transition-all">
                    <Mail size={14} />
                  </div>
                  <span>hello@ragemedia.ru</span>
                </a>

                {/* Direct Telegram link */}
                <a
                  href="https://t.me/RageAds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm sm:text-base font-bold text-sky-400 hover:text-sky-300 transition-all group w-fit cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-sky-500/20 flex items-center justify-center bg-sky-500/5 group-hover:bg-sky-500/10 group-hover:border-sky-400 transition-all">
                    <Send size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-sky-500 font-extrabold leading-none mb-1">
                      TELEGRAM
                    </span>
                    <span>t.me/RageAds</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Col: Interactive dynamic form matching Photo #5 */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative w-full">

                {/* Form submit response state */}
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-rage-brand/10 text-rage-brand border border-rage-brand rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-2">
                    {lang === 'RU' ? 'ЗАЯВКА ОТПРАВЛЕНА!' : 'REQUEST SENT!'}
                  </h4>
                  <p className="text-white/60 text-sm max-w-sm mx-auto mb-8 font-sans">
                    {lang === 'RU'
                      ? 'Спасибо! Наш менеджер уже связывается с вами. Мы вернемся с аналитикой в течение 15 минут.'
                      : "Thank you! Our manager is already reaching out to you. We'll get back to you with analytics within 15 minutes."}
                  </p>
                  <button
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-secondary mx-auto text-xs"
                  >
                    {lang === 'RU' ? 'Отправить еще раз' : 'Send again'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">

                  {submitStatus === 'error' && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3.5 rounded-xl text-xs font-bold font-sans">
                      {lang === 'RU'
                        ? 'Произошла ошибка при отправке заявки в Telegram. Пожалуйста, попробуйте еще раз.'
                        : 'An error occurred while sending your request to Telegram. Please try again.'}
                    </div>
                  )}

                  {/* Selector role toggles */}
                  <div className="flex bg-[#121215] border border-white/10 rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'advertiser' }))}
                      className={cn(
                        "flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer",
                        formData.role === 'advertiser' ? "bg-rage-brand text-black" : "text-white/60 hover:text-white"
                      )}
                    >
                      {lang === 'RU' ? 'Я Рекламодатель' : 'I am Advertiser'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, role: 'blogger' }))}
                      className={cn(
                        "flex-1 py-3 text-xs font-black uppercase tracking-wider transition-all rounded-lg cursor-pointer",
                        formData.role === 'blogger' ? "bg-rage-pink text-white" : "text-white/60 hover:text-white"
                      )}
                    >
                      {lang === 'RU' ? 'Я Блогер' : 'I am Blogger'}
                    </button>
                  </div>

                  {/* Input fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                        {lang === 'RU' ? 'ИМЯ / ФИО' : 'FULL NAME'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'RU' ? 'Алексей' : 'Alex'}
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                        TELEGRAM / VK
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === 'RU' ? '@username или ссылка...' : '@username or link...'}
                        value={formData.contact}
                        onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                      />
                    </div>

                    {/* Conditional Fields based on role */}
                    {formData.role === 'advertiser' ? (
                      <>
                        <div>
                          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                            {lang === 'RU' ? 'КРАТКОЕ ОПИСАНИЕ ПРОЕКТА' : 'SHORT PROJECT DESCRIPTION'}
                          </label>
                          <textarea
                            rows={3}
                            placeholder={lang === 'RU' ? 'Опишите продукт, цели рекламной кампании...' : 'Describe your product, campaign goals...'}
                            value={formData.desc}
                            onChange={e => setFormData(p => ({ ...p, desc: e.target.value }))}
                            className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl resize-none font-sans"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                            {lang === 'RU' ? 'ПЛАНИРУЕМЫЙ БЮДЖЕТ' : 'PLANNED BUDGET'}
                          </label>
                          <select
                            value={formData.budget}
                            onChange={e => setFormData(p => ({ ...p, budget: e.target.value }))}
                            className="w-full bg-[#121215] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                          >
                            <option value="100k-500k">{lang === 'RU' ? '100,000 ₽ — 500,000 ₽' : '100,000 ₽ — 500,000 ₽'}</option>
                            <option value="500k-1m">{lang === 'RU' ? '500,000 ₽ — 1,000,000 ₽' : '500,000 ₽ — 1,000,000 ₽'}</option>
                            <option value="1m-3m">{lang === 'RU' ? '1,000,000 ₽ — 3,000,000 ₽' : '1,000,000 ₽ — 3,000,000 ₽'}</option>
                            <option value="3m+">{lang === 'RU' ? 'Более 3,000,000 ₽' : 'More than 3,000,000 ₽'}</option>
                            <option value="other">{lang === 'RU' ? 'Другое...' : 'Other...'}</option>
                          </select>
                        </div>

                        <AnimatePresence>
                          {formData.budget === 'other' && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                              transition={{ duration: 0.25 }}
                            >
                              <div className="pt-2">
                                <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                                  {lang === 'RU' ? 'УКАЖИТЕ СВОЙ БЮДЖЕТ' : 'SPECIFY YOUR BUDGET'}
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder={lang === 'RU' ? 'Например, 250,000 ₽...' : 'E.g., 250,000 ₽...'}
                                  value={formData.customBudget}
                                  onChange={e => setFormData(p => ({ ...p, customBudget: e.target.value }))}
                                  className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                            {lang === 'RU' ? 'ТЕМА / НИША КАНАЛА' : 'CHANNEL THEME / NICHE'}
                          </label>
                          <input
                            type="text"
                            placeholder={lang === 'RU' ? 'Летсплеи, обзоры модов, стримы...' : 'Letsplays, mod reviews, streams...'}
                            value={formData.niche}
                            onChange={e => setFormData(p => ({ ...p, niche: e.target.value }))}
                            className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                            {lang === 'RU' ? 'ССЫЛКА НА КАНАЛ' : 'CHANNEL LINK'}
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="https://..."
                            value={formData.metrics}
                            onChange={e => setFormData(p => ({ ...p, metrics: e.target.value }))}
                            className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl font-sans"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Submit buttons row */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "flex-1 py-4 justify-center text-xs font-black uppercase tracking-wider flex items-center gap-2",
                        formData.role === 'blogger' ? "btn-pink" : "btn-primary"
                      )}
                    >
                      {isSubmitting ? (
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{lang === 'RU' ? 'Отправить заявку' : 'Submit request'}</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Mobile-only contacts row */}
            <div className="lg:hidden flex flex-row flex-wrap items-center justify-center gap-5 sm:gap-6 font-display pt-2">
              <a
                href="https://vk.ru/rage_media"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-blue-500/20 flex items-center justify-center bg-blue-500/5 group-hover:bg-blue-500/10 group-hover:border-blue-400 transition-all flex-shrink-0">
                  <Users size={12} />
                </div>
                <span>VK</span>
              </a>

              <a
                href="https://t.me/RageAds"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300 transition-all group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-sky-500/20 flex items-center justify-center bg-sky-500/5 group-hover:bg-sky-500/10 group-hover:border-sky-400 transition-all flex-shrink-0">
                  <Send size={12} />
                </div>
                <span>Telegram</span>
              </a>

              <a
                href="mailto:hello@ragemedia.ru"
                className="flex items-center gap-2 text-xs font-bold text-white hover:text-rage-pink transition-all group"
              >
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-rage-pink group-hover:text-rage-pink transition-all flex-shrink-0">
                  <Mail size={12} />
                </div>
                <span>hello@ragemedia.ru</span>
              </a>
            </div>

          </div>
        </div>

          {/* Footer bottom legal references row matching Photo #5 */}
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rage-brand animate-ping" />
              <span>{lang === 'RU' ? '© 2026 RAGE MEDIA. Все права защищены.' : '© 2026 RAGE MEDIA. All rights reserved.'}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="/career" className="hover:text-rage-brand transition-all">{lang === 'RU' ? 'Карьера у нас' : 'Careers'}</a>
              <a href="/privacy" className="hover:text-white transition-all">{lang === 'RU' ? 'Политика конфиденциальности' : 'Privacy Policy'}</a>
              <a href="/terms" className="hover:text-white transition-all">{lang === 'RU' ? 'Публичная оферта' : 'Terms of Service'}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Case Details Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseModal
            item={selectedCase}
            lang={lang}
            onClose={() => setSelectedCase(null)}
            onAction={() => {
              setFormData(p => ({
                ...p,
                role: 'advertiser',
                desc: lang === 'RU'
                  ? `Меня интересует кейс: ${selectedCase.name}. Хочу похожее продвижение!`
                  : `I am interested in the case: ${selectedCase.name}. I want similar promotion!`
              }));
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
