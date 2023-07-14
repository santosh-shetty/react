import React from "react";
import "./style.css";
import "./responsive.css";
import { ReactComponent as TooltipIcon } from "../../../../Icons/Tooltip.svg";
import ShareProperty from "../ShareProperty/ShareProperty";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as TrendingIcon } from "../../../../Icons/Trending.svg";
import { ReactComponent as EOI } from "../../../../Icons/EOI.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const TopSection = (props) => {
  // Call hook to redirection function
  const navigate = useNavigate();
  // user Id

  // Property Id from URL
  const params = useParams();
  const propertyId = params.propertyId;
  // End
  // Check whether user id logged in or not
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  // Bydefault modal is set to closed
  const [modalShow, setModalShow] = React.useState(false);

  // Data from Parent Component
  const {
    propId,
    slug,
    reserve_price,
    title,
    discount,
    app_deadline,
    address,
    trending_property,
    estimated_price,
    applied,
    liveStatus
  } = props;
  // End data
  // console.log(applied,"test");
  // Apply for auction navigation
  const auctionStatus = 'LIVE';
  const handleApplyForm = () => {
    navigate(`/bidder-detaills/${propertyId}/`);
  };
  // End

  // Redirect to login if unauthorized user trying to apply for auction
  const redirectToLogin = () => {
    navigate(`/login`);
  };

  // Modal to show message and redirect
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
  // End Modal
  // End redirect
  const handleViewAuction = () => {
    // navigate(`/property/${PropertyId}/${propertyTitleUrl}`);
    const url = `/live-auction/${propId}`;
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="TopSection">
        <div className="LeftSection">
          <ShareProperty
            propertyId={propId}
            slug={slug}
            reservePrice={reserve_price}
            title={title}
            discount={discount}
            app_deadline={app_deadline}
            address={address}
          />
          <h1 className="propertyTitle">
            {title}

            {/* {trending_property === 'True' || trending_property === 'true' || trending_property === true || trending_property !== ''? <span>
              <TrendingIcon />
            </span> : null
            } */}
            <span className="iconGroup">
              {applied === 1 ? <EOI width={22} /> : null}

              {trending_property?.toLowerCase() === "1" && <TrendingIcon width={18} />}
            </span>

            {/* {trending_property ? <TrendingIcon width={18}/> : null} */}
          </h1>
          <p className="propertyAddress">{address}</p>
        </div>
        <div className="RightSection">
          <p className="reservePrice">
            Reserve Price
            <span>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-left">
                    Reserve Price is the minimum price that a bidder can quote. The bidder
                    with the highest quote will get to buy the property.
                  </Tooltip>
                }
              >
                <span className="d-inline-block">
                  <TooltipIcon style={{ pointerEvents: "none" }} />
                </span>
              </OverlayTrigger>
            </span>
          </p>
          <p className="priceNumber">{reserve_price}</p>
          <p className="marketPrice">
            Estimated Market Price {estimated_price}
            <span>
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-left">
                    This is the estimated price of the property from our research.
                  </Tooltip>
                }
              >
                <span className="d-inline-block">
                  <TooltipIcon style={{ pointerEvents: "none" }} />
                </span>
              </OverlayTrigger>
            </span>
            {/* <span>
              <TooltipIcon />
            </span> */}
          </p>
        </div>
      </div>
      <div className="padding-20"></div>
      {loggedIn ? (
        applied == 0 ? (
          <button className="btnDark" onClick={handleApplyForm}>
            Auction Application
          </button>
        ) : (
          <div className="btnGroup" style={{justifyContent:'flex-start',padding:'0'}}>
          <button className="btnDark" onClick={() => navigate(`/view-bidder-details/${propertyId}`)}>
            View Application
          </button>
    {liveStatus === 1 && applied === 1 ? (
          <button className="blueShadeBtn" style={{width:'auto'}} onClick={handleViewAuction}>
            Enter Auction
          </button>
    ):(null)}

          </div>
        )
      ) : (
        <button className="btnDark" onClick={() => setModalShow(true)}>
          Auction Application
        </button>
      )}
      <div className="padding-20"></div>

      <p className="propertyDetailsTitle">Property Details</p>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};
