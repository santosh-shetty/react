import React from "react";
import MyProfile from "../../components/Dashboard/MyProfile";

import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";

const MyAccount = () => {
  return (
    <>
      <AccountSidebar>
        <MyProfile />
      </AccountSidebar>
    </>
  );
};

export default MyAccount;
