import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const AuctionBidlogs = () => {
  const [log, setbidLogData] = useState([]);

  const { propertyId } = useParams();
  const token = useSelector((state) => state.users.token);
  const basePath = process.env.REACT_APP_API_PATH;

  const getBidsApi = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${basePath}/api/get-bids?property_id=${propertyId}`, config)
      .then((response) => {
        const bidLog = response.data.map((bid) => {
          return { ...bid, createdAt: new Date(bid.created_at) };
        });
        setbidLogData(bidLog);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBidsApi();
  }, []);

  return (
    <>
      <div className="whiteBox">
        <p className="logTitle">Your Bid Log</p>
        <div className="scrollTable">
          <table className="bidLogTable">
            <thead>
              <tr>
                <td>
                  <p>Rank</p>
                </td>
                <td>
                  <p>Bid Amount</p>
                </td>
                <td>
                  <p>Date & Time</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {log?.map((log, index) => (
                <tr key={index}>
                  <td>
                    <p>{log?.rank}</p>
                  </td>
                  <td>
                    <p>₹ {log.amount?.toLocaleString("en-IN")}</p>
                  </td>
                  <td>
                    <p>
                      {moment(log.createdAt.toString()).format("DD MMM YYYY, hh:mm:ss a")}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AuctionBidlogs;
