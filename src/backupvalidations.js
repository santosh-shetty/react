function handleInputError(fieldName, errorState) {
  const inputField = document.getElementById(fieldName);
  if (!inputField.value) {
    setError(prevState => ({ ...prevState, [errorState]: true }));
    inputField.classList.add("borderRed");
  } else {
    setError(prevState => ({ ...prevState, [errorState]: false }));
    inputField.classList.remove("borderRed");
  }
}

handleInputError("bidderName", "error1");
handleInputError("bidderFatherName", "error2");
handleInputError("bidderAddress", "error3");
handleInputError("gender", "error4");
handleInputError("bidderContactNumber", "error5");
handleInputError("bidderEmail", "error6");
handleInputError("bidderAadharNumber", "error7");
handleInputError("bidderPanNumber", "error8");

    
    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formValues.bidderEmail)) {
      alert('Please enter a valid email address!');
      return;
    }
    // Check if phone number is valid
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formValues.bidderContactNumber)) {
      alert('Please enter a valid phone number!');
      return;
    }


    // working Submit function - bidder details
    const handleSubmitData = (event) => {
      event.preventDefault();
  
      // Validate form data
      if (!formValues.bidderName) {
        setError((prevState) => ({ ...prevState, error1: true }));
        document.getElementById('bidderName').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error1: false }));
        document.getElementById('bidderName').classList.remove('borderRed');
      }
  
      if (!formValues.bidderFatherName) {
        setError((prevState) => ({ ...prevState, error2: true }));
        document.getElementById('bidderFatherName').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error2: false }));
        document.getElementById('bidderFatherName').classList.remove('borderRed');
      }
  
      if (!formValues.gender) {
        setError((prevState) => ({ ...prevState, error3: true }));
        document.getElementById('gender').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error3: false }));
        document.getElementById('gender').classList.remove('borderRed');
      }
  
      if (!formValues.bidderAddress) {
        setError((prevState) => ({ ...prevState, error4: true }));
        document.getElementById('bidderAddress').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error4: false }));
        document.getElementById('bidderAddress').classList.remove('borderRed');
      }
  
      if (!formValues.bidderContactNumber) {
        setError((prevState) => ({ ...prevState, error5: true }));
        document.getElementById('bidderContactNumber').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error5: false }));
        document.getElementById('bidderContactNumber').classList.remove('borderRed');
      }
  
      if (!formValues.bidderEmail) {
        setError((prevState) => ({ ...prevState, error6: true }));
        document.getElementById('bidderEmail').classList.add('borderRed');
      } else {
        setError((prevState) => ({ ...prevState, error6: false }));
        document.getElementById('bidderEmail').classList.remove('borderRed');
      }
  
      if (!formValues.bidderAadharNumber) {
        setError((prevState) => ({ ...prevState, error7: true }));
        document.getElementById('bidderAadharNumber').classList.add('borderRed');
  
      } else {
        setError((prevState) => ({ ...prevState, error7: false }));
        document.getElementById('bidderAadharNumber').classList.remove('borderRed');
  
      }
  
      if (!formValues.bidderPanNumber) {
        setError((prevState) => ({ ...prevState, error8: true }));
        document.getElementById('bidderPanNumber').classList.add('borderRed');
  
      } else {
        setError((prevState) => ({ ...prevState, error8: false }));
        document.getElementById('bidderPanNumber').classList.remove('borderRed');
  
      }
      // Handle formdata with api call
      if (
        formValues.bidderName &&
        formValues.bidderFatherName &&
        formValues.gender &&
        formValues.bidderAddress &&
        formValues.bidderContactNumber &&
        formValues.bidderEmail &&
        formValues.bidderAadharNumber &&
        formValues.bidderPanNumber
      ) {
        axios
          .post(url, formData, config)
          .then((response) => {
            // console.log(response.data);
            toast.success('Bidder details saved successfully', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
  
    }
    // end

    {/* {formatTimestamp(log.created_at)} */}