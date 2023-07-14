import React from "react";
import MultiRangeSlider from "multi-range-slider-react";
import "./style.css";

const PriceRange = (props) => {
  const { minimumValue, maximumValue, minimumRange, maximumRange, onInput } = props;
  return (
    <div>
      <p className="filterTitle">Budget</p>
      <MultiRangeSlider
        style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
        label="false"
        ruler="false"
        barLeftColor="var(--lightGray1)"
        barInnerColor="var(--mainBlack)"
        barRightColor="var(--lightGray1)"
        thumbLeftColor="var(--mainWhite)"
        thumbRightColor="var(--mainWhite)"
        min={minimumRange}
        max={maximumRange}
        step={1}
        minValue={minimumValue}
        maxValue={maximumValue}
        onInput={onInput}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <span className="priceRange">
          ₹{minimumValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </span>
        <span className="priceRange">
          ₹{maximumValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
        </span>
      </div>
    </div>
  );
};

export default PriceRange;
