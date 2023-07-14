import React from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import AuctionResults from "../../components/Dashboard/Auctionresults";

const MyAuctionResults = () => {
  return (
    <>
      <AccountSidebar>
        <AuctionResults />
      </AccountSidebar>
    </>
  );
};

export default MyAuctionResults;
