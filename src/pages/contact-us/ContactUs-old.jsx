import React from "react";
import "./style.css";
import "./responsive.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Helmet, HelmetProvider  } from "react-helmet-async";

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
        <title>
         Contact Us
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
     </HelmetProvider>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="colored" />
      <div className="allContent60">
        {/* 1st Scetion */}
        <div>
          <div className="paddingTop"></div>
          <h1 className="contactTitle">We’d love to hear from you.</h1>
          <p className="contactSubtitle">How can we help?</p>
          <div className="padding-40"></div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xl-6">
                <p className="contactDataTitle">Support</p>
                <p className="contactdataSubtitle">
                  Our friendly team is here to help you.
                </p>
                <p className="cLink">
                  <a className="contactdataLink" href="mailto:support@auctionpe.com">
                    support@auctionpe.com
                  </a>
                </p>
                <div className="padding-40"></div>
                <div className="line"></div>
                <div className="padding-40"></div>
                <p className="contactDataTitle">Helpline</p>
                <p className="contactdataSubtitle">Mon - Sat from 9am to 6pm.</p>
                <p className="cLink">
                  <a className="contactdataLink" href="tel:+91 9899 360360">
                    +91 9899 360360
                  </a>
                </p>
                <div className="padding-40"></div>
                <div className="line"></div>
                <div className="padding-40"></div>
                <p className="contactDataTitle">WhatsApp</p>
                <p className="contactdataSubtitle">Questions or queries? Get in touch!</p>
                <p className="cLink">
                  <a
                    className="contactdataLink"
                    href="https://wa.link/gu4w1z"
                    target="_blank"
                    rel="noreferrer"
                  >
                    +91 88518 34520
                  </a>
                </p>
                <div className="padding-40"></div>
                <div className="line"></div>
                <div className="padding-40"></div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6">
                <div className="contactFormSection">
                  <form
                    className="contactUsForm"
                    onSubmit={handleSubmitContact(onSubmitContactForm)}
                  >
                    <label className="authFormLabel">Name</label>
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
                        <label className="authFormLabel">Email Address</label>
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
                        <label className="authFormLabel">Phone Number</label>
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

                    <label className="authFormLabel">Message (Optional)</label>
                    <br></br>
                    <textarea placeholder="Type here" {...register("message")}></textarea>

                    <p className="formDeclaration">
                      By submitting this form you agree to our Terms & Conditions and
                      Privacy Policy explaining how we may collect, use and disclose your
                      personal information including third parties.
                    </p>

                    <button className="btnDark" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="padding-40"></div>
        </div>
        {/* End */}
      </div>
      {/* 2nd section */}
      <div className="bg-lightBlue">
        <h2 className="contactsecondTitle">Want to visit us personally?</h2>
        <p className="contactSubtitle">How can we help?</p>
        <div className="padding-40"></div>
        <div className="fiveCol">
          <div className="fiveColFlexItem">
            <p className="descTitle">Registered Office</p>
            <p className="descText">
              AltF, 5th Floor, Wing A, Statesman
              <br /> Office, Barakhamba Road,
              <br />
              New Delhi - 110001
            </p>
          </div>
          <div className="fiveColFlexItem">
            <p className="descTitle">Noida</p>
            <p className="descText">
              3D, A1 Block, Sector 10, Noida,
              <br />
              Uttar Pradesh - 201301
            </p>
          </div>
          <div className="fiveColFlexItem">
            <p className="descTitle">Bengaluru</p>
            <p className="descText">
              917, B Wing, Mittal Towers, MG Road,
              <br /> Bengaluru, Karnataka - 560001
            </p>
          </div>
          <div className="fiveColFlexItem">
            <p className="descTitle">Chennai</p>
            <p className="descText">
              Jyostar Film City, 2-12, Maharajapuram,
              <br /> Kanakammachatram, Chennai - 631204
            </p>
          </div>
          <div className="fiveColFlexItem">
            <p className="descTitle">Hyderabad</p>
            <p className="descText">
              Villa #25 Shangri La, Pipleline Road,
              <br /> Hydrerabad- 500055
            </p>
          </div>
        </div>
      </div>
      {/* End */}
      {/* 3rd Section */}
      <div className="allContent60">
        <div className="padding-60"></div>
        <div>
          <h2 className="contactsecondTitle">Sign up for our newsletter.</h2>
          <p className="contactSubtitle">
            Be the first to receive updates on new listings, market insights, and
            exclusive offers.
          </p>
          <div className="padding-40"></div>
          <form
            className="subscriberForm text-center"
            onSubmit={handleSubmitSubscriber(onSubscriberSubmit)}
          >
            <div className="subsriberFlex">
              <input
                type="email"
                {...registerSubscriber("email", { required: true })}
                placeholder="Enter your Email Address"
              />

              <button className="blueShadeBtn" type="submit">
                Subscribe
              </button>
            </div>
            {subscriberFormErrors.email && (
              <span className="error">Email is required</span>
            )}
          </form>
          <div className="padding-40"></div>
        </div>
      </div>
    </>
  );
};
