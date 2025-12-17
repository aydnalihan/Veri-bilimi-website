import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Code,
  Coffee,
  Calendar,
  ArrowRight,
  Database,
  Users,
  Globe,
  Zap,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  BookOpen,
  MapPin,
  Smile,
  ChevronLeft,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Github,
  Share2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Send,
  Building,
  User,
  Mail,
  Quote,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useData } from './context/DataContext';
import { applicationsAPI } from './services/api';
import {
  EventCardSkeleton,
  ProjectCardSkeleton,
  TeamCardSkeleton,
  StatsSkeleton,
  EventDetailSkeleton,
  ProjectDetailSkeleton,
  TeamDetailSkeleton,
  SkeletonGrid,
} from './components/Skeletons';

// --- STATIC DATA ---

const NAV_LINKS = [
  { name: 'Neler Yaptık?', href: '#activities', page: 'home' },
  { name: 'Etkinlik Arşivi', action: 'events', page: 'events' },
  { name: 'Projeler', action: 'projects', page: 'projects' },
  { name: 'Ekibimiz', action: 'team', page: 'team' },
];

// --- TOAST NOTIFICATION ---

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-[100] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
        type === 'success' 
          ? 'bg-green-500 text-white' 
          : type === 'error' 
          ? 'bg-red-500 text-white' 
          : 'bg-slate-800 text-white'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle size={20} />
      ) : type === 'error' ? (
        <AlertCircle size={20} />
      ) : null}
      <span className="font-medium">{message}</span>
    </motion.div>
  );
};

// --- COMPONENTS ---

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white rotate-3 shadow-lg shadow-indigo-200">
            <Database size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">
            DataSci<span className="text-indigo-600">Club</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.page !== 'home') {
                  onNavigate(link.page);
                } else {
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigate('membership')}
          className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-200"
        >
          Aramıza Katıl
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-b from-indigo-50/50 to-white">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-blue-200/40 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-600 text-sm font-semibold mb-8">
            <Sparkles size={16} /> Akdeniz Üniversitesi'nin En Aktif Teknoloji
            Topluluğu
          </span>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            Veriyi Geleceğe <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              Dönüştürüyoruz.
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sadece kod yazmıyoruz; birlikte öğreniyor, pizza yiyor, projeler
            geliştiriyor ve geleceğin veri bilimcileri olarak bugünden
            hazırlanıyoruz. 🚀
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onNavigate('events')}
              className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Etkinlik Arşivi <ArrowRight size={20} />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <Code size={20} className="text-pink-500" /> Projeleri Gör
            </button>
          </div>

          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-4 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden`}
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                +400
              </div>
            </div>
            <p className="text-sm font-medium text-slate-500">
              Sen de aramıza katıl!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BentoGrid = ({ onNavigate }) => {
  const { stats, loading } = useData();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 row-span-1 bg-slate-50 rounded-3xl p-8 flex flex-col justify-center border border-slate-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 text-indigo-600">
                <Zap size={24} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Misyonumuz
              </h3>
              <p className="text-slate-600 text-lg">
                Teknolojiyi sıkıcı ders notlarından çıkarıp hayatın içine
                sokuyoruz. Amacımız, herkesin veri okuryazarı olduğu bir kampüs
                kültürü yaratmak.
              </p>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-indigo-600 rounded-3xl p-8 flex flex-col justify-between text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
          >
            <div className="absolute -bottom-10 -right-10 text-9xl opacity-20 rotate-12">
              🤝
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-1">Birlikte</h3>
              <h3 className="text-4xl font-bold text-indigo-200">
                Öğreniyoruz
              </h3>
            </div>
            <p className="text-indigo-100 font-medium mt-4">
              Rekabet yok, dayanışma var.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white border-2 border-slate-100 rounded-3xl p-8 flex flex-col justify-center"
          >
            {loading.stats ? (
              <StatsSkeleton />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div key={stat.id || idx} className="text-center">
                    <div className="text-2xl mb-1">{stat.emoji}</div>
                    <div className="font-bold text-slate-800 text-xl">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 uppercase font-bold">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="md:col-span-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-8 flex items-center justify-between text-white relative overflow-hidden shadow-xl shadow-pink-200"
          >
            <div className="relative z-10 max-w-lg">
              <h3 className="text-2xl font-bold mb-2">
                Sıfır Tecrübe, Sonsuz Merak!
              </h3>
              <p className="text-pink-100">
                Kulübe katılmak için Python gurusu olmana gerek yok. Merakın
                varsa yerin hazır.
              </p>
            </div>
            <button
              onClick={() => onNavigate('membership')}
              className="relative z-10 bg-white text-pink-600 px-6 py-3 rounded-full font-bold hover:bg-pink-50 transition-colors shadow-lg"
            >
              Hemen Başvur
            </button>
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const EventCard = ({ event, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={() => onClick(event.id)}
    className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-100 hover:shadow-xl transition-all h-full flex flex-col cursor-pointer group"
  >
    <div className="h-48 mb-4 overflow-hidden rounded-2xl relative shrink-0">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${event.color} bg-white/90 backdrop-blur-sm`}
      >
        {event.tag}
      </span>
    </div>
    <div className="flex justify-between items-start mb-2">
      <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase">
        <Calendar size={14} /> {event.date}
      </div>
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
      {event.title}
    </h3>
    <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">
      {event.desc}
    </p>
    <div className="flex items-center text-sm text-slate-400 gap-4 pt-4 border-t border-slate-50 mt-auto">
      <span className="flex items-center gap-1">
        <MapPin size={16} /> {event.location}
      </span>
      <span className="ml-auto text-indigo-600 text-xs font-bold">
        İncele →
      </span>
    </div>
  </motion.div>
);

