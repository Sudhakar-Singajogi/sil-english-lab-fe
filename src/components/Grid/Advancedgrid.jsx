import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Advancedgrid.css";
import { ArrowDown, ArrowUp, ThreeDotsVertical, ChevronDown, ChevronRight } from "react-bootstrap-icons";

const AdvancedGrid = ({
  columns,
  data,
  onRowClick,
  enableSelection = false,
  selectedRows = [],
  onSelectionChange = () => {},
  enableBulkActions = false,
  bulkActions = [],
  enableRowHighlight = false,
  enableActionDropdown = false,
  enableRowExpand = false,
  renderExpandedRow = null,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [localSelected, setLocalSelected] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    setLocalSelected(selectedRows);
  }, [selectedRows]);

  const isAllSelected = data.length > 0 && localSelected.length === data.length;

  const toggleRow = (row) => {
    const exists = localSelected.find((r) => r.id === row.id);
    let updated = [];
    if (exists) {
      updated = localSelected.filter((r) => r.id !== row.id);
    } else {
      updated = [...localSelected, row];
    }
    setLocalSelected(updated);
    onSelectionChange(updated);
  };

  const toggleAll = () => {
    if (isAllSelected) {
      setLocalSelected([]);
      onSelectionChange([]);
    } else {
      setLocalSelected(data);
      onSelectionChange(data);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

//   const toggleExpand = (id) => {
//     setExpandedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

  const showDropdown = (key) => (
    <td key={key}>
      <div className="dropdown">
        <button
          className="btn btn-sm btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ThreeDotsVertical />
        </button>
        <ul className="dropdown-menu">
          <li>
            {/* <button className="dropdown-item">Edit</button> */}
            <i className="bi bi-pencil-fill"></i> Edit
          </li>
          <li>
            <i className="bi bi-trash3"></i> Delete
          </li>
        </ul>
      </div>
    </td>
  );

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    const sorted = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);

  return (
    <div className="listgrid-container">
      {enableBulkActions && selectedRows.length > 0 && (
        <div className="bulk-actions-bar">
          <div>
            <span className="text-muted small">
              {selectedRows.length} selected
            </span>
          </div>
          <div> </div>
          <div className="d-flex align-items-center action-buttons">
            {bulkActions.map((action, index) => (
              <>
                {action.label === "Delete" && (
                  <i
                    key={index}
                    class="bi bi-trash3 grid-del-btn"
                    onClick={() => action.onClick(selectedRows)}
                  ></i>
                )}
                {action.label === "Export" && (
                  <i
                    key={index}
                    class="bi bi-cloud-download-fill grid-del-btn export"
                    onClick={() => action.onClick(selectedRows)}
                  ></i>
                )}
              </>
            ))}
          </div>
        </div>
      )}

      <div className="table-responsive listgrid-container">
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              {enableSelection && (
                <th>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) =>
                enableActionDropdown && col.key === "actions" ? (
                  <th key={col.key}>Actions</th>
                ) : (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{ cursor: "pointer" }}
                  >
                    {col.title}
                    {sortConfig.key === col.key &&
                      (sortConfig.direction === "asc" ? (
                        <ArrowUp className="ms-1" size={12} />
                      ) : (
                        <ArrowDown className="ms-1" size={12} />
                      ))}
                  </th>
                )
              )}
              {/* {enableActionDropdown && <th>Actions</th>} */}
            </tr>
          </thead>
          <tbody>
            {sortedData && sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (enableSelection ? 1 : 0)}
                  className="text-center text-muted"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              sortedData &&
              sortedData.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  <tr
                    key={item.id || idx}
                    onClick={() => onRowClick?.(item)}
                    className={
                      enableRowHighlight &&
                      localSelected.some((r) => r.id === item.id)
                        ? "table-active"
                        : ""
                    }
                  >
                    {enableSelection && (
                      <td>
                        <input
                          type="checkbox"
                          checked={localSelected.some((r) => r.id === item.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRow(item);
                          }}
                        />
                      </td>
                    )}

                    {/* {enableRowExpand && (
                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => toggleExpand(item.id)}
                        >
                          {expandedRows.includes(item.id) ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>
                      </td>
                    )} */}
                    {columns.map((col) =>
                      enableActionDropdown && col.key === "actions" ? (
                        showDropdown(col.key)
                      ) : (
                        <td key={col.key}>
                          {col.render
                            ? col.render(item[col.key], item)
                            : item[col.key]}
                        </td>
                      )
                    )}
                  </tr>
                  {/* {enableRowExpand &&
                    expandedRows.includes(item.id) &&
                    renderExpandedRow && (
                      <tr className="expanded-row">
                        <td
                          colSpan={
                            columns.length + (enableSelection ? 1 : 0) + 1
                          }
                        >
                          {renderExpandedRow(item)}
                        </td>
                      </tr>
                    )} */}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

AdvancedGrid.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      render: PropTypes.func,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  enableSelection: PropTypes.bool,
  selectedRows: PropTypes.array,
  onSelectionChange: PropTypes.func,
  enableBulkActions: PropTypes.bool,
  bulkActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  enableRowHighlight: PropTypes.bool,
  enableActionDropdown: PropTypes.bool,
  enableRowExpand: PropTypes.bool,
  renderExpandedRow: PropTypes.func,
};

export default AdvancedGrid;
