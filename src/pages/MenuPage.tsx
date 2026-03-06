import { useState, useMemo } from "react";
import { MenuCard } from "@/components/features/menu/MenuCard";
import { CategoryFilter } from "@/components/features/menu/CategoryFilter";
import { MenuItemModal } from "@/components/features/menu/MenuItemModal";
import { MenuCardSkeleton } from "@/components/ui/Skeleton";
import { useAvailableMenu, useMenuByCategory } from "@/hooks/useMenu";

export const MenuPage = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // always fetch all available items for category list + search
  const { data: allItems = [], isLoading: allLoading } = useAvailableMenu();

  // fetch by category when a category is selected
  const { data: categoryItems = [], isLoading: categoryLoading } =
    useMenuByCategory(category);

  // use server filtered items when category selected, otherwise all items
  const baseItems = category === "all" ? allItems : categoryItems;
  const isLoading = category === "all" ? allLoading : categoryLoading;

  // categories derived from all items
  const categories = useMemo(
    () => [...new Set(allItems.map((i) => i.category))],
    [allItems],
  );

  // client-side search on top of server-side category filter
  const filtered = useMemo(
    () =>
      search.trim()
        ? baseItems.filter(
            (i) =>
              i.name.toLowerCase().includes(search.toLowerCase()) ||
              i.description.toLowerCase().includes(search.toLowerCase()),
          )
        : baseItems,
    [baseItems, search],
  );

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-brand-900 text-white overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-brand-400 font-semibold text-sm tracking-widest mb-3">
            TODAY'S SELECTION
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
        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={category}
            onChange={(cat) => {
              setCategory(cat);
              setSearch(""); // clear search when switching category
            }}
          />
        </div>

        {/* Results count */}
        {!isLoading && (
          <p className="text-sm text-stone-400 mb-4">
            {filtered.length} {filtered.length === 1 ? "dish" : "dishes"} found
            {category !== "all" && ` in "${category}"`}
            {search && ` for "${search}"`}
          </p>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <MenuCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onViewDetail={(id) => setSelectedItemId(id)}
              />
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

      {/* Menu Item Detail Modal */}
      {selectedItemId && (
        <MenuItemModal
          itemId={selectedItemId}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </div>
  );
};
