import React, { useState } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import RageLogo from '../components/RageLogo';

export default function Privacy() {
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
          <Shield size={24} />
          <span className="font-mono text-xs uppercase tracking-widest font-black">
            {lang === 'RU' ? 'КОНФИДЕНЦИАЛЬНОСТЬ' : 'DATA PROTECTION'}
          </span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter mb-10 leading-none">
          {lang === 'RU' ? 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ' : 'PRIVACY POLICY'}
        </h1>

        <div className="space-y-8 text-white/70 leading-relaxed font-sans text-sm sm:text-base border-t border-white/10 pt-8">
          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '1. Общие положения' : '1. General Provisions'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Настоящая политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей сайта RAGE MEDIA. Мы собираем только те данные, которые вы добровольно отправляете через контактные формы и форму подачи резюме (имя, контакты Telegram/VK, портфолио/ссылка на резюме, описание проекта).'
                : 'This Privacy Policy governs the processing and protection of personal information of RAGE MEDIA website users. We only collect data that you voluntarily submit via our contact forms and job application forms (name, Telegram/VK contact, portfolio/resume link, project description).'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '2. Цели сбора и обработки информации' : '2. Purposes of Information Collection'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Мы обрабатываем ваши персональные данные исключительно для целей:'
                : 'We process your personal data exclusively for the purposes of:'}
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-2 text-white/60">
              {lang === 'RU' ? (
                <>
                  <li>Связи с вами для обсуждения потенциального рекламного сотрудничества.</li>
                  <li>Рассмотрения вашей кандидатуры на открытые вакансии в нашей команде.</li>
                  <li>Предоставления медиакитов и расчётов по рекламным интеграциям.</li>
                </>
              ) : (
                <>
                  <li>Contacting you to discuss potential advertising collaboration.</li>
                  <li>Considering your candidacy for open positions in our team.</li>
                  <li>Providing media kits and campaign estimations.</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '3. Передача и защита данных' : '3. Data Transfer and Security'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Ваши данные шифруются по протоколу HTTPS и напрямую поступают в наш закрытый защищенный рабочий Telegram-чат компании. Мы не передаем, не продаем и не распространяем ваши личные данные третьим лицам без вашего явного согласия.'
                : 'Your data is encrypted via HTTPS and sent directly to our secure internal Telegram workspace chat. We do not transfer, sell, or distribute your personal data to third parties without your explicit consent.'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '4. Сроки хранения данных' : '4. Data Retention Period'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Мы храним ваши персональные данные только до тех пор, пока это необходимо для выполнения целей, ради которых они были собраны, в том числе для удовлетворения любых юридических требований.'
                : 'We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, including satisfying any legal requirements.'}
            </p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight mb-3">
              {lang === 'RU' ? '5. Ваши права' : '5. Your Rights'}
            </h2>
            <p>
              {lang === 'RU'
                ? 'Вы имеете право запросить удаление ваших данных из наших чатов и систем. Для этого свяжитесь с нами напрямую по адресу hello@ragemedia.ru или через Telegram-аккаунт @RageAds.'
                : 'You have the right to request deletion of your data from our systems. To do so, please contact us directly at hello@ragemedia.ru or via Telegram @RageAds.'}
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
