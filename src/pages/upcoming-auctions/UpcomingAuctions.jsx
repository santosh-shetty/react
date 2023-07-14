import React, { useEffect } from "react";
import "../upcoming-auctions/style.css";
import "../upcoming-auctions/responsive.css";
import { BreadCrumb } from "../../components/BreadCrumb/BreadCrumb";
import { SortBy } from "../../components/topbarFiltes/SortByFilter/SortBy";
import { SearchByState } from "../../components/sidebarFilters/ByState/SearchByState";
import { SearchByCity } from "../../components/sidebarFilters/ByCity/SearchByCity";
import { SearchByLocality } from "../../components/sidebarFilters/ByLocality/SearchByLocality";
import { SearchByPropertyType } from "../../components/sidebarFilters/PropertyType/SearchByPropertyType";
import { SearchByBanks } from "../../components/sidebarFilters/BanksAndInsititutions/SearchByBanks";
import { useState } from "react";
import { ReactComponent as FilterToggle } from "../../Icons/FilterIcon.svg";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Api packages
import axios from "axios";
import PriceRange from "../../components/sidebarFilters/PriceRange/PriceRange";
import HotProperties from "../../components/topbarFiltes/SortByFilter/HotProperties";
import PropertyList from "../../components/PropertyList";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination";
import DateFilter from "../../components/topbarFiltes/SortByFilter/DateFilter";

const SortByOptions = {
  Relevance: "date",
  "Reserve Price: Low - High": "reserve_price",
  "Reserve Price: High - Low": "reserve_price_desc",
  "Application Date (Desc)": "application_date",
  "Auction Date (Desc)": "auction_date",
  "City (Asc)": "city",
  "State (Asc)": "state",
};
function checkCommonElements(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      return true;
    }
  }
  return false;
}

