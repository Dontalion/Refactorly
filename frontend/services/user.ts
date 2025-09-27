import api from './api';
import { UserResponse, UserUpdateData } from './auth';

/**
 * Get current user profile
 * @returns Current user data
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/users/me');
  return response.data;
};

/**
 * Update current user profile
 * @param userData User data to update
 * @returns Updated user data
 */
export const updateUserProfile = async (userData: UserUpdateData): Promise<UserResponse> => {
  const response = await api.put<UserResponse>('/users/me', userData);
  return response.data;
};

/**
 * Get user by username
 * @param username Username to look up
 * @returns User data
 */
export const getUserByUsername = async (username: string): Promise<UserResponse> => {
  const response = await api.get<UserResponse>(`/users/${username}`);
  return response.data;
};

/**
 * Delete current user account
 */
export const deleteUserAccount = async (): Promise<void> => {
  await api.delete('/users/me');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

/**
 * Search users by query string
 * @param query Search query
 * @returns List of matching users
 */
export const searchUsers = async (query: string): Promise<UserResponse[]> => {
  const response = await api.get<UserResponse[]>('/users', {
    params: { query }
  });
  return response.data;
};

/**
 * Change user password
 * @param currentPassword Current password
 * @param newPassword New password
 */
export const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
  await api.post('/users/change-password', {
    current_password: currentPassword,
    new_password: newPassword
  });
};
