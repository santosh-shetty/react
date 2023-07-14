import React, { useEffect, useState } from "react";
import { ReactComponent as ApplicationIcon } from "../../Icons/DashboardIcons/Application.svg";
import { ReactComponent as TickIcon } from "../../Icons/Tick.svg";
import { ReactComponent as PendingIcon } from "../../Icons/YellowMark.svg";
import { ReactComponent as DeniedIcon } from "../../Icons/Cross.svg";
import { ReactComponent as Auctions } from "../../Icons/DashboardIcons/Auctions.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

const UpcomingAuctions = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageProperties, setCurrentPageProperties] = useState([]);

  const basePath = process.env.REACT_APP_API_PATH;
  const url = `${basePath}/api/my-auctions`;
  const token = useSelector((state) => state.users.token);

  const navigate = useNavigate();

  const getUpcomingAuctions = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      if (response.data?.properties.length > 0) {
        setPropertyList(response.data.properties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // End

  useEffect(() => {
    const propertiesPerPage = 10;
    setTotalPages(Math.ceil(propertyList.length / propertiesPerPage));
    const startIndex = (page - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    setCurrentPageProperties(propertyList.slice(startIndex, endIndex));
  }, [page, propertyList]);

  useEffect(() => {
    getUpcomingAuctions();
  }, []);

  return (
    <>
      <p className="sectionTitle">
        <Auctions className="activeIcon" />
        Upcoming Auctions
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
                  <p>Property Name</p>
                </td>
                <td>
                  <p>Seller</p>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentPageProperties.length == 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center" }}>
                    No Applications Found
                  </td>
                </tr>
              ) : (
                currentPageProperties.map((property, key) => (
                  <tr key={key}>
                    <td>
                      <Link
                        to={`/property/${property.id}/${property.property_name}`}
                        className="appLink"
                      >
                        {property.id}
                      </Link>
                    </td>
                    <td>
                      <p>{property.property_name}</p>
                    </td>
                    <td>
                      <p>{property.bank_name}</p>
                    </td>
                    <td align="right">
                      <button
                        onClick={() => navigate("/view-bidder-details/" + property.id)}
                        className="whiteShadeBtn w-auto"
                      >
                        View Application
                      </button>
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

export default UpcomingAuctions;
