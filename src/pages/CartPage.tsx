import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { CartItemRow } from '../components/features/cart/CartItem';
import { Button } from '../components/ui/Button';
import { usePlaceOrder } from '../hooks/useOrders';
import { formatCurrency } from '../utils/formatCurrency';

export const CartPage = () => {
  const { items, totalPrice, totalItems } = useCartStore();
  const [address, setAddress] = useState('');
  const { mutate: placeOrder, isPending } = usePlaceOrder();

  if (items.length === 0) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-up">
        <p className="text-8xl mb-6">🛒</p>
        <h2 className="text-2xl font-bold font-display text-stone-800 mb-2">Your cart is empty</h2>
        <p className="text-stone-400 mb-8">Add some delicious items from the menu</p>
        <Link to="/menu"><Button size="lg">Browse Menu</Button></Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black font-display text-stone-800 mb-8">
          Your Cart <span className="text-stone-400 text-xl font-normal">({totalItems()} items)</span>
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => <CartItemRow key={item.id} item={item} />)}
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 p-6 h-fit shadow-sm">
            <h2 className="text-lg font-bold text-stone-800 mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm text-stone-600">
                  <span>{i.name} ×{i.quantity}</span>
                  <span className="font-medium">{formatCurrency(i.price * i.quantity)}</span>
                </div>
              ))}
              <div className="border-t border-stone-100 pt-3 flex justify-between">
                <span className="font-bold text-stone-800">Total</span>
                <span className="text-2xl font-black text-stone-800">{formatCurrency(totalPrice())}</span>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-stone-700 mb-2">Delivery Address *</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3}
                placeholder="Enter your full delivery address..."
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm resize-none" />
            </div>
            <Button size="lg" className="w-full" loading={isPending} disabled={!address.trim()}
              onClick={() => placeOrder({ deliveryAddress: address, items: items.map((i) => ({ menuItemId: i.id, quantity: i.quantity })) })}>
              Place Order · {formatCurrency(totalPrice())}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};