import {
  Filter,
  Plus,
  Package,
  MoreVertical,
  Edit3,
  Trash2,
  ExternalLink
} from "lucide-react";

export default function ProductsContent({ products }) {
  return (
    <div className="px-8 pb-16">

      {/* HEADER */}
      <div className="flex justify-between items-end my-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            Inventory
          </h1>
          <p className="text-zinc-500 text-xs mt-1">
            Manage your {products.length} listings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white border border-zinc-800 transition">
            <Filter size={16} />
          </button>

          <button className="bg-green-500 text-black px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-2 hover:bg-green-400 transition active:scale-95">
            <Plus size={14} />
            Add Product
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}

        {/* ADD CARD */}
        <AddProductCard />

      </div>
    </div>
  );
}


function ProductCard({ item }) {
  const statusColor = {
    Live: "bg-green-500/10 text-green-400",
    Draft: "bg-yellow-500/10 text-yellow-400",
    "Out of Stock": "bg-red-500/10 text-red-400",
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden group hover:border-green-500/20 transition-all">

      {/* IMAGE AREA */}
      <div className="h-36 bg-zinc-900 flex items-center justify-center relative">
        <Package size={30} className="text-zinc-700 group-hover:text-green-400 transition" />

        <button className="absolute top-3 right-3 text-zinc-600 hover:text-white">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* BODY */}
      <div className="p-5">

        <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition truncate">
          {item.name}
        </h3>

        {/* PRICE + STATUS */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs font-bold text-white">
            RWF {item.price}
          </span>

          <span className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${statusColor[item.status]}`}>
            {item.status}
          </span>
        </div>

        {/* STOCK */}
        <div className="mt-3 text-[10px] text-zinc-500">
          Stock:
          <span className={`ml-1 font-semibold ${item.stock === 0 ? "text-red-400" : "text-zinc-300"}`}>
            {item.stock}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-zinc-800 opacity-0 group-hover:opacity-100 transition">

          <button className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-green-400">
            <ExternalLink size={12}/>
            View
          </button>

          <div className="flex gap-2">
            <button className="p-1.5 hover:text-green-400 transition">
              <Edit3 size={13}/>
            </button>

            <button className="p-1.5 hover:text-red-400 transition">
              <Trash2 size={13}/>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}


function AddProductCard() {
  return (
    <div className="border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-8 group hover:border-green-500/30 transition cursor-pointer min-h-[260px]">

      <div className="p-3 rounded-full bg-zinc-900 text-zinc-600 group-hover:text-green-400 transition-colors">
        <Plus size={22} />
      </div>

      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mt-4">
        Create New Listing
      </p>

      <p className="text-[10px] text-zinc-500 mt-1">
        Add product details
      </p>
    </div>
  );
}
