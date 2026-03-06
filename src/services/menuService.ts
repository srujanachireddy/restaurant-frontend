import { menuApi } from "@/lib/axios";
import type {
  MenuItem,
  CreateMenuItemRequest,
  UpdateMenuItemRequest,
} from "@/types";

export const menuService = {
  // GET /api/MenuItems
  getAll: async (): Promise<MenuItem[]> =>
    (await menuApi.get("/api/MenuItems")).data,

  // GET /api/MenuItems/available
  getAvailable: async (): Promise<MenuItem[]> =>
    (await menuApi.get("/api/MenuItems/available")).data,

  // GET /api/MenuItems/category/{category}
  getByCategory: async (category: string): Promise<MenuItem[]> =>
    (await menuApi.get(`/api/MenuItems/category/${category}`)).data,

  // GET /api/MenuItems/{id}
  getById: async (id: string): Promise<MenuItem> =>
    (await menuApi.get(`/api/MenuItems/${id}`)).data,

  // POST /api/MenuItems
  create: async (data: CreateMenuItemRequest): Promise<MenuItem> =>
    (await menuApi.post("/api/MenuItems", data)).data,

  // PUT /api/MenuItems/{id}
  update: async (id: string, data: UpdateMenuItemRequest): Promise<MenuItem> =>
    (await menuApi.put(`/api/MenuItems/${id}`, data)).data,

  // PATCH /api/MenuItems/{id}/disable
  disable: async (id: string): Promise<void> =>
    (await menuApi.patch(`/api/MenuItems/${id}/disable`)).data,

  // DELETE /api/MenuItems/{id}
  delete: async (id: string): Promise<void> =>
    (await menuApi.delete(`/api/MenuItems/${id}`)).data,
};