const UpcomingAuctions = () => {
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // states
  const [propertyList, setPropertyList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPageProperties, setCurrentPageProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // filter states
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [locality, setLocality] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [hotProperty, setHotProperty] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [auctionStartDate, setAuctionStartDate] = useState(null);
  const [auctionEndDate, setAuctionEndDate] = useState(null);
  const [applicationStartDate, setApplicationStartDate] = useState(null);
  const [applicationEndDate, setApplicationEndDate] = useState(null);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(100);
  const [minValue, set_minValue] = useState(25);
  const [maxValue, set_maxValue] = useState(75);

  const [selectedSortBy, setSelectedSortBy] = useState(SortByOptions["Sort by latest"]);

  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };

  // Api Details
  const basePath = process.env.REACT_APP_API_PATH;
  let url = "";
  if (pathname.includes("private")) url = `${basePath}/api/treaty-property`;
  else if (pathname.includes("my-auctions")) url = `${basePath}/api/my-auctions`;
  else url = `${basePath}/api/property-list`;
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Fetch properties
  const getProperties = (loggedIn) => {
    if (loggedIn) {
      config["headers"]["Authorization"] = `Bearer ${token}`;
    }

    axios
      .get(url, config)
      .then((response) => {
        setPropertyList(response.data.properties);
        setFilterList(response.data.properties);
        // console.log(response.data.properties);
        setTotalProperties(response.data.properties.length);
        const minPrice = searchParams.get("minPrice");
        if (minPrice) set_minValue(minPrice);
        const maxPrice = searchParams.get("maxPrice");
        if (minPrice) set_maxValue(maxPrice);
        const propertyType = searchParams.get("propertyType");
        if (propertyType)
          setSelectedPropertyType([...selectedPropertyType, propertyType]);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  // fetch state
  const getStates = () => {
    axios
      .get(`${basePath}/api/state-list`, config)
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => console.log(error));
  };

  //fetch city
  const getCities = () => {
    let url = `${basePath}/api/city-list`;
    axios
      .post(url, { state: selectedStates }, config)
      .then((response) => {
        setCities(response.data.cities);
      })
      .catch((error) => console.log(error));
  };

  //fetch locality
  const getLocality = () => {
    let url = `${basePath}/api/location-list`;
    let body = {};
    if (selectedStates.length > 0 && selectedCities.length > 0) {
      body["state"] = selectedStates;
      body["city"] = selectedCities;
    }
    axios
      .post(url, body, config)
      .then((response) => {
        setLocality(response.data.locations);
      })
      .catch((error) => console.log(error));
  };

  // fetch typelist
  const getPropertyType = () => {
    axios
      .get(`${basePath}/api/property-type-list`, config)
      .then((response) => {
        setPropertyType(response.data.property_type);
      })
      .catch((error) => console.log(error));
  };

  // fetch banklist
  const getBank = () => {
    axios
      .get(`${basePath}/api/bank-list`, config)
      .then((response) => {
        setBanks(response.data.banks);
      })
      .catch((error) => console.log(error));
  };

  // fetch price
  const getPrice = () => {
    axios
      .get(`${basePath}/api/price-list`, config)
      .then((response) => {
        setMaxRange(response.data.max);
        setMinRange(response.data.min);
        set_maxValue(response.data.max);
        set_minValue(response.data.min);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getStates();
    getCities();
    getLocality();
    getPropertyType();
    getBank();
    getPrice();
  }, []);

  useEffect(() => {
    getStates();
    getCities();
    getLocality();
  }, [selectedStates, selectedCities, selectedLocality]);

  useEffect(() => {
    let filterData = propertyList.filter((item) => {
      const stateMatch =
        selectedStates.length === 0 ||
        selectedStates.includes(item.state?.toLocaleLowerCase());
      const cityMatch =
        selectedCities.length === 0 ||
        selectedCities.includes(item.city?.toLocaleLowerCase());
      const locationMatch =
        selectedLocality.length === 0 ||
        selectedLocality.includes(item.location?.toLocaleLowerCase());
      const typeMatch =
        selectedPropertyType.length === 0 ||
        checkCommonElements(selectedPropertyType, item.categories);
      const bankMatch =
        selectedBanks.length === 0 || selectedBanks.includes(item.bank_name);
      const priceMatch = item.reserve_price >= minValue && item.reserve_price <= maxValue;
      const trendingMatch = hotProperty
        ? item.hot_property == 1
        : item.hot_property !== -1;
      const applicationDate =
        applicationStartDate === null ||
        applicationEndDate === null ||
        (new Date(item.application_end_date) >= new Date(applicationStartDate) &&
          new Date(item.application_end_date) <= new Date(applicationEndDate));
      const auctionDate =
        auctionStartDate === null ||
        auctionEndDate === null ||
        (new Date(item.auction_end_date_time) >= new Date(auctionStartDate) &&
          new Date(item.auction_end_date_time) <= new Date(auctionEndDate));
      return (
        stateMatch &&
        cityMatch &&
        locationMatch &&
        typeMatch &&
        bankMatch &&
        priceMatch &&
        trendingMatch &&
        applicationDate &&
        auctionDate
      );
    });
    setFilterList(filterData);
    setTotalProperties(filterData.length);
  }, [
    states,
    cities,
    locality,
    selectedBanks,
    selectedPropertyType,
    minValue,
    maxValue,
    hotProperty,
    applicationStartDate,
    applicationEndDate,
    auctionStartDate,
    auctionEndDate,
  ]);

  useEffect(() => {
    const location = searchParams.get("location");
    if (location) {
      const findInState = states.findIndex(
        (state) => state.toLocaleLowerCase() == location.toLocaleLowerCase()
      );
      const findInCity = cities.findIndex(
        (city) => city.toLocaleLowerCase() == location.toLocaleLowerCase()
      );
      const findInLocality = locality.findIndex(
        (local) => local.toLocaleLowerCase() == location.toLocaleLowerCase()
      );

      switch (true) {
        case findInState >= 0:
          if (!selectedStates.includes(location.toLocaleLowerCase()))
            setSelectedStates([...selectedStates, location.toLocaleLowerCase()]);
          break;

        case findInCity >= 0:
          if (!selectedCities.includes(location.toLocaleLowerCase()))
            setSelectedCities([...selectedCities, location.toLocaleLowerCase()]);
          break;

        case findInLocality >= 0:
          if (!selectedLocality.includes(location.toLocaleLowerCase()))
            setSelectedLocality([...selectedLocality, location.toLocaleLowerCase()]);
          break;

        default:
          setPropertyList([]);
          break;
      }
    }
  }, [propertyList]);

  useEffect(() => {
    const propertiesPerPage = 12;
    setTotalPages(Math.ceil(filterList.length / propertiesPerPage));
    const startIndex = (page - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    setCurrentPageProperties(filterList.slice(startIndex, endIndex));
  }, [page, filterList]);

  useEffect(() => {
    clearAllFilter();
    getProperties(loggedIn);
  }, [loggedIn, pathname]);

  useEffect(() => {
    let sortData = [];
    if (selectedSortBy == SortByOptions["Relevance"]) {
      sortData = filterList.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (selectedSortBy == SortByOptions["Reserve Price: Low - High"]) {
      sortData = filterList.sort(
        (a, b) => parseFloat(a.reserve_price) - parseFloat(b.reserve_price)
      );
    } else if (selectedSortBy == SortByOptions["Reserve Price: High - Low"]) {
      sortData = filterList.sort(
        (a, b) => parseFloat(b.reserve_price) - parseFloat(a.reserve_price)
      );
    } else if (selectedSortBy == SortByOptions["Application Date (Desc)"]) {
      sortData = filterList.sort(
        (a, b) =>
          new Date(b.application_end_date).getTime() -
          new Date(a.application_end_date).getTime()
      );
    } else if (selectedSortBy == SortByOptions["Auction Date (Desc)"]) {
      sortData = filterList.sort(
        (a, b) =>
          new Date(b.auction_end_date_time).getTime() -
          new Date(a.auction_end_date_time).getTime()
      );
    } else if (selectedSortBy == SortByOptions["City (Asc)"]) {
      sortData = filterList.sort((a, b) => a.city.localeCompare(b.city));
    } else if (selectedSortBy == SortByOptions["State (Asc)"]) {
      sortData = filterList.sort((a, b) => a.state.localeCompare(b.state));
    }
    // }
    setFilterList([...sortData]);
  }, [selectedSortBy]);

  // Pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // End

  // Filter button  const
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const handleFilterToggle = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  // ClearAllfilter
  const clearAllFilter = () => {
    setFilterList(propertyList);
    setTotalProperties(propertyList.length);
    setSelectedBanks([]);
    setSelectedCities([]);
    setSelectedLocality([]);
    setSelectedPropertyType([]);
    setSelectedStates([]);
    set_minValue(minRange);
    set_maxValue(maxRange);
    setHotProperty(false);
    setApplicationStartDate(null);
    setApplicationEndDate(null);
    setAuctionStartDate(null);
    setAuctionEndDate(null);
  };
  const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  console.log(now);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {pathname.includes("private") ? "Private Treaty" : "Upcoming Auction"}
          </title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      <div className="allContent">
        <div className="sectionTop">
          <BreadCrumb
            path="Home"
            pageName={
              pathname.includes("private") ? "Private Treaty" : "Upcoming Auction"
            }
          />
          <SortBy
            options={SortByOptions}
            selectedSortBy={selectedSortBy}
            setSelectedSortBy={setSelectedSortBy}
          />
        </div>
        <div className="propCount">
          <p className="propCountText">
            {pathname.includes("private") ? "Private Treaty" : "Upcoming Auction"}
            <span> - {totalProperties} items</span>
          </p>
        </div>
        <div className="topFilterBar">
          <div className="mobileFilterBar">
            <FilterToggle
              width={18}
              height={18}
              id="filterToggle"
              onClick={handleFilterToggle}
              style={{ display: window.innerWidth <= 768 ? "block" : "none" }}
            />
          </div>
          <div className="clearAllFilter">
            <p>FILTERS</p>
            <p
              onClick={() => {
                clearAllFilter();
                const urlWithoutParams = window.location.href.split("?")[0];
                window.history.replaceState({}, document.title, urlWithoutParams);
              }}
            >
              Clear All
            </p>
          </div>
          <div className="filtersContainer">
            <HotProperties hotProperty={hotProperty} setHotProperty={setHotProperty} />
            <DateFilter
              auctionStartDate={auctionStartDate}
              setAuctionStartDate={setAuctionStartDate}
              auctionEndDate={auctionEndDate}
              setAuctionEndDate={setAuctionEndDate}
              applicationStartDate={applicationStartDate}
              setApplicationStartDate={setApplicationStartDate}
              applicationEndDate={applicationEndDate}
              setApplicationEndDate={setApplicationEndDate}
            />
          </div>
        </div>
      </div>
      <div className="mainContent">
        <div
          className="LeftDetails"
          id="filtersPannel"
          style={{
            display:
              window.innerWidth <= 768 ? (isFiltersVisible ? "block" : "none") : "block",
          }}
        >
          <SearchByState
            states={states}
            selectedStates={selectedStates}
            setSelectedStates={setSelectedStates}
          />
          <div className="lineBreak20"></div>
          <SearchByCity
            cities={cities}
            setSelectedCities={setSelectedCities}
            selectedCities={selectedCities}
          />
          <div className="lineBreak20"></div>
          <SearchByLocality
            setSelectedLocality={setSelectedLocality}
            selectedLocality={selectedLocality}
            locality={locality}
          />
          <div className="lineBreak20"></div>

          <PriceRange
            minimumRange={minRange}
            maximumRange={maxRange}
            minimumValue={minValue}
            maximumValue={maxValue}
            onInput={handleInput}
          />
          <div className="lineBreak20"></div>
          <SearchByPropertyType
            propertyType={propertyType}
            selectedPropertyType={selectedPropertyType}
            setSelectedPropertyType={setSelectedPropertyType}
          />
          <div className="lineBreak20"></div>
          <SearchByBanks
            banks={banks}
            selectedBanks={selectedBanks}
            setSelectedBanks={setSelectedBanks}
          />
          <div className="lineBreak20"></div>
        </div>
        <div className="rightDetails">
          <PropertyList currentPageProperties={currentPageProperties} />

          <Pagination
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default UpcomingAuctions;
