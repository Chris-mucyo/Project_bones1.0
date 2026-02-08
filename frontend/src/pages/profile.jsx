import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  IoIosSettings, IoMdGrid, IoMdArrowBack, IoIosCart, 
  IoIosChatbubbles, IoIosHeart, IoMdHeartEmpty, IoMdClose,
  IoMdAdd, IoMdRemove, IoMdHappy
} from "react-icons/io";
import { RiShareForwardLine, RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";

// FAKE JSON DATA - In production, this will come from your database
const fakeUsers = {
  Alice: {
    id: 1,
    username: "Alice",
    fullName: "Alice Anderson",
    avatar: "https://i.pravatar.cc/150?img=5",
    coverPhoto: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=400&fit=crop",
    bio: "Audio Expert | Premium Headphones & Speakers | Kigali",
    followers: 2300,
    following: 450,
    posts: 3,
    products: [
      { id: 1, name: "Wireless Headphones", price: "99,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?headphones", description: "Noise-canceling and 40h battery.", comments: [{ user: "John", text: "Amazing sound! 🎧", time: "2h" }] },
      { id: 17, name: "Bluetooth Speaker", price: "65,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?speaker", description: "Waterproof IPX7 rating.", comments: [] },
      { id: 22, name: "Portable Charger", price: "22,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?powerbank", description: "20,000mAh fast charging.", comments: [] },
    ]
  },
  TechGuru: {
    id: 2,
    username: "TechGuru",
    fullName: "Tech Master Pro",
    avatar: "https://i.pravatar.cc/150?img=8",
    coverPhoto: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=400&fit=crop",
    bio: "Tech Enthusiast | Latest Gadgets & Electronics | Kigali",
    followers: 5100,
    following: 890,
    posts: 6,
    products: [
      { id: 2, name: "Smart Watch Pro", price: "145,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?smartwatch", description: "OLED display and heart tracking.", comments: [] },
      { id: 14, name: "USB-C Hub", price: "38,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?usb", description: "7-in-1 with HDMI and SD.", comments: [] },
      { id: 21, name: "Tablet Pro 11\"", price: "650,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?tablet", description: "Pencil support and M2 chip.", comments: [] },
      { id: 26, name: "Webcam 1080p", price: "44,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?webcam", description: "Auto-focus and dual mic.", comments: [] },
    ]
  },
  Pixel: {
    id: 3,
    username: "Pixel",
    fullName: "Pixel Gaming",
    avatar: "https://i.pravatar.cc/150?img=12",
    coverPhoto: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&h=400&fit=crop",
    bio: "Gaming Gear Specialist | Pro Equipment | Kigali",
    followers: 8900,
    following: 320,
    posts: 4,
    products: [
      { id: 3, name: "Mechanical Keyboard", price: "75,000", category: "Gaming", image: "https://source.unsplash.com/400x400/?keyboard", description: "RGB Blue switches.", comments: [] },
      { id: 4, name: "Gaming Mouse", price: "45,000", category: "Gaming", image: "https://source.unsplash.com/400x400/?mouse", description: "Ultra-lightweight 16k DPI.", comments: [] },
      { id: 15, name: "Gaming Chair", price: "180,000", category: "Gaming", image: "https://source.unsplash.com/400x400/?chair", description: "Ergonomic leather with lumbar.", comments: [] },
      { id: 30, name: "Controller", price: "62,000", category: "Gaming", image: "https://source.unsplash.com/400x400/?gamepad", description: "Wireless for PC/Console.", comments: [] },
    ]
  },
  StyleCo: {
    id: 4,
    username: "StyleCo",
    fullName: "Style & Co",
    avatar: "https://i.pravatar.cc/150?img=9",
    coverPhoto: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=400&fit=crop",
    bio: "Fashion Forward | Premium Accessories | Kigali",
    followers: 4100,
    following: 220,
    posts: 2,
    products: [
      { id: 5, name: "Leather Wallet", price: "25,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?wallet", description: "Genuine cowhide leather.", comments: [] },
      { id: 23, name: "Sunglasses", price: "14,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?sunglasses", description: "Polarized UV400 protection.", comments: [] },
    ]
  },
  Urban: {
    id: 5,
    username: "Urban",
    fullName: "Urban Outfitters",
    avatar: "https://i.pravatar.cc/150?img=11",
    coverPhoto: "https://images.unsplash.com/photo-1558769132-cb1aea3c8565?w=1600&h=400&fit=crop",
    bio: "Street Fashion | Urban Wear & Accessories | Kigali",
    followers: 10000,
    following: 567,
    posts: 4,
    products: [
      { id: 6, name: "Cotton Hoodie", price: "35,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?hoodie", description: "Oversized fit, heavy cotton.", comments: [] },
      { id: 12, name: "Canvas Backpack", price: "42,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?backpack", description: "Waterproof laptop compartment.", comments: [] },
      { id: 20, name: "Denim Jacket", price: "48,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?jacket", description: "Classic blue vintage wash.", comments: [] },
      { id: 27, name: "Beanie Hat", price: "12,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?beanie", description: "Warm knit winter wear.", comments: [] },
    ]
  },
  DisplayMaster: {
    id: 6,
    username: "DisplayMaster",
    fullName: "Display Master",
    avatar: "https://i.pravatar.cc/150?img=14",
    coverPhoto: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1600&h=400&fit=crop",
    bio: "Premium Displays & Monitors | High-End Tech | Kigali",
    followers: 4500,
    following: 123,
    posts: 1,
    products: [
      { id: 7, name: "4K Monitor 27\"", price: "320,000", category: "Electronics", image: "https://source.unsplash.com/400x400/?monitor", description: "IPS panel, 144Hz refresh rate.", comments: [] },
    ]
  },
  Barista: {
    id: 7,
    username: "Barista",
    fullName: "Barista's Choice",
    avatar: "https://i.pravatar.cc/150?img=15",
    coverPhoto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=400&fit=crop",
    bio: "Coffee & Kitchen Essentials | Quality Appliances | Kigali",
    followers: 2100,
    following: 89,
    posts: 2,
    products: [
      { id: 8, name: "Coffee Maker", price: "120,000", category: "Home", image: "https://source.unsplash.com/400x400/?coffee-machine", description: "Espresso and Latte modes.", comments: [] },
      { id: 29, name: "Microwave Oven", price: "140,000", category: "Home", image: "https://source.unsplash.com/400x400/?microwave", description: "800W with digital timer.", comments: [] },
    ]
  },
  FitLife: {
    id: 8,
    username: "FitLife",
    fullName: "FitLife Sports",
    avatar: "https://i.pravatar.cc/150?img=16",
    coverPhoto: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=400&fit=crop",
    bio: "Fitness Equipment & Sportswear | Stay Active | Kigali",
    followers: 3200,
    following: 234,
    posts: 4,
    products: [
      { id: 9, name: "Yoga Mat", price: "15,000", category: "Sports", image: "https://source.unsplash.com/400x400/?yoga-mat", description: "Non-slip eco-friendly rubber.", comments: [] },
      { id: 10, name: "Dumbbells 10kg", price: "55,000", category: "Sports", image: "https://source.unsplash.com/400x400/?dumbbell", description: "Solid iron with rubber grip.", comments: [] },
      { id: 25, name: "Soccer Ball", price: "19,000", category: "Sports", image: "https://source.unsplash.com/400x400/?soccer-ball", description: "FIFA standard size 5.", comments: [] },
      { id: 28, name: "Protein Shaker", price: "9,000", category: "Sports", image: "https://source.unsplash.com/400x400/?shaker", description: "BPA free with mixing ball.", comments: [] },
    ]
  },
  KitchenHub: {
    id: 9,
    username: "KitchenHub",
    fullName: "Kitchen Hub",
    avatar: "https://i.pravatar.cc/150?img=17",
    coverPhoto: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=1600&h=400&fit=crop",
    bio: "Kitchen & Home Essentials | Quality Products | Kigali",
    followers: 4300,
    following: 178,
    posts: 4,
    products: [
      { id: 11, name: "Electric Kettle", price: "28,000", category: "Home", image: "https://source.unsplash.com/400x400/?kettle", description: "Fast boil stainless steel.", comments: [] },
      { id: 16, name: "Smart Bulb RGB", price: "12,000", category: "Home", image: "https://source.unsplash.com/400x400/?smart-bulb", description: "App controlled, WiFi enabled.", comments: [] },
      { id: 19, name: "Chef Knife", price: "52,000", category: "Home", image: "https://source.unsplash.com/400x400/?knife", description: "High carbon Japanese steel.", comments: [] },
      { id: 24, name: "Desk Lamp", price: "26,000", category: "Home", image: "https://source.unsplash.com/400x400/?lamp", description: "LED with wireless charging base.", comments: [] },
    ]
  },
  Designers: {
    id: 10,
    username: "Designers",
    fullName: "Designer's Pick",
    avatar: "https://i.pravatar.cc/150?img=18",
    coverPhoto: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1600&h=400&fit=crop",
    bio: "Designer Fashion | Unique Prints & Styles | Kigali",
    followers: 15000,
    following: 678,
    posts: 1,
    products: [
      { id: 13, name: "Graphic T-Shirt", price: "18,000", category: "Fashion", image: "https://source.unsplash.com/400x400/?tshirt", description: "Premium print 100% cotton.", comments: [] },
    ]
  },
  Sprint: {
    id: 11,
    username: "Sprint",
    fullName: "Sprint Sports",
    avatar: "https://i.pravatar.cc/150?img=19",
    coverPhoto: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&h=400&fit=crop",
    bio: "Running & Athletic Gear | Performance Wear | Kigali",
    followers: 12000,
    following: 445,
    posts: 1,
    products: [
      { id: 18, name: "Running Shoes", price: "85,000", category: "Sports", image: "https://source.unsplash.com/400x400/?running-shoes", description: "Breathable mesh for marathon.", comments: [] },
    ]
  }
};

const scrollbarHideStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  
  // Instagram-style detail view states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [savedProducts, setSavedProducts] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [commentText, setCommentText] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const userData = fakeUsers[username];
      
      if (userData) {
        setSeller(userData);
        setProducts(userData.products || []);
        setFollowerCount(userData.followers);
      }
      setLoading(false);
    }, 500);
  }, [username]);

  // Load liked and saved products from localStorage
  useEffect(() => {
    const likes = JSON.parse(localStorage.getItem('likedProducts') || '{}');
    const saves = JSON.parse(localStorage.getItem('savedProducts') || '{}');
    setLikedProducts(likes);
    setSavedProducts(saves);
  }, []);

  // Check if user is following this shop
  useEffect(() => {
    if (seller) {
      const followedShops = JSON.parse(localStorage.getItem('followedShops') || '[]');
      setIsFollowing(followedShops.includes(seller.id));
    }
  }, [seller]);

  // Toggle follow/unfollow
  const toggleFollow = () => {
    const followedShops = JSON.parse(localStorage.getItem('followedShops') || '[]');
    
    if (isFollowing) {
      // Unfollow
      const updatedFollowed = followedShops.filter(id => id !== seller.id);
      localStorage.setItem('followedShops', JSON.stringify(updatedFollowed));
      setIsFollowing(false);
      setFollowerCount(prev => prev - 1);
    } else {
      // Follow
      const updatedFollowed = [...followedShops, seller.id];
      localStorage.setItem('followedShops', JSON.stringify(updatedFollowed));
      setIsFollowing(true);
      setFollowerCount(prev => prev + 1);
    }
  };

  const toggleLike = (id) => {
    setLikedProducts(prev => {
      const newLikes = { ...prev, [id]: !prev[id] };
      localStorage.setItem('likedProducts', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  const toggleSave = (product) => {
    setSavedProducts(prev => {
      const newSaves = { ...prev, [product.id]: !prev[product.id] };
      localStorage.setItem('savedProducts', JSON.stringify(newSaves));
      
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (!prev[product.id]) {
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex === -1) {
          const productData = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            uploader: seller.username,
            description: product.description,
            savedAt: new Date().toISOString()
          };
          wishlist.push(productData);
          localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
      } else {
        const updatedWishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      }
      
      return newSaves;
    });
  };

  const handleShare = async (product, platform) => {
    const shareUrl = `${window.location.origin}/#/profile/${username}`;
    const shareText = `Check out ${product.name} by ${seller.username} - ${product.price} RWF!`;
    
    const shareLinks = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      copy: shareUrl
    };

    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    } else if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
    
    setShowShareMenu(false);
  };

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/,/g, ""), 10);
  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return (parsePrice(selectedProduct.price) * quantity).toLocaleString();
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
        <div className="animate-pulse text-zinc-500 font-bold uppercase tracking-widest">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white gap-4">
        <div className="text-zinc-500 font-bold uppercase tracking-widest">
          User not found
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-bold text-black transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-950 text-white overflow-y-auto overflow-x-hidden">
      <style>{scrollbarHideStyles}</style>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-20 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-3 rounded-full transition-all"
      >
        <IoMdArrowBack size={24} />
      </button>

      {/* Cover Photo */}
      <div className="relative w-full h-[300px] md:h-[400px] bg-zinc-900">
        <img
          src={seller.coverPhoto}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        
        {/* Profile Picture */}
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

      {/* Profile Info */}
      <div className="w-full px-6 pt-20 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{seller.fullName}</h1>
            <p className="text-zinc-400 text-base md:text-lg">@{seller.username}</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleFollow}
              className={`px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                isFollowing 
                  ? "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10" 
                  : "bg-green-500 text-black hover:bg-green-600"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button 
              onClick={() => navigate(`/chat?seller=${seller.username}`)}
              className="bg-zinc-800/60 hover:bg-zinc-800 border border-white/10 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-semibold text-sm transition-all"
            >
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
            <span className="text-xl md:text-2xl font-bold text-white">{followerCount.toLocaleString()}</span>
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
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="relative group aspect-square overflow-hidden rounded-lg bg-zinc-900 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                  <div>
                    <p className="text-white text-xs md:text-sm font-bold mb-1">{product.name}</p>
                    <p className="text-green-500 text-xs md:text-sm font-bold">{product.price} RWF</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <IoMdGrid size={64} className="mb-4 opacity-30" />
            <p className="font-bold uppercase tracking-widest text-sm">No products yet</p>
          </div>
        )}
      </div>

      {/* IG-STYLE DETAIL SIDENAV */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-zinc-950 border-l border-white/10 z-[60] transition-transform duration-500 ease-in-out transform ${selectedProduct ? "translate-x-0" : "translate-x-full"}`}>
        {selectedProduct && (
          <div className="flex flex-col h-full relative">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between sticky top-0 bg-zinc-950 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <span className="text-[10px] font-bold">{seller.username[0]}</span>
                  </div>
                </div>
                <span className="font-bold text-sm">{seller.username}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-white/5 rounded-full transition">
                <IoMdClose size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
              <div className="aspect-square bg-zinc-900 flex items-center justify-center border-b border-white/5">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(selectedProduct.id)}>
                      {likedProducts[selectedProduct.id] ? <IoIosHeart className="text-red-500 text-3xl" /> : <IoMdHeartEmpty className="text-3xl" />}
                    </button>
                    <IoIosChatbubbles size={28} />
                    <div className="relative">
                      <button onClick={() => setShowShareMenu(!showShareMenu)}>
                        <RiShareForwardLine size={28} />
                      </button>
                      {showShareMenu && (
                        <div className="absolute left-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden min-w-[160px] z-20">
                          {navigator.share && (
                            <button
                              onClick={() => handleShare(selectedProduct, 'native')}
                              className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-zinc-800 transition-colors"
                            >
                              Share...
                            </button>
                          )}
                          <button
                            onClick={() => handleShare(selectedProduct, 'facebook')}
                            className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-zinc-800 transition-colors"
                          >
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare(selectedProduct, 'twitter')}
                            className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-zinc-800 transition-colors"
                          >
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare(selectedProduct, 'whatsapp')}
                            className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-zinc-800 transition-colors"
                          >
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleShare(selectedProduct, 'copy')}
                            className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-zinc-800 transition-colors border-t border-white/10"
                          >
                            Copy Link
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => toggleSave(selectedProduct)}>
                    {savedProducts[selectedProduct.id] ? <RiBookmarkFill className="text-green-500" size={26} /> : <RiBookmarkLine size={26} />}
                  </button>
                </div>
                <div className="bg-zinc-900/50 rounded-2xl p-4 border border-white/5 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Quantity</span>
                    <div className="flex items-center gap-4 bg-black rounded-lg p-1 px-3 border border-white/10">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><IoMdRemove /></button>
                      <span className="font-bold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)}><IoMdAdd /></button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/5">
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total</span>
                    <span className="text-xl font-black text-green-500">{calculateTotal()} RWF</span>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm">
                    <span className="font-bold mr-2">{seller.username}</span>
                    <span className="text-zinc-300">{selectedProduct.description}</span>
                  </p>
                </div>
                <div className="space-y-6 pt-6 border-t border-white/5">
                  {selectedProduct.comments?.map((comment, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">
                        {comment.user[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-tight">
                          <span className="font-bold mr-2">{comment.user}</span>
                          {comment.text}
                        </p>
                      </div>
                      <IoMdHeartEmpty className="text-zinc-600" size={14} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 w-full bg-zinc-950/95 backdrop-blur-md border-t border-white/5 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0" />
                <div className="flex-1 flex items-center bg-zinc-900 rounded-full px-4 py-2 border border-white/5">
                  <input 
                    type="text" 
                    value={commentText} 
                    onChange={(e) => setCommentText(e.target.value)} 
                    placeholder="Add a comment..." 
                    className="bg-transparent text-sm flex-1 outline-none" 
                  />
                  {commentText && <button className="text-blue-500 text-sm font-bold ml-2">Post</button>}
                  {!commentText && <IoMdHappy className="text-zinc-500 ml-2" size={20} />}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-[4] bg-green-500 text-black py-3.5 rounded-xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <IoIosCart size={20} /> BUY NOW
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/chat?seller=${seller.username}&item=${selectedProduct.name}&price=${selectedProduct.price}`);
                  }} 
                  className="flex-1 bg-zinc-900 border border-white/10 text-white py-3.5 rounded-xl flex items-center justify-center"
                >
                  <IoIosChatbubbles size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedProduct && <div className="fixed inset-0 bg-black/40 z-[55]" onClick={() => setSelectedProduct(null)} />}
    </div>
  );
}