import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as ExpandIcon } from "../../../Icons/Arrow.svg";
import { ReactComponent as CollapseIcon } from "../../../Icons/Arrow.svg";

export const SearchByPropertyType = ({
  propertyType: propertyTypeList,
  selectedPropertyType,
  setSelectedPropertyType,
}) => {
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [chipsToDisplay, setChipsToDisplay] = useState([]);

  const togglePropertyTypeChips = () => {
    setShowAllChips(!showAllChips);
  };

  useEffect(() => {
    let type = [];
    if (showAllChips) {
      type = propertyTypeList.filter((propertyType) =>
        propertyType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      type = propertyTypeList
        .slice(0, 9)
        .filter((propertyType) =>
          propertyType.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    setChipsToDisplay(type);
  }, [propertyTypeList, showAllChips, searchQuery]);

  const isPropertyTypeSelected = (property) => {
    return selectedPropertyType.includes(property);
  };

  const togglePropertyTypeSelection = (property) => {
    let typeList = [];
    if (selectedPropertyType.includes(property)) {
      typeList = selectedPropertyType.filter(
        (selectedPropertyType) => selectedPropertyType !== property
      );
    } else {
      typeList = [...selectedPropertyType, property];
    }
    setSelectedPropertyType(typeList);
  };

  const clearAllPropertyType = () => {
    setSelectedPropertyType([]);
  };

  return (
    <>
      <p className="filterTitle">
        Property Type{" "}
        {selectedPropertyType.length > 0 ? `(${selectedPropertyType.length})` : ""}
      </p>
      <input
        type="search"
        placeholder="Search"
        className="searchBar"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div id="property-chips">
        {chipsToDisplay.map((property, index) => (
          <span
            className={`chip ${isPropertyTypeSelected(property) ? "selected" : ""}`}
            key={index}
            onClick={() => togglePropertyTypeSelection(property)}
          >
            {property}
          </span>
        ))}
      </div>
      <div className="btnGroup">
        <button id="view-more-btn" onClick={togglePropertyTypeChips}>
          {showAllChips ? (
            <>
              View Less
              <CollapseIcon className="CollapseIcon" />
            </>
          ) : (
            <>
              View More
              <ExpandIcon className="ExpandIcon" />
            </>
          )}
        </button>
        <button className="clearFilterBtn" id="clear-btn" onClick={clearAllPropertyType}>
          Clear Filter
        </button>
      </div>
    </>
  );
};
