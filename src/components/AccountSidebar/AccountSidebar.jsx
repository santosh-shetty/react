import React, { useState, useEffect } from "react";
import "./style.css";
import "./responsive.css";
import { BreadCrumb } from "../../components/BreadCrumb/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import AvtarSection from "../../components/Dashboard/AvtarSection";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/UserSlice";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { ToastContainer } from "react-toastify";
import SideBar from "../Dashboard/SideBar";

const AccountSidebar = ({ children }) => {
  // PageName for breadcrumb
  const basePath = process.env.REACT_APP_API_PATH;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pageName, setPageName] = useState("Dashboard");

  const [profile, setProfile] = useState(null);
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

  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  //    To handle sidebar clicks
  const handleSidebarClick = (component) => {};

  //   End

  const getProfile = async () => {
    try {
      const response = await axios.get(`${basePath}/api/get-profile`, config);
      if (response.data?.success) {
        const user = response.data.user;
        setProfile(user);
      }
    } catch (error) {
      if (error.response.data.message === "Unauthorized User") {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageName}</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="colored" />
      <div className="dashBoardContent">
        <BreadCrumb
          path={
            <>
              Home{arrow()}
              <Link className="breadCrumbLink" to="/my-account">
                My Account
              </Link>
            </>
          }
          pageName={pageName}
        />
        <AvtarSection profile={profile} />
        <div className="dashboardMainContent">
          <div className="dashboardSidebar">
            <SideBar onClick={handleSidebarClick} />
          </div>
          <div className="dashboardUserContent">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AccountSidebar;
