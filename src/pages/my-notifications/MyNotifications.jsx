import React from "react";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import Notifications from "../../components/Dashboard/Notifications";

const MyNotifications = () => {
  return (
    <>
      <AccountSidebar>
        <Notifications />
      </AccountSidebar>
    </>
  );
};

export default MyNotifications;
