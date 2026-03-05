import { useAuthStore } from "../../../store/authStore";
import { useCartStore } from "../../../store/cartStore";
import { Button } from "../../ui/Button";
import { Badge } from "../../ui/Badge";
import { formatCurrency } from "../../../utils/format";
import toast from "react-hot-toast";
import type { MenuItem } from "../../../types";

export const MenuCard = ({ item }: { item: MenuItem }) => {
  const { isAuthenticated } = useAuthStore();
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items");
      return;
    }
    addItem(item);
    toast.success(`${item.emoji} Added to cart!`, { duration: 1500 });
  };

  return (
    <article className="bg-white rounded-2xl border border-stone-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <div className="relative bg-gradient-to-br from-amber-50 to-brand-50 h-44 flex items-center justify-center overflow-hidden">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
          {item.emoji}
        </span>
        {item.isVegetarian && (
          <div
            className="absolute top-3 left-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            title="Vegetarian"
          >
            <span className="text-white text-xs font-bold">V</span>
          </div>
        )}
        {item.badge && item.badge !== "none" && item.badge !== "" && (
          <div className="absolute top-3 right-3">
            <Badge label={item.badge} variant="warning" />
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold text-brand-500 capitalize tracking-wide mb-1">
          {item.category}
        </span>
        <h3 className="font-display font-bold text-stone-800 text-lg mb-1.5 leading-tight">
          {item.name}
        </h3>
        <p className="text-stone-400 text-sm leading-relaxed flex-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-50">
          <span className="text-2xl font-black text-stone-800">
            {formatCurrency(item.price)}
          </span>
          <Button size="sm" onClick={handleAdd}>
            + Add
          </Button>
        </div>
      </div>
    </article>
  );
};
