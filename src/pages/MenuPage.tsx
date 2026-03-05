import { useState, useMemo } from "react";
import { MenuCard } from "../components/features/menu/MenuCard";
import { CategoryFilter } from "../components/features/menu/CategoryFilter";
import { MenuCardSkeleton } from "../components/ui/Skeleton";
import { useAvailableMenu } from "../hooks/useMenu";

export const MenuPage = () => {
  const { data: items = [], isLoading } = useAvailableMenu();
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category))],
    [items],
  );
  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (category === "all" || i.category === category) &&
          (i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.description.toLowerCase().includes(search.toLowerCase())),
      ),
    [items, category, search],
  );

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-brand-900 text-white overflow-hidden">
       <div className="absolute inset-0 opacity-10 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-3">
            Today's Selection
          </p>
          <h1 className="font-display font-black text-5xl sm:text-6xl mb-3">
            Crafted with <span className="text-brand-400">Passion</span>
          </h1>
          <p className="text-stone-400 text-lg max-w-lg">
            Fresh ingredients, bold flavors, perfected over generations.
          </p>
          <div className="mt-8 max-w-md">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-4 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-all"
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={setCategory}
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MenuCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🍽️</p>
            <h3 className="text-xl font-bold text-stone-700 mb-2">
              No dishes found
            </h3>
            <p className="text-stone-400">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};
