import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Send, CheckCircle, Briefcase, Zap, Sparkles } from 'lucide-react';
import RageLogo from '../components/RageLogo';

interface Vacancy {
  title: string;
  typeRU: string;
  typeEN: string;
  salaryRU: string;
  salaryEN: string;
  descRU: string;
  descEN: string;
  tagsRU: string[];
  tagsEN: string[];
  accent: 'lime' | 'pink' | 'white';
}

const OPEN_VACANCIES: Vacancy[] = [
  {
    title: "Influencer Manager",
    typeRU: "Москва / Гибрид • Полный день",
    typeEN: "Moscow / Hybrid • Full-time",
    salaryRU: "от 120,000 ₽",
    salaryEN: "from 120,000 ₽",
    descRU: "Поиск новых талантов, ведение переговоров, интеграция рекламодателей в гейминг блоги.",
    descEN: "Searching for new talent, negotiating, integrating advertisers into gaming blogs.",
    tagsRU: ["Майнкрафт", "Стримы", "YouTube"],
    tagsEN: ["Minecraft", "Streams", "YouTube"],
    accent: "lime"
  },
  {
    title: "Creative Producer",
    typeRU: "Москва / Гибрид • Полный день",
    typeEN: "Moscow / Hybrid • Full-time",
    salaryRU: "от 150,000 ₽",
    salaryEN: "from 150,000 ₽",
    descRU: "Создание концепций для спецпроектов, написание сценариев интеграций, контроль продакшена.",
    descEN: "Creating concepts for special projects, writing integration scripts, production control.",
    tagsRU: ["Креатив", "Сценарии", "Шоу"],
    tagsEN: ["Creative", "Scripts", "Show"],
    accent: "pink"
  },
  {
    title: "Media Buyer (Gaming)",
    typeRU: "Удалённо / Полный день",
    typeEN: "Remote / Full-time",
    salaryRU: "По результатам собеседования",
    salaryEN: "Based on interview results",
    descRU: "Закупка рекламного трафика, оптимизация KPI, работа с СНГ и зарубежным гейминг сегментом.",
    descEN: "Purchasing ad traffic, optimizing KPIs, working with CIS and international gaming segment.",
    tagsRU: ["Медиабаинг", "KPI", "Аналитика"],
    tagsEN: ["Media Buying", "KPI", "Analytics"],
    accent: "white"
  },
  {
    title: "SMM / Content Lead",
    typeRU: "Москва • Полный день",
    typeEN: "Moscow • Full-time",
    salaryRU: "от 100,000 ₽",
    salaryEN: "from 100,000 ₽",
    descRU: "Развитие собственного бренда RAGE MEDIA, создание вирусного контента для Telegram и соцсетей.",
    descEN: "Developing RAGE MEDIA's own brand, creating viral content for Telegram and social networks.",
    tagsRU: ["SMM", "Дизайн", "Копирайтинг"],
    tagsEN: ["SMM", "Design", "Copywriting"],
    accent: "lime"
  }
];

