import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { usePlaceOrder } from "@/hooks/useOrders";
import { useAddresses } from "@/hooks/useProfile";
import { useAuthStore } from "@/store/authStore";
import { formatCurrency } from "@/utils/format";
import type { CartItem } from "@/types";

const MENU_API = import.meta.env.VITE_MENU_API_URL;

const resolveImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${MENU_API}${imageUrl}`;
};

const CartItemRow = ({ item }: { item: CartItem }) => {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center gap-4 bg-[var(--color-bg-card)] rounded-2xl p-4 border border-[var(--color-border)] shadow-warm-sm hover:shadow-warm-md transition-shadow">
      <div className="w-14 h-14 bg-[var(--color-surface)] rounded-xl overflow-hidden flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={resolveImageUrl(item.imageUrl)}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement
                ?.querySelector(".fallback")
                ?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div
          className={`fallback w-full h-full flex items-center justify-center ${
            item.imageUrl ? "hidden" : ""
          }`}
        >
          <span className="text-2xl">🍽️</span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-display font-700 text-[var(--color-text)] text-lg leading-tight truncate">
          {item.name}
        </h4>
        <p className="text-[var(--color-primary)] font-body font-700 text-sm">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text)] font-body font-700 flex items-center justify-center transition-colors"
        >
          −
        </button>
        <span className="w-8 text-center font-body font-700 text-[var(--color-text)]">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-xl bg-[var(--color-surface)] hover:bg-[var(--color-border)] text-[var(--color-text)] font-body font-700 flex items-center justify-center transition-colors"
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-display font-700 text-[var(--color-text)]">
          {formatCurrency(item.price * item.quantity)}
        </p>
        <button
          onClick={() => removeItem(item.id)}
          className="text-xs text-[var(--color-primary)] hover:opacity-70 font-body transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export const CartPage = () => {
  const { items, totalPrice, totalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [address, setAddress] = useState("");
  const [selectedAddressId, setSelected] = useState<string | null>(null);
  const [useCustomAddress, setCustom] = useState(false);
  const { mutate: placeOrder, isPending } = usePlaceOrder();
  const { data: savedAddresses = [] } = useAddresses();

  // resolve final address for checkout
  const finalAddress = useCustomAddress
    ? address
    : (savedAddresses.find((a) => a.id === selectedAddressId)?.fullAddress ??
      address);

  const handleCheckout = () => {
    if (!finalAddress.trim()) return;
    placeOrder({
      deliveryAddress: finalAddress,
      items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })),
    });
  };

  if (items.length === 0)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="text-center animate-fade-up">
          <div className="w-28 h-28 bg-[var(--color-surface)] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🛒</span>
          </div>
          <h2
            className="font-display text-3xl font-700 mb-2"
            style={{ color: "var(--color-text)" }}
          >
            Your cart is empty
          </h2>
          <p
            className="font-body mb-8"
            style={{ color: "var(--color-text-muted)" }}
          >
            Add some delicious items from our menu
          </p>
          <Link to="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );

  return (
    <div
      className="min-h-screen py-8"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1
          className="font-display text-4xl font-700 mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Your Cart
        </h1>
        <p
          className="font-body mb-8"
          style={{ color: "var(--color-text-muted)" }}
        >
          {totalItems()} items selected
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3 animate-fade-up">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="animate-fade-up-d1">
            <div
              className="rounded-3xl border p-6 shadow-warm-md sticky top-24"
              style={{
                background: "var(--color-bg-card)",
                borderColor: "var(--color-border)",
              }}
            >
              <h2
                className="font-display text-2xl font-700 mb-5"
                style={{ color: "var(--color-text)" }}
              >
                Order Summary
              </h2>

              {/* Item list */}
              <div className="space-y-3 mb-5">
                {items.map((i) => (
                  <div
                    key={i.id}
                    className="flex justify-between text-sm font-body"
                  >
                    <span style={{ color: "var(--color-text-muted)" }}>
                      {i.name}{" "}
                      <span style={{ color: "var(--color-text-muted)" }}>
                        ×{i.quantity}
                      </span>
                    </span>
                    <span
                      className="font-700"
                      style={{ color: "var(--color-text)" }}
                    >
                      {formatCurrency(i.price * i.quantity)}
                    </span>
                  </div>
                ))}
                <div
                  className="border-t pt-3 flex justify-between items-center"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span
                    className="font-display font-700 text-lg"
                    style={{ color: "var(--color-text)" }}
                  >
                    Total
                  </span>
                  <span
                    className="font-display text-3xl font-700"
                    style={{ color: "var(--color-text)" }}
                  >
                    {formatCurrency(totalPrice())}
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="mb-5">
                <label
                  className="block text-sm font-body font-700 mb-3"
                  style={{ color: "var(--color-text)" }}
                >
                  Delivery Address *
                </label>

                {/* Saved addresses */}
                {isAuthenticated &&
                  savedAddresses.length > 0 &&
                  !useCustomAddress && (
                    <div className="space-y-2 mb-3">
                      {savedAddresses.map((addr) => (
                        <button
                          key={addr.id}
                          onClick={() => setSelected(addr.id)}
                          className={`w-full text-left p-3 rounded-xl border-2 transition-all ${
                            selectedAddressId === addr.id ||
                            (!selectedAddressId && addr.isDefault)
                              ? "border-[var(--color-primary)] bg-[var(--color-surface)]"
                              : "border-[var(--color-border)] bg-[var(--color-bg-card)]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className="text-xs font-700 px-2 py-0.5 rounded-full"
                              style={{
                                background: "var(--color-surface)",
                                color: "var(--color-primary)",
                              }}
                            >
                              {addr.label}
                            </span>
                            {addr.isDefault && (
                              <span className="text-xs text-green-600 font-700">
                                Default
                              </span>
                            )}
                          </div>
                          <p
                            className="text-sm"
                            style={{ color: "var(--color-text)" }}
                          >
                            {addr.fullAddress}
                          </p>
                        </button>
                      ))}

                      {/* Use different address */}
                      <button
                        onClick={() => {
                          setCustom(true);
                          setSelected(null);
                        }}
                        className="w-full text-left p-3 rounded-xl border-2 border-dashed transition-all text-sm font-body font-600"
                        style={{
                          borderColor: "var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        + Use a different address
                      </button>
                    </div>
                  )}

                {/* Custom address input */}
                {(useCustomAddress ||
                  savedAddresses.length === 0 ||
                  !isAuthenticated) && (
                  <div className="space-y-2">
                    {useCustomAddress && (
                      <button
                        onClick={() => setCustom(false)}
                        className="text-xs font-body font-600 mb-2"
                        style={{ color: "var(--color-primary)" }}
                      >
                        ← Use saved address
                      </button>
                    )}
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      placeholder="Enter your full delivery address..."
                      className="w-full px-4 py-3 rounded-xl border text-sm font-body resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                      style={{
                        background: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)",
                      }}
                    />
                    {isAuthenticated && savedAddresses.length === 0 && (
                      <p
                        className="text-xs font-body"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        💡 Save addresses in{" "}
                        <Link
                          to="/profile"
                          className="underline"
                          style={{ color: "var(--color-primary)" }}
                        >
                          My Profile
                        </Link>{" "}
                        for faster checkout
                      </p>
                    )}
                  </div>
                )}
              </div>

              <Button
                size="lg"
                className="w-full"
                loading={isPending}
                disabled={
                  !finalAddress.trim() &&
                  !savedAddresses.find(
                    (a) =>
                      a.id === selectedAddressId ||
                      (!selectedAddressId && a.isDefault),
                  )
                }
                onClick={handleCheckout}
              >
                Place Order · {formatCurrency(totalPrice())}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
