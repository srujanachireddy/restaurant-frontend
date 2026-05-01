import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate, formatOrderId } from "@/utils/format";
import { useMyOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types";

const STATUS_VARIANT: Record<
  OrderStatus,
  "warning" | "info" | "default" | "success" | "danger"
> = {
  Pending: "warning",
  Confirmed: "info",
  Preparing: "default",
  Delivered: "success",
  Cancelled: "danger",
};

const STATUS_EMOJI: Record<OrderStatus, string> = {
  Pending: "⏳",
  Confirmed: "✅",
  Preparing: "👨‍🍳",
  Delivered: "🎉",
  Cancelled: "❌",
};

export const OrdersPage = () => {
  const { data: orders = [], isLoading } = useMyOrders();

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl font-700 text-charcoal">
              My Orders
            </h1>
            <p className="text-warm-400 font-body mt-1">
              Track your order history
            </p>
          </div>
          <Link to="/menu">
            <Button variant="secondary" size="sm">
              + New Order
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <Link key={order.id} to={`/orders/${order.id}`}>
                <div
                  className="bg-white rounded-3xl border border-cream-200 p-5 shadow-warm-sm card-hover animate-fade-up"
                  style={{
                    animationDelay: `${i * 0.05}s`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-xs text-warm-400 mb-1">
                        {formatOrderId(order.id)}
                      </p>
                      <p className="text-sm text-warm-500 font-body">
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-sm text-warm-600 font-body mt-1">
                        📍 {order.deliveryAddress}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        label={`${STATUS_EMOJI[order.status]} ${order.status}`}
                        variant={STATUS_VARIANT[order.status]}
                      />
                      <p className="font-display text-2xl font-700 text-charcoal mt-2">
                        {formatCurrency(order.totalPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-cream-100 pt-3">
                    <p className="text-sm text-warm-400 font-body">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                      {" · "}
                      {order.items.map((i) => i.menuItemName).join(", ")}
                    </p>
                    <span className="text-terra-500 text-sm font-body font-700">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 animate-fade-up">
            <div className="w-24 h-24 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📋</span>
            </div>
            <h3 className="font-display text-2xl font-700 text-charcoal mb-2">
              No orders yet
            </h3>
            <p className="text-warm-400 font-body mb-8">
              Place your first order and it'll appear here
            </p>
            <Link to="/menu">
              <Button size="lg">Browse Menu</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
