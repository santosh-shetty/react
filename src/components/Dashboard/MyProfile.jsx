import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as UserIcon } from "../../Icons/DashboardIcons/User.svg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Password from "./Password";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/UserSlice";
import { Fragment } from "react";
import { Modal } from "react-bootstrap";

const MyProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState("");

  const otp = useRef("");

  const [profile, setProfile] = useState(null);

  const basePath = process.env.REACT_APP_API_PATH;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const updateProfile = async (data) => {
    let url = `${basePath}/api/update-profile`;

    try {
      const response = await axios.post(url, data, config);
      if (response.data?.success) {
        toast.success(response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        getProfile();
      } else {
        toast.error(response.data.msg, {
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
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${basePath}/api/get-profile`, config);
      if (response.data?.success) {
        const user = response.data.user;
        setProfile(user);
      }
    } catch (error) {
      if (error.response.data.message === "Unauthorized User") {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/login");
      }
    }
  };

  const sendOtp = async (type) => {
    try {
      const resp = await axios.post(`${basePath}/api/sendOtp?type=${type}`, {}, config);
      if (resp.data?.success) {
        toast.success(resp.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setModalType(type);
        setModalShow(true);
        getProfile();
      } else {
        toast.error(resp.data.message, {
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
    } catch (error) {
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const verifyOtp = async () => {
    try {
      const resp = await axios.post(
        `${basePath}/api/verifyOtpProfile?type=${modalType}`,
        { otp: otp.current.value },
        config
      );
      if (resp.data?.success) {
        toast.success(resp.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setModalShow(false);
        setModalType("");
        getProfile();
      } else if (resp.data.error && resp.data.message === "Otp expired") {
        toast.error(resp.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setModalShow(false);
        setModalType("");
      } else {
        toast.error(resp.data.message, {
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
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message
          ? error.response.data.message
          : "Something went wrong",
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  useEffect(() => {
    setValue("name", profile?.name);
    setValue("email", profile?.email);
    setValue("mobile", profile?.mobile);
    setValue("father_name", profile?.father_name);
    setValue("aadhar_number", profile?.aadhar_number);
    setValue("pan_number", profile?.pan_number);
    setValue("address", profile?.address);
  }, [profile]);

  useEffect(() => {
    getProfile();
  }, []);

  // Accepts only numbers
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && !/^[\b]+$/.test(keyValue)) {
      event.preventDefault();
    }
    if (event.target.value.length >= 4 && !/^[\b]+$/.test(keyValue)) {
      event.preventDefault();
    }
  };
  // End

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Body className="text-center">
          <p className="modalText">Enter OTP</p>
          <div className="formFieldCol" style={{ marginBottom: "10px" }}>
            <input type="text" ref={otp} min={4} onKeyDown={handleKeyPress} />
          </div>
          <div>
            <button
              className="btnDark"
              style={{ marginRight: "5px" }}
              onClick={props.onHide}
            >
              Cancel
            </button>
            <button className="btnDark" onClick={verifyOtp}>
              Verify
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <p className="sectionTitle">
        <UserIcon className="activeIcon" />
        My Profile
      </p>
      <div className="p20"></div>
      <div className="UserContentBlock">
        {!showPassword ? (
          <form id="profileForm" onSubmit={handleSubmit(updateProfile)}>
            <div className="formFieldsGroup">
              <div className="formFieldCol">
                <p className="blueFormLabel">Name</p>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Name"
                />
                {errors.name && <span className="error">{errors.name?.message}</span>}
              </div>
              <div className="formFieldCol">
                <p className="blueFormLabel">Father’s Name</p>
                <input
                  {...register("father_name", { required: "Father's Name is required" })}
                  type="text"
                  placeholder="Father’s Name"
                />
              </div>
              <div className="formFieldCol">
                <p className="blueFormLabel">
                  Email Address
                  {profile?.email_verified == 0 && (
                    <Fragment>
                      <span style={{ color: "red", marginLeft: "5px" }}>
                        (NOT VERIFIED)
                      </span>
                      <span className="sendOtp" onClick={() => sendOtp("email")}>
                        Send OTP
                      </span>
                    </Fragment>
                  )}
                </p>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  placeholder="Email Address"
                />
                {errors.email && <span className="error">{errors.email?.message}</span>}
              </div>
              <div className="formFieldCol">
                <p className="blueFormLabel">
                  Phone Number{" "}
                  {profile?.phone_verified == 0 && (
                    <Fragment>
                      <span style={{ color: "red", marginLeft: "5px" }}>
                        (NOT VERIFIED)
                      </span>
                      <span className="sendOtp" onClick={() => sendOtp("phone")}>
                        Send OTP
                      </span>
                    </Fragment>
                  )}
                </p>
                <input
                  {...register("mobile", {
                    required: "Mobile is required",
                    minLength: {
                      value: 10,
                      message: "Mobile should be atleast 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Mobile should be atleast 10 digits",
                    },
                  })}
                  type="text"
                  placeholder="Phone Number"
                />
                {errors.mobile && <span className="error">{errors.mobile?.message}</span>}
              </div>
              <div className="formFieldCol" id="address">
                <p className="blueFormLabel">Address</p>
                <input
                  {...register("address", {
                    required: "Address is required",
                  })}
                  type="text"
                  placeholder="Address"
                />
                {errors.address && (
                  <span className="error">{errors.address?.message}</span>
                )}
              </div>
              <div className="formFieldCol">
                <p className="blueFormLabel">Aadhar Number</p>
                <input
                  {...register("aadhar_number", {
                    required: "Aadhar Number is required",
                    pattern: {
                      value:
                        /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/,
                      message: "Invalid Aadhar number",
                    },
                    minLength: {
                      value: 12,
                      message: "Aadhar Number should be atleast 12 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Aadhar Number should be atleast 12 characters",
                    },
                  })}
                  type="text"
                  placeholder="Aadhar Number"
                />
                {errors.aadhar_number && (
                  <span className="error">{errors.aadhar_number?.message}</span>
                )}
              </div>
              <div className="formFieldCol">
                <p className="blueFormLabel">PAN Number</p>
                <input
                  {...register("pan_number", {
                    required: "Pan Number is required",
                    pattern: {
                      value: /[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Invalid Pan number",
                    },
                    minLength: {
                      value: 10,
                      message: "Pan Number should be atleast 10 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Pan Number should be atleast 10 characters",
                    },
                  })}
                  type="text"
                  placeholder="PAN Number"
                />
                {errors.pan_number && (
                  <span className="error">{errors.pan_number?.message}</span>
                )}
              </div>
              <div className="formFieldCol groupBox mt-8">
                <button type="submit" className="btnDark w-auto">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="whiteShadeBtn w-auto"
                >
                  {!showPassword ? "Update Password" : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <Password setShowPassword={setShowPassword} showPassword={showPassword} />
        )}
        <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default MyProfile;
