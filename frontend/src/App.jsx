import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import Chat from "./pages/chart.jsx";
import Features from "./pages/sellers/features.jsx"
import HowItWorks from "./pages/sellers/howItWorks.jsx"
import Pricing from "./pages/sellers/pricing.jsx"
import MarketSpace from "./pages/sellers/Space.jsx";
import Profile from "./pages/sellers/profile.jsx";
import Explore from "./pages/explore.jsx";
import ChatLayout from "./layout/ChartLayout.jsx";
import Wishlist from "./pages/whishlist.jsx";
import './App.css';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        
      </Routes>
      <Routes>
        <Route path="/sellers/space" element={<MarketSpace />} />
        <Route path="/sellers/space/pricing" element={<Pricing />} />
        <Route path="/sellers/space/features" element={<Features />} />
        <Route path="/sellers/space/how-it-works" element={<HowItWorks />} />
        <Route path="/sellers/profile" element={<Profile />} />
      </Routes>
      <Routes>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
