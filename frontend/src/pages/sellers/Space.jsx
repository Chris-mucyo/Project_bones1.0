import { useState } from "react";

const categories = [
  "All Spaces",
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Beauty",
  "Sports",
  "Food",
];

const spacesData = [
  {
    id: 1,
    title: "Beauty Space",
    subtitle: "Beauty & Cosmetics Space",
    category: "Beauty",
    products: 350,
    views: 2341,
    sales: 167,
    price: 15000,
    features: ["Subscription billing", "Loyalty program"],
  },
  {
    id: 2,
    title: "Fashion Space",
    subtitle: "Fashion Boutique Space",
    category: "Fashion",
    products: 300,
    views: 2156,
    sales: 145,
    price: 18000,
    features: ["Mobile optimized", "SEO tools"],
  },
  {
    id: 3,
    title: "Jewelry Space",
    subtitle: "Jewelry Store Space",
    category: "Fashion",
    products: 220,
    views: 2098,
    sales: 121,
    price: 20000,
    features: ["Custom products", "Virtual try-on"],
  },
];

export default function Space() {
  const [activeCategory, setActiveCategory] = useState("All Spaces");
  const [search, setSearch] = useState("");

  const filteredSpaces = spacesData.filter((space) => {
    const matchCategory =
      activeCategory === "All Spaces" ||
      space.category === activeCategory;
    const matchSearch =
      space.title.toLowerCase().includes(search.toLowerCase()) ||
      space.subtitle.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">MarketSpace</h1>
            <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-md font-semibold">
              SELLER
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-white/60">
            <a className="text-white" href="#">Available Spaces</a>
            <a href="#">Pricing</a>
            <a href="#">Features</a>
            <a href="#">How It Works</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-5xl font-bold mb-4">
          Available Marketplace Spaces
        </h2>
        <p className="text-white/60 mb-6">
          Browse our curated collection of ready-to-use online store spaces
        </p>

        <div className="flex gap-4 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            11 spaces available
          </span>
          <span>•</span>
          <span>1 coming soon</span>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
          <input
            type="text"
            placeholder="Search spaces by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-5 px-4 py-3 rounded-xl bg-zinc-950 border border-white/10 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition
                  ${
                    activeCategory === cat
                      ? "bg-green-500 text-black"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  }
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSpaces.map((space) => (
          <div
            key={space.id}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition"
          >
            {/* Card Top */}
            <div className=" bg-zinc-950/90 relative h-40 flex items-center justify-center">
              <span className="absolute top-4 right-4 bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-md">
                AVAILABLE
              </span>
              <h3 className="text-3xl font-bold text-green-500">
                {space.title}
              </h3>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <h4 className="font-semibold mb-2">{space.subtitle}</h4>

              <div className="flex gap-3 text-xs text-white/50 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded">
                  {space.category}
                </span>
                <span>{space.products} products</span>
              </div>

              <div className="flex gap-6 text-sm text-white/60 mb-4">
                <span>👁 {space.views}</span>
                <span>🛒 {space.sales} sales</span>
              </div>

              <ul className="space-y-2 text-sm">
                {space.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
                <li className="text-green-500 cursor-pointer">
                  +1 more features
                </li>
              </ul>
              <div className=" mt-5 flex">
                <span className="text-green-500 text-2xl font-bold">{space.price}RWF</span><p className=" text-xl mt-1 text-gray-400">month</p>
                <button className=" ml-auto bg-green-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-green-600 transition">Details</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
