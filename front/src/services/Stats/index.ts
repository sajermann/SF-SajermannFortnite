import api from '../../config/api/api';
import UserType from '../../types/UserType';

export default async function getStatsUser(
  username: string,
): Promise<UserType | null> {
  try {
    const { data, status } = await api.get(
      `/getStatsByUsername?username=${username}`,
    );
    if (status === 200) {
      return { ...data };
    }
    return null;
  } catch {
    return null;
  }
}
