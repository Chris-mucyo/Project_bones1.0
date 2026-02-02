import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./layout/HomeLayout.jsx";
import SignIn from "./pages/signin.jsx";
import SignUp from "./pages/signup.jsx";
import Home from "./pages/home.jsx";
import Chat from "./pages/chart.jsx";
import MarketSpace from "./pages/sellers/Space.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Routes>
        <Route path="/sellers/space" element={<MarketSpace />} />
      </Routes>
    </BrowserRouter>
  );
}
