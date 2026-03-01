import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Home from "./pages/Home";
import Footer from "../components/Footer";
import Companies from "../components/Company";
import Categories from "../components/Category";

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
      <Companies />
      <Categories />
      <Footer />
    </div>
  );
}

export default App;