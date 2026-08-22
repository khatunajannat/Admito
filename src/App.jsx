import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
  

function App() {
  return (
    <div className="min-h-screen bg-stone-200 text-slate-800 overflow-hidden">
      <Navbar />

      <Hero />

      <Features />
      <Footer />
    </div>
  );
}

export default App;
