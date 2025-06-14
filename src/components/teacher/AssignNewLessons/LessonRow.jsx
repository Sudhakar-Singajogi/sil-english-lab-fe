import React from "react";
import { Form } from "react-bootstrap";

const LessonRow = ({
  lesson = {},
  level = "",
  chapterName = "",
  isChecked = false,
  isAssigned = false,
  onCheckChange = () => {},
  conflictedLesson
}) => {
  const handleChange = (e) => {
    onCheckChange(lesson?.id, e.target.checked);
  };
  

  return (
    <tr key={lesson?.documentId}>
      <td>
        {!isAssigned && (
          <Form.Check
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
          />
        )}
      </td>
      <td>{level}</td>
      <td>{chapterName}</td>
      <td>{lesson?.title}</td>
      <td>
        {isAssigned ? (
          <i
            className="bi bi-check2-circle is-assigned"
            title="Yes Assigned"
          />
        ) : (
          <i
            className="bi bi-ban not-assigned"
            title="Not Assigned"
          />
        )}
      </td>
    </tr>
  );
};

export default LessonRow;
