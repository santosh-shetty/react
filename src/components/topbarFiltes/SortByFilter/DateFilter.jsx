import React from "react";
import "./style.css";
import { ReactComponent as Calender } from "../../../Icons/Calender.svg";
import moment from "moment/moment";

const DateFilter = ({
  auctionStartDate,
  setAuctionStartDate,
  auctionEndDate,
  setAuctionEndDate,
  applicationStartDate,
  setApplicationStartDate,
  applicationEndDate,
  setApplicationEndDate,
}) => {
  return (
    <>
      <div className="dateFilterContainer">
        <div className="DateFilter">
          <table>
            <tbody>
              <tr>
                <td align="middle">
                  <Calender width={18} />
                </td>
                <td>
                  <p className="filterLabel">Application Date</p>
                  <form>
                    <label htmlFor="appStart" className="datepicker">
                      {applicationStartDate
                        ? moment(applicationStartDate).format("DD-MM-YYYY")
                        : "dd-mm-yyyy"}
                      <input
                        id="appStart"
                        type="date"
                        className="date-input"
                        value={applicationStartDate}
                        onChange={(e) => setApplicationStartDate(e.target.value)}
                      />
                    </label>
                    <span className="vLine"></span>
                    <label htmlFor="appEnd" className="datepicker">
                      {applicationEndDate
                        ? moment(applicationEndDate).format("DD-MM-YYYY")
                        : "dd-mm-yyyy"}
                      <input
                        id="appEnd"
                        type="date"
                        min={
                          applicationStartDate
                            ? applicationStartDate
                            : moment(new Date()).format("YYYY-MM-DD")
                        }
                        className="date-input"
                        value={applicationEndDate}
                        onChange={(e) => setApplicationEndDate(e.target.value)}
                      />
                    </label>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="DateFilter">
          <table>
            <tbody>
              <tr>
                <td align="middle">
                  <Calender width={18} />
                </td>
                <td>
                  <p className="filterLabel">Auction Date</p>
                  <form>
                    <label htmlFor="auctionStart" className="datepicker">
                      {auctionStartDate
                        ? moment(auctionStartDate).format("DD-MM-YYYY")
                        : "dd-mm-yyyy"}
                      <input
                        id="auctionStart"
                        type="date"
                        className="date-input"
                        value={auctionStartDate}
                        onChange={(e) => setAuctionStartDate(e.target.value)}
                      />
                    </label>
                    <span className="vLine"></span>
                    <label htmlFor="auctionEnd" className="datepicker">
                      {auctionEndDate
                        ? moment(auctionEndDate).format("DD-MM-YYYY")
                        : "dd-mm-yyyy"}
                      <input
                        id="auctionEnd"
                        type="date"
                        min={
                          auctionStartDate
                            ? auctionStartDate
                            : moment(new Date()).format("YYYY-MM-DD")
                        }
                        className="date-input"
                        value={auctionEndDate}
                        onChange={(e) => setAuctionEndDate(e.target.value)}
                      />
                    </label>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DateFilter;
