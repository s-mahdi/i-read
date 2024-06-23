import { authAPI } from './authAPI';
import { quranAPI } from './quranAPI';
import { scheduleAPI } from './scheduleAPI';
import { userAPI } from './userAPI';

export const api = {
  user: userAPI,
  auth: authAPI,
  quran: quranAPI,
  schedule: scheduleAPI,
};
