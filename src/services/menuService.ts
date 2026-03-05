import { menuApi } from "../lib/axios";
import type {
  MenuItem,
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "../types";

export const menuService = {
  getAll: async (): Promise<MenuItem[]> =>
    (await menuApi.get("/api/menuitems")).data,
  getAvailable: async (): Promise<MenuItem[]> =>
    (await menuApi.get("/api/menuitems/available")).data,
  create: async (data: CreateMenuItemRequest): Promise<MenuItem> =>
    (await menuApi.post("/api/menuitems", data)).data,
  update: async (id: string, data: UpdateMenuItemRequest): Promise<MenuItem> =>
    (await menuApi.patch(`/api/menuitems/${id}`, data)).data,
  delete: async (id: string): Promise<void> =>
    (await menuApi.delete(`/api/menuitems/${id}`)).data,
};
