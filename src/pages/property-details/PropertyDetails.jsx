import React, { useState, useEffect } from "react";
import { BreadCrumb } from "../../components/BreadCrumb/BreadCrumb";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import "./responsive.css";
import { TopSection } from "../../components/PropertyDetails/TopBar/TopSection/TopSection";
import VisualTabs from "../../components/PropertyDetails/FirstSection/Tabs/VisualTabs";
import PropertyData from "../../components/PropertyDetails/FirstSection/PropertyData/PropertyData";
import ApplicationDetails from "../../components/PropertyDetails/ApplicationDetails/ApplicationDetails";
import { AdditionalInformation } from "../../components/PropertyDetails/AdditionalInformation/AdditionalInformation";
import Disclaimer from "../../components/PropertyDetails/Disclaimer/Disclaimer";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { useSelector } from "react-redux";

export const PropertyDetails = () => {
  const param = useParams();
  const token = useSelector((state) => state.users.token);
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const ID = param.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  const url = `${basePath}/api/property?id=`;

  const [propertyDetailsData, setPropertyDetailsData] = useState(null);
  const [category, setCategory] = useState("");
  const [imageGallry, setImagageGallry] = useState([]);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (loggedIn) {
    config["headers"]["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    axios
      .get(`${url}${ID}`, config)
      .then((response) => {
        setPropertyDetailsData({
          ...response.data,
          short_description: JSON.parse(response.data.short_description),
        });
        setCategory(response.data.categories[0]);
        setImagageGallry(response.data.images);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // console.log(category);

  //Format Currency Function
  function formatCurrency(value) {
    if (isNaN(value)) {
      return "";
    }
    const formattedValue = Number(value).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
    return formattedValue;
  }
  // End

  // Currency data
  const reservePrice = formatCurrency(propertyDetailsData?.reserve_price);
  const estimatedPrice = formatCurrency(propertyDetailsData?.estimated_value);
  const emdPrice = formatCurrency(propertyDetailsData?.emd);
  // console.log(reservePrice);
  // End

  // Application End date and time
  const applicationEndDate = propertyDetailsData?.application_end_date;
  let formattedDate1 = "NA";

  if (applicationEndDate) {
    const year = applicationEndDate.substr(0, 4);
    const month = applicationEndDate.substr(5, 2) - 1; // Month is zero-indexed
    const day = applicationEndDate.substr(8, 2);
    const hour = parseInt(applicationEndDate.substr(11, 2));
    const minute = applicationEndDate.substr(14, 2);
    const dateObj = new Date(year, month, day, hour, minute);
    formattedDate1 = `${day} ${dateObj.toLocaleString("default", {
      month: "short",
    })} ${year}`;
  }
  // End

  // Auction Start date and time
  const auctionStartDate = propertyDetailsData?.auction_start_date_time;
  let formattedDate2 = "NA";

  if (auctionStartDate) {
    const year = auctionStartDate.substr(0, 4);
    const month = auctionStartDate.substr(5, 2) - 1; // Month is zero-indexed
    const day = auctionStartDate.substr(8, 2);
    const hour = parseInt(auctionStartDate.substr(11, 2));
    const minute = auctionStartDate.substr(14, 2);
    const meridiem = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    const dateObj = new Date(year, month, day, hour, minute);
    formattedDate2 = `${day} ${dateObj.toLocaleString("default", {
      month: "short",
    })} ${year} ${formattedHour}:${minute}${meridiem}`;
  }
  // End

  //   Arrow Icon in Breadcrumb
  const arrow = () => {
    return (
      <span className="iconArrow">
        <svg
          width="6"
          height="8"
          viewBox="0 0 6 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.726562 0.94L3.7799 4L0.726562 7.06L1.66656 8L5.66656 4L1.66656 -4.10887e-08L0.726562 0.94Z"
            fill="var(--lightBlack)"
          />
        </svg>
      </span>
    );
  };
  // End

  // Exrtact src from iframs
  function extractSrcFromIframe(iframe) {
    if (!iframe) {
      return null;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(iframe, "text/html");
    const iframeElement = doc.getElementsByTagName("iframe")[0];
    if (!iframeElement) {
      return null;
    }
    const src = iframeElement.getAttribute("src");
    return src;
  }
  //   End

  // Src for virtual tour
  const virtualTourSrc = extractSrcFromIframe(propertyDetailsData?.street);
  // console.log(virtualTourSrc?.length,"test");

  //Google map
  const googleMapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyD_ZT6JaHQxwsEFc2Gx9XS2saxzpxeHw8U&center=${propertyDetailsData?.latitude},${propertyDetailsData?.longitude}&zoom=18`;
  const map = (
    <iframe
      width="100%"
      height="264"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={googleMapSrc}
    ></iframe>
  );
  // End

  // Arial View
  const arialviewSrc = propertyDetailsData?.panoramic_image;
  const arialView = (
    <iframe
      className=""
      width="100%"
      height="264"
      allowFullScreen
      src={arialviewSrc}
    ></iframe>
  );
  // End

  // Gallery image array
  const imageSrc = imageGallry.map((src) => ({
    src: src,
  }));
  //   End

  // Tabs Data
  const tabs = [
    {
      title: "Aerial View",
      // content: arialView,
      content: arialviewSrc && arialviewSrc?.length > 0 ? arialView : "",
    },
    {
      title: "Map View",
      content: googleMapSrc && googleMapSrc.length > 0 ? map : "",
    },
    {
      title: "Virtual Tour",
      content:
        virtualTourSrc && virtualTourSrc.length > 0 ? (
          <iframe
            src={virtualTourSrc}
            width="100%"
            height="264"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          ""
        ),
    },
    {
      title: "Photos",
      content:
        imageSrc && imageSrc.length > 0 ? (
          <Carousel images={imageSrc} style={{ height: 300, width: "100%" }} />
        ) : (
          ""
        ),
    },
  ];
  // End

  // Filter tabs if content is empty
  const filteredTabs = tabs.filter((tab) => tab.content);
  //   End

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Hecta Proptech</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      <div className="allContent60">
        <div className="paddingtop"></div>
        {/* BreadCrumb */}
        <BreadCrumb
          path={
            <>
              Home{arrow()}
              <Link className="breadCrumbLink" to="/upcoming-auctions">
                Upcoming Auctions
              </Link>
            </>
          }
          pageName={propertyDetailsData?.property_name}
        />
        {/* End */}

        <div className="padding-20"></div>

        {/* TobBar */}
        <TopSection
          title={propertyDetailsData?.property_name}
          address={propertyDetailsData?.address}
          reserve_price={reservePrice}
          estimated_price={estimatedPrice}
          trending_property={propertyDetailsData?.hot_property}
          propId={propertyDetailsData?.id}
          slug={propertyDetailsData?.slug}
          discount={propertyDetailsData?.discount_percentage}
          app_deadline={formattedDate1 ? formattedDate1 : "N/A"}
          applied={propertyDetailsData?.applied}
          liveStatus={propertyDetailsData?.live}
        />
        {/* End */}

        {/* First Section */}
        <div className="detailsFirstSection">
          <div className="tabSection">
            <VisualTabs tabs={filteredTabs} propertyDetailsData={propertyDetailsData} />
          </div>
          <div className="detailsSection">
            <PropertyData
              discount={propertyDetailsData?.discount_percentage}
              built_up_area={propertyDetailsData?.built_up_area}
              total_area={propertyDetailsData?.total_area}
              property_type={category ? category : "N/A"}
              possession_status={propertyDetailsData?.possession_status}
              seller={
                propertyDetailsData?.bank_name ? propertyDetailsData?.bank_name : "N/A"
              }
            />
          </div>
        </div>
        {/* End First Section */}
        <div className="padding-20"></div>
        {/* Second Section Application Details*/}
        <ApplicationDetails
          emd={emdPrice}
          app_deadline={formattedDate1 ? formattedDate1 : "N/A"}
          auction_date={formattedDate2 ? formattedDate2 : "N/A"}
          private_treaty={propertyDetailsData?.auction_type === "" ? "No" : "Yes"}
          autorized_Officer={
            propertyDetailsData?.sro_office ? propertyDetailsData?.sro_office : "N/A"
          }
          extension={propertyDetailsData?.auction_time_extension}
        />
        {/* End Second Section */}

        <div className="padding-20"></div>

        {/* Third Section Additional Information*/}
        <AdditionalInformation
          short_description={propertyDetailsData?.short_description}
        />
        {/* End Third Section */}

        <div className="padding-20"></div>

        {/* Fourth Section Disclaimer */}
        <Disclaimer />
        {/* END Fourth Section Disclaimer */}
      </div>
    </>
  );
};
