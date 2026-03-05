import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { menuService } from "../services/menuService";
import type { CreateMenuItemRequest, UpdateMenuItemRequest } from "../types";

export const MENU_KEYS = {
  all: ["menu"] as const,
  available: ["menu", "available"] as const,
};

export const useAvailableMenu = () =>
  useQuery({
    queryKey: MENU_KEYS.available,
    queryFn: menuService.getAvailable,
    staleTime: 1000 * 60 * 5,
  });

export const useAllMenu = () =>
  useQuery({ queryKey: MENU_KEYS.all, queryFn: menuService.getAll });

export const useCreateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMenuItemRequest) => menuService.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MENU_KEYS.all });
      toast.success("Menu item created!");
    },
    onError: (err: string) => toast.error(err || "Failed to create item"),
  });
};

export const useUpdateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuItemRequest }) =>
      menuService.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MENU_KEYS.all });
      toast.success("Item updated!");
    },
    onError: (err: string) => toast.error(err || "Failed to update"),
  });
};

export const useDeleteMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => menuService.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: MENU_KEYS.all });
      toast.success("Item deleted!");
    },
    onError: (err: string) => toast.error(err || "Failed to delete"),
  });
};
