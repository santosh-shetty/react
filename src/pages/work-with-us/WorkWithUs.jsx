import React from "react";
import "./style.css";
import "./responsive.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PositionCard from "../../components/WorkWithUs/PositionCard";
import WorkWithUsForm from "../../components/ModelForm/WorkWithUsForm";

export const WorkWithUs = () => {
  const workPositionData = [
    {
      name: "ChatGPT Merchandiser",
      designation: "Delhi NCR",
    },
    {
      name: "Sales Samurai",
      designation: "Delhi NCR",
    },
    {
      name: "Content Connoisseur",
      designation: "Delhi NCR",
    },
    {
      name: "Full Stack Developer",
      designation: "Delhi NCR",
    },
    {
      name: "Data Analytics",
      designation: "Delhi NCR",
    },
  ];
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Work With Us</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>

      {/* <!--First Section --> */}
      <div id="workSectionOne">
        <div className="patternOne">
          <div id="workSectionOneContent">
            <p className="helperTitle">CAREERS</p>
            <h3 id="careersTitle">
              Are you ready
              <br />
              to <span id="careersTitleHecta"> Hecta</span>?
            </h3>
            <p id="careersTitleDesc">
              Want to be a part of a team that is revolutionizing the
              repossessed real estate market?
              <br />
              Let's team up!
            </p>
          </div>
        </div>
      </div>
      {/* <!--End --> */}

      {/* <!--2nd Section --> */}
      <div id="workSectionTwo">
        <div className="patternTwo">
          <div className="contentBlock">
            <p className="helperTitle">OPEN POSITIONS</p>
            <p className="subHeading">
              Ready for your next home?
              <br />
              Explore our open positions.
            </p>

            <div className="flexContainer">
              {/* Call Position Card */}
              <PositionCard workPositionData={workPositionData} />
            </div>
          </div>
        </div>
      </div>
      <WorkWithUsForm />
      {/* <!--End 2nd Section --> */}

      {/* <!--Third Sectoin --> */}
      <div id="workSectionThree">
        <div className="patternThree">
          <p className="helperTitle">OPEN APPLICATIONS</p>
          <p className="subTitle">Didn’t find anything that fits your bill?</p>
          <p id="workSectionThreeDesc">
            We’d still love to hear from you.
            <br />
            Drop us your resume at{" "}
            <a href="mailto:careers@hecta.co" id="underline" style={{color: '#091e25'}}>
              careers@hecta.co
            </a>
          </p>
        </div>
      </div>
    </>
  );
};
export default WorkWithUs;
