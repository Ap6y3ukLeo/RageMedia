import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowLeft, Send, CheckCircle, Briefcase, Zap, Sparkles, ChevronDown } from 'lucide-react';
import RageLogo from '../components/RageLogo';

interface Vacancy {
  title: string;
  typeRU: string;
  typeEN: string;
  salaryRU: string;
  salaryEN: string;
  descRU: string;
  descEN: string;
  responsibilitiesRU: string[];
  responsibilitiesEN: string[];
  requirementsRU: string[];
  requirementsEN: string[];
  offersRU?: string[];
  offersEN?: string[];
  tagsRU: string[];
  tagsEN: string[];
  accent: 'lime' | 'pink' | 'white';
}

const OPEN_VACANCIES: Vacancy[] = [
  {
    title: "Influence Manager",
    typeRU: "Удаленно • Гибкий график",
    typeEN: "Remote • Flexible schedule",
    salaryRU: "",
    salaryEN: "",
    descRU: "Мы ищем специалиста, который будет отвечать за коммуникацию с блогерами и организацию рекламных размещений. Основная задача — находить релевантных авторов, договариваться о сотрудничестве и контролировать реализацию рекламных кампаний от начала до конца.",
    descEN: "We are looking for a specialist who will be responsible for communication with influencers and organizing ad placements. The main task is to find relevant creators, negotiate cooperation, and control the execution of advertising campaigns from start to finish.",
    responsibilitiesRU: [
      "Поиск и анализ блогеров под задачи клиентов.",
      "Коммуникация с авторами и их менеджерами.",
      "Подготовка подборок блогеров для клиентов.",
      "Контроль выхода рекламных размещений.",
      "Ведение отчетности по размещениям.",
      "Формирование и актуализация базы блогеров."
    ],
    responsibilitiesEN: [
      "Searching for and analyzing influencers based on client objectives.",
      "Communicating with creators and their managers.",
      "Preparing influencer selections for clients.",
      "Monitoring the release of advertising placements.",
      "Maintaining reporting on placements.",
      "Building and updating the influencer database."
    ],
    requirementsRU: [
      "Опыт работы в influencer-маркетинге, digital-маркетинге или продажах будет преимуществом.",
      "Умение вести деловую переписку и переговоры.",
      "Внимательность к деталям и ответственность за результат.",
      "Хорошие навыки работы с Google Sheets / Drive / Documents.",
      "Понимание основных метрик блогеров.",
      "Умение работать с большим объемом информации.",
      "Грамотная письменная речь.",
      "(Будет плюсом) Опыт работы с YouTube, Telegram или Twitch.",
      "(Будет плюсом) Наличие собственной базы блогеров и контактов.",
      "(Будет плюсом) Опыт работы в агентстве."
    ],
    requirementsEN: [
      "Experience in influencer marketing, digital marketing, or sales is an advantage.",
      "Ability to conduct business correspondence and negotiations.",
      "Attention to detail and responsibility for results.",
      "Good skills working with Google Sheets / Drive / Documents.",
      "Understanding of key influencer metrics.",
      "Ability to work with large amounts of information.",
      "Fluent and grammatically correct written language.",
      "(Preferred) Experience working with YouTube, Telegram, or Twitch.",
      "(Preferred) Possession of an active database of influencers and contacts.",
      "(Preferred) Experience working in an agency."
    ],
    offersRU: [
      "Удаленный формат работы.",
      "Гибкий график.",
      "Работа по договору.",
      "Конкурентная оплата труда.",
      "Возможность работать с крупными брендами и интересными проектами.",
      "Профессиональный рост в сфере influencer-маркетинга."
    ],
    offersEN: [
      "Remote work format.",
      "Flexible schedule.",
      "Work under a contract.",
      "Competitive remuneration.",
      "Opportunity to work with major brands and exciting projects.",
      "Professional growth in the field of influencer marketing."
    ],
    tagsRU: ["Удаленно", "Блогеры", "Переговоры"],
    tagsEN: ["Remote", "Influencers", "Negotiations"],
    accent: "lime"
  },
  {
    title: "Creative Manager",
    typeRU: "Удаленно • Гибкий график",
    typeEN: "Remote • Flexible schedule",
    salaryRU: "",
    salaryEN: "",
    descRU: "Мы ищем человека, который поможет развивать присутствие агентства в социальных сетях, создавать контент и участвовать в разработке креативных идей для продвижения. Нам нужен специалист, который следит за трендами, понимает специфику digital-среды и умеет превращать идеи в понятный и интересный контент.",
    descEN: "We are looking for a person who will help develop the agency's presence in social media, create content, and participate in developing creative ideas for promotion. We need a specialist who follows trends, understands the specifics of the digital environment, and knows how to turn ideas into clear and engaging content.",
    responsibilitiesRU: [
      "Ведение социальных сетей агентства.",
      "Разработка креативных концепций для контента и рекламных активностей.",
      "Поиск инфоповодов, трендов и актуальных форматов.",
      "Участие в создании контента совместно с дизайнерами и видеомонтажерами.",
      "Анализ эффективности контента и поиск точек роста."
    ],
    responsibilitiesEN: [
      "Managing the agency's social media channels.",
      "Developing creative concepts for content and advertising campaigns.",
      "Identifying news hooks, trends, and relevant formats.",
      "Participating in content creation in collaboration with designers and video editors.",
      "Analyzing content performance and identifying growth points."
    ],
    requirementsRU: [
      "Опыт работы в SMM или ведении блога.",
      "Понимание современных социальных сетей и контентных трендов.",
      "Грамотная устная и письменная речь.",
      "Умение генерировать идеи и креативы.",
      "Базовые навыки работы с графическими редакторами будут преимуществом.",
      "(Будет плюсом) Опыт ведения Telegram, TikTok, Instagram, YouTube.",
      "(Будет плюсом) Понимание influencer-маркетинга и рынка блогеров.",
      "(Будет плюсом) Навыки монтажа видео или создания визуального контента."
    ],
    requirementsEN: [
      "Experience in SMM or blogging.",
      "Understanding of modern social media networks and content trends.",
      "Fluent and grammatically correct oral and written language.",
      "Ability to generate ideas and creatives.",
      "Basic skills with graphic editors is an advantage.",
      "(Preferred) Experience managing Telegram, TikTok, Instagram, YouTube channels.",
      "(Preferred) Understanding of influencer marketing and the influencer market.",
      "(Preferred) Skills in video editing or visual content creation."
    ],
    offersRU: [
      "Удаленный формат работы.",
      "Гибкий график.",
      "Конкурентная оплата труда.",
      "Возможность реализовывать собственные идеи и тестировать новые форматы свободно.",
      "Работа в дружной команде.",
      "Возможность профессионального роста внутри агентства."
    ],
    offersEN: [
      "Remote work format.",
      "Flexible schedule.",
      "Competitive remuneration.",
      "Opportunity to realize your own ideas and test new formats freely.",
      "Work in a friendly team.",
      "Opportunity for professional growth within the agency."
    ],
    tagsRU: ["Удаленно", "SMM", "Контент"],
    tagsEN: ["Remote", "SMM", "Content"],
    accent: "pink"
  }
];

