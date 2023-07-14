import React from "react";
import teamData from "../../pages/about-us/TeamData";
import { ReactComponent as LinkedInSVG } from "../../Icons/LinkedInSVG.svg";

function TeamCard() {
  return (
    <>
      {teamData.map((data, ind) => {
        return (
          <div className="aboutFlexItem" key={ind}>
            <img src={data.img} width="100%" />

            <p className="teamName">{data.name}</p>
            <p className="teamDesignation">{data.designation}</p>
            <a href={data.linkedIn} target="_blank">
              <LinkedInSVG />
            </a>
          </div>
        );
      })}
    </>
  );
}

export default TeamCard;
