import React, { useEffect } from "react";
import { MyAuctionCard } from "../../components/PropertyCard/MyAuctionCard";
import "../upcoming-auctions/style.css";
import "../upcoming-auctions/style.css";
import "../upcoming-auctions/responsive.css";
import { BreadCrumb } from "../../components/BreadCrumb/BreadCrumb";

import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { ReactComponent as PrevArrow } from "../../Icons/Arrow.svg";
import { ReactComponent as NextArrow } from "../../Icons/Arrow.svg";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider  } from "react-helmet-async";

// Api packages
import axios from "axios";
import { Navigate } from "react-router-dom";

const SortByOptions = {
  "Sort by latest": "date",
  "Sort By Reserve Price: Low - High": "reserve_price",
  "Sort By Reserve Price: High - Low": "reserve_price_desc",
  "Sort By Application Date (Desc)": "application_date",
  "Sort By Auction Date (Desc)": "auction_date",
  "Sort By City (Asc)": "city",
  "Sort By State (Asc)": "state",
};

const MyAuctions = () => {
  const loggedIn = useSelector((state) => state.users.isLoggedIn);

  // Property List Arrya
  const [propertyList, setPropertyList] = useState([]);
  const [page, setPage] = useState(1);

  const [selectedSortBy, setSelectedSortBy] = useState(SortByOptions["Sort by latest"]);

  // Filters Initial States
  const [selectStateFilter, setSelectStateFilter] = useState([]);

  // Api Details
  const basePath = process.env.REACT_APP_API_PATH;
  const url = `${basePath}/api/my-auctions`;
  const token = useSelector((state) => state.users.token);

  // Fetch properties
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        setPropertyList(response.data.properties);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [loggedIn]);
  // End

  // Filter properties
  const filteredProperties = propertyList?.filter((property) => {
    const stateFilter =
      selectStateFilter.length === 0 ? true : selectStateFilter.includes(property.state);
    return stateFilter;
  });
  // End

  // Pagination
  const propertiesPerPage = 12;
  const totalPages = Math.ceil(filteredProperties?.length / propertiesPerPage);
  const startIndex = (page - 1) * propertiesPerPage;
  const endIndex = startIndex + propertiesPerPage;
  const currentPageProperties = filteredProperties?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // End

  // Total Properties count
  const totalProperties = filteredProperties?.length;

  return (
    <>
      {loggedIn ? (
        <>
        <HelmetProvider>
          <Helmet>
            <title>My Auctions</title>
            <meta name="description" content="" />
            <meta name="keywords" content="" />
          </Helmet>
        </HelmetProvider>
          <div className="allContent">
            <div className="sectionTop">
              <BreadCrumb path="Home" pageName="My Auctions" />
              {/* <SortBy
                options={SortByOptions}
                selectedSortBy={selectedSortBy}
                setSelectedSortBy={setSelectedSortBy}
              /> */}
            </div>
            <div className="propCount">
              <p className="propCountText">
                My Auctions <span>- {totalProperties} items</span>
              </p>
            </div>
            {/* <div className="mobileFilterBar">
              <FilterToggle width={18} height={18} id="filterToggle" />
            </div> */}
          </div>
          <div className="mainContent" style={{minHeight:'100vh'}}>
            <div className="rightDetails">
              {propertyList && propertyList.length > 0 ? (
                <div className="cardRow">
                  {currentPageProperties.map((property) => (
                    <div className="flexItem2" key={property.id}>
                      <MyAuctionCard
                        propertyTitle={property.property_name}
                        alt={
                          property.images.length > 0 ? property.images[0].alt : "Hecta"
                        }
                        discount={property.discount_percentage}
                        applyBy={property.application_end_date}
                        price={property.reserve_price}
                        auctionDate={property.auctionDate}
                        seller={property.seller}
                        propertyTitleSlug={property.slug}
                        propertyId={property.id}
                        bankName={property.bank_name}
                        trendingProperty={property.hot_property}
                        propertyType={property.categories[0]}
                        arialView={property.panoramic_image}
                        applied={property.applied}
                        auctionStatus={property.auction_status}
                        approval={property.approval_status}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p>No auctions found</p>
                </div>
              )}

              {totalPages > 1 && (
                <div className="pagination">
                  {page > 1 && (
                    <button
                      className="pageButton"
                      onClick={() => handlePageChange(page - 1)}
                    >
                      <PrevArrow className="prevArrow" />
                      Previous
                    </button>
                  )}
                  {[...Array(totalPages)].map((_, i) => {
                    if (
                      i === 0 ||
                      i === totalPages - 1 ||
                      (i >= page - 2 && i <= page + 1) ||
                      (i >= totalPages - 4 && i <= page + 2)
                    ) {
                      return (
                        <button
                          key={i}
                          className={`pageButton ${page === i + 1 ? "active" : ""}`}
                          onClick={() => handlePageChange(i + 1)}
                        >
                          {i + 1}
                        </button>
                      );
                    } else if (i === 1 || i === totalPages - 2) {
                      return <span key={i}>. . .</span>;
                    } else {
                      return null;
                    }
                  })}
                  {page < totalPages && (
                    <button
                      className="pageButton"
                      onClick={() => handlePageChange(page + 1)}
                    >
                      Next
                      <NextArrow className="nextArrow" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default MyAuctions;
