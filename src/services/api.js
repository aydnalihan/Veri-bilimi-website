// API Base URL - Admin Panel Backend'e bağlan
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Genel fetch wrapper
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Bir hata oluştu' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

// ==================== DÖNÜŞTÜRME FONKSİYONLARI ====================

// Event verisini dönüştür (API -> Frontend)
function transformEvent(apiEvent) {
  return {
    id: apiEvent.id,
    title: apiEvent.title,
    date: apiEvent.date,
    location: apiEvent.location,
    tag: apiEvent.tag,
    color: apiEvent.color || 'text-indigo-600',
    category: apiEvent.category,
    image: apiEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    desc: apiEvent.description,
    longDesc: apiEvent.long_description,
    instagramLink: apiEvent.instagram_link || 'https://instagram.com',
  };
}

// Project verisini dönüştür (API -> Frontend)
function transformProject(apiProject) {
  return {
    id: apiProject.id,
    title: apiProject.title,
    emoji: apiProject.emoji || '📊',
    category: apiProject.category,
    desc: apiProject.description,
    longDesc: apiProject.long_description,
    tags: Array.isArray(apiProject.tags) ? apiProject.tags : JSON.parse(apiProject.tags || '[]'),
    team: Array.isArray(apiProject.team) ? apiProject.team : JSON.parse(apiProject.team || '[]'),
    github: apiProject.github || 'https://github.com',
    image: apiProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
  };
}

// Team member verisini dönüştür (API -> Frontend)
function transformTeamMember(apiMember) {
  return {
    id: apiMember.id,
    name: apiMember.name,
    role: apiMember.role,
    department: apiMember.department,
    bio: apiMember.bio,
    skills: Array.isArray(apiMember.skills) ? apiMember.skills : JSON.parse(apiMember.skills || '[]'),
    image: apiMember.image || `https://i.pravatar.cc/400?img=${apiMember.id}`,
    linkedin: apiMember.linkedin || 'https://linkedin.com',
    github: apiMember.github || 'https://github.com',
    email: apiMember.email,
  };
}

// Stat verisini dönüştür (API -> Frontend)
function transformStat(apiStat) {
  return {
    id: apiStat.id,
    emoji: apiStat.emoji || '📊',
    value: apiStat.value,
    label: apiStat.label,
  };
}

// ==================== EVENTS ====================
export const eventsAPI = {
  getAll: async () => {
    const response = await fetchAPI('/events');
    // API { events: [...], total: X } formatında dönüyor
    const events = response.events || response || [];
    return events.map(transformEvent);
  },
  getById: async (id) => {
    const response = await fetchAPI(`/events/${id}`);
    // Tek event dönebilir veya { event: {...} } formatında
    const event = response.event || response;
    return transformEvent(event);
  },
};

// ==================== PROJECTS ====================
export const projectsAPI = {
  getAll: async () => {
    const response = await fetchAPI('/projects');
    // API { projects: [...], total: X } formatında dönüyor
    const projects = response.projects || response || [];
    return projects.map(transformProject);
  },
  getById: async (id) => {
    const response = await fetchAPI(`/projects/${id}`);
    const project = response.project || response;
    return transformProject(project);
  },
};

// ==================== TEAM ====================
export const teamAPI = {
  getAll: async () => {
    const response = await fetchAPI('/team');
    // API { members: [...], total: X } formatında dönüyor
    const members = response.members || response || [];
    return members.map(transformTeamMember);
  },
  getById: async (id) => {
    const response = await fetchAPI(`/team/${id}`);
    const member = response.member || response;
    return transformTeamMember(member);
  },
};

// ==================== STATS ====================
export const statsAPI = {
  getAll: async () => {
    const response = await fetchAPI('/stats');
    // API { stats: [...] } formatında dönüyor
    const stats = response.stats || response || [];
    return stats.map(transformStat);
  },
};

// ==================== APPLICATIONS ====================
export const applicationsAPI = {
  // Üyelik başvurusu gönder
  submitMembership: (data) => fetchAPI('/applications/membership', {
    method: 'POST',
    body: JSON.stringify({
      full_name: data.fullName,
      email: data.email,
      university: data.university,
      department: data.department,
      grade: data.grade,
      wants_active_role: data.wantsActiveRole,
      preferred_team: data.preferredTeam,
      expectations: data.expectations,
    }),
  }),
  
  // Sponsorluk başvurusu gönder
  submitSponsorship: (data) => fetchAPI('/applications/sponsorship', {
    method: 'POST',
    body: JSON.stringify({
      company_name: data.companyName,
      contact_person: data.contactPerson,
      email: data.email,
      phone: data.phone,
      sponsorship_type: data.sponsorshipType,
      message: data.message,
    }),
  }),
};

// ==================== SITE SETTINGS ====================
export const settingsAPI = {
  get: () => fetchAPI('/settings'),
};

export default {
  events: eventsAPI,
  projects: projectsAPI,
  team: teamAPI,
  stats: statsAPI,
  applications: applicationsAPI,
  settings: settingsAPI,
};
