import React from "react";
import "./style.css";
import "./responsive.css";
import { ReactComponent as HectaPlus } from "../../../Icons/HectaPlus.svg";

export const AdditionalInformation = ({ short_description }) => {
  return (
    <>
      <p className="addistionalInfoTitle">Additional Information</p>
      {short_description &&
        short_description?.map((item, index) => (
          <div className="infoPoint" key={index}>
            <HectaPlus className="hectaPlus" />
            <p>{item}</p>
          </div>
        ))}
    </>
  );
};
