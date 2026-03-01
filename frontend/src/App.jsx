import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Home from "./pages/Home";
import Footer from "../components/Footer";
import Company from "../components/Company";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Company />
      <Footer />
    </div>
  );
}

export default App;