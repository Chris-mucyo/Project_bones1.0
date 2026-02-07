import { useState, useEffect } from "react";
import { IoIosSettings, IoMdGrid } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";

// FAKE JSON DATA
const fakeSeller = {
  id: 1,
  username: "chris_market",
  fullName: "Mucyo Chris",
  avatar: "https://i.pravatar.cc/150?img=12",
  coverPhoto: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=400&fit=crop",
  bio: "Tech Entrepreneur | Electronics & Fashion | Kigali",
  followers: 1200,
  following: 180,
  posts: 8,
};

const fakeProducts = [
  { id: 1, image: "https://source.unsplash.com/400x400/?headphones", title: "Wireless Headphones" },
  { id: 2, image: "https://source.unsplash.com/400x400/?jacket", title: "Leather Jacket" },
  { id: 3, image: "https://source.unsplash.com/400x400/?smartwatch", title: "Smartwatch" },
  { id: 4, image: "https://source.unsplash.com/400x400/?sneakers", title: "Sneakers" },
  { id: 5, image: "https://source.unsplash.com/400x400/?laptop", title: "Laptop" },
  { id: 6, image: "https://source.unsplash.com/400x400/?phone", title: "Smartphone" },
  { id: 7, image: "https://source.unsplash.com/400x400/?watch", title: "Analog Watch" },
  { id: 8, image: "https://source.unsplash.com/400x400/?camera", title: "Camera" },
];

export default function Profile() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    setTimeout(() => {
      setSeller(fakeSeller);
      setProducts(fakeProducts);
    }, 300);
  }, []);

  if (!seller) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-pulse text-zinc-500 font-bold uppercase tracking-widest">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 text-white overflow-y-auto overflow-x-hidden">
      {/* Full-Screen Cover Photo */}
      <div className="relative w-full h-[300px] md:h-96 bg-zinc-900">
        <img
          src={seller.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        
        {/* Small Square Profile Picture - Positioned at bottom left */}
        <div className="absolute -bottom-16 left-6">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl border-4 border-zinc-950 overflow-hidden bg-zinc-900 shadow-2xl">
            <img
              src={seller.avatar}
              alt={seller.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="w-full px-6 pt-20 pb-6">
        {/* Username and Actions */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{seller.fullName}</h1>
            <p className="text-zinc-400 text-base md:text-lg">@{seller.username}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="bg-green-500 hover:bg-green-600 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-black text-sm transition-all active:scale-95">
              Follow
            </button>
            <button className="bg-zinc-800/60 hover:bg-zinc-800 border border-white/10 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-sm transition-all">
              Message
            </button>
            <button className="bg-zinc-800/60 hover:bg-zinc-800 border border-white/10 p-2 md:p-2.5 rounded-xl transition-all">
              <IoIosSettings size={20} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-6 md:gap-8 mb-6 text-sm">
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-white">{seller.posts}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Posts</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-white">{seller.followers.toLocaleString()}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold text-white">{seller.following}</span>
            <span className="text-zinc-500 text-xs uppercase tracking-wider">Following</span>
          </div>
        </div>

        {/* Bio */}
        <div className="max-w-2xl mb-6">
          <p className="text-zinc-300 leading-relaxed mb-2">{seller.bio}</p>
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <MdLocationOn className="text-green-500" size={16} />
            <span>Kigali, Rwanda</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-white/10 sticky top-0 bg-zinc-950/95 backdrop-blur-md z-10">
        <div className="w-full flex justify-center gap-8 md:gap-12 px-6">
          <button
            onClick={() => setActiveTab("products")}
            className={`py-4 flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === "products"
                ? "text-white border-b-2 border-green-500"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <IoMdGrid size={16} />
            Products
          </button>
          <button
            onClick={() => setActiveTab("spaces")}
            className={`py-4 flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider transition-all ${
              activeTab === "spaces"
                ? "text-white border-b-2 border-green-500"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <IoMdGrid size={16} />
            Spaces
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="w-full p-4 md:p-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <div key={product.id} className="relative group aspect-square overflow-hidden rounded-lg bg-zinc-900">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                <p className="text-white text-xs md:text-sm font-bold">{product.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}