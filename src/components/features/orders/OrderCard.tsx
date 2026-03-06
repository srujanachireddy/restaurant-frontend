import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate, formatOrderId } from "@/utils/format";
import { useCancelOrder } from "@/hooks/useOrders";
import type { Order, OrderStatus } from "@/types";

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

export const OrderCard = ({ order }: { order: Order }) => {
  const { mutate: cancel, isPending } = useCancelOrder();

  return (
    <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-stone-50">
        <div>
          <p className="font-mono text-sm font-bold text-stone-400">
            {formatOrderId(order.id)}
          </p>
          <p className="text-sm text-stone-500 mt-0.5">
            {formatDate(order.createdAt)}
          </p>
          <p className="text-sm text-stone-600 mt-1">
            📍 {order.deliveryAddress}
          </p>
        </div>
        <div className="text-right">
          <Badge
            label={`${STATUS_EMOJI[order.status]} ${order.status}`}
            variant={STATUS_VARIANT[order.status]}
          />
          <p className="text-2xl font-black text-stone-800 mt-2">
            {formatCurrency(order.totalPrice)}
          </p>
        </div>
      </div>

      {/* Order Items — uses OrderItemResponseDto fields */}
      <div className="p-5 space-y-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-stone-600">
              {item.menuItemName}{" "}
              <span className="text-stone-400">×{item.quantity}</span>
            </span>
            <div className="text-right">
              <span className="font-medium text-stone-800">
                {formatCurrency(item.subtotal)}
              </span>
              <span className="text-stone-400 text-xs ml-2">
                @ {formatCurrency(item.unitPrice)} each
              </span>
            </div>
          </div>
        ))}

        {/* Cancel button — only for Pending orders */}
        {order.status === "Pending" && (
          <div className="pt-3 border-t border-stone-50">
            <Button
              variant="danger"
              size="sm"
              loading={isPending}
              onClick={() => cancel(order.id)}
            >
              Cancel Order
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
