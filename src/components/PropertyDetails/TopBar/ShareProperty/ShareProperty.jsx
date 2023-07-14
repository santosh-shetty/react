import React from "react";
import "./style.css";
// import { ReactComponent as ShareIcon } from '../../../../Icons/ShareIcon.svg'
import Share from "../../../ShareButton/Share";
const ShareProperty = (props) => {
  // Data from parent component
  const { propertyId, slug, reservePrice, title, discount, app_deadline, address } =
    props;
  // End data

  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p className="propertyId">
          <span>Property ID {propertyId}</span>
        </p>
        <div className="shareButton">
          <Share
            id={propertyId}
            slug={slug}
            title={title}
            reservePrice={reservePrice}
            discount={discount}
            deadLine={app_deadline}
            address={address}
          />
        </div>
      </div>
    </>
  );
};

export default ShareProperty;