export default function Career() {
  const [lang, setLang] = useState<'RU' | 'EN'>(() => (localStorage.getItem('rage_lang') as 'RU' | 'EN') || 'RU');
  const [expandedVacancy, setExpandedVacancy] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    vacancy: 'Influence Manager',
    portfolio: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setIsSubmitting(true);
    setSubmitError(false);
    
    // Format message
    const message = lang === 'RU'
      ? `💼 Отклик на вакансию RAGE MEDIA!\n👤 Имя: ${formData.name}\n📋 Вакансия: ${formData.vacancy}\n📞 Контакты: ${formData.contact}\n🔗 Резюме/Портфолио: ${formData.portfolio || 'Не указано'}`
      : `💼 RAGE MEDIA Job Application!\n👤 Name: ${formData.name}\n📋 Vacancy: ${formData.vacancy}\n📞 Contacts: ${formData.contact}\n🔗 CV/Portfolio: ${formData.portfolio || 'Not specified'}`;

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
        setSubmitSuccess(true);
        setFormData({
          name: '',
          contact: '',
          vacancy: 'Influence Manager',
          portfolio: ''
        });
      } else {
        console.error('Telegram API error:', await response.text());
        setSubmitError(true);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {OPEN_VACANCIES.map((vac, i) => {
              const isExpanded = expandedVacancy === vac.title;
              return (
                <motion.div 
                  whileHover={{ y: -4 }}
                  key={vac.title}
                  onClick={() => setExpandedVacancy(prev => prev === vac.title ? null : vac.title)}
                  className={`p-6 sm:p-8 bg-[#09090b] border-2 rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group cursor-pointer h-fit self-start ${
                    vac.accent === 'lime' 
                      ? 'border-rage-brand/20 hover:border-rage-brand hover:shadow-[0_0_20px_rgba(172,255,42,0.15)]' 
                      : vac.accent === 'pink'
                      ? 'border-rage-pink/20 hover:border-rage-pink hover:shadow-[0_0_20px_rgba(247,38,137,0.15)]'
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
                      {(lang === 'RU' ? vac.salaryRU : vac.salaryEN) && (
                        <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          vac.accent === 'lime' ? 'text-rage-brand' : vac.accent === 'pink' ? 'text-rage-pink' : 'text-white'
                        }`}>
                          {lang === 'RU' ? vac.salaryRU : vac.salaryEN}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white group-hover:text-rage-brand transition-colors">
                        {vac.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/40 group-hover:text-white"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>

                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                      {lang === 'RU' ? vac.descRU : vac.descEN}
                    </p>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mb-6"
                        >
                          <div className="space-y-4 pt-2 pb-4 text-xs font-sans text-white/70">
                            <div>
                              <h4 className="font-bold uppercase tracking-wider text-[10px] text-rage-brand mb-1.5">
                                {lang === 'RU' ? 'Обязанности:' : 'Responsibilities:'}
                              </h4>
                              <ul className="list-disc list-inside space-y-1 pl-1 text-white/60">
                                {(lang === 'RU' ? vac.responsibilitiesRU : vac.responsibilitiesEN).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold uppercase tracking-wider text-[10px] text-rage-brand mb-1.5">
                                {lang === 'RU' ? 'Требования:' : 'Requirements:'}
                              </h4>
                              <ul className="list-disc list-inside space-y-1 pl-1 text-white/60">
                                {(lang === 'RU' ? vac.requirementsRU : vac.requirementsEN).map((item, idx) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            {vac.offersRU && vac.offersEN && (
                              <div>
                                <h4 className="font-bold uppercase tracking-wider text-[10px] text-rage-brand mb-1.5">
                                  {lang === 'RU' ? 'Что предлагаем:' : 'What we offer:'}
                                </h4>
                                <ul className="list-disc list-inside space-y-1 pl-1 text-white/60">
                                  {(lang === 'RU' ? vac.offersRU : vac.offersEN).map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApply(vac.title);
                      }}
                      className={`w-full py-3 rounded-xl font-display font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 border cursor-pointer ${
                        vac.accent === 'lime' 
                          ? 'bg-rage-brand text-black border-black hover:shadow-[0_0_15px_#ACFF2A]' 
                          : vac.accent === 'pink'
                          ? 'bg-rage-pink text-white border-white hover:shadow-[0_0_15px_#f72689]'
                          : 'bg-white text-black border-black hover:bg-white/90'
                      }`}
                    >
                      <span>{lang === 'RU' ? 'ОТКЛИКНУТЬСЯ' : 'APPLY'}</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
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
                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3.5 rounded-xl text-xs font-bold font-sans">
                    {lang === 'RU' 
                      ? 'Произошла ошибка при отправке отклика в Telegram. Пожалуйста, попробуйте еще раз.' 
                      : 'An error occurred while sending your application to Telegram. Please try again.'}
                  </div>
                )}
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
                      {lang === 'RU' ? 'TELEGRAM / VK' : 'TELEGRAM / VK'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={lang === 'RU' ? '@username или ссылка на VK' : '@username or VK link'}
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