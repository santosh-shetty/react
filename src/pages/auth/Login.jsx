import React, { useState } from "react";
import { ReactComponent as LoginImage } from "../../Icons/LoginImages.svg";
import "./style.css";
import "./responsive.css";
import { ReactComponent as ClosedEye } from "../../Icons/ClosedEye.svg";
import { ReactComponent as OpenEye } from "../../Icons/OpenEye.svg";
import { Link } from "react-router-dom";
import { ReactComponent as GoogleIcon } from "../../Icons/GoogleIcon.svg";
import axios from "axios";
import { useDispatch, connect } from "react-redux";
import CryptoJS from "crypto-js";
import { login } from "../../store/slices/UserSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgotPassword from "../../components/ForgotPassword";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    remember_me: false,
  });
  const loggedIn = useSelector((state) => state.users.isLoggedIn);

  const [error, setError] = useState("");
  const [loginSection, setLoginSection] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const basePath = process.env.REACT_APP_API_PATH;
  const dispatch = useDispatch();

  // const [currentURL, setCurrentURL] = useState('');
  // useEffect(() => {
  //     setCurrentURL(window.location.href);
  //   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${basePath}/api/login`, userDetails, {
        headers: {
          "Content-Type": "application/json",
          // add any additional headers here
        },
      });

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
        const token = response.data.token;

        // store in localStorage so we can get it back and set in resux store again.
        const SecretKey = process.env.REACT_APP_SECRETE_KEY;
        const encryptedToken = CryptoJS.AES.encrypt(token, SecretKey).toString();
        const expirationMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const expirationTimestamp = new Date().getTime() + expirationMs;
        localStorage.setItem(
          "token",
          JSON.stringify({ encryptedToken, expirationTimestamp })
        );

        navigate(-1);
        dispatch(login({ token }));
        setError("");
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
      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
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
      setLoading(false);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Login</title>
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
            <LoginImage />
          </div>
          <div className="loginRightDetails">
            {loginSection ? (
              <>
                <h1 className="loginTitle">
                  <span>Login</span>
                </h1>
                <div className="padding20"></div>
                <p className="errorMessage">{error}</p>
                <form id="loginForm">
                  <p className="authFormLabel">Email Address</p>
                  <input
                    name="email"
                    value={userDetails.email}
                    type="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <div className="padding16"></div>
                  <p className="authFormLabel">Password</p>
                  <input
                    name="password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    value={userDetails.password}
                  />
                  <span className="eyeIcon" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <OpenEye /> : <ClosedEye />}
                  </span>
                  <div className="authTwoCol">
                    <div className="d-flex align-items-center">
                      <input
                        type="checkbox"
                        checked={userDetails.remember_me}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            remember_me: e.target.checked,
                          })
                        }
                      />
                      <label>Remember Me</label>
                    </div>
                    <p
                      className="forgetPassword"
                      onClick={() => {
                        setLoginSection(false);
                      }}
                    >
                      Forgot Password?
                    </p>
                  </div>
                  <div className="authBtnGroup">
                    <button
                      className="btnDark width-100"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Please wait" : "Login"}
                    </button>
                    <button className="whiteShadeBtn width-100">
                      <GoogleIcon className="googleIcon" />
                      Continue with Google
                    </button>
                  </div>
                </form>
                <p className="authDesc">
                  Don’t have an account? &nbsp;
                  <Link className="forgetPassword" to="/sign-up">
                    Sign up for free
                  </Link>
                </p>
              </>
            ) : (
              <ForgotPassword setLoginSection={setLoginSection} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default connect(null, { login })(Login);
