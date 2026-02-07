import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import Chat from "./pages/chart.jsx";
import Explore from "./pages/explore.jsx";
import ChatLayout from "./layout/ChartLayout.jsx";
import Wishlist from "./pages/whishlist.jsx";
import Settings from "./pages/settings.jsx";
import SellerPortal from "./seller/SellerPortal";
import Profile from "./pages/profile.jsx";

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

        <Route path="/Settings" element={<Settings />} />
      </Routes>
      <Routes>
        <Route element={<ChatLayout />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
      <Routes>
        <Route>
          <Route path="/sellers" element={<SellerPortal />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
