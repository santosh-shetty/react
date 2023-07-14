import axios from "axios";
import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = ({ setLoginSection }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const basePath = process.env.REACT_APP_API_PATH;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${basePath}/api/reset-password-request`, {
        email,
      });
      if (response.data?.success) {
        toast.success(response.data?.msg, {
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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong", {
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

  return (
    <Fragment>
      <h1 className="loginTitle">
        <span>For</span>got Password
      </h1>
      <p className="forgotDesc">
        To reset your password, please enter your registered email address. You will
        recieve a link to create a new password.
      </p>
      <div className="padding20"></div>

      <form id="loginForm">
        <p className="authFormLabel">Email Address</p>
        <input
          name="email"
          value={email}
          type="email"
          placeholder="Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="authBtnGroup">
          <button
            type="button"
            className="btnDark width-100"
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? "Please wait" : "Send Reset Link"}
          </button>
          <button
            type="button"
            className="whiteShadeBtn width-100"
            onClick={() => {
              setLoginSection(true);
            }}
          >
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
