import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingCart, Heart, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlistItems(savedWishlist);
    };

    loadWishlist();

    // Listen for storage changes (when items are added/removed from other components)
    const handleStorageChange = (e) => {
      if (e.key === 'wishlist') {
        loadWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events from the same tab
    const handleWishlistUpdate = () => {
      loadWishlist();
    };

    window.addEventListener('wishlistUpdated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
    };
  }, []);

  const removeItem = (id) => {
    // Remove from state
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    
    // Remove from localStorage
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    
    // Also update savedProducts
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts') || '{}');
    delete savedProducts[id];
    localStorage.setItem('savedProducts', JSON.stringify(savedProducts));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const addToCart = (item) => {
    // Add to cart logic
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // If exists, increase quantity
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      // If new, add to cart with quantity 1
      cart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show feedback
    alert(`${item.name} added to cart!`);
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
              {/* Product Image - Using placeholder since images aren't stored */}
              <div className="relative h-48 overflow-hidden bg-zinc-800">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-green-500/20 font-bold text-2xl uppercase text-center px-4 tracking-tighter leading-tight">
                    {item.name}
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Tag size={10} className="text-green-500" />
                  <p className="text-[9px] font-bold text-zinc-200 uppercase tracking-widest">{item.category}</p>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[11px] font-bold">
                  {item.price} RWF
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-sm mb-1 line-clamp-2 text-white">{item.name}</h3>
                <p className="text-zinc-400 text-xs mb-2">{item.uploader}</p>
                <p className="text-green-500 font-black text-lg mb-1">
                  {item.price} <span className="text-[10px] font-normal text-zinc-500 tracking-tighter uppercase">Rwf</span>
                </p>
                <p className="text-zinc-500 text-[10px] mb-4">
                  Saved {new Date(item.savedAt).toLocaleDateString()}
                </p>
                
                <div className="flex gap-2 border-t border-white/5 pt-4">
                  <button 
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-black py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95"
                  >
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