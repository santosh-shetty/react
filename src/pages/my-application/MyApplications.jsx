import React from "react";

import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import MyApplications from "../../components/Dashboard/MyApplications";

const MyApplicationsPage = () => {
  return (
    <>
      <AccountSidebar>
        <MyApplications />
      </AccountSidebar>
    </>
  );
};

export default MyApplicationsPage;
