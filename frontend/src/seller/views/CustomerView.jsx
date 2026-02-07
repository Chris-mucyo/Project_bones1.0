import { Search, MoreVertical, ExternalLink, Mail } from "lucide-react";
import { useState } from "react";
import CustomerOrdersPanel from "../components/CustomerOrderPanel.jsx";



export default function CustomersView() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const customers = [
        {
            id: 1,
            name: "Alice Umutoni",
            email: "alice@example.com",
            spend: "850k",
            orders: 14,
            status: "Loyal",
        },
        {
            id: 2,
            name: "Sonia Gisa",
            email: "sonia@example.com",
            spend: "2.4M",
            orders: 42,
            status: "VIP",
        },
    ];

    const statusStyle = {
        VIP: "bg-green-500/10 text-green-400",
        Loyal: "bg-blue-500/10 text-blue-400",
        New: "bg-zinc-800 text-zinc-500",
    };

    return (
        <div className="px-8 pb-16">

            {/* HEADER */}
            <div className="flex justify-between items-end my-8">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        Customers
                    </h1>
                    <p className="text-zinc-500 text-xs mt-1">
                        People who bought from your store
                    </p>
                </div>

                <div className="relative">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                        placeholder="Search customers..."
                        className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-9 pr-4 text-xs w-56 outline-none focus:border-green-500/40"
                    />
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-zinc-900/20 border border-zinc-800 rounded-3xl overflow-hidden">

                <table className="w-full text-left">
                    <thead className="border-b border-zinc-800 bg-zinc-900/40">
                        <tr>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">
                                Customer
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">
                                Orders
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">
                                Total Spend
                            </th>
                            <th className="px-6 py-4 text-[10px] font-bold text-zinc-500 uppercase">
                                Status
                            </th>
                            <th className="px-6 py-4" />
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-900">
                        {customers.map((c) => (
                            <tr
                                key={c.id}
                                onClick={() => setSelectedCustomer(c)}
                                className="cursor-pointer hover:bg-zinc-900/40 transition"
                            >
                                {/* CUSTOMER */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                            {c.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-zinc-200">
                                                {c.name}
                                            </p>
                                            <p className="text-[10px] text-zinc-500">
                                                {c.email}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* ORDERS */}
                                <td className="px-6 py-4 text-xs text-zinc-300">
                                    {c.orders}
                                </td>

                                {/* SPEND */}
                                <td className="px-6 py-4 text-xs font-bold text-white">
                                    RWF {c.spend}
                                </td>

                                {/* STATUS */}
                                <td className="px-6 py-4">
                                    <span
                                        className={`text-[9px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${statusStyle[c.status]}`}
                                    >
                                        {c.status}
                                    </span>
                                </td>

                                {/* ACTIONS */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <button className="p-1.5 hover:text-green-400 transition">
                                            <ExternalLink size={14} />
                                        </button>
                                        <button className="p-1.5 hover:text-green-400 transition">
                                            <Mail size={14} />
                                        </button>
                                        <button className="p-1.5 hover:text-zinc-300 transition">
                                            <MoreVertical size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* EMPTY STATE (future-ready) */}
                {customers.length === 0 && (
                    <div className="p-10 text-center text-zinc-500 text-sm">
                        No customers yet
                    </div>
                )}
            </div>
            <CustomerOrdersPanel
                customer={selectedCustomer}
                onClose={() => setSelectedCustomer(null)}
            />
        </div>
    );
}
