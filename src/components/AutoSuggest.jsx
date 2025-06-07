import React, { useState, useRef, useEffect, useMemo } from "react";
import "./AutoSuggest.css";

/**
 * AutoSuggest
 *
 * A reusable input component with dynamic dropdown suggestions based on user input.
 * Designed to work with either a list of strings or a list of objects with `label`, `id`.
 *
 * Props:
 * - label       : Optional label displayed above the input field.
 * - placeholder : Placeholder text inside the input field.
 * - value       : Current value of the input. Can be a string or an object { val, id }.
 * - onChange    : Called when user types or selects an option. Sends { val, id } object.
 * - onSelect    : Optional. Called when an option is selected from the dropdown.
 * - options     : Array of options to suggest. Can be strings or objects with { label, id }.
 */
const AutoSuggest = ({
  label,
  placeholder,
  value = "",
  onChange,
  onSelect,
  options = [],
}) => {
  const [showOptions, setShowOptions] = useState(false);          // Controls dropdown visibility
  const [filteredOptions, setFilteredOptions] = useState([]);     // Filtered list based on input
  const [highlightedIndex, setHighlightedIndex] = useState(-1);   // Tracks highlighted item for keyboard nav

  const inputRef = useRef(null);   // Ref to input field (can be used for focusing if needed)
  const wrapperRef = useRef(null); // Ref to the entire wrapper, for outside click handling

  /**
   * Utility: Get label from an option (string or object)
   */
  const getLabel = (opt) => (typeof opt === "string" ? opt : opt.label);

  /**
   * Utility: Get id from an option (string or object)
   */
  const getId = (opt) => (typeof opt === "string" ? opt : opt.id);

  /**
   * Hook: Close dropdown if user clicks outside the component
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Memoized: Stable filter logic to avoid unnecessary recomputations
   * Filters options by checking if the input value is contained in the label (case-insensitive)
   */
  const stableFilteredOptions = useMemo(() => {
    try {
      const inputVal = typeof value === "object" ? value.val : value;
      if (!inputVal) return options;

      return options.filter((opt) =>
        getLabel(opt).toLowerCase().includes(inputVal.toLowerCase())
      );
    } catch (err) {
      console.error("Error filtering options in AutoSuggest:", err);
      return [];
    }
  }, [value, options]);

  /**
   * Hook: Update filteredOptions and reset highlight when input/options change
   */
  useEffect(() => {
    setFilteredOptions(stableFilteredOptions);
    setHighlightedIndex(-1); // Reset highlight when input changes
  }, [stableFilteredOptions]);

  /**
   * Handles keyboard navigation (up/down/enter/esc) inside the dropdown
   */
  const handleKeyDown = (e) => {
    if (!showOptions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;

      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          const selected = filteredOptions[highlightedIndex];
          const newVal = { val: getLabel(selected), id: getId(selected) };
          onChange(newVal);
          onSelect?.(selected);
          setShowOptions(false);
          setHighlightedIndex(-1);
        }
        break;

      case "Escape":
        setShowOptions(false);
        break;

      default:
        break;
    }
  };

  return (
    <div className="autosuggest-wrapper" ref={wrapperRef}>
      {/* Optional label above the input */}
      {label && <label>{label}</label>}

      {/* Text input field */}
      <input
        ref={inputRef}
        type="text"
        value={typeof value === "object" ? value.val : value}
        onChange={(e) => {
          onChange({ val: e.target.value, id: "" }); // Reset ID if user types manually
          setShowOptions(true);
        }}
        onFocus={() => setShowOptions(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />

      {/* Dropdown list of suggestions */}
      {showOptions && filteredOptions.length > 0 && (
        <ul className="suggestion-list">
          {filteredOptions.map((opt, index) => (
            <li
              key={getId(opt) || getLabel(opt) + index}
              className={index === highlightedIndex ? "highlighted" : ""}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
              onClick={() => {
                const newVal = { val: getLabel(opt), id: getId(opt) };
                onChange(newVal);
                onSelect?.(opt);
                setShowOptions(false);
              }}
            >
              {getLabel(opt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
