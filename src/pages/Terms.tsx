import React, { useState } from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import RageLogo from '../components/RageLogo';

export default function Terms() {
  const [lang, setLang] = useState<'RU' | 'EN'>(() => (localStorage.getItem('rage_lang') as 'RU' | 'EN') || 'RU');

  React.useEffect(() => {
    localStorage.setItem('rage_lang', lang);
  }, [lang]);

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden select-none font-sans selection:bg-rage-brand selection:text-black">
      {/* Abstract neon glow shapes */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-rage-brand/5 via-rage-pink/3 to-transparent pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/85 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <RageLogo className="scale-90" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-rage-pink border border-rage-pink/30 px-2 py-0.5 rounded-sm bg-rage-pink/5 font-black">
              LEGAL
            </span>
          </a>

          <div className="flex items-center gap-4">
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

      {/* Main Content */}
      <main className="pt-36 pb-24 px-6 relative z-10 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6 text-rage-brand">
          <FileText size={24} />
          <span className="font-mono text-xs uppercase tracking-widest font-black">
            {lang === 'RU' ? 'ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ' : 'USER AGREEMENT'}
          </span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-10 leading-none">
          {lang === 'RU' ? 'ПУБЛИЧНАЯ ОФЕРТА' : 'TERMS OF SERVICE'}
        </h1>

        <div className="space-y-8 text-white/70 leading-relaxed font-sans text-sm sm:text-base border-t border-white/10 pt-8">
          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '1. Предмет соглашения' : '1. Subject of the Agreement'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Компания RAGE MEDIA предоставляет услуги по подбору лидеров мнений (блогеров) в гейминг сегменте, инфлюенс-маркетингу, креативному продюсированию и сопровождению рекламных кампаний. Информация о наших услугах, кейсах и блогерах, размещенная на данном сайте, носит ознакомительный характер.'
                : 'RAGE MEDIA provides services in influencer selection (creators) in the gaming segment, influence marketing, creative producing, and advertising campaign management. The information about our services, cases, and creators listed on this website is for informational purposes only.'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '2. Использование материалов сайта' : '2. Website Materials Usage'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Все материалы сайта RAGE MEDIA (текст, графическое оформление, скриншоты кейсов, оформление карточек, логотипы) являются интеллектуальной собственностью компании RAGE MEDIA. Запрещается копирование, перепечатывание или иное использование материалов сайта без согласования с администрацией.'
                : 'All materials on the RAGE MEDIA website (text, graphic layouts, case screenshots, card styling, logos) are the intellectual property of RAGE MEDIA. Copying, republishing, or otherwise using any materials from this website is strictly prohibited without prior written consent from the administration.'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '3. Статус заявок и формы обратной связи' : '3. Feedback Status & Application Submission'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Заполнение формы обратной связи или формы отправки резюме не накладывает на стороны никаких обязательств юридического или финансового характера. Данное действие является исключительно предварительным выражением намерения о сотрудничестве или поиске работы.'
                : 'Submitting a contact form or resume submission form does not impose any legal or financial obligations on either party. This action is solely a preliminary expression of interest in potential cooperation or job application.'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '4. Ответственность сторон' : '4. Limitation of Liability'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'RAGE MEDIA прилагает максимальные усилия к верификации данных и статистики блогеров на момент публикации. Однако компания не несет ответственности за непредвиденные действия платформ (YouTube, Twitch, Telegram и др.) или изменение алгоритмов, которые могут повлиять на итоговые просмотры. Финальные условия и KPI рекламных кампаний фиксируются в отдельных двусторонних договорах на оказание услуг.'
                : 'RAGE MEDIA makes every effort to verify influencer metrics and statistics at the time of publication. However, the company is not responsible for unexpected platform actions (YouTube, Twitch, Telegram, etc.) or algorithm changes that might affect final view counts. Final terms and KPIs of advertising campaigns are defined in individual bilateral service agreements.'}
            </p>
          </div>
        </div>
      </main>

      {/* Footer Legal */}
      <footer className="py-12 border-t border-white/10 text-center text-white/40 text-xs font-mono">
        <div>{lang === 'RU' ? '© 2026 RAGE MEDIA. Все права защищены.' : '© 2026 RAGE MEDIA. All rights reserved.'}</div>
      </footer>
    </div>
  );
}
