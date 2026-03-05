import { useState } from "react";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { useCreateMenuItem } from "../../../hooks/useMenu";
import type { CreateMenuItemRequest } from "../../../types";

const INITIAL: CreateMenuItemRequest = {
  name: "",
  description: "",
  price: 0,
  category: "",
  emoji: "🍽️",
  isVegetarian: false,
  badge: "",
};

export const MenuItemForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState(INITIAL);
  const { mutate: create, isPending } = useCreateMenuItem();
  const set = (
    key: keyof CreateMenuItemRequest,
    value: string | number | boolean,
  ) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        create({ ...form, price: Number(form.price) }, { onSuccess: onClose });
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="Margherita Pizza"
        />
        <Input
          label="Emoji"
          required
          value={form.emoji}
          onChange={(e) => set("emoji", e.target.value)}
          placeholder="🍕"
        />
      </div>
      <Input
        label="Description"
        required
        value={form.description}
        onChange={(e) => set("description", e.target.value)}
        placeholder="Describe the dish..."
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          type="number"
          required
          min="0"
          step="0.01"
          value={form.price || ""}
          onChange={(e) => set("price", e.target.value)}
          placeholder="12.99"
        />
        <Input
          label="Category"
          required
          value={form.category}
          onChange={(e) => set("category", e.target.value)}
          placeholder="pizza"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Badge (optional)"
          value={form.badge}
          onChange={(e) => set("badge", e.target.value)}
          placeholder="New, Popular..."
        />
        <div className="flex items-center gap-3 pt-7">
          <input
            type="checkbox"
            id="veg"
            checked={form.isVegetarian}
            onChange={(e) => set("isVegetarian", e.target.checked)}
            className="w-4 h-4 accent-brand-500"
          />
          <label htmlFor="veg" className="text-sm font-semibold text-stone-700">
            Vegetarian
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="secondary"
          className="flex-1"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isPending} className="flex-1">
          Create Item
        </Button>
      </div>
    </form>
  );
};