const ProjectCard = ({ project, onClick }) => (
  <div
    onClick={() => onClick(project.id)}
    className="bg-white rounded-3xl p-8 border border-slate-100 hover:border-indigo-100 hover:ring-4 hover:ring-indigo-50 transition-all group cursor-pointer h-full flex flex-col"
  >
    <div className="text-4xl mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
      {project.emoji}
    </div>
    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">
      {project.category}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
      {project.title}
    </h3>
    <p className="text-slate-500 mb-6 flex-grow">{project.desc}</p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tags?.slice(0, 3).map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const EventsSection = ({ onNavigate }) => {
  const { events, loading } = useData();

  return (
    <section id="activities" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Son Etkinliklerimiz
            </h2>
            <p className="text-slate-600">
              Kampüste gerçekleştirdiğimiz son buluşmalar ve atölyeler.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Tüm Arşiv <ArrowRight size={18} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading.events ? (
            <SkeletonGrid count={3} SkeletonComponent={EventCardSkeleton} />
          ) : (
            events.slice(0, 3).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={(id) => onNavigate('event-detail', id)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const ProjectsSection = ({ onNavigate }) => {
  const { projects, loading } = useData();

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Öğrenci Projeleri
          </h2>
          <p className="text-slate-600 text-lg">
            Derslerde öğrendiğimiz teorileri gerçek hayat problemlerine
            uyguluyoruz. İşte üyelerimizin geliştirdiği bazı harika işler.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {loading.projects ? (
            <SkeletonGrid count={3} SkeletonComponent={ProjectCardSkeleton} />
          ) : (
            projects.slice(0, 3).map((proj) => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onClick={(id) => onNavigate('project-detail', id)}
              />
            ))
          )}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('projects')}
            className="text-indigo-600 font-bold hover:underline"
          >
            Tüm Projeleri İncele →
          </button>
        </div>
      </div>
    </section>
  );
};

const CtaSection = ({ onNavigate }) => (
  <section className="py-20 px-6">
    <div className="container mx-auto bg-indigo-600 rounded-[3rem] p-12 lg:p-24 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6">
          Veri Dünyasına Adım At!
        </h2>
        <p className="text-indigo-100 text-lg lg:text-xl mb-10">
          İster birinci sınıf ol, ister mezun aşamasında. Kulübümüzde herkese
          yer var. Hemen Instagram sayfamıza gel, tanışalım.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => onNavigate('membership')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl"
          >
            Üye Ol Formu
          </button>
          <button
            onClick={() => onNavigate('sponsorship')}
            className="px-8 py-4 bg-indigo-700 text-white border border-indigo-500 rounded-full font-bold text-lg hover:bg-indigo-800 transition-all"
          >
            Sponsorluk Formu
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ onNavigate }) => (
  <footer
    id="footer"
    className="bg-white pt-20 pb-10 border-t border-slate-100"
  >
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Database size={16} />
            </div>
            <span className="font-bold text-slate-800">DataSciClub</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Akdeniz Üniversitesi'nin en renkli ve en üretken öğrenci topluluğu.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-100 hover:text-blue-700 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Keşfet</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <button
                onClick={() => onNavigate('events')}
                className="hover:text-indigo-600 transition-colors"
              >
                Etkinlikler
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('projects')}
                className="hover:text-indigo-600 transition-colors"
              >
                Projeler
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('team')}
                className="hover:text-indigo-600 transition-colors"
              >
                Ekibimiz
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Topluluk</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>
              <a
                href="https://instagram.com/datasci-club"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-600 transition-colors">
                WhatsApp Grubu
              </a>
            </li>
            <li>
              <button
                onClick={() => onNavigate('membership')}
                className="hover:text-indigo-600 transition-colors"
              >
                Üyelik Formu
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('sponsorship')}
                className="hover:text-indigo-600 transition-colors"
              >
                Sponsorluk
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">İletişim</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1 shrink-0" />
              <span>
                Akdeniz Üniversitesi Kampüsü,
                <br />
                Konyaaltı, Antalya
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Users size={16} />
              <span>info@datasci.club</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-slate-400 text-sm pt-8 border-t border-slate-50 flex items-center justify-center gap-2">
        <span>Made with</span>{' '}
        <Heart size={16} className="text-red-500 fill-current" />{' '}
        <span>by DataSci Students © 2025</span>
      </div>
    </div>
  </footer>
);

