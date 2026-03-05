import { authApi } from "../lib/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "../types";

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> =>
    (await authApi.post<AuthResponse>('/api/auth/login', data)).data,
  register: async (data: RegisterRequest): Promise<AuthResponse> =>
    (await authApi.post<AuthResponse>('/api/auth/register', data)).data,
};