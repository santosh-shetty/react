import React, { useEffect, useState } from "react";
import { ReactComponent as FilledArrow } from "../../Icons/FilledArrow.svg";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as Tick } from "../../Icons/Tick.svg";

const KYCDocuments = (props, filledStatus) => {
  // Form Data
  const [formValues, setFormValues] = useState({
    addressProofType: "",
    addressProofImageFront: "",
    addressProofImageBack: "",
    form60Image: "",
    generalPowerOfAttorneyImage: "",
    panCardImage: "",
    tenderDocumentImage: "",
  });
  // End

  const { pathname } = useLocation();

  const [readOnly, setReadOnly] = useState(false);

  const [dataAvailable, setDataAvailable] = useState(false);
  // Existing Data
  useEffect(() => {
    const {
      addressProofType,
      addressProofImageFront,
      addressProofImageBack,
      form60Image,
      generalPowerOfAttorneyImage,
      panCardImage,
      tenderDocumentImage,
      stepStatus,
    } = props;

    if (stepStatus === 2) {
      setDataAvailable(true);
    }
    setFormValues({
      addressProofType,
      addressProofImageFront,
      addressProofImageBack,
      form60Image,
      generalPowerOfAttorneyImage,
      panCardImage,
      tenderDocumentImage,
    });
    if (pathname.includes("view")) {
      setReadOnly(true);
    }
  }, [props]);
  // End
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
        addressProofImageFront: image,
      }));
    } else if (index === 1) {
      setFormValues((prevState) => ({
        ...prevState,
        addressProofImageBack: image,
      }));
    } else if (index === 2) {
      setFormValues((prevState) => ({
        ...prevState,
        form60Image: image,
      }));
    } else if (index === 3) {
      setFormValues((prevState) => ({
        ...prevState,
        generalPowerOfAttorneyImage: image,
      }));
    } else if (index === 4) {
      setFormValues((prevState) => ({
        ...prevState,
        panCardImage: image,
      }));
    } else if (index === 5) {
      setFormValues((prevState) => ({
        ...prevState,
        tenderDocumentImage: image,
      }));
    }
  };
  // End

  // Image Removal
  const handleImageRemoval = (index) => {
    if (index === 0) {
      setFormValues((prevState) => ({
        ...prevState,
        addressProofImageFront: undefined,
      }));
    } else if (index === 1) {
      setFormValues((prevState) => ({
        ...prevState,
        addressProofImageBack: undefined,
      }));
    } else if (index === 2) {
      setFormValues((prevState) => ({
        ...prevState,
        form60Image: undefined,
      }));
    } else if (index === 3) {
      setFormValues((prevState) => ({
        ...prevState,
        generalPowerOfAttorneyImage: undefined,
      }));
    } else if (index === 4) {
      setFormValues((prevState) => ({
        ...prevState,
        panCardImage: undefined,
      }));
    } else if (index === 5) {
      setFormValues((prevState) => ({
        ...prevState,
        tenderDocumentImage: undefined,
      }));
    }
  };

  // Collpse Form Div
  const [isFormVisible, setIsFormVisible] = useState(true);
  const toggleForm = () => {
    setIsFormVisible((prevState) => !prevState);
  };
  const arrowClass = isFormVisible ? "DownArrow" : "UpArrow";
  // End

  // API Congigurations
  const params = useParams();
  const propertyId = params.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  let urlPostData;
  if (pathname.includes("edit"))
    urlPostData = `${basePath}/api/update-kyc`; //Update url for submit form
  else urlPostData = `${basePath}/api/submit-kyc`; //Url for submit form
  const token = useSelector((state) => state.users.token);
  //  const token = 'tetst';
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      property_id: propertyId,
    },
  };
  // End

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
  });
  // End

  const handleSubmitKeyDetails = (event) => {
    event.preventDefault();

    // Create form data object
    const formData = new FormData();
    formData.append("property_id", propertyId);
    formData.append("address_proof", formValues.addressProofType);
    if (pathname.includes("edit")) {
      formData.append("step_status", props.stepStatus);
      if (typeof formValues.addressProofImageFront == "string")
        formData.append("address_proof_front_url", formValues.addressProofImageFront);
      else formData.append("address_proof_front", formValues.addressProofImageFront[0]);
      if (typeof formValues.addressProofImageBack == "string")
        formData.append("address_proof_back_url", formValues.addressProofImageBack);
      else formData.append("address_proof_back", formValues.addressProofImageBack[0]);
      if (typeof formValues.panCardImage == "string")
        formData.append("pan_card_url", formValues.panCardImage);
      else formData.append("pan_card", formValues.panCardImage[0]);
      if (typeof formValues.form60Image == "string")
        formData.append("form_60_url", formValues.form60Image);
      else formData.append("form_60", formValues.form60Image[0]);
      if (typeof formValues.generalPowerOfAttorneyImage == "string")
        formData.append("gpa_url", formValues.generalPowerOfAttorneyImage);
      else formData.append("gpa", formValues.generalPowerOfAttorneyImage[0]);
      if (typeof formValues.tenderDocumentImage == "string")
        formData.append("tender_document_url", formValues.tenderDocumentImage);
      else formData.append("tender_document", formValues.tenderDocumentImage[0]);
    } else {
      formData.append("step_status", 2);
      formData.append("address_proof_back", formValues.addressProofImageBack?.[0]);
      formData.append("address_proof_front", formValues.addressProofImageFront?.[0]);
      formData.append("pan_card", formValues.panCardImage?.[0]);
      formData.append("form_60", formValues.form60Image?.[0]);
      formData.append("gpa", formValues.generalPowerOfAttorneyImage?.[0]);
      formData.append("tender_document", formValues.tenderDocumentImage?.[0]);
    }

    if (!formValues.addressProofType) {
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

    if (!formValues.addressProofImageFront?.[0]) {
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

    if (!formValues.addressProofImageBack?.[0]) {
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

    if (!formValues.panCardImage?.[0]) {
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

    if (!formValues.form60Image?.[0]) {
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

    if (!formValues.generalPowerOfAttorneyImage?.[0]) {
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

    if (!formValues.tenderDocumentImage?.[0]) {
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
    if (
      formValues.addressProofType &&
      formValues.addressProofImageFront?.[0] &&
      formValues.addressProofImageBack?.[0] &&
      formValues.panCardImage?.[0] &&
      formValues.form60Image?.[0] &&
      formValues.generalPowerOfAttorneyImage?.[0] &&
      formValues.tenderDocumentImage?.[0]
    ) {
      // Post Data
      axios
        .post(urlPostData, formData, config)
        .then((response) => {
          toast.success("KYC Documents saved successfully", {
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
            error.response.data.message == "Invalid access of form step" ||
            error.response.data.message ==
              "All steps for this auction form is already submited"
          ) {
            toast.error("KYC Documents aready submitted", {
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
            toast.error("Please submit bidding details first", {
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
    }
  };

  return (
    <>
      <div className="detailsContent">
        <div className="DetailsBox">
          <div className="boxNav">
            <p>KYC Documents</p>
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
                    Please provide KYC documents of the bidder participating in the
                    auction. All fields are mandatory.
                  </p>
                </div>
                {/* End */}

                {/* Right Section */}
                <div className="rightSection">
                  <div className="formGroupTwoCol">
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Address Proof</p>
                      {readOnly ? (
                        <input
                          type="text"
                          name="addressProof"
                          value={formValues.addressProofType}
                          onChange={handleChange}
                          readOnly={readOnly}
                          multiple={false}
                          className={`${readOnly ? 'disabledBorder disabledColor' : ''}`}
                        />
                      ) : (
                        <select
                          id="addressProof"
                          name="addressProofType"
                          value={formValues.addressProofType}
                          onChange={handleChange}
                        >
                          <option disabled defaultValue value="">
                            Choose Address Proof Type
                          </option>
                          <option value="PAN">PAN</option>
                          <option value="AADHAAR Card">AADHAAR Card</option>
                        </select>
                      )}
                      {error.error1 && <error>This field is required</error>}
                    </div>

                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Address Proof (Front)</p>

                      {props?.update[0] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a href={formValues.addressProofImageFront} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[0] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
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
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error2 && <error>This field is required</error>}
                        </>
                      )}
                    </div>

                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Address Proof (Back)</p>
                      {props?.update[1] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a href={formValues.addressProofImageBack} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[1] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
                        <p className="photoSubmited">
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={1}
                            handleImageUpload={handleImageUpload}
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error3 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Form 60</p>
                      {props?.update[2] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a href={formValues.form60Image} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[2] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
                        <p className="photoSubmited">
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={2}
                            handleImageUpload={handleImageUpload}
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error4 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>General Power of Attorney</p>
                      {props?.update[3] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a
                              href={formValues.generalPowerOfAttorneyImage}
                              target="_blank"
                            >
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[3] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={3}
                            handleImageUpload={handleImageUpload}
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error5 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>PAN Card</p>
                      {props?.update[4] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a href={formValues.panCardImage} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[4] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={4}
                            handleImageUpload={handleImageUpload}
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error6 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                    <div className="formField">
                      <p className={`formLable ${readOnly ? 'disabledColor' : ''}`}>Tender Document</p>
                      {props?.update[5] ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            <a href={formValues.tenderDocumentImage} target="_blank">
                              View
                            </a>
                            {!pathname.includes("view-bidder-details") ? (
                              <button
                                type="button"
                                className="updatedRemove"
                                onClick={() => {
                                  let update = [...props.update];
                                  update[5] = false;
                                  props.setUpdate(update);
                                }}
                              >
                                remove
                              </button>
                            ) : null}
                          </span>
                        </p>
                      ) : dataAvailable ? (
                        <p className={`${readOnly ? 'photoSubmited' : 'photoSubmited active'}`}>
                          <span>
                            Image Updated <Tick width={18} />
                          </span>
                        </p>
                      ) : (
                        <>
                          <ImageUploader
                            index={5}
                            handleImageUpload={handleImageUpload}
                            handleImageRemoval={handleImageRemoval}
                          />
                          {error.error7 && <error>This field is required</error>}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {/* End */}
              </div>
              <div className="horizontalLine"></div>
              <div className="floatRight">
                {!pathname.includes("view") ? (
                  <button
                    type="submit"
                    className="blueShadeBtn saveBtn"
                    onClick={handleSubmitKeyDetails}
                  >
                    {pathname.includes("edit") ? "Update" : "Save"}
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

export default KYCDocuments;
