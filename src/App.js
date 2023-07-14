import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header";

import Home from "./pages/home-page/Home";
import MyAuctions from "./pages/my-auctions/MyAuctions";
import { ContactUs } from "./pages/contact-us/ContactUs";
import AboutUs from "./pages/about-us/AboutUs";
import { PropertyDetails } from "./pages/property-details/PropertyDetails";
import MyComponent from "./testFilters/prop";
import { Footer } from "./components/Footer/Footer";
import BiddingForm from "./pages/bidding-form/BiddingForm";
import LiveAuction from "./pages/live-auction/LiveAuction";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Loader from "./components/Loader/index";

import UpcomingAuctions from "./pages/upcoming-auctions/UpcomingAuctions";
import { Fragment, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/UserSlice";
import EditBiddingForm from "./pages/bidding-form/EditBiddingForm";
import ResetPassword from "./components/ResetPassword";
import AuctionBidlogs from "./components/Dashboard/AuctionBidlogs";
import MyAccount from "./pages/my-account/MyAccount";
import MyApplicationsPage from "./pages/my-application/MyApplications";
import MyUpcomingAuctions from "./pages/my-upcoming-auctions/MyUpcomingAuctions";
import MyAuctionResults from "./pages/my-auction-results/MyAuctionResults";
import MyAuctionBidLogs from "./pages/my-auction-results/MyAuctionBidLogs";
import MyNotifications from "./pages/my-notifications/MyNotifications";
import WorkWithUs from "./pages/work-with-us/WorkWithUs";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEncryptedToken = localStorage.getItem("token");
    const SecretKey = process.env.REACT_APP_SECRETE_KEY;
    if (storedEncryptedToken) {
      const { encryptedToken, expirationTimestamp } = JSON.parse(storedEncryptedToken);
      if (new Date().getTime() <= expirationTimestamp) {
        const decryptedTokenBytes = CryptoJS.AES.decrypt(encryptedToken, SecretKey);
        const token = decryptedTokenBytes.toString(CryptoJS.enc.Utf8);
        if (token) {
          dispatch(login({ token }));
        }
        setLoading(false);
      } else {
        localStorage.removeItem("token");
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/' element={<Navigate to="/upcoming-auctions" />} /> */}
            <Route path="/upcoming-auctions" element={<UpcomingAuctions />} />
            <Route path="/live-auction/:propertyId" element={<LiveAuction />} />
            <Route path="/my-auctions" element={<UpcomingAuctions key="1" />} />
            <Route path="/private-treaty" element={<UpcomingAuctions key="2" />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/work-with-us" element={<WorkWithUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            {/* <Route path="/property/:propertyTitle" element={<PropertyDetails/>}/> */}
            <Route
              path="/property/:propertyId/:propertyTitle"
              element={<PropertyDetails />}
            />
            <Route path="/test" element={<MyComponent />} />
            <Route path="/bidder-detaills/:propertyId" element={<BiddingForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-notifications" element={<MyNotifications />} />
            <Route path="/my-applications" element={<MyApplicationsPage />} />
            <Route
              path="/my-upcoming-auctions"
              element={<MyUpcomingAuctions key="3" />}
            />
            <Route path="/my-auction-results" element={<MyAuctionResults />} />
            <Route
              path="/my-auction-results/bidLogs/:propertyId"
              element={<MyAuctionBidLogs />}
            />
            <Route
              path="/edit-bidder-details/:propertyId"
              element={<EditBiddingForm />}
            />
            <Route
              path="/view-bidder-details/:propertyId"
              element={<EditBiddingForm />}
            />
            <Route path="/password-reset/:token" element={<ResetPassword />} />
          </Routes>
          <Footer />
        </Fragment>
      )}
    </>
  );
}

export default App;
