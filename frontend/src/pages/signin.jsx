import {
  IoLogInOutline,
  IoEye,
  IoEyeOff,
  IoMailOutline,
  IoCallOutline,
  IoCartOutline,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/login";

export default function SignIn() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [usePhone, setUsePhone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        password: form.password,
        ...(usePhone
          ? { phone: normalizePhone(form.identifier) }
          : { email: form.identifier }),
      };

      const res = await axios.post(API_URL, payload);

      localStorage.setItem("token", res.data.token);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Top-left animated gradient */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px]
        bg-gradient-to-br from-green-500/35 via-green-500/10 to-transparent
        blur-3xl animate-gradient-slow z-0" />

      {/* Bottom-right animated gradient */}
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px]
        bg-gradient-to-tl from-green-500/35 via-green-500/10 to-transparent
        blur-3xl animate-gradient-slow z-0" />

      {/* Marketing background icon */}
      <IoCartOutline
        className="absolute bottom-[-80px] right-[-80px] text-green-500 opacity-30
        text-[350px] pointer-events-none z-0"
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* LEFT VISUAL */}
        <div className="hidden md:flex items-center justify-center">
          <div className="max-w-md px-10">
            <h1 className="text-4xl font-semibold leading-tight">
              Welcome back.
            </h1>
            <p className="mt-4 text-gray-400">
              Sign in to continue buying, chatting, and selling securely.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <IoLogInOutline className="text-green-500 text-3xl" />
              <h2 className="text-3xl font-semibold">Sign In</h2>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 text-sm text-red-500 bg-red-500/10 px-4 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Toggle */}
            <div className="flex gap-4 mb-6 text-sm">
              <button
                type="button"
                onClick={() => setUsePhone(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                  ${!usePhone ? "bg-green-500 text-black" : "bg-gray-800 text-gray-400 hover:text-white"}`}
              >
                <IoMailOutline />
                Email
              </button>
              <button
                type="button"
                onClick={() => setUsePhone(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition
                  ${usePhone ? "bg-green-500 text-black" : "bg-gray-800 text-gray-400 hover:text-white"}`}
              >
                <IoCallOutline />
                Phone
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  {usePhone ? "Phone number" : "Email"}
                </label>
                <input
                  type={usePhone ? "tel" : "email"}
                  name="identifier"
                  value={form.identifier}
                  onChange={handleChange}
                  required
                  placeholder={usePhone ? "07xx xxx xxx or +2507xx..." : "you@example.com"}
                  className="w-full px-4 py-3 bg-black/60 border border-gray-700
                  rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-black/60 border border-gray-700
                    rounded-xl focus:outline-none focus:border-green-500 backdrop-blur transition pr-12"
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

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl font-semibold transition
                ${loading ? "bg-green-500/40 cursor-not-allowed" : "bg-green-500 text-black hover:bg-green-400"}`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <hr className="flex-1 border-gray-700" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-700" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-4">
              <button
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-700
                bg-black hover:bg-gray-900 transition"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
              </button>
              <button
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-700
                bg-black hover:bg-gray-900 transition"
              >
                <FaApple className="text-xl" />
                Continue with Apple
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/auth/signup")}
                className="text-green-500 hover:underline cursor-pointer"
              >
                Create one
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { transform: translate(0, 0); }
            50% { transform: translate(40px, 30px); }
            100% { transform: translate(0, 0); }
          }
          .animate-gradient-slow {
            animation: gradientMove 12s ease-in-out infinite;
          }
        `}
      </style>
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
