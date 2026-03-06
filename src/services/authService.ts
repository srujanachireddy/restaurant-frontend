import { authApi } from "@/lib/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  errorCode: string | null;
  data: T;
}

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const res = await authApi.post<ApiResponse<AuthResponse>>(
      "/api/auth/login",
      data,
    );
    return res.data.data; // ← unwrap the nested data
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const res = await authApi.post<ApiResponse<AuthResponse>>(
      "/api/auth/register",
      data,
    );
    return res.data.data; // ← unwrap the nested data
  },
};
