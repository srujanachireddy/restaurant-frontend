import { cn } from "../../../utils/cn";

interface Props {
  categories: string[];
  selected: string;
  onChange: (cat: string) => void;
}

export const CategoryFilter = ({ categories, selected, onChange }: Props) => (
  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
    {["all", ...categories].map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all capitalize flex-shrink-0",
          selected === cat
            ? "bg-brand-500 text-white shadow-lg shadow-brand-200"
            : "bg-white text-stone-600 hover:bg-brand-50 border border-stone-200",
        )}
      >
        {cat === "all" ? "🍽️ All" : cat}
      </button>
    ))}
  </div>
);
