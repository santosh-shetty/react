import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../Icons/DashboardIcons/User.svg";
import { ReactComponent as Notification } from "../../Icons/DashboardIcons/Notification.svg";
import { ReactComponent as Application } from "../../Icons/DashboardIcons/Application.svg";
import { ReactComponent as Auctions } from "../../Icons/DashboardIcons/Auctions.svg";
import { ReactComponent as Results } from "../../Icons/DashboardIcons/Results.svg";
import { ReactComponent as ForwardArrow } from "../../Icons/DashboardIcons/ForwardArrow.svg";
import "./style.css";

const SideBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState("");
  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  return (
    <>
      <p className="menuText">Menu</p>
      <div className="dashboardNavLinks">
        <Link
          className={`dahboardNavLink ${
            activeLink === "/my-account" ? "activeLink" : ""
          }`}
          to={"/my-account"}
        >
          <UserIcon className="dashboardIcon" />
          My Profile
        </Link>

        <Link
          className={`dahboardNavLink ${
            activeLink === "/my-notifications" ? "activeLink" : ""
          }`}
          to={"/my-notifications"}
        >
          <Notification className="dashboardIcon" />
          Notifications
        </Link>
        <div className="p20"></div>
        <p className="menuText">AUCTIONS</p>
        <Link
          className={`dahboardNavLink ${
            activeLink === "/my-applications" ? "activeLink" : ""
          }`}
          to={"/my-applications"}
        >
          <Application className="dashboardIcon" />
          My Applications
        </Link>
        <Link
          className={`dahboardNavLink ${
            activeLink === "/my-upcoming-auctions" ? "activeLink" : ""
          }`}
          to={"/my-upcoming-auctions"}
        >
          <Auctions className="dashboardIcon" />
          Upcoming Auctions
        </Link>
        <Link
          className={`dahboardNavLink ${
            activeLink.includes("/my-auction-results") ? "activeLink" : ""
          }`}
          to={"/my-auction-results"}
        >
          <Results className="dashboardIcon" />
          Auction Results
        </Link>
        <div className="p20"></div>
      </div>
    </>
  );
};

export default SideBar;
