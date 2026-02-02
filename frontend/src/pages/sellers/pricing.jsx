import { useLocation } from "react-router-dom";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SideNav from "../../components/sideNav";

export default function Pricing() {
    const { state } = useLocation();
    const space = state?.space;

    const [phone, setPhone] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        if (!phone) {
            alert("Enter your MTN MoMo number");
            return;
        }

        if (!agreed) {
            alert("You must agree to the terms and conditions");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/payments/momo/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    spaceId: space.id,
                    amount: space.price,
                    phone,
                }),
            });

            const data = await res.json();

            if (data.success) {
                alert("Payment request sent. Approve on your phone.");
            } else {
                alert("Payment failed");
            }
        } catch {
            alert("Network error");
        } finally {
            setLoading(false);
        }
    };

    if (!space) {
        return (
            <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
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
                <div className="min-h-screen bg-black text-white flex items-center justify-center">
                    No space selected
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-screen bg-zinc-950 text-white relative">
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
            <div className="min-h-screen bg-black text-white px-6 py-12">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* LEFT: SPACE DETAILS */}
                    <div className="md:col-span-2 bg-zinc-950 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-2">{space.title}</h2>
                        <p className="text-white/60 mb-6">{space.category} Marketplace Space</p>

                        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                            <div className="bg-black rounded-xl p-4 border border-white/10">
                                <p className="text-white/60">Products Allowed</p>
                                <p className="font-semibold">{space.products}</p>
                            </div>

                            <div className="bg-black rounded-xl p-4 border border-white/10">
                                <p className="text-white/60">Monthly Views</p>
                                <p className="font-semibold">{space.views}</p>
                            </div>

                            <div className="bg-black rounded-xl p-4 border border-white/10">
                                <p className="text-white/60">Avg Sales</p>
                                <p className="font-semibold">{space.sales}</p>
                            </div>

                            <div className="bg-black rounded-xl p-4 border border-white/10">
                                <p className="text-white/60">Subscription</p>
                                <p className="font-semibold">30 Days</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold mb-2">What you get</h3>
                            <ul className="text-sm text-white/70 space-y-2">
                                <li>✔ Dedicated seller space</li>
                                <li>✔ Product management dashboard</li>
                                <li>✔ Visibility in marketplace</li>
                                <li>✔ Monthly analytics & insights</li>
                            </ul>
                        </div>

                        <div className="mb-6 text-white/60 text-sm">
                            Want to learn more about what each space offers? Check out the{" "}
                            <NavLink
                                className="text-green-500 font-semibold cursor-pointer"
                                to="/sellers/space/features"
                            >
                                Features
                            </NavLink>{" "}
                            section to explore all tools, and visit{" "}
                            <NavLink
                                className="text-green-500 font-semibold cursor-pointer"
                                to="/sellers/space/how-it-works"
                            >
                                How It Works
                            </NavLink>{" "}
                            to understand how to set up your space efficiently.
                        </div>


                    </div>

                    {/* RIGHT: CHECKOUT */}
                    <div className="bg-zinc-950 border border-white/10 rounded-2xl p-8 h-fit">
                        <h3 className="text-lg font-semibold mb-4">Checkout</h3>

                        <div className="flex justify-between mb-4 text-sm">
                            <span>Space price</span>
                            <span className="font-semibold text-green-400">
                                {space.price} RWF
                            </span>
                        </div>

                        <div className="border-t border-white/10 my-4" />

                        <input
                            type="tel"
                            placeholder="MTN MoMo (07XXXXXXXX)"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full mb-4 px-4 py-3 rounded-xl bg-black border border-white/10 focus:outline-none"
                        />

                        <label className="flex items-start gap-3 text-sm text-white/70 mb-6">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1"
                            />
                            <span>
                                I agree to the{" "}
                                <span className="text-green-400 underline cursor-pointer">
                                    Terms & Conditions
                                </span>{" "}
                                and understand that this is a recurring monthly subscription.
                            </span>
                        </label>

                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-green-500 text-black font-semibold disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Pay with MTN MoMo"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