export default function Career() {
  const [lang, setLang] = useState<'RU' | 'EN'>(() => (localStorage.getItem('rage_lang') as 'RU' | 'EN') || 'RU');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    vacancy: 'Influencer Manager',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  React.useEffect(() => {
    localStorage.setItem('rage_lang', lang);
  }, [lang]);

  const handleApply = (vacancyTitle: string) => {
    setFormData(p => ({ ...p, vacancy: vacancyTitle }));
    const formElement = document.getElementById('application-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        contact: '',
        vacancy: 'Influencer Manager',
        portfolio: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden select-none font-sans selection:bg-rage-brand selection:text-black">
      
      {/* Abstract neon glow shapes */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-rage-brand/5 via-rage-pink/3 to-transparent pointer-events-none -z-10" />
      <div className="absolute bottom-[-100px] left-[-200px] w-96 h-96 bg-rage-pink/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Cyber Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/85 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <RageLogo className="scale-90" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-rage-pink border border-rage-pink/30 px-2 py-0.5 rounded-sm bg-rage-pink/5 font-black">
              CAREER PORTAL
            </span>
          </a>

          <div className="flex items-center gap-4">
            {/* Lang switcher capsule */}
            <div className="flex bg-[#121212] border border-white/10 rounded-full p-0.5">
              <button 
                onClick={() => setLang('RU')}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'RU' ? "bg-rage-brand text-black" : "text-white/60 hover:text-white"
                }`}
              >
                RU
              </button>
              <button 
                onClick={() => setLang('EN')}
                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  lang === 'EN' ? "bg-rage-brand text-black" : "text-white/60 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>

            <a 
              href="/" 
              className="flex items-center gap-2 px-5 py-2 border border-white/10 hover:border-rage-brand rounded-full text-xs font-bold uppercase tracking-wider transition-all"
            >
              <ArrowLeft size={14} />
              <span>{lang === 'RU' ? 'На главную' : 'Back to Home'}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="pt-36 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          
          {/* Small badge */}
          <div className="inline-flex items-center gap-1.5 bg-rage-brand/10 border border-rage-brand text-rage-brand font-mono text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-8 rotate-[-1deg]">
            <Zap size={10} className="animate-pulse" />
            Closed Club Membership
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter leading-[0.85] mb-8 select-none">
            {lang === 'RU' ? (
              <>
                СТРОИМ НЕ АГЕНТСТВО. <br />
                <span className="text-rage-brand drop-shadow-[0_0_15px_rgba(172,255,42,0.3)]">СТРОИМ КУЛЬТУРУ.</span>
              </>
            ) : (
              <>
                NOT BUILDING AN AGENCY. <br />
                <span className="text-rage-brand drop-shadow-[0_0_15px_rgba(172,255,42,0.3)]">BUILDING A CULTURE.</span>
              </>
            )}
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            {lang === 'RU'
              ? 'Мы не просто закупаем рекламу. Мы формируем тренды гейминг сообщества и продвигаем культуру креаторов. Ищешь закрытый клуб сильных профессионалов? Присоединяйся.'
              : "We don't just buy advertising. We shape gaming community trends and promote creator culture. Looking for a closed club of strong professionals? Join us."}
          </p>
        </div>
      </section>

      {/* Open positions section */}
      <section className="py-16 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-4">
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter">
              {lang === 'RU' ? 'ОТКРЫТЫЕ ПОЗИЦИИ' : 'OPEN POSITIONS'}
            </h2>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
              [{OPEN_VACANCIES.length} {lang === 'RU' ? 'ВАКАНСИЙ ДОСТУПНО' : 'VACANCIES AVAILABLE'}]
            </span>
          </div>

          {/* Vacancy cards list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPEN_VACANCIES.map((vac, i) => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={vac.title}
                className={`p-6 sm:p-8 bg-[#09090b] border-2 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                  vac.accent === 'lime' 
                    ? 'border-rage-brand/20 hover:border-rage-brand hover:shadow-[0_0_20px_rgba(172,255,42,0.15)]' 
                    : vac.accent === 'pink'
                    ? 'border-rage-pink/20 hover:border-rage-pink hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]'
                    : 'border-white/10 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                }`}
              >
                {/* Visual sticker tape look */}
                <div className="absolute top-[-5px] right-6 w-12 h-4 bg-white/5 border border-white/5 backdrop-blur-xs select-none pointer-events-none rotate-[-4deg]" />

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-mono font-black uppercase text-white/40 tracking-wider">
                      {lang === 'RU' ? vac.typeRU : vac.typeEN}
                    </span>
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                      vac.accent === 'lime' ? 'text-rage-brand' : vac.accent === 'pink' ? 'text-rage-pink' : 'text-white'
                    }`}>
                      {lang === 'RU' ? vac.salaryRU : vac.salaryEN}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white mb-3 group-hover:text-rage-brand transition-colors">
                    {vac.title}
                  </h3>

                  <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {lang === 'RU' ? vac.descRU : vac.descEN}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5 mb-6">
                    {(lang === 'RU' ? vac.tagsRU : vac.tagsEN).map(tag => (
                      <span key={tag} className="text-[9px] font-sans text-white/40 bg-white/5 px-2 py-0.5 border border-white/5 rounded-sm uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => handleApply(vac.title)}
                    className={`w-full py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 border cursor-pointer ${
                      vac.accent === 'lime' 
                        ? 'bg-rage-brand text-black border-black hover:shadow-[0_0_15px_#ACFF2A]' 
                        : vac.accent === 'pink'
                        ? 'bg-rage-pink text-white border-white hover:shadow-[0_0_15px_#FF00FF]'
                        : 'bg-white text-black border-black hover:bg-white/90'
                    }`}
                  >
                    <span>{lang === 'RU' ? 'ОТКЛИКНУТЬСЯ' : 'APPLY'}</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form styled like Closed Club Request */}
      <section id="application-form" className="py-16 px-6 relative z-10 border-t border-white/5 bg-transparent">
        <div className="container mx-auto max-w-xl">
          
          <div className="bg-[#0b0b0d] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
            <div className="absolute top-4 right-4 text-rage-brand font-mono text-[9px] font-extrabold uppercase tracking-widest bg-rage-brand/5 border border-rage-brand/20 px-2 py-1 rounded-sm">
              Closed Request Form
            </div>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-rage-brand/10 text-rage-brand border border-rage-brand rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-display font-black text-2xl uppercase text-white mb-2">
                  {lang === 'RU' ? 'ОТКЛИК ПРИНЯТ!' : 'APPLICATION RECEIVED!'}
                </h3>
                <p className="text-white/60 text-sm mb-8 font-sans">
                  {lang === 'RU'
                    ? 'Спасибо за проявленный интерес. Мы свяжемся с тобой в Telegram в ближайшие 24 часа. Будь готов сделать разницу.'
                    : 'Thank you for your interest. We will contact you on Telegram within the next 24 hours. Be ready to make a difference.'}
                </p>
                <button 
                  onClick={() => setSubmitSuccess(false)}
                  className="px-6 py-2 bg-transparent border border-white/20 text-white rounded-full uppercase tracking-wider text-xs hover:border-white transition-all cursor-pointer"
                >
                  {lang === 'RU' ? 'ОТЛИЧНО' : 'GREAT'}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-rage-pink font-mono text-[9px] font-black uppercase tracking-widest block mb-1">
                    CULTURE IS THE BASE
                  </span>
                  <h3 className="font-display font-black text-2xl uppercase tracking-tighter text-white">
                    {lang === 'RU' ? 'СТАНЬ ЧАСТЬЮ КОМАНДЫ' : 'JOIN THE TEAM'}
                  </h3>
                </div>

                <div className="space-y-4 font-sans">
                  <div>
                    <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                      {lang === 'RU' ? 'ИМЯ / ФИО' : 'FULL NAME'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'RU' ? 'Иван Иванов' : 'John Doe'}
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                      {lang === 'RU' ? 'TELEGRAM / TELEPHONE' : 'TELEGRAM / PHONE'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'RU' ? '@username или +7...' : '@username or +1...'}
                      value={formData.contact}
                      onChange={e => setFormData(p => ({ ...p, contact: e.target.value }))}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                      {lang === 'RU' ? 'ВЫБРАННАЯ ВАКАНСИЯ' : 'SELECTED VACANCY'}
                    </label>
                    <select 
                      value={formData.vacancy}
                      onChange={e => setFormData(p => ({ ...p, vacancy: e.target.value }))}
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl"
                    >
                      {OPEN_VACANCIES.map(vac => (
                        <option key={vac.title} value={vac.title}>{vac.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black uppercase tracking-widest text-white/50 block mb-1">
                      {lang === 'RU' ? 'ССЫЛКА НА РЕЗЮМЕ / ПОРТФОЛИО' : 'CV / PORTFOLIO LINK'}
                    </label>
                    <input 
                      type="url" 
                      placeholder={lang === 'RU' ? 'Google Drive, HeadHunter, Behance...' : 'Google Drive, LinkedIn, Behance...'}
                      value={formData.portfolio}
                      onChange={e => setFormData(p => ({ ...p, portfolio: e.target.value }))}
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-white text-sm focus:border-rage-brand outline-none transition-colors rounded-xl"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary justify-center py-3.5 text-xs font-black uppercase tracking-wider"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{lang === 'RU' ? 'ОТПРАВИТЬ ОТКЛИК' : 'SUBMIT APPLICATION'}</span>
                      <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-xs font-mono">
        <div>{lang === 'RU' ? '© 2026 RAGE MEDIA. Все права защищены.' : '© 2026 RAGE MEDIA. All rights reserved.'}</div>
      </footer>

    </div>
  );
}