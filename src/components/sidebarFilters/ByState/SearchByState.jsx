import React, { useEffect } from "react";
import { useState } from "react";
import "../style.css";
import { ReactComponent as ExpandIcon } from "../../../Icons/Arrow.svg";
import { ReactComponent as CollapseIcon } from "../../../Icons/Arrow.svg";

export const SearchByState = ({
  states: stateList,
  setSelectedStates,
  selectedStates,
}) => {
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [chipsToDisplay, setChipsToDisplay] = useState([]);

  const toggleStateChips = () => {
    setShowAllChips(!showAllChips);
  };

  useEffect(() => {
    let states = [];
    if (showAllChips) {
      states = stateList.filter((state) =>
        state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      states = stateList
        .slice(0, 9)
        .filter((state) => state.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setChipsToDisplay(states);
  }, [stateList, showAllChips, searchQuery]);

  const toggleStateSelection = (state) => {
    let selected = [];
    if (selectedStates.includes(state.toLocaleLowerCase())) {
      selected = selectedStates.filter(
        (selectedState) => selectedState.toLocaleLowerCase() !== state.toLocaleLowerCase()
      );
    } else {
      selected = [...selectedStates, state.toLocaleLowerCase()];
    }
    setSelectedStates(selected);
  };

  const isStateSelected = (state) => {
    return selectedStates.includes(state.toLocaleLowerCase());
  };

  const clearAllStates = () => {
    setSelectedStates([]);
  };

  return (
    <>
      <p className="filterTitle">
        Search by State {selectedStates.length > 0 ? `(${selectedStates.length})` : ""}
      </p>
      <input
        type="search"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e.target.value)}
        className="searchBar"
      />

      <div id="state-chips">
        {chipsToDisplay.map((state, index) => (
          <span
            className={`chip ${
              isStateSelected(state.toLocaleLowerCase()) ? "selected" : ""
            }`}
            key={index}
            onClick={() => {
              toggleStateSelection(state);
              // handleFilterToggle("state", state);
            }}
          >
            {state}
          </span>
        ))}

        <div className="btnGroup">
          <button id="view-more-btn" onClick={toggleStateChips}>
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
          <button className="clearFilterBtn" id="clear-btn" onClick={clearAllStates}>
            Clear Filter
          </button>
        </div>
      </div>
    </>
  );
};
