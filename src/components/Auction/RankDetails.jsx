import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";

const RankDetails = ({ data }) => {
  return (
    <>
      <div className="whiteBox">
        <div className="rankDetailsTwoCol">
          <div className="rankFlex">
            <p className="rankTitleBlue">Your Rank</p>
            <p className="rankValue">{data?.rank}</p>
          </div>
          <div className="rankFlex">
            <p className="rankTitleGray">Increment</p>
            <p className="rankValue">₹ {parseInt(data?.minimum_increment)}</p>
          </div>
          <div className="lineGray hideMob rankFlex"></div>
          <div className="rankFlex">
            <p className="rankTitleGray">Current Bid</p>
            <p className="rankValue">₹ {data?.highest_bid}</p>
          </div>
          <div className="rankFlex">
            <p className="rankTitleGray">Next Minimum Bid</p>
            <p className="rankValue">
              ₹ {parseInt(data?.minimum_increment) + parseInt(data?.highest_bid)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RankDetails;
