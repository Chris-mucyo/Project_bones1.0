import { useState, useEffect } from "react";
import {
  IoIosCart, IoIosChatbubbles, IoIosEye, IoIosHeart,
  IoIosStar, IoMdHeartEmpty, IoMdClose, IoIosFlame, IoIosFlash,
  IoMdAdd, IoMdRemove, IoIosSend, IoMdHappy
} from "react-icons/io";
import { RiShareForwardLine, RiBookmarkLine } from "react-icons/ri";
import { useOutletContext, useNavigate } from "react-router-dom";

const scrollbarHideStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const categories = ["All", "Electronics", "Fashion", "Gaming", "Home", "Sports"];

export default function Home() {
  // 1. REAL-TIME DATA STATE
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [commentText, setCommentText] = useState("");
  
  // Get search query and user from Layout context
  const { searchQuery, user } = useOutletContext();
  const navigate = useNavigate();

  // 2. SIMULATE DATABASE FETCH
  // In production, this useEffect will call your API (Supabase/Firebase)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulating an API call with your original data
        // Eventually replace this with: const { data } = await supabase.from('products').select('*')
        const data = [
          { id: 1, name: "Wireless Headphones", price: "99,000", category: "Electronics", uploader: "Alice", views: "2.3k", sales: "167", description: "Noise-canceling and 40h battery.", comments: [{ user: "John", text: "Amazing sound! 🎧", time: "2h" }] },
          { id: 2, name: "Smart Watch Pro", price: "145,000", category: "Electronics", uploader: "TechGuru", views: "5.1k", sales: "230", description: "OLED display and heart tracking.", comments: [] },
          { id: 3, name: "Mechanical Keyboard", price: "75,000", category: "Gaming", uploader: "Pixel", views: "1.2k", sales: "45", description: "RGB Blue switches.", comments: [] },
          { id: 4, name: "Gaming Mouse", price: "45,000", category: "Gaming", uploader: "Pixel", views: "3.4k", sales: "890", description: "Ultra-lightweight 16k DPI.", comments: [] },
          { id: 5, name: "Leather Wallet", price: "25,000", category: "Fashion", uploader: "StyleCo", views: "900", sales: "12", description: "Genuine cowhide leather.", comments: [] },
          { id: 6, name: "Cotton Hoodie", price: "35,000", category: "Fashion", uploader: "Urban", views: "10k", sales: "1.2k", description: "Oversized fit, heavy cotton.", comments: [] },
          { id: 7, name: "4K Monitor 27\"", price: "320,000", category: "Electronics", uploader: "DisplayMaster", views: "4.5k", sales: "67", description: "IPS panel, 144Hz refresh rate.", comments: [] },
          { id: 8, name: "Coffee Maker", price: "120,000", category: "Home", uploader: "Barista", views: "2.1k", sales: "150", description: "Espresso and Latte modes.", comments: [] },
          { id: 9, name: "Yoga Mat", price: "15,000", category: "Sports", uploader: "FitLife", views: "3.2k", sales: "400", description: "Non-slip eco-friendly rubber.", comments: [] },
          { id: 10, name: "Dumbbells 10kg", price: "55,000", category: "Sports", uploader: "FitLife", views: "1.1k", sales: "88", description: "Solid iron with rubber grip.", comments: [] },
          { id: 11, name: "Electric Kettle", price: "28,000", category: "Home", uploader: "KitchenHub", views: "4.3k", sales: "1.1k", description: "Fast boil stainless steel.", comments: [] },
          { id: 12, name: "Canvas Backpack", price: "42,000", category: "Fashion", uploader: "Urban", views: "6.7k", sales: "210", description: "Waterproof laptop compartment.", comments: [] },
          { id: 13, name: "Graphic T-Shirt", price: "18,000", category: "Fashion", uploader: "Designers", views: "15k", sales: "3k", description: "Premium print 100% cotton.", comments: [] },
          { id: 14, name: "USB-C Hub", price: "38,000", category: "Electronics", uploader: "TechGuru", views: "2k", sales: "500", description: "7-in-1 with HDMI and SD.", comments: [] },
          { id: 15, name: "Gaming Chair", price: "180,000", category: "Gaming", uploader: "Pixel", views: "8.9k", sales: "56", description: "Ergonomic leather with lumbar.", comments: [] },
          { id: 16, name: "Smart Bulb RGB", price: "12,000", category: "Home", uploader: "KitchenHub", views: "1.2k", sales: "450", description: "App controlled, WiFi enabled.", comments: [] },
          { id: 17, name: "Bluetooth Speaker", price: "65,000", category: "Electronics", uploader: "Alice", views: "4k", sales: "320", description: "Waterproof IPX7 rating.", comments: [] },
          { id: 18, name: "Running Shoes", price: "85,000", category: "Sports", uploader: "Sprint", views: "12k", sales: "1k", description: "Breathable mesh for marathon.", comments: [] },
          { id: 19, name: "Chef Knife", price: "52,000", category: "Home", uploader: "KitchenHub", views: "3.1k", sales: "89", description: "High carbon Japanese steel.", comments: [] },
          { id: 20, name: "Denim Jacket", price: "48,000", category: "Fashion", uploader: "Urban", views: "5.5k", sales: "140", description: "Classic blue vintage wash.", comments: [] },
          { id: 21, name: "Tablet Pro 11\"", price: "650,000", category: "Electronics", uploader: "TechGuru", views: "7.2k", sales: "34", description: "Pencil support and M2 chip.", comments: [] },
          { id: 22, name: "Portable Charger", price: "22,000", category: "Electronics", uploader: "Alice", views: "9k", sales: "2.1k", description: "20,000mAh fast charging.", comments: [] },
          { id: 23, name: "Sunglasses", price: "14,000", category: "Fashion", uploader: "StyleCo", views: "4.1k", sales: "600", description: "Polarized UV400 protection.", comments: [] },
          { id: 24, name: "Desk Lamp", price: "26,000", category: "Home", uploader: "KitchenHub", views: "2.5k", sales: "110", description: "LED with wireless charging base.", comments: [] },
          { id: 25, name: "Soccer Ball", price: "19,000", category: "Sports", uploader: "FitLife", views: "8k", sales: "1.5k", description: "FIFA standard size 5.", comments: [] },
          { id: 26, name: "Webcam 1080p", price: "44,000", category: "Electronics", uploader: "TechGuru", views: "3.3k", sales: "90", description: "Auto-focus and dual mic.", comments: [] },
          { id: 27, name: "Beanie Hat", price: "12,000", category: "Fashion", uploader: "Urban", views: "6k", sales: "800", description: "Warm knit winter wear.", comments: [] },
          { id: 28, name: "Protein Shaker", price: "9,000", category: "Sports", uploader: "FitLife", views: "5.1k", sales: "2k", description: "BPA free with mixing ball.", comments: [] },
          { id: 29, name: "Microwave Oven", price: "140,000", category: "Home", uploader: "Barista", views: "2.1k", sales: "40", description: "800W with digital timer.", comments: [] },
          { id: 30, name: "Controller", price: "62,000", category: "Gaming", uploader: "Pixel", views: "14k", sales: "2.2k", description: "Wireless for PC/Console.", comments: [] },
        ];
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 3. FILTERING LOGIC
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.uploader.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleLike = (id) => {
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const parsePrice = (priceStr) => parseInt(priceStr.replace(/,/g, ""), 10);
  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    return (parsePrice(selectedProduct.price) * quantity).toLocaleString();
  };

  return (
    <div className="relative h-full bg-zinc-950 text-white overflow-hidden">
      <style>{scrollbarHideStyles}</style>

      {/* 1. CATEGORY CHIPS */}
      <div className="sticky top-0 z-30 bg-zinc-950 px-8 py-4 border-b border-white/5">
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeCategory === cat ? "bg-white text-black" : "bg-zinc-800 hover:bg-zinc-700 text-white"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN GRID (Dynamic loading state added) */}
      <div className="h-[calc(100vh-70px)] overflow-y-auto no-scrollbar pb-32">
        {loading ? (
          <div className="h-96 flex items-center justify-center text-zinc-500 font-bold uppercase tracking-widest animate-pulse">
            Loading Products...
          </div>
        ) : (
          <section className="px-8 pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden mb-3">
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                    <span className="text-green-500 font-bold text-lg uppercase text-center px-4 tracking-tighter leading-tight">{product.name}</span>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-[11px] font-bold">{product.price} RWF</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center border border-white/10" />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{product.name}</h3>
                    <div className="text-zinc-400 text-xs">{product.uploader}</div>
                    <div className="text-zinc-400 text-xs">{product.views} views</div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* 3. IG-STYLE DETAIL SIDENAV */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-zinc-950 border-l border-white/10 z-[60] transition-transform duration-500 ease-in-out transform ${selectedProduct ? "translate-x-0" : "translate-x-full"}`}>
        {selectedProduct && (
          <div className="flex flex-col h-full relative">
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between sticky top-0 bg-zinc-950 z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center"><span className="text-[10px] font-bold">{selectedProduct.uploader[0]}</span></div>
                </div>
                <span className="font-bold text-sm">{selectedProduct.uploader}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-white/5 rounded-full transition"><IoMdClose size={22} /></button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
              <div className="aspect-square bg-zinc-900 flex items-center justify-center border-b border-white/5">
                <span className="text-4xl font-black text-green-500/10 uppercase tracking-widest text-center px-6">{selectedProduct.name}</span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <button onClick={() => toggleLike(selectedProduct.id)}>{likedProducts[selectedProduct.id] ? <IoIosHeart className="text-red-500 text-3xl" /> : <IoMdHeartEmpty className="text-3xl" />}</button>
                    <IoIosChatbubbles size={28} />
                    <RiShareForwardLine size={28} />
                  </div>
                  <RiBookmarkLine size={26} />
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
                <div className="mb-6"><p className="text-sm"><span className="font-bold mr-2">{selectedProduct.uploader}</span><span className="text-zinc-300">{selectedProduct.description}</span></p></div>
                <div className="space-y-6 pt-6 border-t border-white/5">
                  {selectedProduct.comments.map((comment, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-zinc-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">{comment.user[0]}</div>
                      <div className="flex-1">
                        <p className="text-sm leading-tight"><span className="font-bold mr-2">{comment.user}</span>{comment.text}</p>
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
                  <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." className="bg-transparent text-sm flex-1 outline-none" />
                  {commentText && <button className="text-blue-500 text-sm font-bold ml-2">Post</button>}
                  {!commentText && <IoMdHappy className="text-zinc-500 ml-2" size={20} />}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-[4] bg-green-500 text-black py-3.5 rounded-xl font-black flex items-center justify-center gap-2 active:scale-95 transition-all"><IoIosCart size={20} /> BUY NOW</button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Using navigate for clean routing instead of window.location.href
                    navigate(`/chat?seller=${selectedProduct.uploader}&item=${selectedProduct.name}&price=${selectedProduct.price}`);
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