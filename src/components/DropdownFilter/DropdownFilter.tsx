import React from "react";
import "./DropdownFilter.css";

interface DropdownFilterProps {
  options: string[];
  selectedOption: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  defaultOptionLabel?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedOption,
  handleChange,
  label,
  defaultOptionLabel = "Sélectionner une option",
}) => {
  return (
    <div className="dropdown-filter">
      <label>
        {label}
        <select value={selectedOption} onChange={handleChange}>
          <option value="">{defaultOptionLabel}</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DropdownFilter;
