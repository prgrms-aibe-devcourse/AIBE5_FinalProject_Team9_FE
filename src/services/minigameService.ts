import axiosInstance from '@/lib/axios';
import { repairMojibake } from '@/lib/text';
import { getMyPageAchievements } from '@/services/mypageService';

type ApiResponse<T> = T | { data?: T };

interface MinigameAchievementInfo {
  id: number;
  name: string;
  description: string;
}

export interface MinigameClearResponse {
  newAcquired: boolean;
  achievement: MinigameAchievementInfo;
}

const unwrap = <T>(response: ApiResponse<T>): T => {
  if (response && typeof response === 'object' && 'data' in response && response.data) {
    return response.data;
  }

  return response as T;
};

export const clearMinigame = async (): Promise<MinigameClearResponse> => {
  const { data } = await axiosInstance.post<ApiResponse<MinigameClearResponse>>(
    '/api/minigames/clear',
  );
  const response = unwrap(data);

  return {
    ...response,
    achievement: {
      ...response.achievement,
      name: repairMojibake(response.achievement?.name),
      description: repairMojibake(response.achievement?.description),
    },
  };
};

export const isMinigameAchievementAcquired = async () => {
  const achievements = await getMyPageAchievements();
  return achievements.some(
    (achievement) =>
      achievement.conditionType === 'MINIGAME_CLEAR' &&
      achievement.acquired === true,
  );
};
