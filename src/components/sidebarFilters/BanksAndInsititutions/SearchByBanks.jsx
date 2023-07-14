import React, { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as ExpandIcon } from "../../../Icons/Arrow.svg";
import { ReactComponent as CollapseIcon } from "../../../Icons/Arrow.svg";

export const SearchByBanks = ({ banks, selectedBanks, setSelectedBanks }) => {
  const [showAllChips, setShowAllChips] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chipsToDisplay, setChipsToDisplay] = useState([]);

  const filteredLocalityList = banks.filter((locality) => {
    return locality.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleBankChips = () => {
    setShowAllChips(!showAllChips);
  };

  useEffect(() => {
    let banksList = [];
    if (showAllChips) {
      banksList = banks.filter((bank) =>
        bank.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      banksList = banks
        .slice(0, 9)
        .filter((bank) => bank.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    setChipsToDisplay(banksList);
  }, [banks, showAllChips, searchQuery]);

  const isBankSelected = (bank) => {
    return selectedBanks.includes(bank);
  };

  const toggleBankSelection = (bank) => {
    let bankList = [];
    if (selectedBanks.includes(bank)) {
      bankList = selectedBanks.filter((selectedBanks) => selectedBanks !== bank);
    } else {
      bankList = [...selectedBanks, bank];
    }
    setSelectedBanks(bankList);
  };

  const clearAllBanks = () => {
    setSelectedBanks([]);
  };

  const isSelectAllSelected = selectedBanks.includes("Select All");
  return (
    <>
      {/* <p className='filterTitle'>
                Search by Locality {selectedBanks.length > 0 ? `(${selectedBanks.length})` : ''}
            </p> */}
      <p className="filterTitle">
        Bank/Institutions{" "}
        {isSelectAllSelected && selectedBanks.length == 1
          ? "(All)"
          : selectedBanks.length > 0
          ? `(${selectedBanks.length})`
          : ""}
      </p>
      <input
        type="search"
        placeholder="Search"
        className="searchBar"
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <div id="locality-chips">
        {chipsToDisplay.map((bank, index) => (
          <span
            className={`chip ${isBankSelected(bank) ? "selectedBlack" : ""}`}
            key={index}
            onClick={() => toggleBankSelection(bank)}
          >
            {bank}
          </span>
        ))}
      </div>
      <div className="btnGroup">
        <button id="view-more-btn" onClick={toggleBankChips}>
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
        <button className="clearFilterBtn" id="clear-btn" onClick={clearAllBanks}>
          Clear Filter
        </button>
      </div>
    </>
  );
};
