import { Grid, List } from "lucide-react";

const categories = [
  "All Spaces",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty",
  "Sports",
  "Food",
];

export default function SpaceNav({
  search,
  setSearch,
  activeCategory,
  setActiveCategory,
  sortBy,
  setSortBy,
  view,
  setView,
}) {
  return (
    <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 w-full">
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Search */}
        <input
          type="text"
          placeholder="Search spaces by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Sort + View */}
        <div className="flex gap-3 items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 text-sm focus:outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>

          <button
            onClick={() => setView("grid")}
            className={`p-3 rounded-xl border ${
              view === "grid"
                ? "bg-green-500 text-black border-green-500"
                : "bg-zinc-950 border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <Grid size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-3 rounded-xl border ${
              view === "list"
                ? "bg-green-500 text-black border-green-500"
                : "bg-zinc-950 border-white/10 text-white/60 hover:text-white"
            }`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3 mt-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition
              ${
                activeCategory === cat
                  ? "bg-green-500 text-black"
                  : "bg-zinc-950 text-white hover:bg-zinc-800"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
