import React, { useEffect, useState } from "react";
import { ReactComponent as SignupImage } from "../../Icons/SignUpImage.svg";
import "./style.css";
import "./responsive.css";
import { ReactComponent as ClosedEye } from "../../Icons/ClosedEye.svg";
import { ReactComponent as OpenEye } from "../../Icons/OpenEye.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "../../Icons/GoogleIcon.svg";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const navigate = useNavigate();
  const [userId, setUserId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(0);
  // password visibility
  const [passwordVisible, setPasswordVisible] = useState({
    password1: false,
    password2: false,
  });
  // End

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm();

  // Otp notification modal
  const [modalShow, setModalShow] = useState(false);
  // End

  // Signup section visibility
  const [signupSection, setSignupSection] = useState(true);

  // Toggle password visibility
  const togglePasswordVisibility = (passwordName) => {
    setPasswordVisible({
      ...passwordVisible,
      [passwordName]: !passwordVisible[passwordName],
    });
  };
  // End

  // Api configurations
  const basePath = process.env.REACT_APP_API_PATH;
  const registerUrl = `${basePath}/api/register`;
  const verifyOtpUrl = `${basePath}/api/verifyOtp`;
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // End
  // Handle form submit

  // Generate OTP
  const [otpEmail, setOtpEmail] = useState("");
  const [otpPhone, setOtpPhone] = useState("");

  console.log("phone:" + otpPhone + " :email:" + otpEmail);

  // Check form Data
  const handleCheck = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(registerUrl, data, config);
      if (response.data?.success) {
        setUserId(response.data.user_id);
        setModalShow(true);
      } else {
        toast.error(response.data.message, {
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
      setLoading(false);
      // Handle error response
      toast.error(
        error.response?.data?.message
          ? error.response?.data?.message
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

  // End
  // Submit form data
  const handleSubmitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        verifyOtpUrl,
        { user_id: userId, mobileOtp: otpPhone, emailOtp: otpEmail },
        config
      );
      if (response.data?.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message, {
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
      setLoading(false);
      console.error("Error:", error.response.data.message);
      // Handle error response
      toast.error(
        error.response?.data?.message
          ? error.response?.data?.message
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
  //   End

  // Accepts only numbers
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && !/^[\b]+$/.test(keyValue)) {
      event.preventDefault();
    }
  };
  // End

  useEffect(() => {
    if (seconds === 0) {
      setTimer(false);
      setSignupSection(true);
      console.log("in");
    }
  }, [seconds]);

  useEffect(() => {
    let remainingTimer = null;

    if (timer) {
      remainingTimer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => {
      clearInterval(remainingTimer);
    };
  }, [timer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // OTP modal
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
          <p className="modalText">
            We have sent OTPs to your registered email address and phone number. Please
            enter the OTPs in their respective fields.
          </p>
          {/* <button className='btnDark' onClick={props.onHide}>Okay</button> */}
          <button
            className="btnDark"
            onClick={() => {
              props.onHide();
              setTimer(true);
              setSeconds(120);
            }}
          >
            Okay
          </button>
        </Modal.Body>
      </Modal>
    );
  };
  // End

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Sign Up</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      {loggedIn === true ? (
        <Navigate to="/" />
      ) : (
        <div className="authContainer">
          <ToastContainer
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            theme="colored"
          />
          <div className="loginLeftDetails">
            <SignupImage />
          </div>
          <div className="loginRightDetails">
            {signupSection ? (
              <>
                <h1 className="loginTitle">
                  <span>Sign Up</span>
                </h1>
                <div className="padding20"></div>
                <form id="loginForm" onSubmit={handleSubmit(handleCheck)}>
                  <p className="authFormLabel">Name</p>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors?.name && <span className="error">{errors.name?.message}</span>}
                  <div className="padding16"></div>
                  <p className="authFormLabel">Email Address</p>
                  <input
                    type="text"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Email Address"
                  />
                  {errors?.email && (
                    <span className="error">{errors.email?.message}</span>
                  )}
                  <div className="padding16"></div>
                  <p className="authFormLabel">Phone Number</p>
                  <input
                    type="text"
                    {...register("mobile", {
                      required: "Mobile is required",
                      minLength: {
                        value: 10,
                        message: "Invalid Mobile Number",
                      },
                      maxLength: {
                        value: 10,
                        message: "Invalid Mobile Number",
                      },
                    })}
                    placeholder="Phone Number"
                  />
                  {errors?.mobile && (
                    <span className="error">{errors.mobile?.message}</span>
                  )}
                  <div className="padding16"></div>
                  <div className="formFieldGroup">
                    <div className="formFieldGroupFlex">
                      <p className="authFormLabel">Password</p>
                      <input
                        type={passwordVisible.password1 ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: "8",
                            message: "Minimum 8 characters required",
                          },
                          pattern: {
                            value:
                              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must contain at least 8 characters, 1 number, 1 special characters, uppercase and lowercase characters",
                          },
                        })}
                      />

                      <span
                        className="eyeIcon"
                        onClick={() => togglePasswordVisibility("password1")}
                      >
                        {passwordVisible.password1 ? <OpenEye /> : <ClosedEye />}
                      </span>
                      {errors?.password && (
                        <span className="error">{errors.password?.message}</span>
                      )}
                    </div>
                    <div className="formFieldGroupFlex">
                      <p className="authFormLabel">Confirm Password</p>
                      <input
                        type={passwordVisible.password2 ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        {...register("confirmPassword", {
                          required: "Confirm Password is required",
                          validate: (val) => {
                            if (watch("password") !== val) {
                              return "Confirm password do no match";
                            }
                          },
                        })}
                      />
                      <span
                        className="eyeIcon"
                        onClick={() => togglePasswordVisibility("password2")}
                      >
                        {passwordVisible.password2 ? <OpenEye /> : <ClosedEye />}
                      </span>
                      {errors?.confirmPassword && (
                        <span className="error">{errors.confirmPassword?.message}</span>
                      )}
                    </div>
                  </div>
                  {/* <div className='authTwoCol'>
                            <div className='d-flex align-items-center'><input type='checkbox' /><label>Remember Me</label></div>
                            <Link><p className='forgetPassword'>Forgot Password?</p></Link>
                        </div> */}
                  <div className="authBtnGroup">
                    <button
                      className="btnDark width-100"
                      disabled={loading}
                      type="submit"
                      id="firstSubmit"
                    >
                      {loading ? "Please wait" : "Submit"}
                    </button>
                    <button className="whiteShadeBtn width-100">
                      <GoogleIcon className="googleIcon" />
                      Sign Up with Google
                    </button>
                  </div>
                </form>
                <p className="authDesc">
                  Already have an account? &nbsp;
                  <Link className="forgetPassword" to="/login">
                    Login
                  </Link>
                </p>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  onClick={() => {
                    setSignupSection(false);
                  }}
                />
              </>
            ) : (
              <>
                <div className="timerDiv">
                  <h1 className="loginTitle">
                    <span>Ver</span>ify your Email & Phone
                  </h1>
                  <div>{formatTime(seconds)}</div>
                </div>
                <div className="padding20"></div>
                <form id="verifyForm">
                  <p className="authFormLabel">Email Address</p>
                  <input
                    type="email"
                    value={getValues("email")}
                    placeholder="Email Address"
                    disabled
                  />
                  <div className="padding16"></div>
                  <p className="authFormLabel">
                    <span>Email OTP</span> <span>Resend OTP</span>
                  </p>
                  <input
                    type="text"
                    name="otp1"
                    placeholder="Email OTP"
                    maxLength={4}
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <div className="padding16"></div>
                  <p className="authFormLabel">Phone Number</p>
                  <input
                    type="text"
                    value={getValues("mobile")}
                    placeholder="Phone Number"
                    disabled
                  />
                  <div className="padding16"></div>
                  <p className="authFormLabel">
                    <span>Phone Number OTP</span> <span>Resend OTP</span>
                  </p>
                  <input
                    type="text"
                    name="otp2"
                    placeholder="Phone Number OTP"
                    maxLength={4}
                    value={otpPhone}
                    onChange={(e) => setOtpPhone(e.target.value)}
                    onKeyDown={handleKeyPress}
                  />
                  <div className="padding16"></div>
                  <button
                    className="btnDark width-100"
                    type="submit"
                    onClick={handleSubmitData}
                  >
                    Verify
                  </button>
                </form>
                <p className="authDesc">
                  <Link
                    className="forgetPassword"
                    onClick={() => {
                      setSignupSection(true);
                    }}
                  >
                    Back
                  </Link>
                </p>
                <MyVerticallyCenteredModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
