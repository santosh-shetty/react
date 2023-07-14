import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import moment from "moment";
// import { useState } from 'react'

const AuctionCountDown = (props) => {
  const auctionStatus = props.auctionStatusData.toLowerCase();

  const [auctiondetailsdata, setAuctiondetailsdata] = useState(null);

  const [remainingTime, setRemainingTime] = useState({
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
    remainingSeconds: 0,
    remainingMinutes: 0,
    remainingHours: 0,
  });

  // api
  const param = useParams();
  const propertyId = param.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  const auctionInfoUrl = `${basePath}/api/get-auction-info?property_id=${propertyId}`;
  const token = useSelector((state) => state.users.token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const setTimer = (newTimeRemaining) => {
    if (newTimeRemaining > 0) {
      const newTotalDays = Math.floor(newTimeRemaining / (1000 * 60 * 60 * 24));
      const newTotalHours = Math.floor(newTimeRemaining / (1000 * 60 * 60));
      const newTotalMinutes = Math.floor(newTimeRemaining / (1000 * 60));
      const newTotalSeconds = Math.floor(newTimeRemaining / 1000);

      const newRemainingSeconds = newTotalSeconds % 60;
      const newRemainingMinutes = newTotalMinutes % 60;
      const newRemainingHours = (newTotalHours % 24) + newTotalDays * 24;

      setRemainingTime({
        remainingSeconds: newRemainingSeconds,
        remainingMinutes: newRemainingMinutes,
        remainingHours: newRemainingHours,
      });
    }
  };

  useEffect(() => {
    const getLiveData = () => {
      axios
        .get(auctionInfoUrl, config)
        .then((response) => {
          setAuctiondetailsdata(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getLiveData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const localDate = new Date();
      const endDateTime = auctiondetailsdata?.auction_end_date_time
        .replace("T", " ")
        .split(".")[0];
      const newTimeRemaining = new Date(endDateTime) - localDate;
      if (newTimeRemaining < 1000) {
        props.setAuctionOverModal(true);
      }
      if (newTimeRemaining > 0) setTimer(newTimeRemaining);
      else {
        clearInterval(timer);
      }
      console.log(endDateTime, localDate, "utc");
    }, 1000);
    return () => clearInterval(timer);
  }, [auctiondetailsdata]);
  const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  console.log(now,'test');
  return (
    <>
      <div className="whiteBox">
        {auctionStatus === "live" ? (
          <p className="auctionPropertyId" id="live">
            Auction of Property ID: {propertyId} will end in
          </p>
        ) : null}
        {auctionStatus === "upcoming" ? (
          <p className="auctionPropertyId" id="upcoming">
            Auction of Property ID: {propertyId} will begin in
          </p>
        ) : null}

        {auctionStatus === "closed" ? (
          <p className="auctionPropertyId" id="closed">
            Auction of Property ID: {propertyId} is closed
          </p>
        ) : null}

        {auctionStatus === "live" || auctionStatus === "upcoming" ? (
          <div className="counterContainer">
            <div className="counterCircle">
              <p className="counterDigit">{remainingTime.remainingHours}</p>
              <p className="counterText">HOURS</p>
            </div>
            <div className="counterCircle">
              <p className="counterDigit">{remainingTime.remainingMinutes}</p>
              <p className="counterText">MINUTES</p>
            </div>
            <div className="counterCircle">
              <p className="counterDigit">{remainingTime.remainingSeconds}</p>
              <p className="counterText">SECONDS</p>
            </div>
          </div>
        ) : null}

        {auctionStatus === "closed" ? (
          <p className="auctionEndText">
            The auction for the property id 1234 has ended.<br></br>
            Please contact us at <Link to="mailto:care@hecta.co">care@hecta.co</Link> for
            further queries.
          </p>
        ) : null}
      </div>
    </>
  );
};

export default AuctionCountDown;
