import { X, Package } from "lucide-react";

export default function CustomerOrdersPanel({ customer, onClose }) {
  if (!customer) return null;

  // Replace later with Prisma data
  const orders = [
    { id: "ORD-001", item: "Leather Space Chair", total: "120k", date: "12 Jan" },
    { id: "ORD-002", item: "Neon Ambience Kit", total: "45k", date: "22 Jan" },
    { id: "ORD-003", item: "Oak Desk", total: "350k", date: "02 Feb" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="flex-1 bg-black/60 backdrop-blur-sm"
      />

      {/* PANEL */}
      <div className="
        w-[420px]
        bg-zinc-950
        border-l border-zinc-800
        shadow-2xl
        p-6
        animate-slideIn
        overflow-y-auto
      ">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {customer.name}
            </h2>
            <p className="text-xs text-zinc-500">
              Order History
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:text-red-400 transition"
          >
            <X size={18}/>
          </button>
        </div>

        {/* ORDERS */}
        <div className="space-y-3">

          {orders.map(order => (
            <div
              key={order.id}
              className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-green-500/20 transition"
            >
              <div className="flex items-center gap-3">
                <Package size={16} className="text-green-400"/>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    {order.item}
                  </p>
                  <p className="text-[10px] text-zinc-500">
                    {order.id} • {order.date}
                  </p>
                </div>
              </div>

              <div className="text-xs font-bold text-white">
                RWF {order.total}
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}
