import React, { useState } from "react";
import "../PropertyCard/style.css";
import "../PropertyCard/responsive.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { ReactComponent as TrendingIcon } from "../../Icons/Trending.svg";
import Share from "../ShareButton/Share";

export const FeaturedPropCard = (props) => {
  const loggedIn = useSelector(state => state.users.isLoggedIn);
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
    address,applied
  } = props;
  // End Data



  // Navigation to view details
  const propertyTitleUrl = propertyTitleSlug;
  const PropertyId = propertyId;
  // const userid = userId;
  const handleViewDetailsClick = () => {
    // navigate(`/property/${PropertyId}/${propertyTitleUrl}`);
    const url = `/property/${PropertyId}/${propertyTitleUrl}`;
  window.open(url, '_blank');
  }

  // Navigate to bidder details form
  const handleApplyForm = () => {
    navigate(`/bidder-detaills/${propertyId}/`);
  }

  // Convert in INR
  const reservePrice = Number(price);
  const formattedPrice = reservePrice.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
  // console.log(formattedPrice);

  // Format apply by date
  const inputDate = applyBy;
  let formattedDate = 'NA';
  
  if (inputDate) {
    const dateObj = new Date(inputDate);
    formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }
  
// End
  

  // Modal if user is not logged in
  const [modalShow, setModalShow] = useState(false);
  const redirectToLogin = () => {
    navigate(`/login`);
  }
  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='text-center'>

          <p className='modalText'>
            Please login to apply for auction
          </p>
          <button className='btnDark' onClick={redirectToLogin}>Okay</button>
        </Modal.Body>

      </Modal>
    );
  }
 
  // Images According to property types
  const propImages = [
    {
      type: 'Residential Flat',
      image: './images/proptypes/residential_flat.webp'
    },
    {
      type: 'Agricultural Land',
      image: './images/proptypes/agricultural_land.webp'
    },
    {
      type: 'Commercial Property',
      image: './images/proptypes/commercial_property.webp'
    },
    {
      type: 'Shop',
      image: './images/proptypes/commercial_property.webp'
    },
    {
      type: 'Independent House',
      image: './images/proptypes/independent_house.webp'
    },
    {
      type: 'Industrial Property',
      image: './images/proptypes/industrial_property.webp'
    },
    {
      type: 'Land and Building',
      image: './images/proptypes/land_building.webp'
    },
    {
      type: 'Office',
      image: './images/proptypes/office.webp'
    },
    {
      type: 'Residential Plot',
      image: './images/proptypes/residential_plot.webp'
    }
  ];
  const getImageSrc = () => {
    const propertyTypeImage = propImages.find((image) => image.type === propertyType);
    return propertyTypeImage ? propertyTypeImage.image : '';
  };
  const src = getImageSrc();
  // End
  return (
    <>
      <div id="featuredCard" className="propertyCard" style={{margin:'0 10px'}}>
        <div className="mainData">
          <img src={src} className="proImg" alt={alt} />
          {/* <div className="propImage" style={{backgroundImage:`url(${props.propImage})`}}></div> */}
          <div>
            <p style={{margin:"12px 0 0 0"}}><span className="propertyType">{propertyType}</span></p>
            <p className="propCardTitle">
              {propertyTitle}
            </p>
            <p className="priceTitle">
              Reserve Price
            </p>
            <div className="twoColBox">
              <div className="priceBox">

                <p className="priceText">{formattedPrice}</p>
                {trendingProperty?.toLowerCase() === 'true' && <TrendingIcon />}

              </div>
              <div className="shareBox">
                
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
            <span>
              {bankName ? (bankName) : ("N/A")}
            </span>

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
       <div className="otherDetailsFlex">
            <div>
            <p className="priceTitle">
            Application Date
            </p>
            <p className="priceText">{formattedDate}</p>
            
            </div>
            <div>
            <p className="priceTitle">
            EMD Amount
            </p>
            <p className="priceText">{formattedPrice}</p>
            
            </div>
       </div>
        <div className="btnGroup">
            
          <button className="whiteShadeBtn" onClick={handleViewDetailsClick}>View Details</button>
          {loggedIn ? (
            <>
            {applied ? (
              <button className="disableBtn" >Already Applied</button>
            ):(
              <button className="blueShadeBtn" onClick={handleApplyForm}>Apply</button>
            )}
            </>
          ) : (
            <button className="blueShadeBtn" onClick={() => setModalShow(true)}>Apply</button>
          )}
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </>
  );
};
