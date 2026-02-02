import { useState, useEffect } from "react";

// FAKE JSON DATA
const fakeSeller = {
  id: 1,
  username: "chris_market",
  fullName: "Mucyo Chris",
  avatar: "https://i.pravatar.cc/150?img=12",
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

export default function SellerInstagramProfile() {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setSeller(fakeSeller);
      setProducts(fakeProducts);
    }, 300);
  }, []);

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <img
          src={seller.avatar}
          alt={seller.username}
          className="w-32 h-32 rounded-full border-2 border-white/20"
        />
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-semibold">{seller.username}</h2>
            <button className="bg-green-500 px-4 py-1 rounded font-semibold text-black hover:bg-green-600 transition">
              Follow
            </button>
            <button className="bg-zinc-800 px-4 py-1 rounded font-semibold hover:bg-zinc-700 transition">
              Message
            </button>
          </div>
          <div className="flex gap-6 text-sm mb-4">
            <span>
              <span className="font-semibold text-white">{seller.posts}</span> posts
            </span>
            <span>
              <span className="font-semibold text-white">{seller.followers}</span> followers
            </span>
            <span>
              <span className="font-semibold text-white">{seller.following}</span> following
            </span>
          </div>
          <p className="text-gray-400">{seller.bio}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-b border-white/10">
        <div className="max-w-4xl mx-auto flex justify-center text-sm gap-12 py-2 text-white/70">
          <button className="py-2 border-b-2 border-white font-semibold">Products</button>
          <button className="py-2 hover:text-white transition">Spaces</button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-4xl mx-auto p-4 grid grid-cols-3 gap-1">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-semibold transition">
              {product.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
