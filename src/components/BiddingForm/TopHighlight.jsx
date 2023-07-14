import React from "react";
import { ReactComponent as Tick } from "../../Icons/Tick.svg";
import { ReactComponent as YellowMark } from "../../Icons/YellowMark.svg";
import { ReactComponent as Cross } from "../../Icons/Cross.svg";
import { ReactComponent as EmptyCircle } from "../../Icons/EmptyCircle.svg";
import "./style.css";
import "./responsive.css";

const TopHighlight = (props) => {
  const emdData = props.emdDataFilled;
  const kycData = props.kycDataFilled;
  const termsData = props.termsFilled;
  const biddersData = props.biddersFilled;

  const handleClick = (hash) => () => {
    window.location.hash = hash;
  };
  return (
    <>
      <div className="bgWhite borderGray stickySection">
        <div className="markBox">
          <div id="one">
            <Tick width={16} />
            <p
              className="navLabel"
              style={{ marginLeft: "-30px", marginTop: "8px" }}
              onClick={handleClick(`#${props.bidderDetailsId}`)}
            >
              Bidder Details
            </p>
          </div>

          <div
            className={biddersData ? "progressLineFilled" : "progressLineDashed"}
          ></div>

          <div>
            {kycData ? <Tick width={16} /> : <EmptyCircle width={16} />}

            <p
              className="navLabel"
              style={{ marginLeft: "-40px", marginTop: "8px" }}
              onClick={handleClick(`#${props.kycDetailsId}`)}
            >
              KYC Documents
            </p>
          </div>
          <div className={kycData ? "progressLineFilled" : "progressLineDashed"}></div>
          <div>
            {emdData ? <Tick width={16} /> : <EmptyCircle width={16} />}

            <p
              className="navLabel"
              style={{ marginLeft: "-40px", marginTop: "8px" }}
              onClick={handleClick(`#${props.emdDetailsId}`)}
            >
              EMD Submission
            </p>
          </div>
          <div className={emdData ? "progressLineFilled" : "progressLineDashed"}></div>
          <div>
            {termsData ? <Tick width={16} /> : <EmptyCircle width={16} />}

            <p
              className="navLabel"
              style={{ marginLeft: "-50px", marginTop: "8px" }}
              onClick={handleClick(`#${props.termsDetailsId}`)}
            >
              Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHighlight;
