import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ReactComponent as LoginImage } from "../../Icons/LoginImages.svg";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();

  const [status, setStatus] = useState(false);

  const basePath = process.env.REACT_APP_API_PATH;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const submit = async (data) => {
    let url = `${basePath}/api/reset-password`;

    try {
      const response = await axios.post(url, { password: data.password, token }, config);
      if (response.data?.success) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
        setStatus(true);
      } else {
        toast.error(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (status) navigate("/login");
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [status]);

  return (
    <div className="authContainer">
      <div className="loginLeftDetails">
        <LoginImage />
      </div>
      <div className="loginRightDetails">
        <Fragment>
          <h1 className="loginTitle">
            <span>Reset</span> Password
          </h1>
          <p className="forgotDesc">Enter new password to continue.</p>
          <div className="padding20"></div>

          <form id="loginForm" onSubmit={handleSubmit(submit)}>
            <p className="authFormLabel">New Password</p>
            <input
              {...register("password", {
                required: "New Password is required",
                minLength: {
                  value: "8",
                  message: "Minimum 8 characters required",
                },
              })}
              type="password"
              placeholder="Enter New Password"
            />
            {errors.password && <span className="error">{errors.password?.message}</span>}
            <div className="padding16"></div>
            <p className="authFormLabel">Confirm Password</p>
            <input
              {...register("confirm_password", {
                required: "Confirm Password is required",
                validate: (val) => {
                  if (watch("password") != val) {
                    return "Confirm password do no match";
                  }
                },
              })}
              type="password"
              placeholder="Enter New Password"
            />
            {errors.confirm_password && (
              <span className="error">{errors.confirm_password?.message}</span>
            )}

            <div className="authBtnGroup">
              <button type="submit" className="btnDark width-100">
                Update Password
              </button>
              <button
                type="button"
                className="whiteShadeBtn width-100"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </form>
        </Fragment>
      </div>
    </div>
  );
};

export default ResetPassword;
