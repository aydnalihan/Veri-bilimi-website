import React, { createContext, useContext, useState, useEffect } from 'react';
import { eventsAPI, projectsAPI, teamAPI, statsAPI } from '../services/api';

// Varsayılan veriler (API çalışmazsa kullanılır)
const DEFAULT_STATS = [
  { id: 1, emoji: '🚀', value: '450+', label: 'Aktif Üye' },
  { id: 2, emoji: '🍕', value: '50+', label: 'Pizza & Code' },
  { id: 3, emoji: '🎓', value: '12', label: 'Bootcamp' },
  { id: 4, emoji: '💡', value: '30+', label: 'Proje' },
];

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: 'Python ile Veri Analizi Bootcamp',
    date: '15 Mayıs 2025',
    location: 'Online',
    tag: 'BOOTCAMP',
    color: 'text-indigo-600',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
    desc: 'Pandas, NumPy ve Matplotlib ile veri analizinin temellerini öğrenin.',
    longDesc: 'Bu kapsamlı bootcamp programında Python ile veri analizi dünyasına adım atacaksınız. Pandas ile veri manipülasyonu, NumPy ile sayısal hesaplamalar ve Matplotlib ile görselleştirme konularını uygulamalı olarak öğreneceksiniz.',
    instagramLink: 'https://instagram.com'
  },
  {
    id: 2,
    title: 'Makine Öğrenmesi Workshop',
    date: '22 Mayıs 2025',
    location: 'Mühendislik Fakültesi',
    tag: 'WORKSHOP',
    color: 'text-pink-600',
    category: 'education',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
    desc: 'Scikit-learn ile makine öğrenmesi modellerini keşfedin.',
    longDesc: 'Bu workshop\'ta makine öğrenmesinin temellerini öğrenecek, Scikit-learn kütüphanesi ile regresyon ve sınıflandırma modellerini uygulayacaksınız.',
    instagramLink: 'https://instagram.com'
  },
  {
    id: 3,
    title: 'Pizza & Code Night',
    date: '29 Mayıs 2025',
    location: 'Kampüs Kafeterya',
    tag: 'SOSYAL',
    color: 'text-orange-600',
    category: 'social',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
    desc: 'Pizza eşliğinde kod yazma ve networking etkinliği.',
    longDesc: 'Her ay düzenlediğimiz Pizza & Code Night etkinliğimizde hem karın doyuruyor, hem de birlikte projeler üzerinde çalışıyoruz. Yeni arkadaşlıklar kurmak için harika bir fırsat!',
    instagramLink: 'https://instagram.com'
  },
  {
    id: 4,
    title: 'Data Science Hackathon',
    date: '5 Haziran 2025',
    location: 'Teknokent',
    tag: 'HACKATHON',
    color: 'text-emerald-600',
    category: 'competition',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
    desc: '24 saatlik yoğun hackathon deneyimi ve ödüller!',
    longDesc: 'Akdeniz Üniversitesi\'nin en büyük data science hackathonu! 24 saat boyunca gerçek dünya problemlerine çözümler üretecek, jüri değerlendirmesi sonucunda ödüller kazanacaksınız.',
    instagramLink: 'https://instagram.com'
  },
  {
    id: 5,
    title: 'Sektör Buluşması: Tech Talks',
    date: '12 Haziran 2025',
    location: 'Konferans Salonu',
    tag: 'PANEL',
    color: 'text-purple-600',
    category: 'panel',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    desc: 'Sektörün önde gelen isimleriyle kariyer sohbeti.',
    longDesc: 'Sektörde deneyimli profesyonellerle bir araya geleceğimiz bu etkinlikte kariyer yolculukları, sektör trendleri ve öğrencilere tavsiyeleri dinleyeceksiniz.',
    instagramLink: 'https://instagram.com'
  },
];

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: 'Kampüs Trafik Analizi',
    emoji: '🚗',
    category: 'Veri Analizi',
    desc: 'Kampüs içi trafik verilerini analiz ederek en yoğun saatleri ve güzergahları belirledik.',
    longDesc: 'Bu projede kampüs içindeki araç hareketlerini IoT sensörleri ile takip ettik. Toplanan verileri Python ile analiz ederek, öğrencilerin kampüs içi ulaşımını kolaylaştıracak önerilerde bulunduk.',
    tags: ['Python', 'Pandas', 'IoT', 'Visualization'],
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
    github: 'https://github.com',
    team: ['Ahmet Y.', 'Zeynep K.', 'Mehmet A.']
  },
  {
    id: 2,
    title: 'Duygu Analizi Chatbot',
    emoji: '🤖',
    category: 'AI / ML',
    desc: 'Türkçe metin üzerinde duygu analizi yapabilen yapay zeka destekli chatbot.',
    longDesc: 'NLP teknikleri kullanarak geliştirdiğimiz bu chatbot, kullanıcıların yazdığı metinlerin duygusal tonunu analiz edebiliyor. Transformers ve BERT modelleri ile eğitildi.',
    tags: ['NLP', 'Transformers', 'BERT', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800',
    github: 'https://github.com',
    team: ['Ali B.', 'Fatma S.']
  },
  {
    id: 3,
    title: 'Hava Kalitesi Dashboard',
    emoji: '🌍',
    category: 'Görselleştirme',
    desc: 'Antalya\'nın hava kalitesi verilerini görselleştiren interaktif dashboard.',
    longDesc: 'Açık veri kaynaklarından çektiğimiz hava kalitesi verilerini D3.js ve React kullanarak görselleştirdik. Kullanıcılar tarih aralığı seçerek detaylı analizlere ulaşabiliyor.',
    tags: ['D3.js', 'React', 'API', 'Real-time'],
    image: 'https://images.unsplash.com/photo-1534996858221-380b92700493?w=800',
    github: 'https://github.com',
    team: ['Elif D.', 'Can M.', 'Burak T.']
  },
  {
    id: 4,
    title: 'Öğrenci Başarı Tahmini',
    emoji: '📊',
    category: 'AI / ML',
    desc: 'Öğrenci verilerine dayalı akademik başarı tahmin modeli.',
    longDesc: 'Anonim öğrenci verileri üzerinde makine öğrenmesi modelleri geliştirerek, erken uyarı sistemi oluşturduk. Öğrencilerin risk altında olup olmadığını önceden tespit edebiliyoruz.',
    tags: ['Scikit-learn', 'XGBoost', 'Streamlit'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    github: 'https://github.com',
    team: ['Yusuf K.', 'Ayşe L.']
  },
];

const DEFAULT_TEAM = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Başkan',
    department: 'Bilgisayar Mühendisliği',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Veri bilimi ve yapay zeka konularında tutkulu, topluluk liderliği deneyimine sahip bir bilgisayar mühendisliği öğrencisi.',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'ahmet@datasci.club'
  },
  {
    id: 2,
    name: 'Zeynep Kaya',
    role: 'Başkan Yardımcısı',
    department: 'İstatistik',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'İstatistik ve veri görselleştirme uzmanı, etkinlik organizasyonu deneyimli.',
    skills: ['R', 'Statistics', 'Tableau'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'zeynep@datasci.club'
  },
  {
    id: 3,
    name: 'Mehmet Demir',
    role: 'Teknik Koordinatör',
    department: 'Yazılım Mühendisliği',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Full-stack geliştirici, açık kaynak projelere katkıda bulunan aktif bir topluluk üyesi.',
    skills: ['React', 'Node.js', 'PostgreSQL'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'mehmet@datasci.club'
  },
  {
    id: 4,
    name: 'Elif Şahin',
    role: 'Sosyal Medya Sorumlusu',
    department: 'Endüstri Mühendisliği',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'İçerik üretimi ve topluluk yönetimi konusunda deneyimli, yaratıcı bir iletişimci.',
    skills: ['Content Creation', 'Social Media', 'Design'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'elif@datasci.club'
  },
  {
    id: 5,
    name: 'Can Özkan',
    role: 'Eğitim Koordinatörü',
    department: 'Matematik',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Matematik ve veri bilimi eğitimi konusunda deneyimli, workshop tasarımcısı.',
    skills: ['Teaching', 'Curriculum Design', 'Python'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'can@datasci.club'
  },
  {
    id: 6,
    name: 'Ayşe Yıldırım',
    role: 'Etkinlik Koordinatörü',
    department: 'İşletme',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    bio: 'Etkinlik planlama ve sponsorluk ilişkileri konusunda uzman.',
    skills: ['Event Planning', 'Partnership', 'Marketing'],
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    email: 'ayse@datasci.club'
  },
];

const DataContext = createContext(null);

export function DataProvider({ children }) {
  // State - varsayılan verilerle başlat
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [stats, setStats] = useState(DEFAULT_STATS);
  
  // Loading states - başlangıçta false (varsayılan veriler var)
  const [loading, setLoading] = useState({
    events: false,
    projects: false,
    team: false,
    stats: false,
  });
  
  // Error states
  const [errors, setErrors] = useState({
    events: null,
    projects: null,
    team: null,
    stats: null,
  });

  // API bağlantı durumu
  const [apiConnected, setApiConnected] = useState(false);

  // Fetch Events
  const fetchEvents = async () => {
    try {
      setLoading(prev => ({ ...prev, events: true }));
      console.log('Fetching events from API...');
      const data = await eventsAPI.getAll();
      console.log('Events API response:', data);
      if (data && data.length > 0) {
        console.log('Setting events:', data.length, 'items');
        setEvents(data);
        setApiConnected(true);
      } else {
        console.log('No events data or empty array');
      }
      setErrors(prev => ({ ...prev, events: null }));
    } catch (error) {
      console.error('Events API error:', error);
      // Varsayılan verileri koru
    } finally {
      setLoading(prev => ({ ...prev, events: false }));
    }
  };

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      setLoading(prev => ({ ...prev, projects: true }));
      const data = await projectsAPI.getAll();
      if (data && data.length > 0) {
        setProjects(data);
        setApiConnected(true);
      }
      setErrors(prev => ({ ...prev, projects: null }));
    } catch (error) {
      console.log('Projects API unavailable, using default data');
      // Varsayılan verileri koru
    } finally {
      setLoading(prev => ({ ...prev, projects: false }));
    }
  };

  // Fetch Team
  const fetchTeam = async () => {
    try {
      setLoading(prev => ({ ...prev, team: true }));
      const data = await teamAPI.getAll();
      if (data && data.length > 0) {
        setTeam(data);
        setApiConnected(true);
      }
      setErrors(prev => ({ ...prev, team: null }));
    } catch (error) {
      console.log('Team API unavailable, using default data');
      // Varsayılan verileri koru
    } finally {
      setLoading(prev => ({ ...prev, team: false }));
    }
  };

  // Fetch Stats
  const fetchStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const data = await statsAPI.getAll();
      if (data && data.length > 0) {
        setStats(data);
        setApiConnected(true);
      }
      setErrors(prev => ({ ...prev, stats: null }));
    } catch (error) {
      console.log('Stats API unavailable, using default data');
      // Varsayılan verileri koru
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEvents();
    fetchProjects();
    fetchTeam();
    fetchStats();
  }, []);

  // Refresh functions
  const refresh = {
    events: fetchEvents,
    projects: fetchProjects,
    team: fetchTeam,
    stats: fetchStats,
    all: () => {
      fetchEvents();
      fetchProjects();
      fetchTeam();
      fetchStats();
    },
  };

  // Get single item by ID
  const getEventById = (id) => events.find(e => e.id === id || e.id === Number(id));
  const getProjectById = (id) => projects.find(p => p.id === id || p.id === Number(id));
  const getTeamMemberById = (id) => team.find(m => m.id === id || m.id === Number(id));

  const value = {
    // Data
    events,
    projects,
    team,
    stats,
    
    // Loading states
    loading,
    isLoading: loading.events || loading.projects || loading.team || loading.stats,
    
    // API connection status
    apiConnected,
    
    // Errors
    errors,
    
    // Getters
    getEventById,
    getProjectById,
    getTeamMemberById,
    
    // Refresh functions
    refresh,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

// Custom hook
export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export default DataContext;
