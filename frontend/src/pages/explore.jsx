import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ShoppingBag, Star, ArrowRight, TrendingUp, Zap } from "lucide-react";

const categories = ["All", "Electronics", "Fashion", "Gaming", "Home", "Sports"];

// Real shops data matching your products
const shopsData = [
  { 
    id: 1, 
    name: "Alice's Audio", 
    owner: "Alice", 
    username: "Alice",
    category: "Electronics", 
    products: 3, 
    followers: 2300, 
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    rating: 4.8,
    verified: true
  },
  { 
    id: 2, 
    name: "TechGuru Store", 
    owner: "Tech Master Pro", 
    username: "TechGuru",
    category: "Electronics", 
    products: 6, 
    followers: 5100, 
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    rating: 4.9,
    verified: true,
    featured: true
  },
  { 
    id: 3, 
    name: "Pixel Gaming Hub", 
    owner: "Pixel Gaming", 
    username: "Pixel",
    category: "Gaming", 
    products: 4, 
    followers: 8900, 
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    rating: 4.7,
    verified: true,
    featured: true
  },
  { 
    id: 4, 
    name: "Style & Co", 
    owner: "Style & Co", 
    username: "StyleCo",
    category: "Fashion", 
    products: 2, 
    followers: 4100, 
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    rating: 4.6
  },
  { 
    id: 5, 
    name: "Urban Outfitters", 
    owner: "Urban Outfitters", 
    username: "Urban",
    category: "Fashion", 
    products: 4, 
    followers: 10000, 
    banner: "https://images.unsplash.com/photo-1558769132-cb1aea3c8565",
    rating: 4.9,
    verified: true,
    featured: true
  },
  { 
    id: 6, 
    name: "Display Master", 
    owner: "Display Master", 
    username: "DisplayMaster",
    category: "Electronics", 
    products: 1, 
    followers: 4500, 
    banner: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
    rating: 4.8
  },
  { 
    id: 7, 
    name: "Barista's Choice", 
    owner: "Barista's Choice", 
    username: "Barista",
    category: "Home", 
    products: 2, 
    followers: 2100, 
    banner: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    rating: 4.5
  },
  { 
    id: 8, 
    name: "FitLife Sports", 
    owner: "FitLife Sports", 
    username: "FitLife",
    category: "Sports", 
    products: 4, 
    followers: 3200, 
    banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    rating: 4.7
  },
  { 
    id: 9, 
    name: "Kitchen Hub", 
    owner: "Kitchen Hub", 
    username: "KitchenHub",
    category: "Home", 
    products: 4, 
    followers: 4300, 
    banner: "https://images.unsplash.com/photo-1556911261-6bd341186b2f",
    rating: 4.6,
    featured: true
  },
  { 
    id: 10, 
    name: "Designer's Pick", 
    owner: "Designer's Pick", 
    username: "Designers",
    category: "Fashion", 
    products: 1, 
    followers: 15000, 
    banner: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    rating: 5.0,
    verified: true,
    featured: true
  },
  { 
    id: 11, 
    name: "Sprint Sports", 
    owner: "Sprint Sports", 
    username: "Sprint",
    category: "Sports", 
    products: 1, 
    followers: 12000, 
    banner: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    rating: 4.8,
    verified: true
  },
];

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [followed, setFollowed] = useState([]);
  const navigate = useNavigate();

  // Load followed shops from localStorage on mount
  useEffect(() => {
    const savedFollowed = JSON.parse(localStorage.getItem('followedShops') || '[]');
    setFollowed(savedFollowed);
  }, []);

  const toggleFollow = (id) => {
    setFollowed((prev) => {
      const newFollowed = prev.includes(id) 
        ? prev.filter((f) => f !== id) 
        : [...prev, id];
      
      // Save to localStorage
      localStorage.setItem('followedShops', JSON.stringify(newFollowed));
      return newFollowed;
    });
  };

  const filteredShops = useMemo(() => {
    return shopsData.filter((shop) => activeCategory === "All" || shop.category === activeCategory);
  }, [activeCategory]);

  // Get followed shops
  const followedShops = useMemo(() => {
    return shopsData.filter(shop => followed.includes(shop.id));
  }, [followed]);

  // Get featured/trending shops (not followed)
  const trendingShops = useMemo(() => {
    return shopsData
      .filter(shop => shop.featured && !followed.includes(shop.id))
      .sort((a, b) => b.followers - a.followers);
  }, [followed]);

  // Get recommended shops based on followed categories (not already followed)
  const recommendedShops = useMemo(() => {
    if (followedShops.length === 0) {
      // If no shops followed, show top rated shops
      return shopsData
        .filter(shop => !followed.includes(shop.id))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
    }

    // Get categories of followed shops
    const followedCategories = [...new Set(followedShops.map(s => s.category))];
    
    // Find shops in same categories that aren't followed
    return shopsData
      .filter(shop => 
        !followed.includes(shop.id) && 
        followedCategories.includes(shop.category)
      )
      .sort((a, b) => b.followers - a.followers)
      .slice(0, 4);
  }, [followedShops, followed]);

  // New shops (lowest IDs, not followed)
  const newShops = useMemo(() => {
    return shopsData
      .filter(shop => !followed.includes(shop.id))
      .sort((a, b) => b.id - a.id) // Reverse to get "newest"
      .slice(0, 3);
  }, [followed]);

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

      {/* FOLLOWED SHOPS SECTION */}
      {followedShops.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg tracking-tight">Shops You Follow</h2>
              <span className="bg-green-500/10 text-green-500 text-[10px] font-bold px-2 py-1 rounded-full">
                {followedShops.length}
              </span>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {followedShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/profile/${shop.username}`)}
                className="min-w-[280px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-green-500/20 cursor-pointer hover:border-green-500/50 transition-all group"
              >
                <div className="h-32 overflow-hidden relative">
                  <img src={shop.banner} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {shop.verified && (
                    <div className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> VERIFIED
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-green-500 transition-colors">{shop.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-zinc-500">
                     <Users size={12} />
                     <span className="text-[11px] font-medium">{shop.followers.toLocaleString()} followers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TRENDING SHOPS */}
      {trendingShops.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={18} />
              <h2 className="font-bold text-lg tracking-tight">Trending Now</h2>
            </div>
            <button className="text-xs text-zinc-500 hover:text-green-500 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {trendingShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/profile/${shop.username}`)}
                className="min-w-[280px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-green-500/50 transition-all group"
              >
                <div className="h-32 overflow-hidden relative">
                  <img src={shop.banner} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {shop.verified && (
                    <div className="absolute top-2 left-2 bg-green-500 text-black px-2 py-1 rounded-lg text-[9px] font-bold flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> VERIFIED
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-green-500 transition-colors">{shop.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-zinc-500">
                     <Users size={12} />
                     <span className="text-[11px] font-medium">{shop.followers.toLocaleString()} followers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDED FOR YOU */}
      {recommendedShops.length > 0 && (
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Zap className="text-green-500" size={18} />
              <h2 className="font-bold text-lg tracking-tight">
                {followedShops.length > 0 ? "Recommended For You" : "Top Rated Shops"}
              </h2>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {recommendedShops.map((shop) => (
              <div
                key={shop.id}
                onClick={() => navigate(`/profile/${shop.username}`)}
                className="min-w-[280px] bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 cursor-pointer hover:border-green-500/50 transition-all group"
              >
                <div className="h-32 overflow-hidden relative">
                  <img src={shop.banner} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[9px] font-bold text-zinc-300 flex items-center gap-1">
                    <Star size={10} className="text-yellow-500 fill-yellow-500" /> {shop.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white group-hover:text-green-500 transition-colors">{shop.name}</h3>
                  <div className="flex items-center gap-2 mt-1 text-zinc-500">
                     <Users size={12} />
                     <span className="text-[11px] font-medium">{shop.followers.toLocaleString()} followers</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

      {/* ALL SHOPS GRID */}
      {filteredShops.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="mx-auto text-zinc-800 mb-4" size={48} />
          <p className="text-zinc-500 font-medium italic">No shops found in this category</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg tracking-tight">
              {activeCategory === "All" ? "All Shops" : `${activeCategory} Shops`}
            </h2>
            <span className="text-xs text-zinc-500">{filteredShops.length} shops</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredShops.map((shop) => {
              const isFollowing = followed.includes(shop.id);
              return (
                <div
                  key={shop.id}
                  onClick={() => navigate(`/profile/${shop.username}`)}
                  className="bg-zinc-900/40 rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/30 transition-all cursor-pointer group"
                >
                  <div className="h-32 overflow-hidden relative">
                     <img src={shop.banner} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                     <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 text-[9px] font-bold text-zinc-300 uppercase">
                       {shop.category}
                     </div>
                     {shop.verified && (
                       <div className="absolute top-2 left-2 bg-green-500 text-black p-1 rounded-full">
                         <Star size={10} fill="currentColor" />
                       </div>
                     )}
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
                      <span className="flex items-center gap-1"><Users size={12} /> {shop.followers.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}