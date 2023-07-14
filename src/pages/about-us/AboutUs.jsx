import React from "react";
import "./style.css";
import "./responsive.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import SVG
import { ReactComponent as AboutUsSVG } from "../../Icons/AboutUs.svg";
// Team Card
import TeamCard from "../../components/About/TeamCard";

const AboutUs = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>About Us</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>

      {/* {/*<!-- First Section -->*/}
      <div id="aboutSectionOne">
        <div className="patternOne">
          <div className="contentBlock">
            <div className="leftBock">
              <h1 className="mainTitle">
                <span> About Hecta </span>
              </h1>
              <p className="desc">
                Hecta is a marketplace of repossessed properties being sold
                through auctions by Banks and Financial Institutions. Hecta
                solves the discovery, due-diligence, lending, auction and
                transaction enablement of reposessed properties with technology.
                Hecta helps buyers discover properties relevant to their
                specific requirements via matching algorithm.
                <br />
                <br />
                Hecta aspires to be an enabling ecosystem for Banks and
                Financial Institutions to resolve their NPAs and use the
                proceeds to improve credit growth of the economy.
              </p>
            </div>
            <div className="rightBock">
              <AboutUsSVG />
            </div>
          </div>
        </div>
      </div>
      {/* {/*<!-- End -->*/}

      {/* {/*<!-- 2nd Section -->*/}
      <div id="aboutSectionTwo">
        <div className="patternTwo">
          <div className="contentBlock">
            <p className="subHeading">Our Team</p>
            <div className="aboutFlexContainer">
              <TeamCard />
            </div>
          </div>
        </div>
      </div>
      {/* {/*<!-- End 2nd Section -->*/}

      {/* {/*<!-- Third Sectoin -->*/}
      <div id="aboutSectionThree">
        <div className="patternThree">
          <p className="subTitle">Want to be a part of our team?</p>
          <p style={{ textAlign: "center" }}>
            <a className="darkBtn" href="#">
              Open Positions
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
