import React from "react";
import '../BreadCrumb/style.css'

export const BreadCrumb = (props) => {
  return (
    <>
      <p className="breadCrumbText">
       {props.path}
        <span className="iconArrow">
        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.726562 0.94L3.7799 4L0.726562 7.06L1.66656 8L5.66656 4L1.66656 -4.10887e-08L0.726562 0.94Z" fill="var(--lightBlack)"/>
</svg>

        </span>
        <span className="activeBreadCrumb">
        {props.pageName}
        </span>
      </p>
    </>
  );
};
