// File: src/columns/userColumns.js
import { Pencil, ToggleOn, ToggleOff } from "react-bootstrap-icons";


export function getAssignedLessonsCols() {
  return [
    { key: "chapter", title: "Chapter" },
    { key: "lesson", title: "Lesson" },
    { key: "class", title: "Class/Section"},
    { key: "status", title: "Status",},
    {
      key: "actions",
      title: "Actions",
      render: (_, row) => (
        <></>
      ),
    },
  ];
}
