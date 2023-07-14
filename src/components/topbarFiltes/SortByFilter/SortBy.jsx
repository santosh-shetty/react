import React from "react";
import "../SortByFilter/style.css";
export const SortBy = ({ options, selectedSortBy, setSelectedSortBy }) => {
  return (
    <div className="sortBy">
      <p className="label">
        Sort By
      </p>
      <form id="sortBY">
        <select name="sortBy" id="sortBy" value={selectedSortBy} onChange={(e) => setSelectedSortBy(e.target.value)}>
          {Object.entries(options).map(([key, value], index) => (
            <option key={index} value={value}>
              {key}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};
