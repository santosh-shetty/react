import React, { useState, useEffect } from "react";
import TopHighlight from "../../components/BiddingForm/TopHighlight";
import BidderDetails from "../../components/BiddingForm/BidderDetails";
import KYCDocuments from "../../components/BiddingForm/KYCDocuments";
import EMDSubmission from "../../components/BiddingForm/EMDSubmission";
import TermsAndConditions from "../../components/BiddingForm/TermsAndConditions";
import "./style.css";
import { useSelector } from "react-redux";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BiddingForm = (props) => {
  const navigate = useNavigate();
  // Check loggedIn status
  const loggedIn = useSelector((state) => state.users.isLoggedIn);

  // Top highlight navigation initial state
  const [existingData, setExistingData] = useState([]);
  const [property, setProperty] = useState(null);
  const [biddersData, setBiddersdata] = useState(false);
  const [kycData, setKycData] = useState(false);
  const [emdData, setEmdData] = useState(false);
  const [termsData, setTermsData] = useState(false);
  const [update, setUpdate] = useState([false, false, false, false, false, false]);
  const [refetch, setRefetch] = useState(false);
  // End

  // Property Id from URL
  const params = useParams();
  const propertyId = params.propertyId;
  // End

  // API Congigurations
  const basePath = process.env.REACT_APP_API_PATH;
  const urlGetData = `${basePath}/api/get-bidding-details?property_id=${propertyId}`;
  const token = useSelector((state) => state.users.token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      property_id: propertyId,
    },
  };
  // End

  const getBiddingDetails = () => {
    axios
      .get(urlGetData, config)
      .then((response) => {
        const data = response.data.data;
        setExistingData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPropertyById = () => {
    axios
      .get(`${basePath}/api/property?id=${propertyId}`, config)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getBiddingDetails();
  }, [refetch]);

  // Prefetch Data Api
  useEffect(() => {
    getBiddingDetails();
    getPropertyById();
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  // End

  // Set form highlight navigation status biddersData
  useEffect(() => {
    console.log(existingData.step_status);
    // Set biddersData status
    if (existingData.step_status >= 1) {
      setBiddersdata(true);
    }
    if (existingData.step_status >= 2) {
      setKycData(true);
    }
    if (existingData.step_status >= 3) {
      setEmdData(true);
    }
    if (existingData.step_status >= 4) {
      setTermsData(true);
    }
    if (existingData.step_status === 4) {
      setModalShow(true);
    }
  }, [existingData.step_status]);
  // end

  const [modalShow, setModalShow] = React.useState(false);

  const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center">
          <p className="modalText">
            You have already submitted the auction application for this property
          </p>
          <button className="btnDark" onClick={props.onHide}>
            Okay
          </button>
        </Modal.Body>
      </Modal>
    );
  };

  const redirectToPropertyList = () => {
    navigate(-1);
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Bidding Application</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      {loggedIn === true ? (
        <>
          <div className="bgGray ">
            <div className="paddingtop bg-white"></div>
            <ToastContainer
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              theme="colored"
            />
            <TopHighlight
              bidderDetailsId="bidderDetails"
              kycDetailsId="kycDetails"
              emdDetailsId="emdDetails"
              termsDetailsId="termsDetails"
              emdDataFilled={emdData}
              kycDataFilled={kycData}
              termsFilled={termsData}
              biddersFilled={biddersData}
            />
            <div className="padding-8" id="bidderDetails"></div>
            <BidderDetails
              setRefetch={setRefetch}
              filledStatus={setBiddersdata}
              bidderName={existingData.bidder_name}
              bidderFatherName={existingData.father_name}
              gender={existingData.gender}
              bidderAddress={existingData.address}
              bidderContactNumber={existingData.contact_number}
              bidderEmail={existingData.email}
              bidderAadharNumber={existingData.aadhar_number}
              bidderPanNumber={existingData.pan_number}
            />
            <div className="padding-8" id="kycDetails"></div>
            <KYCDocuments
              setRefetch={setRefetch}
              filledStatus={setKycData}
              addressProofType={existingData.address_proof}
              addressProofImageFront={existingData.address_proof_back}
              addressProofImageBack={existingData.address_proof_front}
              panCardImage={existingData.pan_card}
              form60Image={existingData.form_60}
              generalPowerOfAttorneyImage={existingData.gpa}
              tenderDocumentImage={existingData.tender_document}
              stepStatus={existingData.step_status}
              update={update}
            />
            <div className="padding-8" id="emdDetails"></div>
            <EMDSubmission
              property={property}
              setRefetch={setRefetch}
              filledStatus={setEmdData}
              EMDAmount={existingData.emd_amount}
              Amount={existingData.amount}
              bankName={existingData.bank_name}
              bankAddress={existingData.bank_address}
              instrumentType={existingData.instrument_type}
              instrumentNumber={existingData.instrument_number}
              instrumentDate={existingData.instrument_date}
              employeeName={existingData.employee_name}
              employeeId={existingData.employee_id}
              contactNumber={existingData.employee_contact_number}
              emailAddress={existingData.employee_email}
              branchAddress={existingData.branch_address}
              instrumentProofImage={existingData.instrument_proof}
            />
            <div className="padding-8" id="termsDetails"></div>
            <TermsAndConditions
              filledStatus={setTermsData}
              checkStatus={existingData.step_status}
            />
            <div className="padding-8"></div>
          </div>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onClick={redirectToPropertyList}
          />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default BiddingForm;
