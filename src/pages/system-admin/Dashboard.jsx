import React from 'react';
import { useUI } from "../../context/UIContext";


function AdminDashboard() {
    const { isSidebarOpen } = useUI();
    console.log('isSidebarOpen is', isSidebarOpen);
  return (
    <div className="dashboard-content">
        <div className={`dashboard-sidebar ${isSidebarOpen ? 'show-dashboard-sidebar' : 'hide-dashboard-sidebar'}`}>
            Left content here
        </div>
        <div className="dashboard-content-section">
        <h3>System Admin Dashboard</h3>

        </div>
        
    </div>
  )
}

export default AdminDashboard