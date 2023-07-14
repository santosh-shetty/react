import React from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import AuctionBidlogs from "../../components/Dashboard/AuctionBidlogs";

const MyAuctionBidLogs = () => {
  return (
    <>
      <AccountSidebar>
        <AuctionBidlogs />
      </AccountSidebar>
    </>
  );
};

export default MyAuctionBidLogs;
