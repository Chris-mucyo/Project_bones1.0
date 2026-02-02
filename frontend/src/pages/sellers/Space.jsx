import { useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SpaceNav from "../../components/SpaceNav.jsx"; 
import { X } from "lucide-react";
import debounce from "lodash.debounce";

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
    image: "/images/beauty.jpg",
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
    image: "/images/fashion.jpg",
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
    image: "/images/jewelry.jpg",
  },
];

export default function Space() {
  const [activeCategory, setActiveCategory] = useState("All Spaces");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [view, setView] = useState("grid");
  const [sidebarSpace, setSidebarSpace] = useState(null);
  const navigate = useNavigate();

  // Debounced search input
  const handleSearchChange = debounce((value) => setSearch(value), 300);

  // Filter + sort spaces
  const filteredSpaces = useMemo(() => {
    let filtered = spacesData.filter((space) => {
      const matchCategory =
        activeCategory === "All Spaces" || space.category === activeCategory;
      const matchSearch =
        space.title.toLowerCase().includes(search.toLowerCase()) ||
        space.subtitle.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === "popular") filtered.sort((a, b) => b.views - a.views);

    return filtered;
  }, [activeCategory, search, sortBy]);

  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">MarketSpace</h1>
            <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-md font-semibold">
              SELLER
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm">
            {["/", "/sellers/space/pricing", "/sellers/space/features", "/sellers/space/how-it-works"].map((link, idx) => {
              const labels = ["Available Spaces", "Pricing", "Features", "How It Works"];
              return (
                <NavLink
                  key={link}
                  to={link}
                  className={({ isActive }) =>
                    isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
                  }
                >
                  {labels[idx]}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-5xl font-bold mb-4">Available Marketplace Spaces</h2>
        <p className="text-white/60 mb-6">
          Browse our curated collection of ready-to-use online store spaces
        </p>
        <div className="flex gap-4 text-sm text-white/60">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            {filteredSpaces.length} spaces available
          </span>
        </div>
      </section>

      {/* SpaceNav */}
      <section className="max-w-7xl mx-auto px-6">
        <SpaceNav
          search={search}
          setSearch={handleSearchChange}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          view={view}
          setView={setView}
        />
      </section>

      {/* Cards */}
      <section
        className={
          view === "grid"
            ? "max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            : "max-w-7xl mx-auto px-6 py-14 flex flex-col gap-6"
        }
      >
        {filteredSpaces.map((space) => (
          <div
            key={space.id}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden hover:border-green-500/50 transition"
          >
            <div className="bg-zinc-950/90 relative h-40 flex items-center justify-center">
              <span className="absolute top-4 right-4 bg-green-500 text-black text-xs font-semibold px-3 py-1 rounded-md">
                AVAILABLE
              </span>
              <h3 className="text-3xl font-bold text-green-500">{space.title}</h3>
            </div>
            <div className="p-6">
              <h4 className="font-semibold mb-2">{space.subtitle}</h4>
              <div className="flex gap-3 text-xs text-white/50 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded">{space.category}</span>
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
              </ul>
              <div className="mt-5 flex items-center">
                <span className="text-green-500 text-2xl font-bold">{space.price} RWF</span>
                <p className="text-xl mt-1 text-gray-400 ml-2">month</p>
                <button
                  className="ml-auto bg-green-500 text-black px-6 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
                  onClick={() => setSidebarSpace(space)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-zinc-900/95 shadow-xl transform transition-transform z-50 ${
          sidebarSpace ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {sidebarSpace && (
          <div className="h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{sidebarSpace.title}</h2>
              <button
                onClick={() => setSidebarSpace(null)}
                className="text-white hover:text-green-500"
              >
                <X size={24} />
              </button>
            </div>
            {sidebarSpace.image && (
              <div className="mb-4 h-48 w-full bg-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={sidebarSpace.image}
                  alt={sidebarSpace.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <p className="text-white/60 mb-4">{sidebarSpace.subtitle}</p>
            <div className="flex gap-3 text-xs text-white/50 mb-4">
              <span className="bg-white/10 px-2 py-1 rounded">{sidebarSpace.category}</span>
              <span>{sidebarSpace.products} products</span>
            </div>
            <div className="flex gap-6 text-sm text-white/60 mb-4">
              <span>👁 {sidebarSpace.views}</span>
              <span>🛒 {sidebarSpace.sales} sales</span>
            </div>
            <ul className="space-y-2 text-sm mb-6">
              {sidebarSpace.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mb-4 text-white/60 text-sm">
              Explore <span className="text-green-500 cursor-pointer font-semibold"
              onClick={() =>
                  navigate("/sellers/space/features", { state: { space: sidebarSpace } })
                }
              >Features</span> and <span className="text-green-500 cursor-pointer font-semibold"
              onClick={() =>
                  navigate("/sellers/space/how-it-works", { state: { space: sidebarSpace } })
                }
              >How It Works</span> to maximize your space usage.
            </div>
            <div className="mt-auto">
              <button
                onClick={() =>
                  navigate("/sellers/space/pricing", { state: { space: sidebarSpace } })
                }
                className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-3 rounded-xl transition"
              >
                Buy This Space
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
