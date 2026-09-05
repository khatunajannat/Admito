import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotificationsPage from "./pages/NotificationsPage";
import ImportantDates from "./pages/ImportantDates";
import Circulars from "./pages/Circulars";
import Assessment from "./pages/Assessment";
import Information from "./pages/Information";
import Account from "./pages/Account";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-200 text-slate-800 pt-16">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/important-dates" element={<ImportantDates />} />
          <Route path="/circulars" element={<Circulars />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/information" element={<Information />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
