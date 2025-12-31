// import type { LoginFormData, LoginResponse } from '../auth/auth.types'

// export const loginApi = async (formData: LoginFormData): Promise<LoginResponse> => {
//   // This should be the actual login endpoint, not profile
//   const response = await fetch('http://localhost:8080/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(formData),
//   })

//   if (!response.ok) {
//     const error = await response.json()
//     throw new Error(error.message || 'Login failed')
//   }

//   return response.json()
// }

// export const getProfile = async (token: string) => {
//   const response = await fetch('http://localhost:8080/api/profile', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   })

//   if (!response.ok) {
//     const error = await response.json()
//     throw new Error(error.message || 'Failed to fetch profile')
//   }

//   return response.json()
// }

import { http } from './http';
import type {
  LoginFormData,
  LoginResponse,
  ProfileResponse,
} from '../auth/auth.types';

export const loginApi = (data: LoginFormData) => {
  return http<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getProfile = () => {
  return http<ProfileResponse>('/profile');
};
