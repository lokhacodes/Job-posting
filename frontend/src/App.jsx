import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Companies from "./components/Company";
import Categories from "./components/Category";
import FeaturedJobs from "./components/FeaturedJobs";
import LatestJobs from "./components/Latestjobs";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Routes>
        {/* Main Website Routes */}
        <Route path="/" element={
          <>
            <Navbar />
            <div className="main-container">
              <Header />
              <Companies />
              <Categories />
              <FeaturedJobs />
              <LatestJobs />
            </div>
            <Footer />
          </>
        } />
        
        {/* Jobs Listing Page */}
        <Route path="/jobs" element={<JobsPage />} />
        
        {/* Job Detail Page */}
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
