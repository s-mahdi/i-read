import { axiosClient } from './axios';

export const scheduleAPI = {
  finishSchedule: (id: number) =>
    axiosClient.patch(`/schedules/finish-schedule/${id}`),
};
