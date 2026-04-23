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
  getCirculars: () => api.get('/corporate/circulars'),
};

export const webMarketApi = {
  getSettings: () => api.get('/web-market/settings'),
  submitEndUser: (data) => api.post('/web-market/end-user', data),
  submitServiceProvider: (data) => api.post('/web-market/service-provider', data),
};

export const workforceApi = {
  getTeam: () => api.get('/workforce/team'),
  getVacancies: () => api.get('/workforce/vacancies'),
};

export default api;
