import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { profileService } from "@/services/profileService";
import type { UpdateProfileRequest, AddressRequest } from "@/types";

export const PROFILE_KEYS = {
  profile: ["profile"] as const,
  addresses: ["profile", "addresses"] as const,
};

export const useProfile = () =>
  useQuery({
    queryKey: PROFILE_KEYS.profile,
    queryFn: profileService.getProfile,
    staleTime: 1000 * 60 * 5,
  });

export const useAddresses = () =>
  useQuery({
    queryKey: PROFILE_KEYS.addresses,
    queryFn: profileService.getAddresses,
    staleTime: 1000 * 60 * 5,
  });

export const useUpdateProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) =>
      profileService.updateProfile(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEYS.profile });
      toast.success("Profile updated!");
    },
    onError: () => toast.error("Failed to update profile"),
  });
};

export const useAddAddress = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AddressRequest) => profileService.addAddress(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEYS.addresses });
      toast.success("Address added!");
    },
    onError: () => toast.error("Failed to add address"),
  });
};

export const useUpdateAddress = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddressRequest }) =>
      profileService.updateAddress(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEYS.addresses });
      toast.success("Address updated!");
    },
    onError: () => toast.error("Failed to update address"),
  });
};

export const useDeleteAddress = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => profileService.deleteAddress(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PROFILE_KEYS.addresses });
      toast.success("Address deleted!");
    },
    onError: () => toast.error("Failed to delete address"),
  });
};
