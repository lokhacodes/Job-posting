import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";

const Dashboard = () => {

  const [stats, setStats] = useState({});

  useEffect(() => {

    const loadData = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    loadData();

  }, []);

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Header />

        <StatsCards stats={stats} />

      </div>

    </div>
  );
};

export default Dashboard;