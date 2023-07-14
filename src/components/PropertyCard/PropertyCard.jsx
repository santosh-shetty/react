import React, { useState } from "react";
import "../PropertyCard/style.css";
import "../PropertyCard/responsive.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as TrendingIcon } from "../../Icons/Trending.svg";
import Share from "../ShareButton/Share";

export const PropertyCard = (props) => {
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const navigate = useNavigate();

  // Data from Parent Component
  const {
    propertyTitleSlug,
    propertyId,
    price,
    applyBy,
    alt,
    bankName,
    propertyType,
    propertyTitle,
    trendingProperty,
    discount,
    address,
    applied,
    liveStatus,
  } = props;
  // End Data

  // Formar discount percentage
  const discountPercent = parseInt(discount.split(".")[0]);

  // Navigation to view details
  const propertyTitleUrl = propertyTitleSlug;
  const PropertyId = propertyId;
  // const userid = userId;
  const handleViewDetailsClick = () => {
    // navigate(`/property/${PropertyId}/${propertyTitleUrl}`);
    const url = `/property/${PropertyId}/${propertyTitleUrl}`;
    window.open(url, "_blank");
  };

  // Navigate to bidder details form
  const handleApplyForm = () => {
    navigate(`/bidder-detaills/${propertyId}/`);
  };

  // Convert in INR
  const reservePrice = Number(price);
  const formattedPrice = reservePrice.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  // console.log(formattedPrice);

  // Format apply by date
  const inputDate = applyBy;
  let formattedDate = "NA";

  if (inputDate) {
    const dateObj = new Date(inputDate);
    formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  // End

  // Modal if user is not logged in
  const [modalShow, setModalShow] = useState(false);
  const redirectToLogin = () => {
    navigate(`/login`);
  };
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center">
          <p className="modalText">Please login to apply for auction</p>
          <button className="btnDark" onClick={redirectToLogin}>
            Okay
          </button>
        </Modal.Body>
      </Modal>
    );
  };

  // Images According to property types
  const propImages = [
    {
      type: "Residential Flat",
      image: "./images/proptypes/residential_flat.webp",
    },
    {
      type: "Agricultural Land",
      image: "./images/proptypes/agricultural_land.webp",
    },
    {
      type: "Commercial Property",
      image: "./images/proptypes/commercial_property.webp",
    },
    {
      type: "Shop",
      image: "./images/proptypes/commercial_property.webp",
    },
    {
      type: "Independent House",
      image: "./images/proptypes/independent_house.webp",
    },
    {
      type: "Industrial Property",
      image: "./images/proptypes/industrial_property.webp",
    },
    {
      type: "Land and Building",
      image: "./images/proptypes/land_building.webp",
    },
    {
      type: "Office",
      image: "./images/proptypes/office.webp",
    },
    {
      type: "Residential Plot",
      image: "./images/proptypes/residential_plot.webp",
    },
  ];
  const getImageSrc = () => {
    const propertyTypeImage = propImages.find((image) => image.type === propertyType);
    return propertyTypeImage ? propertyTypeImage.image : "";
  };
  const src = getImageSrc();
  // End
  const handleViewAuction = () => {
    // navigate(`/property/${PropertyId}/${propertyTitleUrl}`);
    const url = `/live-auction/${propertyId}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="propertyCard">
        <div className="topBarDetails">
          <div className="detailItem">
            <p className="discount">Estd Discount {discountPercent}%</p>
          </div>
          <div className="detailItem">
            <p className="endDate">Apply By {formattedDate}</p>
          </div>
        </div>
        <div className="mainData">
          <img src={src} className="proImg" alt={alt} />
          {/* <div className="propImage" style={{backgroundImage:`url(${props.propImage})`}}></div> */}
          <div>
            <p className="propCardTitle">{propertyTitle}</p>
            <p className="priceTitle">Reserve Price</p>
            <div className="twoColBox">
              <div className="priceBox">
                <p className="priceText">{formattedPrice}</p>
                {trendingProperty?.toLowerCase() === "1" && <TrendingIcon width={16} />}
              </div>
              <div className="shareBox">
                {/* <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.29639 16.1371L9.29531 16.1361C7.13439 14.1766 5.40168 12.6035 4.20017 11.1345C3.00727 9.6761 2.4165 8.41197 2.4165 7.08333C2.4165 4.93088 4.09738 3.25 6.24984 3.25C7.47275 3.25 8.65819 3.82295 9.42882 4.72792L9.99984 5.39847L10.5709 4.72792C11.3415 3.82295 12.5269 3.25 13.7498 3.25C15.9023 3.25 17.5832 4.93088 17.5832 7.08333C17.5832 8.41198 16.9924 9.67615 15.7993 11.1358C14.5978 12.6058 12.8653 14.1807 10.7046 16.1442C10.7043 16.1445 10.704 16.1447 10.7038 16.1449L10.0018 16.7792L9.29639 16.1371Z"
                    stroke="#F44336"
                    stroke-width="1.5"
                  />
                </svg> */}
                <Share
                  id={propertyId}
                  slug={propertyTitleSlug}
                  title={propertyTitle}
                  reservePrice={formattedPrice}
                  discount={discount}
                  deadLine={formattedDate}
                  address={address}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sellerDetails">
          <p>
            Seller Name
            <span>{bankName ? bankName : "N/A"}</span>
          </p>
        </div>
        {/* <table className="otherDetails">
          <tr>
            <td>
              <p className="otherDetailsTitle">Auction Date</p>
            </td>
            <td>
              <p className="otherDetailsText">{props.auctionDate}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="otherDetailsTitle">Seller</p>
            </td>
            <td>
              <p className="otherDetailsText">
                {props.seller}
              </p>
            </td>
          </tr>
        </table> */}
        {/* <div className="lineBreak"></div> */}
        <div className="btnGroup">
          <button className="whiteShadeBtn" onClick={handleViewDetailsClick}>
            View Details
          </button>
          {loggedIn ? (
            <>
              {applied === 1 && liveStatus === 1 ? (
                <button className="blueShadeBtn" onClick={handleViewAuction}>
                  Enter Auction
                </button>
              ) : applied === 1 ? (
                <button
                  className="blueShadeBtn"
                  onClick={() => navigate(`/view-bidder-details/${propertyId}`)}
                >
                  View Application
                </button>
              ) : (
                <button className="blueShadeBtn" onClick={handleApplyForm}>
                  Apply
                </button>
              )}
            </>
          ) : (
            <button className="blueShadeBtn" onClick={() => setModalShow(true)}>
              Apply
            </button>
          )}
        </div>
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};
