import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function HowItWorks() {
  const { state } = useLocation();
  const space = state?.space;
  const navigate = useNavigate();

  // Header nav links
  const NavHeader = () => (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">MarketSpace</h1>
          <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-md font-semibold">
            SELLER
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-sm">
          <NavLink
            to="/sellers/space"
            className={({ isActive }) =>
              isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
            }
          >
            Available Spaces
          </NavLink>
          <NavLink
            to="/sellers/space/pricing"
            className={({ isActive }) =>
              isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/sellers/space/features"
            className={({ isActive }) =>
              isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/sellers/space/how-it-works"
            className={({ isActive }) =>
              isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
            }
          >
            How It Works
          </NavLink>
        </nav>
      </div>
    </header>
  );

  // If no space selected
  if (!space) {
    return (
      <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
        <NavHeader />
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <h1 className="text-3xl font-bold">
            No space selected.
          </h1>
          <p className="text-white/60 mt-2">
            Go back to <NavLink to="/sellers/space" className="text-green-500 underline">Available Spaces</NavLink> to select one.
          </p>
        </div>
      </div>
    );
  }

  // How It Works steps (example)
  const steps = [
    {
      title: "Select Your Space",
      desc: `You chose the "${space.title}" which belongs to the ${space.category} category.`
    },
    {
      title: "Manage Your Products",
      desc: `Add your products, set prices, and organize them in your dashboard. You can list up to ${space.products} products.`
    },
    {
      title: "Go Live & Track Sales",
      desc: `Once subscribed, your space will be visible to thousands of potential customers. Monitor views (${space.views}) and sales (${space.sales}) using analytics.`
    },
    {
      title: "Optimize & Grow",
      desc: "Use built-in tools and features to boost your sales and customer engagement."
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
      <NavHeader />

      <main className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-4">{space.title} - How It Works</h1>
        <p className="text-white/60 mb-10">
          Follow these simple steps to start selling in your marketplace space.
        </p>

        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-semibold mb-2">
                Step {idx + 1}: {step.title}
              </h2>
              <p className="text-white/70">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/sellers/space/pricing", { state: { space } })}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-xl transition"
          >
            Subscribe & Start Selling
          </button>
        </div>
      </main>
    </div>
  );
}
