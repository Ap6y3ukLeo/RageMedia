import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

export default function Career() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-24 px-6 flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-[550px] h-[550px] bg-rage-brand/12 blur-[130px] rounded-full mix-blend-screen" />
          <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-rage-pink/12 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Создавайте будущее
              <span className="text-rage-brand block">вместе с нами</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed">
              Присоединяйся к команде профессионалов, которые меняют правила игры в рекламе и контенте
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <a href="#vacancies" className="btn-primary group font-extrabold cursor-pointer">
                Открытые вакансии
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              
              <a href="#culture" className="px-7 py-3 bg-transparent border-2 border-rage-pink text-white font-extrabold rounded-full uppercase tracking-tight text-xs sm:text-sm transition-all hover:bg-rage-pink/10 active:scale-95 flex items-center gap-2 group cursor-pointer">
                Культура компании
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="culture" className="py-24 px-6 relative bg-black/20 backdrop-blur-xs border-t border-b border-white/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-white mb-16 text-center">
              Почему RageMedia?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-rage-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Инновации</h3>
                <p className="text-white/60">Мы используем самые современные технологии и подходы в работе</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-rage-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Рост</h3>
                <p className="text-white/60">Профессиональное развитие и карьерный рост гарантированы</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-rage-brand/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-4">Креатив</h3>
                <p className="text-white/60">Свобода творить и реализовывать свои идеи</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vacancies Section */}
      <section id="vacancies" className="py-24 px-6 relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-white mb-16">
              Открытые вакансии
            </h2>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Creative Designer</h3>
                  <p className="text-white/60">Москва / Удалённо • Полный день</p>
                </div>
                <button className="btn-primary font-extrabold cursor-pointer">
                  Откликнуться
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Frontend Developer</h3>
                  <p className="text-white/60">Москва / Удалённо • Полный день</p>
                </div>
                <button className="btn-primary font-extrabold cursor-pointer">
                  Откликнуться
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">SMM Manager</h3>
                  <p className="text-white/60">Москва / Удалённо • Полный день</p>
                </div>
                <button className="btn-primary font-extrabold cursor-pointer">
                  Откликнуться
                </button>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Content Strategist</h3>
                  <p className="text-white/60">Москва / Удалённо • Полный день</p>
                </div>
                <button className="btn-primary font-extrabold cursor-pointer">
                  Откликнуться
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-6 relative bg-black/20 backdrop-blur-xs border-t border-white/5">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title text-white mb-6">
              Не нашли подходящую вакансию?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Присылайте своё резюме и мы рассмотрим вас для будущих проектов
            </p>
            <a href="mailto:career@ragesmedia.ru" className="btn-primary font-extrabold cursor-pointer">
              Отправить резюме
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}