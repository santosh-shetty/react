import React, { useEffect, useState } from "react";
import { ReactComponent as ApplicationIcon } from "../../Icons/DashboardIcons/Application.svg";
import { ReactComponent as TickIcon } from "../../Icons/Tick.svg";
import { ReactComponent as PendingIcon } from "../../Icons/YellowMark.svg";
import { ReactComponent as DeniedIcon } from "../../Icons/Cross.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/UserSlice";
import moment from "moment";
import Pagination from "../Pagination";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageApplications, setCurrentPageApplications] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basePath = process.env.REACT_APP_API_PATH;
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // End

  const getApplications = async () => {
    try {
      const response = await axios.get(`${basePath}/api/my-applications`, config);
      if (response.data?.success) {
        setApplications(response.data.properties);
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
    const applicationPerPage = 10;
    setTotalPages(Math.ceil(applications.length / applicationPerPage));
    const startIndex = (page - 1) * applicationPerPage;
    const endIndex = startIndex + applicationPerPage;
    setCurrentPageApplications(applications.slice(startIndex, endIndex));
  }, [page, applications]);

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <p className="sectionTitle">
        <ApplicationIcon className="activeIcon" />
        My Applications
      </p>
      <div className="p20"></div>
      <div className="userDetailsBlock">
        <div className="scrollTable">
          <table className="stripTable">
            <thead>
              <tr>
                <td>
                  <p>Property ID</p>
                </td>
                <td>
                  <p>Application Status</p>
                </td>
                <td>
                  <p>Application End Date</p>
                </td>
                <td>
                  <p>Auction End Date</p>
                </td>
                <td>
                  <p>Status</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {currentPageApplications.length == 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No Applications Found
                  </td>
                </tr>
              ) : (
                currentPageApplications.map((application, key) => (
                  <tr key={key}>
                    <td>
                      <Link
                        to={`/property/${application.propertyId}/${application.property_name}`}
                        className="appLink"
                      >
                        {application.id}
                      </Link>
                    </td>
                    <td>
                      {application.application_status == 1 ? (
                        <p>
                          <TickIcon className="statusIcon" /> Approved
                        </p>
                      ) : application.application_status == 2 ? (
                        <p>
                          <DeniedIcon className="statusIcon" /> Denied (
                          {application?.reason})
                        </p>
                      ) : application.application_status == 3 ? (
                        <p>
                          <DeniedIcon className="statusIcon" /> Issues Found (
                          {application?.reason})
                        </p>
                      ) : application.application_status == 0 &&
                        application.step_status == 4 ? (
                        <p>
                          <PendingIcon className="statusIcon" /> Pending
                        </p>
                      ) : application.application_status == 0 &&
                        application.step_status !== 4 ? (
                        <p>
                          <PendingIcon className="statusIcon" /> Complete your application
                        </p>
                      ) : null}
                    </td>
                    <td>
                      <p>
                        {moment(application.auction_start_date_time).format(
                          "DD MMM YYYY"
                        )}
                      </p>
                    </td>
                    <td>
                      <p>
                        {moment(application.auction_end_date_time).format("DD MMM YYYY")}
                      </p>
                    </td>
                    <td align="right">
                      {application.application_status == 0 &&
                      application.step_status !== 4 ? (
                        <button
                          onClick={() =>
                            navigate("/bidder-detaills/" + application.propertyId)
                          }
                          className="whiteShadeBtn w-auto"
                        >
                          Fill Application
                        </button>
                      ) : application.application_status == 0 ||
                        application.application_status == 3 ? (
                        <button
                          onClick={() =>
                            navigate("/edit-bidder-details/" + application.propertyId)
                          }
                          className="whiteShadeBtn w-auto"
                        >
                          Edit Application
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate("/view-bidder-details/" + application.propertyId)
                          }
                          className="whiteShadeBtn w-auto"
                        >
                          View Application
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplications;
