import React from "react";
import { FormatTime } from "../Helpers/FormatTime";
import moment from "moment";

const BidLog = (props) => {
  const { log } = props;

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
              {log?.map((l, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <p>{l?.rank}</p>
                    </td>
                    <td>
                      <p>₹ {l.amount?.toLocaleString("en-IN")}</p>
                    </td>
                    <td>
                      <p>
                        {moment(
                          new Date(l.created_at?.replace("T", " ").split(".")[0])
                        ).format("DD MMMM YYYY h:mm a")}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BidLog;
