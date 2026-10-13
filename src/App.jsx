
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Reminder from "./pages/Reminder";
import Schedule from "./pages/Schedule";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    reminder: <Reminder />,
    schedule: <Schedule />,
  };

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        {pages[activePage]}
      </main>
    </div>
  );
}
