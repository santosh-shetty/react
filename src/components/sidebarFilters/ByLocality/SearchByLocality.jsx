import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as ExpandIcon } from "../../../Icons/Arrow.svg";
import { ReactComponent as CollapseIcon } from "../../../Icons/Arrow.svg";

export const SearchByLocality = ({
  locality: localityList,
  selectedLocality,
  setSelectedLocality,
}) => {
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chipsToDisplay, setChipsToDisplay] = useState([]);

  useEffect(() => {
    let location = [];
    if (showAllChips) {
      location = localityList.filter((locality) =>
        locality.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      location = localityList
        .slice(0, 9)
        .filter((locality) => locality.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setChipsToDisplay(location);
  }, [localityList, showAllChips, searchQuery]);

  const isLocalitySelected = (locality) => {
    return selectedLocality.includes(locality.toLowerCase());
  };

  const toggleLocalitySelection = (locality) => {
    let selected = [];
    if (selectedLocality.includes(locality.toLowerCase())) {
      selected = selectedLocality.filter(
        (selectedLocality) => selectedLocality.toLowerCase() !== locality.toLowerCase()
      );
    } else {
      selected = [...selectedLocality, locality.toLowerCase()];
    }
    setSelectedLocality(selected);
  };

  const toggleLocalityChips = () => {
    setShowAllChips(!showAllChips);
  };

  const clearAllLocality = () => {
    setSelectedLocality([]);
  };

  const isSelectAllSelected = selectedLocality.includes("Select All");
  return (
    <>
      {/* <p className='filterTitle'>
                Search by Locality {selectedLocality.length > 0 ? `(${selectedLocality.length})` : ''}
            </p> */}
      <p className="filterTitle">
        Search by Locality{" "}
        {isSelectAllSelected && selectedLocality.length == 1
          ? "(All)"
          : selectedLocality.length > 0
          ? `(${selectedLocality.length})`
          : ""}
      </p>
      <input
        type="search"
        placeholder="Search"
        className="searchBar"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div id="locality-chips">
        {chipsToDisplay.map((locality, index) => (
          <span
            className={`chip ${
              isLocalitySelected(locality.toLowerCase()) ? "selectedBlack" : ""
            }`}
            key={index}
            onClick={() => toggleLocalitySelection(locality)}
          >
            {locality}
          </span>
        ))}
      </div>
      <div className="btnGroup">
        <button id="view-more-btn" onClick={toggleLocalityChips}>
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
        <button className="clearFilterBtn" id="clear-btn" onClick={clearAllLocality}>
          Clear Filter
        </button>
      </div>
    </>
  );
};
