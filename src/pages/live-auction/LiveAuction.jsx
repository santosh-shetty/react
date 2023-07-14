import React, { useState, useEffect } from "react";
import "./style.css";
import "./responsive.css";
import AuctionCountDown from "../../components/Auction/AuctionCountDown";
import AuctionTimeDetails from "../../components/Auction/AuctionTimeDetails";
import RankDetails from "../../components/Auction/RankDetails";
import BidForm from "../../components/Auction/BidForm";
import BidLog from "../../components/Auction/BidLog";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SubmitBidModal from "../../components/SubmitBidModal";
import { Helmet } from "react-helmet";
import AuctionOverModal from "../../components/AuctionOverModal";

const LiveAuction = () => {
  const [auctionDetailsData, setAuctiondetailsdata] = useState(null);
  const [bidLogData, setbidLogData] = useState([]);
  const [property, setProperty] = useState(null);
  const [firstRequest, setFirstRequest] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [auctionOverModal, setAuctionOverModal] = useState(false);
  // Api configurations
  const param = useParams();
  const navigate = useNavigate();
  const propertyId = param.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  const auctionInfoUrl = `${basePath}/api/get-auction-info?property_id=${propertyId}`;
  const getBids = `${basePath}/api/get-bids?property_id=${propertyId}`;
  const getProperty = `${basePath}/api/property?id=${propertyId}`;
  const token = useSelector((state) => state.users.token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    if (!token) navigate("/upcoming-auctions");
  }, [token]);

  // Submit handler
  const onSubmit = async () => {
    const basePath = process.env.REACT_APP_API_PATH;
    const submitBidUrl = `${basePath}/api/submit-bid`;

    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        property_id: propertyId,
        amount: bidAmount,
      };
      const response = await axios.post(submitBidUrl, payload, {
        headers,
      });

      if (response.data?.success) {
        toast.success(response.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getBidsApi();
      } else {
        toast.error(response.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setModalShow(false);
    } catch (error) {
      console.log(error); // Handle error
      // alert(error);
      toast.error("Incorrect bid amount", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const getLiveData = () => {
    axios
      .get(auctionInfoUrl, config)
      .then((response) => {
        setAuctiondetailsdata(response.data);
        setFirstRequest(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showModal = () => {
    setModalShow(true);
  };

  const getBidsApi = () => {
    axios
      .get(getBids, config)
      .then((response) => {
        const bidLog = response.data.map((bid) => {
          return { ...bid, createdAt: new Date(bid.created_at) };
        });
        setbidLogData(bidLog.slice(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBidsApi();
    axios
      .get(getProperty, config)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const interval = setInterval(() => {
      getLiveData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Live Auction</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="colored" />
      <div className="auctionContent">
        <div className="padding-8"></div>
        {/* First Section */}
        <div className="auctionFirstSection">
          {/* Counter Section */}
          <div className="AuctionLeftSection">
            <AuctionCountDown
              auctionStatusData="Live"
              setAuctionOverModal={setAuctionOverModal}
            />
          </div>
          {/* End */}

          {/* Time and Rank details */}
          <div className="AuctionRightSection">
            {/* Auction Time Details */}
            <AuctionTimeDetails
              data={{
                auction_start_date_time: property?.auction_start_date_time,
                auction_end_date_time: property?.auction_end_date_time,
                number_of_extensions: auctionDetailsData?.number_of_extensions,
                auction_end_time: auctionDetailsData?.auction_end_date_time,
              }}
            />
            {/* End */}
            {/* Rank Details */}
            <RankDetails
              data={{
                rank: auctionDetailsData?.rank,
                minimum_increment: property?.minimum_increment,
                highest_bid: auctionDetailsData?.highest_bid,
              }}
            />
            {/* End */}
          </div>
          {/* End */}
        </div>
        {/* End First Section */}
        <div className="padding-8"></div>
        {/* second Section Bidding Form*/}
        <BidForm
          minimum_increment={property?.minimum_increment}
          highest_bid={auctionDetailsData?.highest_bid}
          auctionStatusData="live"
          bidAmount={bidAmount}
          firstRequest={firstRequest}
          setBidAmount={setBidAmount}
          getBidsApi={getBidsApi}
          showModal={showModal}
        />
        {/* End second Section */}
        <div className="padding8"></div>
        {/* Third Section Bidding Log*/}
        <BidLog log={bidLogData} />
        {/* End Third Section*/}
        <div className="padding8"></div>
        <SubmitBidModal
          setModalShow={setModalShow}
          onSubmit={onSubmit}
          modalShow={modalShow}
        />
        <AuctionOverModal
          auctionOverModal={auctionOverModal}
          setAuctionOverModal={setAuctionOverModal}
        />
      </div>
    </>
  );
};

const mapStateToprops = (state) => {
  return {
    isLoggedIn: state,
  };
};

export default connect(mapStateToprops)(LiveAuction);
