import React from "react";
import "./style.css";
import "./responsive.css";
import { ReactComponent as ToolTip } from "../../Icons/Tooltip.svg";
import moment from "moment";

const AuctionTimeDetails = ({ data }) => {
  console.log(data.auction_end_date_time);
  return (
    <>
      <div className="whiteBox">
        <div className="timeDetailsTwoCol">
          <div className="timeDetailsFlexItem">
            <p className="titleGray">Auction Start Time</p>
            <p className="timeValue">
              {data.auction_start_date_time
                ? moment(
                    new Date(
                      data.auction_start_date_time?.replace("T", " ").split(".")[0]
                    )
                  ).format("DD MMMM YYYY h:mm a")
                : null}
            </p>
          </div>
          <div className="timeDetailsFlexItem">
            <p className="titleGray">Scheduled End Time</p>
            <p className="timeValue">
              {data.auction_end_date_time
                ? moment(
                    new Date(data.auction_end_date_time?.replace("T", " ").split(".")[0])
                  ).format("DD MMMM YYYY h:mm a")
                : null}
            </p>
          </div>
          <div className="lineGray hideMob timeDetailsFlexItem"></div>
          <div className="timeDetailsFlexItem">
            <p className="titleGray">
              No. Of Extensions
              <span>
                <ToolTip />
              </span>
            </p>
            <p className="timeValue">
              {data?.number_of_extensions === 0 ? "NA" : data?.number_of_extensions}
            </p>
          </div>
          <div className="timeDetailsFlexItem">
            <p className="titleGray">Final End Time</p>
            <p className="timeValue">
              {data.auction_end_time
                ? moment(
                    new Date(data.auction_end_time?.replace("T", " ").split(".")[0])
                  ).format("DD MMMM YYYY h:mm a")
                : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionTimeDetails;
