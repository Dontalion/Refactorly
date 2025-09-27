// src/services/auth.ts
import api from './api';

/**
 * Service for authentication operations
 */
export interface UserRegisterData {
  username: string;
  email: string;
  password: string;
  full_name: string;
}

export interface UserLoginData {
  email_or_username: string;
  password: string;
}

export interface UserUpdateData {
  username?: string;
  full_name?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: UserResponse;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  full_name: string;
  created_at: string;
  updated_at: string;
}

/**
 * Register a new user
 * @param userData User registration data
 * @returns Authentication response with tokens and user info
 */
export const register = async (userData: UserRegisterData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', userData);
  
  // Save tokens to localStorage
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  
  return response.data;
};

/**
 * Login with email or username and password
 * @param loginData Login credentials
 * @returns Authentication response with tokens and user info
 */
export const login = async (loginData: UserLoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', loginData);
  
  // Save tokens to localStorage
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  
  return response.data;
};

/**
 * Logout the current user
 */
export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

/**
 * Get current user information
 * @returns User data for the current authenticated user
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await api.get<UserResponse>('/users/me');
  return response.data;
};

/**
 * Refresh the access token using the refresh token
 * @returns New authentication response
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) {
    throw new Error('No refresh token available');
  }
  
  const response = await api.post<AuthResponse>('/auth/refresh-token', { refresh_token });
  localStorage.setItem('access_token', response.data.access_token);
  
  return response.data;
};
