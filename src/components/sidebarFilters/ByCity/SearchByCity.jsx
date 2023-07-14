import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as ExpandIcon } from "../../../Icons/Arrow.svg";
import { ReactComponent as CollapseIcon } from "../../../Icons/Arrow.svg";

export const SearchByCity = ({ cities: cityList, selectedCities, setSelectedCities }) => {
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chipsToDisplay, setChipsToDisplay] = useState([]);

  useEffect(() => {
    let cities = [];
    if (showAllChips) {
      cities = cityList.filter((state) =>
        state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      cities = cityList
        .slice(0, 9)
        .filter((state) => state.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setChipsToDisplay(cities);
  }, [cityList, showAllChips, searchQuery]);

  const isCitySelected = (city) => {
    return selectedCities.includes(city.toLocaleLowerCase());
  };

  const toggleCitySelection = (city) => {
    let selected = [];
    if (selectedCities.includes(city.toLocaleLowerCase())) {
      selected = selectedCities.filter(
        (selectedCities) =>
          selectedCities.toLocaleLowerCase() !== city.toLocaleLowerCase()
      );
    } else {
      selected = [...selectedCities, city.toLocaleLowerCase()];
    }
    setSelectedCities(selected);
  };

  const toggleCityChips = () => {
    setShowAllChips(!showAllChips);
  };

  const clearAllCity = () => {
    setSelectedCities([]);
  };

  return (
    <>
      <p className="filterTitle">
        Search by City {selectedCities.length > 0 ? `(${selectedCities.length})` : ""}
      </p>
      <input
        type="search"
        placeholder="Search"
        className="searchBar"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div id="city-chips">
        {chipsToDisplay.map((city, index) => (
          <span
            className={`chip ${
              isCitySelected(city.toLocaleLowerCase()) ? "selected" : ""
            }`}
            key={index}
            onClick={() => toggleCitySelection(city)}
          >
            {city}
          </span>
        ))}
      </div>
      <div className="btnGroup">
        <button id="view-more-btn" onClick={toggleCityChips}>
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
        <button className="clearFilterBtn" id="clear-btn" onClick={clearAllCity}>
          Clear Filter
        </button>
      </div>
    </>
  );
};
