import React from "react";
import { ReactComponent as RightArrow } from "../../Icons/RightArrow.svg";
import WorkWithUsForm from "../ModelForm/WorkWithUsForm";

function PositionCard({ workPositionData }) {
  
  return (
    <>
      {workPositionData.map((data, ind) => (
        <div className="workFlexItem" key={ind}>
          <p className="workPositionName">{data.name}</p>
          <p className="workDesignation">{data.designation}</p>
          <a
            href="#"
            className="applyNow"
            id="popmake-25689"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            Apply Now
            <span style={{ paddingLeft: "12px" }}>
              <RightArrow />
            </span>
          </a>
        </div>
      ))}
      <WorkWithUsForm />
    </>
  );
}

export default PositionCard;
