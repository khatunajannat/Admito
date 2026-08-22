import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotificationsPage from "./components/NotificationsPage";
import ImportantDates from "./components/ImportantDates";
import Circulars from "./components/Circulars";
import Assessment from "./components/Assessment";
import Information from "./components/Information";
import Account from "./components/Account";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-200 text-slate-800">
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
          {/* add more routes here, e.g. /status, /documents */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;