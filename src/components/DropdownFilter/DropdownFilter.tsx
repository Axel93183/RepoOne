import React from "react";
import "./DropdownFilter.css";

interface DropdownFilterProps {
  options: string[];
  selectedOption: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedOption,
  handleChange,
  label,
}) => {
  return (
    <div className="dropdown-filter">
      <label htmlFor="category-filter">{label}</label>
      <select
        id="category-filter"
        value={selectedOption}
        onChange={handleChange}
      >
        <option value="">Toutes les catégories</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
