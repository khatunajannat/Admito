import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NotificationsPage from "./components/NotificationsPage";
import ImportantDates from "./components/ImportantDates";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-200 text-slate-800">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/important-dates" element={<ImportantDates />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
