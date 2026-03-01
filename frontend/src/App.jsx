import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

import Home from "./pages/Home";


function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
        
        </Routes>
      </div>
    
    </div>
  );
}

export default App;