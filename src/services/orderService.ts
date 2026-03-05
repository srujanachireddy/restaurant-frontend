import { orderApi } from '../lib/axios';
import type { Order, CreateOrderRequest, OrderStatus } from '../types';

export const orderService = {
  create: async (data: CreateOrderRequest): Promise<Order> => (await orderApi.post('/api/orders', data)).data,
  getMyOrders: async (): Promise<Order[]> => (await orderApi.get('/api/orders/my')).data,
  getAll: async (): Promise<Order[]> => (await orderApi.get('/api/orders')).data,
  updateStatus: async (id: string, status: OrderStatus): Promise<Order> =>
    (await orderApi.patch(`/api/orders/${id}/status`, { status })).data,
  cancel: async (id: string): Promise<Order> => (await orderApi.patch(`/api/orders/${id}/cancel`)).data,
};