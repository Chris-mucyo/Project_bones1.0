import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ShoppingBag, Star, ArrowRight } from "lucide-react";

const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Food"];

const shopsData = [
  { id: 1, name: "TechHub", owner: "Alice", category: "Electronics", products: 120, followers: 340, banner: "https://images.unsplash.com/photo-1518770660439-4636190af475", featured: true },
  { id: 2, name: "UrbanWear", owner: "Mike", category: "Fashion", products: 80, followers: 500, banner: "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53", featured: true },
  { id: 3, name: "FitLife", owner: "Jane", category: "Sports", products: 60, followers: 210, banner: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438" },
  { id: 4, name: "HomeCraft", owner: "Paul", category: "Home", products: 40, followers: 120, banner: "https://images.unsplash.com/photo-1505691938895-1758d7feb511" },
  { id: 5, name: "FreshMart", owner: "Samuel", category: "Food", products: 200, followers: 620, banner: "https://images.unsplash.com/photo-1542838132-92c53300491e" },
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [followed, setFollowed] = useState([]);
  const navigate = useNavigate();

  const toggleFollow = (id) => {
    setFollowed((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const filteredShops = useMemo(() => {
    return shopsData.filter((shop) => activeCategory === "All" || shop.category === activeCategory);
  }, [activeCategory]);

  const featured = shopsData.filter((s) => s.featured);

  return (
    <div className="flex-1 bg-zinc-950 min-h-screen text-white p-6 no-scrollbar overflow-y-auto">
      
      {/* PAGE HEADER */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Star className="text-green-500 fill-green-500" size={16} />
          <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Marketplace</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Explore Shops</h1>
        <p className="text-zinc-500 text-sm mt-1">Discover curated sellers and premium stores.</p>
      </div>

      {/* FEATURED ROW */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg tracking-tight">Trending Shops</h2>
          <button className="text-xs text-zinc-500 hover:text-green-500 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
          {featured.map((shop) => (
            <div
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.id}`)}
              className="min-w-[280px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-green-500/50 transition-all group"
            >
              <div className="h-32 overflow-hidden">
                <img src={shop.banner} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white group-hover:text-green-500 transition-colors">{shop.name}</h3>
                <div className="flex items-center gap-2 mt-1 text-zinc-500">
                   <Users size={12} />
                   <span className="text-[11px] font-medium">{shop.followers} followers</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="sticky top-0 z-10 bg-zinc-950/80 backdrop-blur-md py-4 border-b border-white/5 mb-6">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border
              ${activeCategory === cat
                  ? "bg-green-500 text-black border-green-500"
                  : "bg-zinc-900 text-zinc-400 border-white/5 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      {filteredShops.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto text-zinc-800 mb-4" size={48} />
          <p className="text-zinc-500 font-medium italic">No shops found in this category</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredShops.map((shop) => {
            const isFollowing = followed.includes(shop.id);
            return (
              <div
                key={shop.id}
                onClick={() => navigate(`/shop/${shop.id}`)}
                className="bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all cursor-pointer group"
              >
                <div className="h-32 overflow-hidden relative">
                   <img src={shop.banner} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[9px] font-bold text-zinc-300 uppercase">
                     {shop.category}
                   </div>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-base text-white">{shop.name}</h3>
                      <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">By {shop.owner}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(shop.id);
                      }}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95
                        ${isFollowing ? "bg-green-500 text-black" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><ShoppingBag size={12} /> {shop.products} Items</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {shop.followers} Fans</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}