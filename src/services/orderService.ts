import { orderApi } from "@/lib/axios";
import type {
  Order,
  CreateOrderRequest,
  UpdateOrderStatusRequest,
  OrderStatus,
} from "@/types";

export const orderService = {
  // POST /api/Orders
  create: async (data: CreateOrderRequest): Promise<Order> =>
    (await orderApi.post("/api/Orders", data)).data,

  // GET /api/Orders  (Admin only)
  getAll: async (): Promise<Order[]> =>
    (await orderApi.get("/api/Orders")).data,

  // GET /api/Orders/my  (Customer)
  getMyOrders: async (): Promise<Order[]> =>
    (await orderApi.get("/api/Orders/my")).data,

  // GET /api/Orders/{id}
  getById: async (id: string): Promise<Order> =>
    (await orderApi.get(`/api/Orders/${id}`)).data,

  // PATCH /api/Orders/{id}/status  (Admin only)
  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const body: UpdateOrderStatusRequest = { status };
    return (await orderApi.patch(`/api/Orders/${id}/status`, body)).data;
  },

  // PATCH /api/Orders/{id}/cancel  (Customer)
  cancel: async (id: string): Promise<Order> =>
    (await orderApi.patch(`/api/Orders/${id}/cancel`)).data,
};
