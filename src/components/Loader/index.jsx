import React from "react";
import loadingImg from "../../Icons/loading.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img className="loaderImg" src={loadingImg} alt="loader" />
    </div>
  );
};

export default Loader;
