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
  badge: string;
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
  badge: string;
}
export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  emoji?: string;
  isVegetarian?: boolean;
  badge?: string;
  isAvailable?: boolean;
}

export type OrderStatus = "Pending"
  | "Confirmed"
  | "Preparing"
  | "Delivered"
  | "Cancelled";
export interface OrderItem {
  menuItemId: string;
  menuItemName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}
export interface Order {
  id: string;
  userId: string;
  deliveryAddress: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}
export interface CreateOrderRequest {
  deliveryAddress: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
}
export interface CartItem extends MenuItem {
  quantity: number;
}