// --- SAYFALAR ---

const HomePage = ({ onNavigate }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero onNavigate={onNavigate} />
    <BentoGrid onNavigate={onNavigate} />
    <EventsSection onNavigate={onNavigate} />
    <ProjectsSection onNavigate={onNavigate} />
    <CtaSection onNavigate={onNavigate} />
  </motion.div>
);

const EventsPage = ({ onNavigate }) => {
  const { events, loading } = useData();
  const [category, setCategory] = useState('all');
  
  const filteredEvents = events.filter((e) =>
    category === 'all' ? true : e.category === category
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
          >
            <ChevronLeft size={20} className="mr-1" /> Ana Sayfaya Dön
          </button>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Etkinlik Arşivi
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Geçmiş dönemlerde gerçekleştirdiğimiz tüm çalışmalar ve güzel
            anılarımız.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-12 flex flex-col md:flex-row gap-6 justify-between items-center">
          <div>
            <span className="text-slate-500 font-medium">
              Toplam {filteredEvents.length} etkinlik listeleniyor.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-slate-400" />
            <select
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 outline-none font-medium"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="education">Eğitim & Workshop</option>
              <option value="social">Sosyal & Eğlence</option>
              <option value="competition">Hackathon & Yarışma</option>
              <option value="panel">Panel & Söyleşi</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading.events ? (
            <SkeletonGrid count={6} SkeletonComponent={EventCardSkeleton} />
          ) : (
            filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={(id) => onNavigate('event-detail', id)}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsPage = ({ onNavigate }) => {
  const { projects, loading } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Veri Analizi', 'AI / ML', 'Görselleştirme'];
  
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
          >
            <ChevronLeft size={20} className="mr-1" /> Ana Sayfaya Dön
          </button>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Projeler Vitrini
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Öğrencilerimiz tarafından geliştirilen, açık kaynaklı ve gerçek
            hayat problemlerine odaklanan projeler.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading.projects ? (
            <SkeletonGrid count={6} SkeletonComponent={ProjectCardSkeleton} />
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={(id) => onNavigate('project-detail', id)}
              />
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- YENİ SAYFA: EKİP ---

const TeamPage = ({ onNavigate }) => {
  const { team, loading } = useData();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-6 font-medium"
          >
            <ChevronLeft size={20} className="mr-1" /> Ana Sayfaya Dön
          </button>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Takımla Tanış
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Bu topluluğu ayakta tutan, projeleri yöneten ve etkinlikleri
            düzenleyen harika ekip.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading.team ? (
            <SkeletonGrid count={6} SkeletonComponent={TeamCardSkeleton} />
          ) : (
            team.map((member) => (
              <div
                key={member.id}
                onClick={() => onNavigate('team-detail', member.id)}
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all group text-center cursor-pointer"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-indigo-50 shadow-inner">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-slate-500 text-sm mb-6">{member.department}</p>

                <div className="flex justify-center gap-4">
                  <span className="text-indigo-600 text-xs font-bold flex items-center">
                    Profili İncele <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- YENİ SAYFA: EKİP ÜYESİ DETAY ---

const TeamMemberDetailPage = ({ memberId, onNavigate }) => {
  const { getTeamMemberById, loading } = useData();
  const member = getTeamMemberById(memberId);

  if (loading.team) return <TeamDetailSkeleton />;
  if (!member) return <div className="pt-32 text-center">Üye bulunamadı</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <button
          onClick={() => onNavigate('team')}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-12 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Ekibe Dön
        </button>

        <div className="bg-white rounded-[2rem] p-8 lg:p-16 shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sol Kolon: Profil Kartı */}
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-xl mb-8">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                      İletişim & Sosyal
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={member.linkedin}
                        className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100"
                      >
                        <Linkedin size={22} />
                      </a>
                      <a
                        href={member.github}
                        className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-all border border-slate-100"
                      >
                        <Github size={22} />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center justify-center w-12 h-12 bg-slate-50 rounded-xl text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-slate-100"
                      >
                        <Mail size={22} />
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Yetkinlikler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.skills?.map((skill, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold border border-indigo-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Kolon: Blog/Hikaye İçeriği */}
            <div className="lg:col-span-8">
              <div className="border-b border-slate-100 pb-8 mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm mb-4">
                  {member.role}
                </span>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  {member.name}
                </h1>
                <div className="flex items-center text-slate-500 text-lg font-medium">
                  <GraduationCap className="mr-2 text-indigo-500" />
                  {member.department}
                </div>
              </div>

              <div className="prose prose-lg prose-slate max-w-none">
                <p className="lead text-xl text-slate-600 leading-relaxed font-medium mb-8">
                  "Veri bilimi sadece sayılardan ibaret değil, geleceği
                  şekillendiren bir hikaye anlatıcılığıdır."
                </p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Hakkımda
                </h3>
                <p className="text-slate-600 leading-8 mb-8">{member.bio}</p>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Kulüpteki Yolculuğum
                </h3>
                <p className="text-slate-600 leading-8 mb-8">
                  {member.role} olarak, ekibimizle birlikte Akdeniz
                  Üniversitesi'nde veri bilimi farkındalığını artırmak için
                  çalışıyorum. Projelerimizde {member.skills?.[0]} ve{' '}
                  {member.skills?.[1]} gibi teknolojileri kullanarak gerçek hayat
                  problemlerine çözümler üretiyoruz.
                </p>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-12 flex items-start gap-4">
                  <div className="text-4xl">💡</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">
                      Vizyonum
                    </h4>
                    <p className="text-slate-600">
                      Teknolojiyi sadece tüketen değil, üreten bir nesil olmak
                      için buradayız. Birlikte öğrenip, birlikte gelişiyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- FORM SAYFALARI ---

const MembershipPage = ({ onNavigate, showToast }) => {
  const [wantsActiveRole, setWantsActiveRole] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    department: '',
    grade: 'Hazırlık',
    wantsActiveRole: false,
    preferredTeam: '',
    expectations: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await applicationsAPI.submitMembership({
        ...formData,
        wantsActiveRole: wantsActiveRole === true,
      });
      showToast('Başvurunuz başarıyla gönderildi! 🎉', 'success');
      // Form'u sıfırla
      setFormData({
        fullName: '',
        email: '',
        university: '',
        department: '',
        grade: 'Hazırlık',
        wantsActiveRole: false,
        preferredTeam: '',
        expectations: '',
      });
      setWantsActiveRole(null);
    } catch (error) {
      showToast('Başvuru gönderilemedi. Lütfen tekrar deneyin.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Ana Sayfaya Dön
        </button>

        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
              <GraduationCap size={32} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Aramıza Katıl
            </h1>
            <p className="text-slate-600 text-lg">
              Veri bilimi yolculuğunda seni de aramızda görmek istiyoruz. Formu
              doldur, etkinliklerden haberdar ol!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  E-Posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="ogr.akdeniz.edu.tr uzantılı mail"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Üniversite
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Örn: Akdeniz Üniversitesi"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Bölüm
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="Örn: Bilgisayar Mühendisliği"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Sınıf
                </label>
                <select 
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option>Hazırlık</option>
                  <option>1. Sınıf</option>
                  <option>2. Sınıf</option>
                  <option>3. Sınıf</option>
                  <option>4. Sınıf</option>
                  <option>Yüksek Lisans / Doktora</option>
                </select>
              </div>
            </div>

            {/* Active Role Section */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <label className="block text-sm font-bold text-slate-700 mb-4">
                Kulüpte aktif görev almak ister misin?
              </label>
              <div className="flex gap-6 mb-4">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="active_role"
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    onChange={() => setWantsActiveRole(true)}
                    checked={wantsActiveRole === true}
                  />
                  <span className="ml-2 text-slate-700">Evet, istiyorum</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="active_role"
                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    onChange={() => setWantsActiveRole(false)}
                    checked={wantsActiveRole === false}
                  />
                  <span className="ml-2 text-slate-700">
                    Hayır, sadece üye olacağım
                  </span>
                </label>
              </div>

              <AnimatePresence>
                {wantsActiveRole && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-sm font-bold text-slate-700 mb-2 mt-4">
                      Hangi ekipte yer almak istersin?
                    </label>
                    <select 
                      name="preferredTeam"
                      value={formData.preferredTeam}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    >
                      <option value="">Seçiniz...</option>
                      <option value="event">Etkinlik & Organizasyon</option>
                      <option value="social">Sosyal Medya & İletişim</option>
                      <option value="education">Eğitim & Ar-Ge</option>
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Kulüpten Beklentilerin Neler?
              </label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all h-32"
                placeholder="Bize biraz kendinden ve hedeflerinden bahset..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Gönderiliyor...
                </>
              ) : (
                <>
                  <Send size={20} /> Başvuruyu Gönder
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

const SponsorshipPage = ({ onNavigate, showToast }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    sponsorshipType: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await applicationsAPI.submitSponsorship(formData);
      showToast('Başvurunuz başarıyla gönderildi! En kısa sürede iletişime geçeceğiz.', 'success');
      // Form'u sıfırla
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        sponsorshipType: '',
        message: '',
      });
    } catch (error) {
      showToast('Başvuru gönderilemedi. Lütfen tekrar deneyin.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Ana Sayfaya Dön
        </button>

        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-slate-100">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
              <Building size={32} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4">
              Sponsorumuz Olun
            </h1>
            <p className="text-slate-600 text-lg">
              Geleceğin veri bilimcilerini destekleyin, markanızı kampüse
              taşıyın. İş birliği fırsatları için formu doldurun.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Şirket Adı
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Firma Ünvanı"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Yetkili Kişi
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Ad Soyad"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  E-Posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="kurumsal@sirket.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="0555 555 55 55"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Sponsorluk Türü
              </label>
              <select 
                name="sponsorshipType"
                value={formData.sponsorshipType}
                onChange={handleChange}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="">Seçiniz...</option>
                <option value="event">Etkinlik Sponsorluğu</option>
                <option value="product">Ürün / Hizmet Sponsorluğu</option>
                <option value="annual">Yıllık Ana Sponsorluk</option>
                <option value="hackathon">Hackathon Ödül Sponsorluğu</option>
                <option value="other">Diğer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Mesajınız
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all h-32"
                placeholder="İş birliği öneriniz veya notlarınız..."
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Gönderiliyor...
                </>
              ) : (
                <>
                  <Send size={20} /> İletişime Geç
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// --- DETAY SAYFALARI ---

const EventDetailPage = ({ eventId, onNavigate }) => {
  const { getEventById, loading } = useData();
  const event = getEventById(eventId);

  if (loading.events) return <EventDetailSkeleton />;
  if (!event) return <div className="pt-32 text-center">Etkinlik bulunamadı</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <button
          onClick={() => onNavigate('events')}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Etkinliklere Dön
        </button>
        <div className="text-center mb-10">
          <span
            className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase mb-4 ${event.color} bg-opacity-100`}
          >
            {event.tag}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            {event.title}
          </h1>
          <div className="flex justify-center flex-wrap gap-6 text-slate-500 font-medium">
            <span className="flex items-center gap-2">
              <Calendar size={20} className="text-indigo-600" /> {event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={20} className="text-indigo-600" /> {event.location}
            </span>
          </div>
        </div>
        <div className="rounded-[2rem] overflow-hidden shadow-xl mb-12 border border-slate-100 bg-white">
          <img
            src={event.image}
            alt={event.title}
            className="w-full max-h-[600px] object-cover"
          />
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 lg:p-12 rounded-[2rem] shadow-sm border border-slate-100 text-center">
          <div className="prose prose-lg text-slate-600 leading-relaxed mb-10 mx-auto">
            <p className="font-bold text-xl text-slate-800 mb-6">
              {event.desc}
            </p>
            <p>{event.longDesc}</p>
            <p>
              Etkinlik süresince öğrencilerimiz teorik bilgileri pratiğe dökme
              şansı buldular ve sektörden önemli isimlerle tanıştılar. Bu
              etkinlikte edindiğimiz deneyimler ve kurduğumuz dostluklar
              kulübümüzün en değerli kazanımları arasına girdi.
            </p>
          </div>
          <a
            href={event.instagramLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Instagram size={20} /> Instagram Postuna Git
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetailPage = ({ projectId, onNavigate }) => {
  const { getProjectById, loading } = useData();
  const project = getProjectById(projectId);

  if (loading.projects) return <ProjectDetailSkeleton />;
  if (!project) return <div className="pt-32 text-center">Proje bulunamadı</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 min-h-screen bg-slate-50 overflow-x-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <button
          onClick={() => onNavigate('projects')}
          className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft size={20} className="mr-1" /> Projelere Dön
        </button>
        <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 shadow-sm border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 bg-slate-50 w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center">
                {project.emoji}
              </div>
              <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs sm:text-sm">
                {project.category}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 mb-4 sm:mb-6">
                {project.title}
              </h1>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                {project.longDesc}
              </p>
              <h3 className="font-bold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">
                Kullanılan Teknolojiler:
              </h3>
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs sm:text-sm border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
                >
                  <Github size={20} /> GitHub'da İncele
                </a>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
                  <Share2 size={20} /> Paylaş
                </button>
              </div>
            </div>
            <div className="order-first lg:order-last">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-80 lg:h-full object-cover rounded-2xl sm:rounded-3xl shadow-lg"
              />
            </div>
          </div>
          <div className="mt-16 pt-16 border-t border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Proje Ekibi
            </h3>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {project.team?.map((member, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl pr-6 sm:pr-8 min-w-0 flex-shrink-0"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-base sm:text-lg flex-shrink-0">
                    {member.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{member}</p>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Contributor
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [detailId, setDetailId] = useState(null);
  const [toast, setToast] = useState(null);

  const navigateTo = (page, id = null) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    if (id) setDetailId(id);
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onNavigate={navigateTo} currentPage={currentPage} />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage key="home" onNavigate={navigateTo} />
        )}
        {currentPage === 'events' && (
          <EventsPage key="events" onNavigate={navigateTo} />
        )}
        {currentPage === 'projects' && (
          <ProjectsPage key="projects" onNavigate={navigateTo} />
        )}
        {currentPage === 'team' && (
          <TeamPage key="team" onNavigate={navigateTo} />
        )}
        {currentPage === 'membership' && (
          <MembershipPage key="membership" onNavigate={navigateTo} showToast={showToast} />
        )}
        {currentPage === 'sponsorship' && (
          <SponsorshipPage key="sponsorship" onNavigate={navigateTo} showToast={showToast} />
        )}

        {currentPage === 'event-detail' && (
          <EventDetailPage
            key="event-detail"
            eventId={detailId}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'project-detail' && (
          <ProjectDetailPage
            key="project-detail"
            projectId={detailId}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'team-detail' && (
          <TeamMemberDetailPage
            key="team-detail"
            memberId={detailId}
            onNavigate={navigateTo}
          />
        )}
      </AnimatePresence>

      <Footer onNavigate={navigateTo} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
