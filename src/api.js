import axios from 'axios';

const API_BASE_URL = 'https://hc-parekh-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contentApi = {
  getServices: () => api.get('/content/services'),
  getAbout: () => api.get('/content/about'),
  getContact: () => api.get('/content/contact'),
};

export const corporateApi = {
  getTenders: () => api.get('/corporate/tenders'),
  getMOUs: () => api.get('/corporate/mous'),
  getNotices: () => api.get('/corporate/notices'),
};

export const workforceApi = {
  getTeam: () => api.get('/workforce/team'),
  getVacancies: () => api.get('/workforce/vacancies'),
};

export default api;
