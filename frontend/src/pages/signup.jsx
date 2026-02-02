import {
  IoEye,
  IoEyeOff,
  IoCartOutline,
  IoMailOutline,
  IoCallOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/register";

const CATEGORY_DATA = [
  { name: "Fashion & Apparel", icon: "👕", keywords: ["fashion", "clothes", "shoes"] },
  { name: "Electronics", icon: "📱", keywords: ["electronics", "phone", "tv"] },
  { name: "Home & Living", icon: "🏠", keywords: ["home", "furniture"] },
  { name: "Beauty & Personal Care", icon: "💄", keywords: ["beauty", "cosmetics"] },
  { name: "Food & Beverages", icon: "🍔", keywords: ["food", "restaurant"] },
  { name: "Health & Wellness", icon: "🧘", keywords: ["health", "fitness"] },
  { name: "Phones & Accessories", icon: "📲", keywords: ["phone", "mobile"] },
  { name: "Computers & Office", icon: "💻", keywords: ["computer", "office"] },
  { name: "Books & Stationery", icon: "📚", keywords: ["books", "school"] },
  { name: "Music & Instruments", icon: "🎸", keywords: ["music", "instrument"] },
  { name: "Sports & Outdoors", icon: "⚽", keywords: ["sports", "gym"] },
  { name: "Wholesale & Bulk", icon: "📦", keywords: ["wholesale", "bulk"] },
];

export default function SignUpWizard() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [search, setSearch] = useState(""); // Moved here
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState("next");

  const [form, setForm] = useState({
    fullName: "",
    identifier: "",
    password: "",
    confirmPassword: "",
    role: "",
    shopName: "",
    licenseNumber: "",
    IdNumber: "",
    location: "",
    interests: [],
    categories: [],
    profileImage: null,
    profilePreview: null,
  });

  // Additional states for search and category filtering
  const [categorySearch, setCategorySearch] = useState(""); // For category search input

  useEffect(() => {
    const savedForm = localStorage.getItem("signupForm");
    if (savedForm) setForm(JSON.parse(savedForm));
  }, []);

  useEffect(() => {
    localStorage.setItem("signupForm", JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      const list = form[name];
      if (checked) setForm({ ...form, [name]: [...list, value] });
      else setForm({ ...form, [name]: list.filter((i) => i !== value) });
    } else if (type === "file") {
      const file = files[0];
      if (file)
        setForm({
          ...form,
          profileImage: file,
          profilePreview: URL.createObjectURL(file),
        });
    } else {
      setForm({ ...form, [name]: value });
    }
    setError("");
  };

  const nextStep = () => {
    setDirection("next");
    setStep(step + 1);
  };

  const prevStep = () => {
    setDirection("prev");
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("fullName", form.fullName);
      payload.append("password", form.password);
      payload.append("role", form.role);
      payload.append(
        usePhone ? "phone" : "email",
        usePhone ? normalizePhone(form.identifier) : form.identifier
      );
      if (form.role === "seller") {
        payload.append("shopName", form.shopName);
        payload.append("licenseNumber", form.licenseNumber);
        payload.append("categories", JSON.stringify(form.categories));
      } else {
        payload.append("interests", JSON.stringify(form.interests));
      }
      if (form.profileImage) payload.append("profileImage", form.profileImage);

      const res = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("auth-change"));
      localStorage.removeItem("signupForm");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => alert("Google login clicked");
  const handleAppleLogin = () => alert("Apple login clicked");

  const renderStepText = () => {
    switch (step) {
      case 1:
        return "Enter your account info to start.";
      case 2:
        return "Tell us about your intrests.";
      case 3:
        return form.role === "seller"
          ? "Tell us about your shop."
          : "Select your interested categories.";
      case 4:
        return "You can make a profile picture.";
      case 5:
        return "Review of your information before submitting.";
      default:
        return "";
    }
  };

  // For case 3, prepare filtered categories based on search
  const filteredCategories = CATEGORY_DATA.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle category selection
  const toggleCategory = (cat) => {
    if (form.categories.includes(cat)) {
      setForm(prev => ({
        ...prev,
        categories: prev.categories.filter(c => c !== cat),
      }));
    } else {
      if (form.categories.length >= 5) return;
      setForm(prev => ({
        ...prev,
        categories: [...prev.categories, cat],
      }));
    }
  };

  const renderStepFields = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">
                {usePhone ? "Phone" : "Email"}
              </label>
              <input
                type={usePhone ? "tel" : "email"}
                name="identifier"
                value={form.identifier}
                onChange={handleChange}
                required
                placeholder={usePhone ? "07xx xxx xxx or +2507xx..." : "you@example.com"}
                className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition"
              />
            </div>

            <div className="flex gap-4 mt-3 text-sm">
              <button
                type="button"
                onClick={() => setUsePhone(false)}
                className={`flex-1 py-2 rounded-lg transition ${!usePhone
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setUsePhone(true)}
                className={`flex-1 py-2 rounded-lg transition ${usePhone
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
              >
                Phone
              </button>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-gray-400 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirm ? <IoEyeOff /> : <IoEye />}
                </button>
              </div>
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-4 mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-700 bg-black hover:bg-gray-900 transition"
              >
                <FcGoogle className="text-xl" /> Continue with Google
              </button>
              <button
                type="button"
                onClick={handleAppleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-700 bg-black hover:bg-gray-900 transition"
              >
                <FaApple className="text-xl" /> Continue with Apple
              </button>
            </div>
          </>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xl font-semibold text-green-400">
                Let’s personalize your experience
              </p>
              <p className="text-gray-400 text-sm">
                This helps us tailor the platform for you.
              </p>
            </div>

            {/* ROLE */}
            <div>
              <p className="text-sm text-gray-400 mb-2">
                What do you want to do on our platform?
              </p>
              <div className="flex gap-4">
                {["buyer", "seller"].map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setForm({ ...form, role })}
                    className={`flex-1 py-3 rounded-xl transition font-medium
                ${form.role === role
                        ? "bg-green-500 text-black"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                      }`}
                  >
                    {role === "buyer" ? "Buy Products" : "Sell Products"}
                  </button>
                ))}
              </div>
            </div>

            {/* BUYER QUESTIONS */}
            {form.role === "buyer" && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    How often do you shop online?
                  </label>
                  <select
                    name="shoppingFrequency"
                    value={form.shoppingFrequency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl
                         focus:outline-none focus:border-green-500"
                  >
                    <option className="bg-black text-white" value="">Select</option>
                    <option className="bg-black text-white" value="daily">Daily</option>
                    <option className="bg-black text-white" value="weekly">Weekly</option>
                    <option className="bg-black text-white" value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Typical budget per purchase
                  </label>
                  <select
                    name="budgetRange"
                    value={form.budgetRange}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl
                         focus:outline-none focus:border-green-500"
                  >
                    <option className="bg-black text-white" value="">Select</option>
                    <option className="bg-black text-white" value="low">Below 50,000 RWF</option>
                    <option className="bg-black text-white" value="mid">50k – 200k RWF</option>
                    <option className="bg-black text-white" value="high">Above 200k RWF</option>
                  </select>
                </div>
              </>
            )}

            {/* SELLER QUESTIONS */}
            {form.role === "seller" && (
              <>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Your selling experience
                  </label>
                  <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl
                       focus:outline-none focus:border-green-500"
                  >
                    <option className="bg-black text-white " value="">Select</option>
                    <option className="bg-black text-white" value="beginner">Beginner</option>
                    <option className="bg-black text-white" value="intermediate">Intermediate</option>
                    <option className="bg-black text-white" value="expert">Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    What Products you sell?
                  </label>
                  <select
                    name="experienceLevel"
                    value={form.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl
                       focus:outline-none focus:border-green-500"
                  >
                    <option className="bg-black text-white" value="">Food & Stuff</option>
                    <option className="bg-black text-white" value="beginner">Fashion</option>
                    <option className="bg-black text-white" value="intermediate">Electronics</option>
                    <option className="bg-black text-white" value="expert">Whole sale</option>
                  </select>
                </div>
              </>

            )}
          </div>
        );

      case 3:
        if (form.role === "seller") {
          return (
            <>
              {/* Shop Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={form.shopName}
                  onChange={handleChange}
                  required
                  placeholder="My Awesome Store"
                  className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl
                       focus:outline-none focus:border-green-500 backdrop-blur transition"
                />
              </div>

              {/* Category Search */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 mb-4 bg-black/50 border border-gray-700
                       rounded-xl text-sm focus:outline-none focus:border-green-500"
                />

                <p className="text-xs text-gray-500 mb-2">
                  Select up to 5 categories ({form.categories.length}/5)
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredCategories.map((cat) => {
                    const selected = form.categories.includes(cat.name);
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => toggleCategory(cat.name)}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-sm
                    transition backdrop-blur
                    ${selected
                            ? "bg-green-500/20 border-green-500 text-green-400"
                            : "bg-black/40 border-gray-700 text-gray-300 hover:border-gray-500"
                          }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          );
        }
        break; // Added break for completeness
      case 4:
        return (
          <div className="flex flex-col items-center justify-center gap-6">
            <p className="text-lg font-semibold">Add a profile photo</p>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              A clear photo helps people recognize you. You can change this later.
            </p>

            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />

              {/* IG GRADIENT RING */}
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr
                        from-green-500 via-emerald-400 to-lime-400 p-1">
                <div className="w-full h-full rounded-full bg-black
                          flex items-center justify-center overflow-hidden">
                  {form.profilePreview ? (
                    <img
                      src={form.profilePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Upload</span>
                  )}
                </div>
              </div>

              {/* EDIT BADGE */}
              <span
                className="absolute bottom-2 right-2 bg-green-500 text-black
                     text-xs px-2 py-1 rounded-full shadow-lg
                     group-hover:scale-105 transition"
              >
                Edit
              </span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col items-center gap-4">
            {form.profilePreview && (
              <div className="w-36 h-36 rounded-full border-4 border-green-500 overflow-hidden">
                <img
                  src={form.profilePreview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-semibold">{form.fullName}</h3>
            <p className="text-gray-300">{usePhone ? form.identifier : form.identifier}</p>
            <p className="text-gray-300 capitalize">{form.role}</p>

            {form.role === "seller" && (
              <div className="text-center">
                <p><strong>Shop Name:</strong> {form.shopName}</p>
                <p><strong>License Number:</strong> {form.licenseNumber}</p>
                <p><strong>Categories:</strong> {form.categories.join(", ")}</p>
              </div>
            )}

            {form.role === "buyer" && (
              <div className="text-center">
                <p><strong>Interests:</strong> {form.interests.join(", ")}</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden">
      {/* Background gradients */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-162.5 h-162.5 bg-linear-to-br from-green-500/35 via-green-500/10 to-transparent blur-3xl animate-gradient-slow z-0" />
      <div className="pointer-events-none absolute -bottom-50 -right-50 w-162.5 h-162.5 bg-linear-to-tl from-green-500/35 via-green-500/10 to-transparent blur-3xl animate-gradient-slow z-0" />
      <IoCartOutline
        className="absolute -bottom-20 -right-20 text-green-500 opacity-30
        text-[350px] pointer-events-none z-0"
      />

      {/* Centered card */}
      <div className="relative z-10 w-375 max-w-full h-162.5 bg-black/5 backdrop-blur-3xl rounded-2xl shadow-2xl overflow-hidden flex md:flex-row flex-col">

        {/* Left instructions */}
        <div className="md:w-1/2 p-8 bg-black/40 flex flex-col justify-center">
          <h2 className="text-lg font-semibold mb-2">Step {step} of 5</h2>
          <p className="text-gray-300">{renderStepText()}</p>
        </div>

        {/* Right form fields */}
        <div className="md:w-1/2 p-8 relative overflow-hidden flex items-center justify-center">
          <div className="relative w-full h-full">
            <div
              key={step}
              className={`absolute w-full transition-transform duration-500 ${direction === "next" ? "animate-slide-in-next" : "animate-slide-in-prev"
                }`}
              style={{ top: 0, left: 0 }}
            >
              {renderStepFields()}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 right-8 flex gap-2">
          {step > 1 && (
            <button onClick={prevStep} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              Back
            </button>
          )}
          {step < 5 && (
            <button onClick={nextStep} className="px-4 py-2 bg-green-500 rounded-lg text-black hover:bg-green-400">
              Next
            </button>
          )}
          {step === 5 && (
            <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-green-500 rounded-lg text-black hover:bg-green-400">
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes gradientMove {0%{transform:translate(0,0);}50%{transform:translate(40px,30px);}100%{transform:translate(0,0);}}
        .animate-gradient-slow { animation: gradientMove 12s ease-in-out infinite; }

        @keyframes rotateCart {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
        @keyframes pulseCart {0%,100%{transform:scale(1);}50%{transform:scale(1.05);} }

        @keyframes slideInNext {0%{transform:translateX(100%);}100%{transform:translateX(0);} }
        @keyframes slideInPrev {0%{transform:translateX(-100%);}100%{transform:translateX(0);} }
        .animate-slide-in-next { animation: slideInNext 0.5s forwards; }
        .animate-slide-in-prev { animation: slideInPrev 0.5s forwards; }
      `}</style>
    </div>
  );
}

function normalizePhone(value) {
  if (!value) return value;
  let phone = value.replace(/\s+/g, "");
  if (phone.startsWith("07")) phone = "+25" + phone;
  if (!phone.startsWith("+250")) phone = "+250" + phone.replace(/^0+/, "");
  return phone;
}