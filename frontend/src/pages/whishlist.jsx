import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingCart, Heart, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const savedItems = [
      { id: 1, name: "Premium Leather Jacket", price: "85,000", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500", category: "Fashion" },
      { id: 2, name: "Wireless Noise Cancelling Headphones", price: "120,000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "Electronics" },
      { id: 3, name: "Minimalist Wood Coffee Table", price: "45,000", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500", category: "Home" },
    ];
    setWishlistItems(savedItems);
  }, []);

  const removeItem = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    /* Added h-screen and no-scrollbar to match Explore.jsx */
    <div className="flex-1 bg-zinc-950 h-screen overflow-y-auto no-scrollbar text-white p-6">
      
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="text-green-500 fill-green-500" size={16} />
          <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Collection</span>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Your Wishlist</h1>
            <p className="text-zinc-500 text-sm mt-1">Items you've saved for later.</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-white leading-none">{wishlistItems.length}</span>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Items</p>
          </div>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/5 rounded-3xl bg-zinc-900/20">
          <Heart size={40} className="text-zinc-800 mb-4" />
          <p className="text-zinc-500 font-medium text-sm italic">Your wishlist is empty</p>
          <Link to="/explore" className="mt-4 bg-green-500 text-black px-6 py-2 rounded-xl flex items-center gap-2 text-xs font-bold hover:bg-green-600 transition-colors">
            Explore Products <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* Grid matches the spacing and column logic of Explore.jsx */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto pb-20">
          {wishlistItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-green-500/30 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Tag size={10} className="text-green-500" />
                  <p className="text-[9px] font-bold text-zinc-200 uppercase tracking-widest">{item.category}</p>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-sm mb-1 truncate text-white">{item.name}</h3>
                <p className="text-green-500 font-black text-lg mb-4">
                  {item.price} <span className="text-[10px] font-normal text-zinc-500 tracking-tighter uppercase">Rwf</span>
                </p>
                
                <div className="flex gap-2 border-t border-white/5 pt-4">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-black py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95">
                    <ShoppingCart size={14} />
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2.5 bg-zinc-800/50 text-zinc-500 hover:text-red-500 hover:bg-zinc-800 rounded-xl transition-all border border-white/5"
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;