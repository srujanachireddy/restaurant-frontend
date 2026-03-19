import { authApi } from "@/lib/axios";
import type {
  ProfileResponse,
  UpdateProfileRequest,
  AddressResponse,
  AddressRequest,
} from "@/types";

export const profileService = {
  // ── Profile ──────────────────────────────────────────────────
  getProfile: async (): Promise<ProfileResponse> =>
    (await authApi.get("/api/profile")).data,

  updateProfile: async (data: UpdateProfileRequest): Promise<ProfileResponse> =>
    (await authApi.put("/api/profile", data)).data,

  // ── Addresses ────────────────────────────────────────────────
  getAddresses: async (): Promise<AddressResponse[]> =>
    (await authApi.get("/api/profile/addresses")).data,

  addAddress: async (data: AddressRequest): Promise<AddressResponse> =>
    (await authApi.post("/api/profile/addresses", data)).data,

  updateAddress: async (
    id: string,
    data: AddressRequest,
  ): Promise<AddressResponse> =>
    (await authApi.put(`/api/profile/addresses/${id}`, data)).data,

  deleteAddress: async (id: string): Promise<void> =>
    (await authApi.delete(`/api/profile/addresses/${id}`)).data,
};
