// File: src/columns/userColumns.js
import { Pencil, ToggleOn, ToggleOff } from "react-bootstrap-icons";
import { renderRole, renderStatus } from "../../utils/renderUtils";


export function getUserColumns(onEdit, onToggle, featureAllowed) {
  return [
    { key: "fullName", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role", render: renderRole },
    { key: "status", title: "Status", render: renderStatus },
    {
      key: "actions",
      title: "Actions",
      edit: featureAllowed("edit-user"),
      delete: featureAllowed("delete-user"),
      render: (_, row) => (
        <div className="d-flex gap-2">
          {featureAllowed("edit-user") && (
            <Pencil
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(row);
              }}
              size={18}
              className="text-primary me-2 cursor-pointer"
            />
          )}
          {featureAllowed("delete-user") && (
            row.status === "active" ? (
              <ToggleOn
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(row, false); // deactivate
                }}
                size={22}
                className="text-success cursor-pointer"
              />
            ) : (
              <ToggleOff
                role="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggle(row, true); // activate
                }}
                size={22}
                className="text-muted cursor-pointer"
              />
            )
          )}
        </div>
      ),
    },
  ];
}
