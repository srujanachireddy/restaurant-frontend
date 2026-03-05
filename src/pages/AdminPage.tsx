import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { Skeleton } from "../components/ui/Skeleton";
import { MenuItemForm } from "../components/features/admin/MenuItemForm";
import {
  useAllMenu,
  useUpdateMenuItem,
  useDeleteMenuItem,
} from "../hooks/useMenu";
import { useAllOrders, useUpdateOrderStatus } from "../hooks/useOrders";
import { formatCurrency, formatDate, formatOrderId } from "../utils/format";
import type { OrderStatus } from "../types";

const STATUSES: OrderStatus[] = [
  "Confirmed",
  "Preparing",
  "Delivered",
  "Cancelled",
];

export const AdminPage = () => {
  const [tab, setTab] = useState<"menu" | "orders">("menu");
  const [showForm, setShowForm] = useState(false);
  const { data: menuItems = [], isLoading: menuLoading } = useAllMenu();
  const { data: orders = [], isLoading: ordersLoading } = useAllOrders();
  const { mutate: updateItem } = useUpdateMenuItem();
  const { mutate: deleteItem } = useDeleteMenuItem();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black font-display text-stone-800">
              Admin Dashboard
            </h1>
            <p className="text-stone-400 mt-1">Manage your restaurant</p>
          </div>
          {tab === "menu" && (
            <Button onClick={() => setShowForm(true)}>+ Add Item</Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Items", value: menuItems.length, emoji: "🍽️" },
            {
              label: "Available",
              value: menuItems.filter((i) => i.isAvailable).length,
              emoji: "✅",
            },
            { label: "Total Orders", value: orders.length, emoji: "📋" },
            {
              label: "Pending",
              value: orders.filter((o) => o.status === "Pending").length,
              emoji: "⏳",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 border border-stone-100 shadow-sm"
            >
              <p className="text-2xl mb-1">{stat.emoji}</p>
              <p className="text-2xl font-black text-stone-800">{stat.value}</p>
              <p className="text-sm text-stone-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {(["menu", "orders"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-xl font-semibold capitalize transition-all ${tab === t ? "bg-brand-500 text-white shadow-lg shadow-brand-200" : "bg-white text-stone-600 border border-stone-200 hover:bg-brand-50"}`}
            >
              {t === "menu" ? "🍽️ Menu Items" : "📋 Orders"}
            </button>
          ))}
        </div>

        {tab === "menu" &&
          (menuLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-2xl p-5 border transition-all ${item.isAvailable ? "border-stone-100" : "border-red-100 opacity-70"}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{item.emoji}</span>
                    <Badge
                      label={item.isAvailable ? "Available" : "Disabled"}
                      variant={item.isAvailable ? "success" : "danger"}
                    />
                  </div>
                  <h3 className="font-bold text-stone-800 mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-sm text-stone-400 capitalize mb-2">
                    {item.category}
                  </p>
                  <p className="text-xl font-black text-brand-500 mb-4">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="flex-1"
                      onClick={() =>
                        updateItem({
                          id: item.id,
                          data: { isAvailable: !item.isAvailable },
                        })
                      }
                    >
                      {item.isAvailable ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (window.confirm("Delete?")) deleteItem(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}

        {tab === "orders" &&
          (ordersLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-36" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl border border-stone-100 p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono font-bold text-stone-400 text-sm">
                        {formatOrderId(order.id)}
                      </p>
                      <p className="text-sm text-stone-500">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-sm text-stone-600 mt-1">
                        📍 {order.deliveryAddress}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        label={order.status}
                        variant={
                          order.status === "Delivered"
                            ? "success"
                            : order.status === "Cancelled"
                              ? "danger"
                              : order.status === "Pending"
                                ? "warning"
                                : "info"
                        }
                      />
                      <p className="text-xl font-black text-stone-800">
                        {formatCurrency(order.totalPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateStatus({ id: order.id, status })}
                        disabled={order.status === status}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${order.status === status ? "bg-stone-100 text-stone-400 border-stone-100 cursor-not-allowed" : "bg-white text-stone-600 border-stone-200 hover:bg-brand-50 hover:text-brand-600"}`}
                      >
                        → {status}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add Menu Item"
      >
        <MenuItemForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
};
