import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import OverviewView from "./views/OverviewView";
import ProductsView from "./views/PeoductView";
import CustomersView from "./views/CustomerView";

export default function SellerPortal() {
  const [activeTab, setActiveTab] = useState("Overview");

  const products = [
    { id: 1, name: "Leather Space Chair", price: "120k", stock: 12, status: "Live" },
    { id: 2, name: "Neon Ambience Kit", price: "45k", stock: 0, status: "Out of Stock" },
    { id: 3, name: "Minimalist Oak Desk", price: "350k", stock: 4, status: "Live" },
    { id: 4, name: "Mechanical G-Pro", price: "85k", stock: 24, status: "Draft" },
  ];

  return (
    <div className="flex h-screen bg-black text-zinc-200 overflow-hidden font-sans">

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto relative">
        <TopBar />

        {activeTab === "Overview" && <OverviewView />}
        {activeTab === "Products" && <ProductsView products={products} />}
        {activeTab === "Customers" && <CustomersView />}
      </main>

    </div>
  );
}
