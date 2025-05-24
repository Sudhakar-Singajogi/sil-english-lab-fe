// File: src/columns/userColumns.js
import { Pencil, ToggleOn, ToggleOff } from "react-bootstrap-icons";
import { renderStatus } from "../../utils/renderUtils";

export function getStudentsColumns(onEdit, onToggle, featureAllowed) {
    const delUser = false;
    const editStudent = true;
  return [
    { key: "fullName", title: "Name" },
    { key: "email", title: "Email" },
    { key: "whichClass", title: "Class" },
    { key: "section", title: "Section" },
    { key: "status", title: "Status", render: renderStatus },
    {
      key: "actions",
      title: "Actions",
      edit: editStudent,
      delete: delUser,
      render: (_, row) => (
        <div className="d-flex gap-2">  </div>
      ),
    },
  ];
}
