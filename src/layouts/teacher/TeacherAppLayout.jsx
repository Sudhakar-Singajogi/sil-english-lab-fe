import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import { useUI } from "../../context/UIContext";
import Sidebar from "../../components/teacher/Sidebar";
import Topbar from "../../components/teacher/Topbar";
import MobileSidebar from "../../components/teacher/MobileSidebar";
import { useEffect } from "react";

const TeacherAppLayout = () => {
  const { isSidebarOpen, dispatch } = useUI();

  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  useEffect(() => {
    console.log("isSidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    // <main className="layout">
    //   <div className="sidebar-content">
    //     <Sidebar isOpen={isSidebarOpen} />
    //   </div>
    //   <div className="main">
    //     <Topbar onToggleSidebar={toggleSidebar} />

    //     <div className="content">
    //       <Outlet isSidebarOpen={isSidebarOpen} />
    //     </div>
    //   </div>
    // </main>

    <div className="teacher-layout">
      
      <aside>
        <div className="teacher-sidebar md-d-none">
          <Sidebar />
        </div>
        <div className="lg-d-none">
          <MobileSidebar  isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>
      <main className="teacher-content">
        <Topbar />
        <section className="main-content">
          <Outlet isSidebarOpen={isSidebarOpen} />
        </section>
      </main>
    </div>
  );
};

export default TeacherAppLayout;
