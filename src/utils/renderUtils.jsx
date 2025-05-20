export const roleColors = {
  "system-admin": "danger",
  "super-admin": "warning",
  teacher: "info",
  student: "secondary",
};

export const renderRole = (role, withIcon = false) => {
  const color = roleColors[role] || "dark";
  return (
    <span className={`badge bg-${color}`}>
      {withIcon && <i className="bi bi-person me-1"></i>}
      {role}
    </span>
  );
};


export const renderStatus = (status) => (
  <span className={`badge bg-${status === "active" ? "success" : "secondary"}`}>
    {status}
  </span>
);