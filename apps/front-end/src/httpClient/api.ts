import { authAPI } from './authAPI';
import { quranAPI } from './quranAPI';
import { scheduleAPI } from './scheduleAPI';
import { userAPI } from './userAPI';
import { locationAPI } from './locationAPI';
import { unitAPI } from './unitAPI';

export const api = {
  user: userAPI,
  auth: authAPI,
  location: locationAPI,
  quran: quranAPI,
  schedule: scheduleAPI,
  units: unitAPI,
};
