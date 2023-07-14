import React, { useEffect, useState } from "react";
import { ReactComponent as FilledArrow } from "../../Icons/FilledArrow.svg";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as Tick } from "../../Icons/Tick.svg";
import moment from "moment";

const EMDSubmission = (props, filledStatus) => {
  // Initial Form Data

  const { pathname } = useLocation();

  const [readOnly, setReadOnly] = useState(false);
  const [formValues, setFormValues] = useState({
    EMDAmount: "",
    Amount: "",
    bankName: "",
    bankAddress: "",
    instrumentType: "",
    instrumentProofImage: "",
    instrumentNumber: "",
    instrumentDate: "",
    employeeName: "",
    employeeId: "",
    contactNumber: "",
    emailAddress: "",
    branchAddress: "",
  });
  // End

  // API Congigurations
  const params = useParams();
  const propertyId = params.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  let urlPostData;
  if (props?.update)
    urlPostData = `${basePath}/api/update-emd-submission`; //Update url for submit form
  else urlPostData = `${basePath}/api/emd-submission`; //Url for submit form
  const token = useSelector((state) => state.users.token);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      property_id: propertyId,
    },
  };
  // End

  // Create formData Object
  const formData = new FormData();
  formData.append("property_id", propertyId);
  formData.append("emd_amount", formValues.EMDAmount);
  formData.append("amount", formValues.Amount);
  formData.append("bank_name", formValues.bankName);
  formData.append("bank_address", formValues.bankAddress);
  formData.append("instrument_type", formValues.instrumentType);
  formData.append("instrument_number", formValues.instrumentNumber);
  formData.append("instrument_date", formValues.instrumentDate);
  formData.append("employee_name", formValues.employeeName);
  formData.append("employee_id", formValues.employeeId);
  formData.append("employee_contact_number", formValues.contactNumber);
  formData.append("employee_email", formValues.emailAddress);
  formData.append("branch_address", formValues.branchAddress);
  if (props?.update) {
    formData.append("step_status", props?.stepStatus);
    if (typeof formValues.instrumentProofImage != "string") {
      formData.append("instrument_proof", formValues.instrumentProofImage?.[0]);
    } else {
      formData.append("instrument_proof_url", formValues.instrumentProofImage);
    }
  } else {
    formData.append("instrument_proof", formValues.instrumentProofImage?.[0]);
    formData.append("step_status", "3");
  }
  // End formdata object

  // Default error visibilty
  const [error, setError] = useState({
    error1: false,
    error2: false,
    error3: false,
    error4: false,
    error5: false,
    error6: false,
    error7: false,
    error8: false,
    error9: false,
    error10: false,
    error11: false,
    error12: false,
    error13: false,
  });
  // End

  // Existing Data
  useEffect(() => {
    const {
      EMDAmount,
      Amount,
      bankName,
      bankAddress,
      instrumentType,
      instrumentNumber,
      instrumentDate,
      employeeName,
      employeeId,
      contactNumber,
      emailAddress,
      branchAddress,
      instrumentProofImage,
    } = props;
    console.log(props?.property, "emddd");
    setFormValues({
      EMDAmount: props?.property?.emd ? props?.property?.emd : EMDAmount,
      Amount,
      bankName,
      bankAddress,
      instrumentType,
      instrumentNumber,
      instrumentDate,
      employeeName,
      employeeId,
      contactNumber,
      emailAddress,
      branchAddress,
      instrumentProofImage,
    });
    if (pathname.includes("view")) {
      setReadOnly(true);
    }
  }, [props]);

  // handle submit emd details
  const handleEmdDetails = (event) => {
    event.preventDefault();

    // Validate input fields
    if (!formValues.EMDAmount) {
      setError((prevState) => ({
        ...prevState,
        error1: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error1: false,
      }));
    }
    if (!formValues.Amount) {
      setError((prevState) => ({
        ...prevState,
        error2: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error2: false,
      }));
    }
    if (!formValues.Amount) {
      setError((prevState) => ({
        ...prevState,
        error3: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error3: false,
      }));
    }
    if (!formValues.bankName) {
      setError((prevState) => ({
        ...prevState,
        error4: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error4: false,
      }));
    }
    if (!formValues.bankAddress) {
      setError((prevState) => ({
        ...prevState,
        error4: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error4: false,
      }));
    }
    if (!formValues.instrumentType) {
      setError((prevState) => ({
        ...prevState,
        error5: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error5: false,
      }));
    }
    if (!formValues.instrumentNumber) {
      setError((prevState) => ({
        ...prevState,
        error6: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error6: false,
      }));
    }
    if (!formValues.instrumentDate) {
      setError((prevState) => ({
        ...prevState,
        error7: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error7: false,
      }));
    }
    if (!formValues.employeeName) {
      setError((prevState) => ({
        ...prevState,
        error8: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error8: false,
      }));
    }
    if (!formValues.employeeId) {
      setError((prevState) => ({
        ...prevState,
        error9: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error9: false,
      }));
    }
    if (!formValues.contactNumber) {
      setError((prevState) => ({
        ...prevState,
        error10: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error10: false,
      }));
    }
    if (!formValues.emailAddress) {
      setError((prevState) => ({
        ...prevState,
        error11: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error11: false,
      }));
    }
    if (!formValues.branchAddress) {
      setError((prevState) => ({
        ...prevState,
        error12: true,
      }));
    } else {
      setError((prevState) => ({
        ...prevState,
        error12: false,
      }));
    }
    if (props?.update) {
      if (!formValues.instrumentProofImage) {
        setError((prevState) => ({
          ...prevState,
          error13: true,
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          error13: false,
        }));
      }
    } else {
      if (!formValues.instrumentProofImage?.[0]) {
        setError((prevState) => ({
          ...prevState,
          error13: true,
        }));
      } else {
        setError((prevState) => ({
          ...prevState,
          error13: false,
        }));
      }
    }
    // End Validations

    // APi Call
    axios
      .post(urlPostData, formData, config)
      .then((response) => {
        console.log(response.data);
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
        props.filledStatus(true);
        setIsFormVisible(false);
        props?.setRefetch((prev) => !prev);
      })
      .catch((error) => {
        console.error(error);
        if (
          error.response.data.message ==
          "All steps for this auction form is already submited"
        ) {
          toast.error("EMD details aready submitted", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (error.response.data.message == "Unauthorized User") {
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
        } else if (
          error.response.data.message ==
          "We can not find any bidding details for this property!"
        ) {
          toast.error("Please submit bidding details and KYC details first", {
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
      });
    // End
  };
  // End HandleEMD submit details

  // Input Values Change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //  End

  // Image Upload data to the form data
  const handleImageUpload = (index, image) => {
    if (index === 0) {
      setFormValues((prevState) => ({
        ...prevState,
        instrumentProofImage: image,
      }));
    }
  };
  // End

  // Collpse Form Div
  const [isFormVisible, setIsFormVisible] = useState(true);
  const toggleForm = () => {
    setIsFormVisible((prevState) => !prevState);
  };
  const arrowClass = isFormVisible ? "DownArrow" : "UpArrow";

  // End
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  // console.log(formValues)

  return (
    <>
      <div className="detailsContent">
        <div className="DetailsBox">
          <div className="boxNav">
            <p>EMD Submission</p>
            <div>
              <FilledArrow className={arrowClass} onClick={toggleForm} />
            </div>
          </div>
          {isFormVisible && (
            <form>
              <div className="formDetails">
                {/* Left Section */}
                <div className="leftSection">
                  <p className="formDesc">
                    Please provide the EMD submission details for participating in the
                    auction. All fields are mandatory.
                  </p>
                </div>
                {/* End */}

                {/* Right Section */}
                <div className="rightSection">
                  <div className="formGroupTwoCol">
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>EMD Amount</p>

                      <input
                        type="text"
                        placeholder="₹ 5,92,00,000"
                        name="EMDAmount"
                        value={formValues.EMDAmount}
                        onChange={handleChange}
                        readOnly={true}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error1 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Amount</p>

                      <input
                        type="text"
                        placeholder="Amount"
                        name="Amount"
                        value={formValues.Amount}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error2 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Bank Name</p>

                      <input
                        type="text"
                        placeholder="Bank Name"
                        name="bankName"
                        value={formValues.bankName}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error3 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Bank Address</p>

                      <input
                        type="text"
                        placeholder="Bank Address"
                        name="bankAddress"
                        value={formValues.bankAddress}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error4 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Instrument Type</p>
                      {readOnly ? (
                        <input
                          type="text"
                          name="instrumentType"
                          value={formValues.bankAddress}
                          onChange={handleChange}
                          readOnly={readOnly}
                          className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                        />
                      ) : (
                        <select
                          id="instrumentType"
                          name="instrumentType"
                          value={formValues.instrumentType}
                          onChange={handleChange}
                        >
                          <option disabled defaultValue value="">
                            Choose Instrument Type
                          </option>
                          <option>Demand Draft</option>
                          <option>Cheque</option>
                          <option>Online Transaction</option>
                        </select>
                      )}
                      {error.error5 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Instrument Proof</p>
                      {props?.update ? (
                        <p className="photoSubmited">
                          <span>
                            <a href={formValues.instrumentProofImage} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => props.setUpdate(!props.update)}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : props?.stepStatus == 3 ? (
                        <p className="photoSubmited">
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={0}
                            handleImageUpload={handleImageUpload}
                          />
                          {error.error13 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Instrument Number</p>

                      <input
                        type="text"
                        placeholder="Instrument Number"
                        name="instrumentNumber"
                        value={formValues.instrumentNumber}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error6 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Instrument Date</p>

                      <input
                        type="date"
                        placeholder="Instrument Date"
                        name="instrumentDate"
                        value={moment(formValues.instrumentDate).format("YYYY-MM-DD")}
                        onChange={handleChange}
                        max={getCurrentDate()}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error7 && <error>This field is required</error>}
                    </div>
                  </div>
                </div>
                {/* End */}
              </div>
              <div className="horizontalLine"></div>

              <div className="formDetails" style={{ paddingTop: "0px" }}>
                {/* Left Section */}
                <div className="leftSection">
                  <p className="formDesc">
                    Please provide the details of the bank person to whom the EMD has been
                    handed over to. All fields are mandatory.
                  </p>
                </div>
                {/* End */}

                {/* Right Section */}
                <div className="rightSection">
                  <div className="formGroupTwoCol">
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Employee Name</p>

                      <input
                        type="text"
                        placeholder="Employee Name"
                        name="employeeName"
                        value={formValues.employeeName}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error8 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Employee ID</p>

                      <input
                        type="text"
                        placeholder="Employee ID"
                        name="employeeId"
                        value={formValues.employeeId}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error9 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Contact Number</p>

                      <input
                        type="text"
                        placeholder="Contact Number"
                        name="contactNumber"
                        value={formValues.contactNumber}
                        onChange={handleChange}
                        maxLength={10}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error10 && <error>This field is required</error>}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Email Address</p>

                      <input
                        type="text"
                        placeholder="Email Address"
                        name="emailAddress"
                        value={formValues.emailAddress}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error11 && <error>This field is required</error>}
                    </div>

                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Branch Address</p>

                      <input
                        type="text"
                        placeholder="Branch Address"
                        name="branchAddress"
                        value={formValues.branchAddress}
                        onChange={handleChange}
                        readOnly={readOnly}
                        className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                      />
                      {error.error12 && <error>This field is required</error>}
                    </div>
                  </div>
                </div>
                {/* End */}
              </div>
              <div className="horizontalLine"></div>
              <div className="floatRight">
                {!readOnly ? (
                  <button
                    type="submit"
                    className="blueShadeBtn saveBtn"
                    onClick={handleEmdDetails}
                  >
                    {props?.update ? "Update" : "Save"}
                  </button>
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EMDSubmission;
