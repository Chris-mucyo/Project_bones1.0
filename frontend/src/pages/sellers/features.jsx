import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Features() {
  const { state } = useLocation();
  const space = state?.space;
  const navigate = useNavigate();

  // Reusable header
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

  // No space fallback
  if (!space) {
    return (
      <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
        <NavHeader />
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <h1 className="text-3xl font-bold">No space selected.</h1>
          <p className="text-white/60 mt-2">
            Go back to{" "}
            <NavLink to="/sellers/space" className="text-green-500 underline">
              Available Spaces
            </NavLink>{" "}
            to choose a space.
          </p>
        </div>
      </div>
    );
  }

  // Features list (you can expand this dynamically)
  const features = space.features.length
    ? space.features
    : ["No features listed for this space yet."];

  return (
    <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
      <NavHeader />

      <main className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-4">{space.title} - Features</h1>
        <p className="text-white/60 mb-10">
          Explore the tools and benefits included with this marketplace space.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6 flex items-start gap-3"
            >
              <span className="text-green-500 text-xl font-bold">✓</span>
              <p className="text-white/70">{feature}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
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
