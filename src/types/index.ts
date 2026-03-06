export interface User {
  id: string;
  name: string;
  email: string;
  role: "Customer" | "Admin";
}
export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: "Customer" | "Admin";
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  isVegetarian: boolean;
  badge: string | null;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  isVegetarian: boolean;
  badge?: string | null;
}
export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  emoji?: string;
  isVegetarian?: boolean;
  badge?: string | null;
  isAvailable?: boolean;
}

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "Delivered"
  | "Cancelled";
// matches OrderItemDto — used when creating order
export interface OrderItemRequest {
  menuItemId: string; // Guid as string
  quantity: number;
}

// matches CreateOrderDto
export interface CreateOrderRequest {
  deliveryAddress: string;
  items: OrderItemRequest[];
}

// matches OrderItemResponseDto
export interface OrderItemResponse {
  menuItemId: string;
  menuItemName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}

// matches OrderResponseDto
export interface Order {
  id: string;
  userId: string;
  deliveryAddress: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItemResponse[];
  createdAt: string;
  updatedAt: string;
}

// matches UpdateOrderStatusDto
export interface UpdateOrderStatusRequest {
  status: OrderStatus;
}
export interface CartItem extends MenuItem {
  quantity: number;
}
