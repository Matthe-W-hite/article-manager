import api from "../api/axios";

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data.user;
  } catch {
    return null;
  }
};
