import React from "react";
import "./style.css";
import "./responsive.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
// importing svg icons
import { ReactComponent as ContactSVG } from "../../Icons/Contact.svg";

export const ContactUs = () => {
  // Contact us
  // const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const {
    register,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactFormErrors },
    reset: resetContactForm,
  } = useForm();
  const basePath = process.env.REACT_APP_API_PATH;
  const onSubmitContactForm = (data) => {
    axios
      .post(`${basePath}/api/submit-contact-us`, data)
      .then((response) => {
        setTimeout(() => {
          resetContactForm();
        }, 2000);
        // Handle the API response here
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
        }
        if (response.data?.error) {
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
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        // Handle the error here
        toast.error("Unauthorized User", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  // End

  // Subscribe form
  const {
    register: registerSubscriber,
    handleSubmit: handleSubmitSubscriber,
    formState: { errors: subscriberFormErrors },
    reset: resetSubscriberForm,
  } = useForm();
  const onSubscriberSubmit = (data) => {
    axios
      .post(`${basePath}/api/add-subscriber`, data)
      .then((response) => {
        setTimeout(() => {
          resetSubscriberForm();
        }, 2000);
        // Handle the API response here
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
        }
        if (response.data?.error) {
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
      })
      .catch((error) => {
        console.error("Error submitting form:", error.response.data.msg);
        // Handle the error here
        toast.error(error.response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  // Subscribe form
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^\d+$/.test(keyValue) && !/^[\b]+$/.test(keyValue)) {
      event.preventDefault();
    }
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Contact Us</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      <ToastContainer
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />

      <div className="row cotactUsSection">
        {/* Column first */}
        <div className="col-md-6 col-lg-6 col-xl-6">
          <h1 class="headingtext">We'd love to hear from you!</h1>
          <div class="designimage">
            <svg
              class="svgimg"
              viewBox="0 0 169 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.68447 5.01665C5.0263 5.01665 6.36813 4.95827 7.70365 4.92643L9.33526 4.86274L16.5358 4.56024C19.3832 4.43641 22.2516 4.30904 25.1411 4.17813L37.438 3.59966L40.254 3.48821L47.4167 3.18571L54.5794 2.92035C55.518 2.8832 56.4693 2.83544 57.389 2.8089L68.8166 2.5064L75.847 2.32065C76.7604 2.32065 77.6802 2.26227 78.5999 2.25166L89.6432 2.12429L100.548 1.9863C101.512 1.9863 102.438 1.9863 103.427 1.9863L110.545 1.95977L121.601 1.90139H125.224H132.783H133.413C127.727 1.96508 122.04 2.0323 116.354 2.10306L109.254 2.23043C108.233 2.23043 107.207 2.23043 106.18 2.26758L95.8736 2.50109L83.9609 2.77175C83.2932 2.77175 82.6254 2.81952 81.964 2.84605L75.6139 3.09548L62.7437 3.59435C62.1137 3.59435 61.4838 3.65273 60.8538 3.68988L54.5542 4.05607L43.303 4.71415C42.2698 4.77252 41.2367 4.85744 40.2036 4.93174L32.9968 5.46244L23.8308 6.09399L11.0866 7.03334L8.02493 7.25624C6.19804 7.38892 4.37744 7.58528 2.55684 7.7551C2.50612 7.74941 2.45455 7.75291 2.40557 7.76537C2.35659 7.77783 2.31134 7.79896 2.27284 7.82736C2.23435 7.85575 2.2035 7.89074 2.18237 7.93C2.16123 7.96925 2.1503 8.01185 2.1503 8.05495C2.1503 8.09806 2.16123 8.14066 2.18237 8.17991C2.2035 8.21917 2.23435 8.25416 2.27284 8.28255C2.31134 8.31095 2.35659 8.33208 2.40557 8.34454C2.45455 8.357 2.50612 8.3605 2.55684 8.3548L4.55383 8.4291C4.46796 8.57422 4.42271 8.73398 4.42153 8.89613C4.42319 9.18846 4.56177 9.46843 4.80715 9.67514C5.05253 9.88186 5.38485 9.9986 5.73186 10C10.9417 9.72403 16.1515 9.42684 21.3676 9.21986L34.9496 8.68915L49.9617 8.08945L54.6928 7.8984C55.1463 7.8984 55.5999 7.85594 56.0535 7.84532L80.2441 7.31462L93.171 7.02803C94.7333 6.99619 96.2894 6.96435 97.8454 6.94312L122.584 6.61939L133.186 6.4761C136.204 6.43364 139.221 6.41772 142.239 6.32219L149.717 6.08337C150.977 6.04622 152.237 6.01969 153.446 5.956L161.919 5.47306C161.761 5.70458 161.718 5.9792 161.799 6.23728C161.881 6.48744 162.075 6.7008 162.341 6.83167C162.476 6.90004 162.626 6.94428 162.782 6.96163C162.938 6.97898 163.097 6.96906 163.248 6.93251C163.878 6.72553 164.508 6.51325 165.094 6.29566H165.056L165.189 6.24789L165.346 6.18951H165.289L166.266 5.84455L167.293 5.47837C167.658 5.34038 168.017 5.17586 168.37 5.01665C168.564 4.91717 168.725 4.77678 168.835 4.60929C168.946 4.4418 169.002 4.25297 169 4.06137C168.999 3.8207 168.906 3.58675 168.733 3.39514C168.56 3.20352 168.318 3.06475 168.042 2.99996C167.721 2.95219 167.412 2.91504 167.091 2.8832H166.877C166.663 2.8832 166.442 2.8832 166.247 2.92035C165.768 2.92035 165.289 3.01057 164.811 3.03711L163.633 3.11141L160.483 3.30246L159.664 3.35022C159.763 3.25497 159.836 3.14268 159.878 3.02119C159.927 2.92552 159.955 2.82293 159.96 2.71868L159.998 2.49048C159.996 2.39435 159.975 2.29917 159.935 2.2092L160.017 2.17736C160.213 2.08017 160.377 1.94339 160.495 1.77933C160.601 1.61248 160.657 1.42687 160.659 1.23801C160.656 1.04046 160.593 0.846843 160.477 0.675455L160.269 0.452557C160.107 0.315416 159.904 0.216585 159.683 0.165975C159.279 0.0458304 158.851 -0.00995719 158.423 0.00145539C158.076 0.00145539 157.717 0.00145539 157.371 0.0279908H155.846C155.128 0.0279908 154.416 0.0279908 153.698 0.0279908H148.028C146.246 0.0279908 144.463 0.0279908 142.68 0.0279908H137.817C131.353 0.0279908 124.896 0.0598333 118.433 0.112904L103.893 0.303959C101.726 0.303959 99.5652 0.346416 97.3981 0.388872L82.8333 0.64892L78.6818 0.723219C77.8755 0.723219 77.0754 0.770982 76.2691 0.797518L61.8744 1.25393L57.4646 1.39722C56.6456 1.42375 55.8204 1.46621 55.0014 1.50336L40.7264 2.15082C38.2633 2.26227 35.8064 2.38964 33.3432 2.51701L20.7124 3.18571C17.0649 3.37676 13.4174 3.54659 9.76994 3.71641L8.03753 3.80133L5.23419 3.9287C4.40263 3.96054 3.57108 3.97646 2.71433 3.96054C2.67494 3.86784 2.60216 3.78783 2.50615 3.73169C2.41015 3.67555 2.29572 3.64609 2.17886 3.64742C1.64339 3.68457 1.10792 3.73233 0.572446 3.7801C0.448015 3.78726 0.328909 3.82538 0.230219 3.88963C0.131529 3.95387 0.057697 4.04135 0.0180766 4.14098C-0.0201637 4.26765 0.0027981 4.40193 0.0819248 4.51435C0.161052 4.62678 0.289882 4.70817 0.440153 4.74068L1.13941 4.87866C1.37191 4.91908 1.60783 4.94392 1.84498 4.95296C2.45604 5.00073 3.07341 5.01134 3.68447 5.01665ZM151.096 3.31308H153.446C153.514 3.46093 153.622 3.59352 153.761 3.70049C153.459 3.72172 153.156 3.73764 152.854 3.74826L151.14 3.80133L143.65 4.02953C142.51 4.06668 141.37 4.11975 140.229 4.13567L134.881 4.20467L122.66 4.36918L98.9352 4.68761C93.2655 4.76191 87.5958 4.91051 81.9262 5.03788L56.3748 5.60574C54.6676 5.64819 52.9541 5.73841 51.2468 5.8074L36.7198 6.39649L22.4637 6.96966L21.1408 7.02273L24.9836 6.76799L38.4082 5.90293L43.0951 5.60043L45.5142 5.47306L59.4742 4.77783C60.3813 4.73007 61.2885 4.67169 62.2019 4.63985L66.1644 4.49656L80.5591 4.02422L83.709 3.92339C83.9861 3.92339 84.2633 3.92339 84.5468 3.92339L86.7706 3.88624L101.19 3.63681C103.402 3.59966 105.6 3.5572 107.83 3.54128C114.98 3.49352 122.124 3.42983 129.249 3.4033C136.538 3.36084 143.82 3.31838 151.103 3.31308H151.096Z"
                fill="#00BBBB"
              />
            </svg>
          </div>
          <div>
            <p className="contactSubHeading">
              Whether you’re curious about the buying process, loan application,
              or even litigation - we’re ready to answer any and all your
              questions.
            </p>
          </div>

          <div>
            <table width="100%" class="location-table">
              <tr>
                <td width="36px">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10ZM14 8.2C14 4.57 11.35 2 8 2C4.65 2 2 4.57 2 8.2C2 10.54 3.95 13.64 8 17.34C12.05 13.64 14 10.54 14 8.2ZM8 0C12.2 0 16 3.22 16 8.2C16 11.52 13.33 15.45 8 20C2.67 15.45 0 11.52 0 8.2C0 3.22 3.8 0 8 0Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td>
                  <p class="location_title">Registered Address - New Delhi</p>
                  <p class="contact_location_details">
                    AltF 5th Floor, A-Wing, Statesman House,
                    <br /> Barakhamba Road,New Delhi - 110001
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "80%",
                      height: "1px",
                      margin: "40px 0",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td width="36px">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10ZM14 8.2C14 4.57 11.35 2 8 2C4.65 2 2 4.57 2 8.2C2 10.54 3.95 13.64 8 17.34C12.05 13.64 14 10.54 14 8.2ZM8 0C12.2 0 16 3.22 16 8.2C16 11.52 13.33 15.45 8 20C2.67 15.45 0 11.52 0 8.2C0 3.22 3.8 0 8 0Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td>
                  <p class="location_title">Corporate Address - Noida</p>
                  <p class="contact_location_details">
                    3D, A1, A Block, Sector 10, Noida, Uttar Pradesh - 201301
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "80%",
                      height: "1px",
                      margin: "40px 0",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td width="36px">
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10ZM14 8.2C14 4.57 11.35 2 8 2C4.65 2 2 4.57 2 8.2C2 10.54 3.95 13.64 8 17.34C12.05 13.64 14 10.54 14 8.2ZM8 0C12.2 0 16 3.22 16 8.2C16 11.52 13.33 15.45 8 20C2.67 15.45 0 11.52 0 8.2C0 3.22 3.8 0 8 0Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td>
                  <p class="location_title">Corporate Address - Bangalore</p>
                  <p class="contact_location_details">
                    917 B-Wing, Mittal Towers, MG Road, Bangalore,
                    <br /> Karnataka - 560001
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div
                    style={{
                      backgroundColor: "#e0e0e0",
                      width: "80%",
                      height: "1px",
                      margin: "40px 0",
                    }}
                  ></div>
                </td>
              </tr>
              <tr>
                <td width="36px">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.54 2C3.6 2.89 3.75 3.76 3.99 4.59L2.79 5.79C2.38 4.59 2.12 3.32 2.03 2H3.54ZM13.4 14.02C14.25 14.26 15.12 14.41 16 14.47V15.96C14.68 15.87 13.41 15.61 12.2 15.21L13.4 14.02ZM4.5 0H1C0.45 0 0 0.45 0 1C0 10.39 7.61 18 17 18C17.55 18 18 17.55 18 17V13.51C18 12.96 17.55 12.51 17 12.51C15.76 12.51 14.55 12.31 13.43 11.94C13.33 11.9 13.22 11.89 13.12 11.89C12.86 11.89 12.61 11.99 12.41 12.18L10.21 14.38C7.38 12.93 5.06 10.62 3.62 7.79L5.82 5.59C6.1 5.31 6.18 4.92 6.07 4.57C5.7 3.45 5.5 2.25 5.5 1C5.5 0.45 5.05 0 4.5 0Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p class="contact_bottom_details">+91 9899 360 360</p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style={{ paddingTop: "20px" }}></div>
                </td>
              </tr>
              <tr>
                <td width="36px">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0498 2.91C15.1798 1.03 12.6898 0 10.0398 0C4.5798 0 0.129805 4.45 0.129805 9.91C0.129805 11.66 0.589805 13.36 1.4498 14.86L0.0498047 20L5.2998 18.62C6.7498 19.41 8.3798 19.83 10.0398 19.83C15.4998 19.83 19.9498 15.38 19.9498 9.92C19.9498 7.27 18.9198 4.78 17.0498 2.91ZM10.0398 18.15C8.5598 18.15 7.1098 17.75 5.8398 17L5.5398 16.82L2.4198 17.64L3.2498 14.6L3.0498 14.29C2.2298 12.98 1.7898 11.46 1.7898 9.91C1.7898 5.37 5.4898 1.67 10.0298 1.67C12.2298 1.67 14.2998 2.53 15.8498 4.09C17.4098 5.65 18.2598 7.72 18.2598 9.92C18.2798 14.46 14.5798 18.15 10.0398 18.15ZM14.5598 11.99C14.3098 11.87 13.0898 11.27 12.8698 11.18C12.6398 11.1 12.4798 11.06 12.3098 11.3C12.1398 11.55 11.6698 12.11 11.5298 12.27C11.3898 12.44 11.2398 12.46 10.9898 12.33C10.7398 12.21 9.9398 11.94 8.9998 11.1C8.2598 10.44 7.7698 9.63 7.6198 9.38C7.4798 9.13 7.5998 9 7.7298 8.87C7.8398 8.76 7.9798 8.58 8.0998 8.44C8.2198 8.3 8.2698 8.19 8.3498 8.03C8.4298 7.86 8.3898 7.72 8.3298 7.6C8.2698 7.48 7.7698 6.26 7.5698 5.76C7.3698 5.28 7.1598 5.34 7.0098 5.33C6.8598 5.33 6.6998 5.33 6.5298 5.33C6.3598 5.33 6.0998 5.39 5.8698 5.64C5.6498 5.89 5.0098 6.49 5.0098 7.71C5.0098 8.93 5.89981 10.11 6.0198 10.27C6.1398 10.44 7.7698 12.94 10.2498 14.01C10.8398 14.27 11.2998 14.42 11.6598 14.53C12.2498 14.72 12.7898 14.69 13.2198 14.63C13.6998 14.56 14.6898 14.03 14.8898 13.45C15.0998 12.87 15.0998 12.38 15.0298 12.27C14.9598 12.16 14.8098 12.11 14.5598 11.99Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p class="contact_bottom_details">+91 8851 834 520</p>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <div style={{ paddingTop: "20px" }}></div>
                </td>
              </tr>
              <tr>
                <td width="36px">
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 20 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 2C20 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2ZM18 2L10 7L2 2H18ZM18 14H2V4L10 9L18 4V14Z"
                      fill="#00BBBB"
                    />
                  </svg>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <p class="contact_bottom_details">care@hecta.co</p>
                </td>
              </tr>
            </table>
          </div>
        </div>

        {/* Column first */}
        <div className="col-md-6 col-lg-6 col-xl-6">
          <div className="formDesignSvg">
            <ContactSVG />
          </div>
          <div className="contactFormSection">
            <form
              className="contactUsForm"
              onSubmit={handleSubmitContact(onSubmitContactForm)}
            >
              <label className="contactAuthFormLabel">Name</label>
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {contactFormErrors.name && (
                <span className="error">Name is required</span>
              )}

              <div className="padding-12"></div>

              <div className="twoCol">
                <div>
                  <label className="contactAuthFormLabel">Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email", { required: true })}
                  />
                  {contactFormErrors.email && (
                    <span className="error">Email is required</span>
                  )}
                </div>
                <div>
                  <label className="contactAuthFormLabel">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    onKeyDown={handleKeyPress}
                    maxLength={10}
                    {...register("phone", { required: true })}
                  />
                  {contactFormErrors.phone && (
                    <span className="error">Phone number is required</span>
                  )}
                </div>
              </div>
              <div className="padding-12"></div>

              <div>
                <label className="contactAuthFormLabel">Contacting As A</label>
                <br></br>
                <select
                  className="contact-form-select"
                  aria-label="Default select"
                >
                  <option value="DEFAULT">None</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
                {contactFormErrors.select && (
                  <span className="error">Email is required</span>
                )}
              </div>

              <div className="padding-12"></div>

              <label className="contactAuthFormLabel">Message (Optional)</label>
              <br></br>
              <textarea
                placeholder="Type here"
                rows="6"
                {...register("message")}
              ></textarea>

              <button className="btnDark contactBtn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <div class="svgenvcontainer">
    <ContactSVG />
    </div> */}
    </>
  );
};
