import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ListGrid.css"; // optional CSS for styling
import { ArrowDown, ArrowUp } from "react-bootstrap-icons";

const ListGrid = ({
  columns,
  data,
  onRowClick,
  enableSelection = false,
  selectedRows = [],
  onSelectionChange = () => {},
  enableBulkActions = false,
  bulkActions = [],
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [localSelected, setLocalSelected] = useState([]);

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
      {enableBulkActions  && (
        <div className="bulk-actions-bar">
          {bulkActions.map((action, index) => (
            <button
              key={index}
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => action.onClick(selectedRows)}
              disabled={selectedRows.length === 0}
            >
              {action.label}
            </button>
          ))}
          <span className="text-muted small">
            {selectedRows.length} selected
          </span>
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
              {columns.map((col) => (
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
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData && sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-muted">
                  No records found.
                </td>
              </tr>
            ) : (
              sortedData &&
              sortedData.map((item, idx) => (
                <tr key={item.id || idx} onClick={() => onRowClick?.(item)}>
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
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ListGrid.propTypes = {
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
};

export default ListGrid;
