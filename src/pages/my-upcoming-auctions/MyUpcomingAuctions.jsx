import React from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import UpcomingAuctions from "../../components/Dashboard/UpcomingAuctions";

const MyUpcomingAuctions = () => {
  return (
    <>
      <AccountSidebar>
        <UpcomingAuctions />
      </AccountSidebar>
    </>
  );
};

export default MyUpcomingAuctions;
