import React, { useEffect, useState } from "react";
import { ReactComponent as Results } from "../../Icons/DashboardIcons/Results.svg";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

const AuctionResults = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageResults, setCurrentPageResults] = useState([]);

  const navigate = useNavigate();
  const basePath = process.env.REACT_APP_API_PATH;
  const url = `${basePath}/api/auction-results`;
  const token = useSelector((state) => state.users.token);

  const getAuctionResults = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(url, config);
      if (response.data?.results.length > 0) {
        setResults(response.data.results);
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
    const resultsPerPage = 10;
    setTotalPages(Math.ceil(results.length / resultsPerPage));
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    setCurrentPageResults(results.slice(startIndex, endIndex));
  }, [page, results]);

  useEffect(() => {
    getAuctionResults();
  }, []);

  return (
    <>
      <p className="sectionTitle">
        <Results className="activeIcon" />
        Auction Results
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
                <td>
                  <p>Auction Rank</p>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentPageResults.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center" }}>
                    No Results Found
                  </td>
                </tr>
              ) : (
                currentPageResults.map((result, key) => (
                  <tr key={key}>
                    <td>{result.id}</td>
                    <td>{result.property_name}</td>
                    <td>{result.bank_name}</td>
                    <td>{key + 1}</td>
                    <td align="right">
                      <button
                        className="whiteShadeBtn w-auto"
                        onClick={() =>
                          navigate(`/my-auction-results/bidLogs/${result.id}`)
                        }
                      >
                        View Bid Logs
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

export default AuctionResults;
