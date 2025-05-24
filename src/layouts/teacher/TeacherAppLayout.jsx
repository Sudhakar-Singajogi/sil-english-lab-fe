import { Outlet } from "react-router-dom";
import "./AppLayout.css";
import { useUI } from "../../context/UIContext";
import Sidebar from "../../components/teacher/Sidebar";
import Topbar from "../../components/teacher/Topbar";

const TeacherAppLayout = () => {
  const { isSidebarOpen, dispatch } = useUI();

  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

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
      <aside className="teacher-sidebar">
        <Sidebar />        
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
