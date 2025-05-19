// File: src/pages/system-admin/Dashboard.jsx

import React from "react";
import { useUI } from "../../context/UIContext";
import "./AdminDashboard.css"; // import custom CSS for styling
import {
  BuildingFill,
  PeopleFill,
  PatchCheckFill,
  ClockFill,
  GraphUp,
  BellFill,
  InfoCircle,
} from "react-bootstrap-icons";

import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DonutChart from "../../components/DonutChart";

import Breadcrumb from "../../components/Breadcrumb";
import SystemUsageChart from "../../components/SystemUsageChart";

const renderTooltip = (msg) => <Tooltip id="tooltip-custom">{msg}</Tooltip>;

const StatCard = ({ icon, title, children }) => (
  <div className="col-md-4 d-flex">
    <div className="card stat-card hover-shadow w-100 h-100">
      <div className="card-body">
        <div className="d-flex align-items-stretch gap-2 mb-3">
          <div className="stat-icon">{icon}</div>
          <h6 className="mb-0 stat-title">{title}</h6>
        </div>
        {children}
      </div>
    </div>
  </div>
);

const breadcrumbs = [
  { label: "Home", path: "/", icon: "bi bi-house" },
  { label: "Admin", path: "/admin", icon: "bi bi-gear" },
  { label: "Dashboard", icon: "bi bi-speedometer" }, // current page
];

const infoCard = (isSidebarOpen) => {
  return (
    <>
      {/* <div
        className={`dashboard-sidebar ${
          isSidebarOpen ? "show-dashboard-sidebar " : "hide-dashboard-sidebar "
        }`}
      ></div> */}
      {/* <div
        className={`dashboard-content-section ${
          isSidebarOpen ? "dashboard-content-section-close" : ""
        }`}
      > */}
      <div
        className="dashboard-content-section">
        <div className="container-fluid py-2">
          {/* <h3 className="dashboard-header">System Admin Dashboard</h3> */}

          <div className="row g-2 dashboard-row">
            <StatCard
              icon={<BuildingFill className="text-primary fs-3" />}
              title="Total Schools"
            >
              <div className="stat-number">12</div>
            </StatCard>

            <StatCard
              icon={<PeopleFill className="text-success fs-3" />}
              title="Total Users"
            >
              <ul className="list-unstyled mb-0">
                <li>
                  Admin: <strong>20</strong>
                </li>
                <li>
                  Teacher: <strong>15</strong>
                </li>
                <li>
                  Student: <strong>120</strong>
                </li>
              </ul>
            </StatCard>

            <div className="col-md-4 d-flex active-licenses">
              <div className="card hover-shadow">
                <div
                  className="card-body d-flex flex-column justify-content-between"
                  style={{ minHeight: "220px" }}
                >
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="stat-icon">
                        {<PatchCheckFill className="text-info fs-3" />}{" "}
                      </div>

                      <h6 className="mb-0 stat-title">
                        Active Licenses
                        {/* <OverlayTrigger
                          placement="right"
                          overlay={renderTooltip(
                            "Current breakdown of license states"
                          )}
                        >
                          <InfoCircle className="ms-2 text-muted" />
                        </OverlayTrigger> */}
                      </h6>
                      <div className="text-end btn-dnt-show-in-tab">
                        <a
                          href="/admin/licenses"
                          className="btn btn-sm btn-outline-primary"
                        >
                          View Details
                        </a>
                      </div>
                    </div>

                    {/* Inline legend with dots */}
                    <div className="d-flex justify-content-between active-lic-legands">
                      <span>
                        <span className="legend-dot bg-primary"></span> Active
                      </span>
                      <span>
                        <span className="legend-dot bg-danger"></span> Expired
                      </span>
                      <span>
                        <span className="legend-dot bg-warning"></span> Upcoming
                      </span>
                    </div>

                    <div className="active-lic-donut-chart-container">
                      <DonutChart showLegend={false} />
                    </div>
                    <div className="text-end btn-show-in-tab">
                      <a
                        href="/admin/licenses"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 d-flex system-usage-trends">
              <div className="card hover-shadow">
                <div className="card-body">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="stat-icon">
                      {<i className="bi bi-graph-up fs-4 text-secondary"></i>}{" "}
                    </div>

                    <h6 className="mb-0 stat-title">System Usage Trends</h6>
                  </div>
                  <SystemUsageChart />

                  <div className="text-end mt-2">
                    <a
                      href="/reports"
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="show-from-1024 col-md-4 notifications-approavals">{notificationsApproval()}</div>
            <div className="show-till-1024 col-md-4 notifications-approavals">{notificationsApproval()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const notificationsApproval = () => (
  <div className="row g-4 dashboard-row ">
    <div className="">
      <div className="card hover-shadow">
        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{ minHeight: "220px" }}
        >
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <BellFill className="text-danger fs-3" />
              <h6 className="mb-0 stat-title">
                Notifications / Approvals
                <OverlayTrigger
                  placement="right"
                  overlay={renderTooltip("Alerts requiring admin attention")}
                >
                  <InfoCircle className="ms-2 text-muted" />
                </OverlayTrigger>
              </h6>
            </div>

            <ul className="list-unstyled mb-3">
              <li>
                <span className="badge bg-success me-2">✔</span>
                New user approval pending
              </li>
              <li>
                <span className="badge bg-success me-2">✔</span>
                License upgrade requested
              </li>
            </ul>
          </div>

          <div className="text-end">
            <a
              href="/admin/approvals"
              className="btn btn-sm btn-outline-primary"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);
const Dashboard = () => {
  const { isSidebarOpen } = useUI();
  console.log("isSidebarOpen:", isSidebarOpen);

  return (
    <div className="dashboard-content ">
      <div class="accordion dashboardStats" id="dashboardStats">
        <div className="container-fluid">
          <Breadcrumb items={breadcrumbs} />
          <h3 className="component-header">System Admin Dashboard</h3>
          {/* your cards here */}
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              View Stats
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#dashboardStats"
          >
            <div class="accordion-body">{infoCard(isSidebarOpen)}</div>
          </div>
        </div>
      </div>

      <div className="dashboardStatsNoAccord">
        <div className="container-fluid">
          <Breadcrumb items={breadcrumbs} />
          <h3 className="component-header">System Admin Dashboard</h3>
          {/* your cards here */}
        </div>
        {infoCard(isSidebarOpen)}
      </div>
    </div>
  );
};

export default Dashboard;
