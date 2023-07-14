import React, { Fragment, useEffect } from "react";
import "./style.css";
import "./responsive.css";
import { ReactComponent as Decrement } from "../../Icons/Minus.svg";
import { ReactComponent as Increment } from "../../Icons/Plus.svg";
import { useForm } from "react-hook-form";
import { numberToWords } from "../Helpers/numbertoWords";

const BidForm = ({
  minimum_increment,
  auctionStatusData,
  highest_bid,
  setBidAmount,
  bidAmount,
  firstRequest,
  showModal,
}) => {
  // Decrement Handler
  const handleDecrement = () => {
    if (bidAmount >= parseInt(minimum_increment) * 2 + parseInt(highest_bid)) {
      setBidAmount(() => parseInt(bidAmount) - parseInt(minimum_increment));
    }
  };
  // End

  // Increment Handler
  const handleIncrement = () => {
    setBidAmount(() => parseInt(bidAmount) + parseInt(minimum_increment));
  };
  // End

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    let bidAmount = parseInt(highest_bid) + parseInt(minimum_increment);
    setBidAmount(bidAmount);
  }, [firstRequest]);

  return (
    <Fragment>
      {auctionStatusData === "live" || auctionStatusData === "upcoming" ? (
        <Fragment>
          <div className="whiteBox">
            <form id="bidForm" onSubmit={handleSubmit(showModal)}>
              <div className="formColGroup">
                <div className="formFlex">
                  <p className="bidFormTitleBlue">Enter Bid Amount</p>
                  <div className="bidCounter">
                    <input
                      type="text"
                      name="amount"
                      value={auctionStatusData === "live" ? `₹ ${bidAmount}` : "NA"}
                      placeholder=""
                      id="bidCounter"
                      disabled={auctionStatusData !== "live"}
                      {...register("amount", { required: "This field is required" })}
                    />
                    {errors && errors.amount && <span>{errors.amount.message}</span>}
                    <div
                      className="decr"
                      onClick={handleDecrement}
                      // disabled={ === props.currentBidAmount}
                    >
                      <Decrement />
                    </div>
                    <div className="incr" onClick={handleIncrement}>
                      <Increment />
                    </div>
                  </div>
                </div>
                <div className="formFlex">
                  <p className="bidFormTitleGray">Bid Amount in Words</p>
                  <input
                    type="text"
                    id="bidInword"
                    value={`${numberToWords(bidAmount)}`}
                    disabled
                  />
                </div>
                <div className="formFlex">
                  <button
                    className={`${
                      auctionStatusData === "live" ? "btnDark" : "btnDisabled"
                    }`}
                    disabled={!auctionStatusData}
                    type="submit"
                  >
                    Submit Bid
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default BidForm;
