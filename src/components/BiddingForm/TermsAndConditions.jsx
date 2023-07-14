

import React, { useEffect, useState } from 'react'
import { ReactComponent as FilledArrow } from '../../Icons/FilledArrow.svg'
import { ReactComponent as HectaPlus } from '../../Icons/HectaPlus.svg'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Link, Navigate, useNavigate } from "react-router-dom";

const TermsAndConditions = (props, filledStatus) => {

  const navigate = useNavigate();
// Define form state and handle form input changes
const [formValues, setFormValues] = useState({
  checkTerms: false // set initial value of checkbox to false
})

// Existing data
useEffect(()=>{
  const{checkStatus}=props;
// console.log(checkStatus);
// const checkStatus = 4;
  if(checkStatus === 4){
    setFormValues({
      checkTerms:true
    })
  }else{
    setFormValues({
      checkTerms:false
    })
  }
},[props])
// Handle input chaneg
const handleInputChange = event => {
  const target = event.target
  const value = target.type === 'checkbox' ? target.checked : target.value
  const name = target.name

  setFormValues(prevState => ({
    ...prevState,
    [name]: value
  }))
}
// End

  // API Congigurations
  const params = useParams();
  const propertyId = params.propertyId;
  const basePath = process.env.REACT_APP_API_PATH;
  const urlPostData = `${basePath}/api/accept-terms-con`;//Url for submit form
  const token = useSelector(state => state.users.token);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      // 'Content-Type': 'application/json',
      'property_id': propertyId
    }
  };
  // End
const formData={
  property_id:propertyId,
}

// Submit Form
const handleSubmitFinal = (event) =>{
  event.preventDefault();
  if(!formValues.checkTerms){
    toast.error('Please accept terms and condtions', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  
  }else{
    axios.post(urlPostData, formData, config)
    .then(response=>{
      console.log(response);
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
      props.filledStatus(true);
      setIsFormVisible(false);
      setTimeout(() => {
        navigate("/my-auctions");
        console.log("Timeout expired");
      }, 2000);
    })
    .catch(error=>{
      console.error(error);
      if(error.response.data.message == 'All steps for this auction form is already submited'){
        toast.error('Application already submitted', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }else if(error.response.data.message == 'Unauthorized User'){
        toast.error('Unauthorized User', {
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
      else if(error.response.data.message == 'We can not find any bidding details for this property!' || error.response.data.message == 'Invalid access of form step'){
        toast.error('Please submit above details first', {
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
  }

}
  // collapse Form
  const [isFormVisible, setIsFormVisible] = useState(true);
  const toggleForm = () => {
    setIsFormVisible(prevState => !prevState);
  }
  const arrowClass = isFormVisible ? 'DownArrow' : 'UpArrow';
  // End
 

  const termsAndConditions = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae egestas massa. Curabitur eleifend quam et tempus commodo. Mauris tempor et leo sagittis mollis. Mauris augue leo, faucibus et leo sit amet, venenatis mollis tortor. Quisque volutpat ut enim eu mattis. Nullam viverra neque quis augue tristique sodales. Donec neque nulla, semper congue volutpat et, sodales vel enim.'
    },
    {
      id: 2,
      text: 'Suspendisse sed ante tortor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut ornare tortor sed imperdiet vulputate. In hac habitasse platea dictumst. In at est tincidunt, maximus sem imperdiet, efficitur quam. Phasellus luctus maximus vestibulum. Fusce scelerisque, turpis ac rutrum fringilla, sem tellus dictum felis, ut viverra ex nunc eu ligula. Integer aliquam augue vitae nisi ultrices, vel venenatis lectus varius.'
    },
    {
      id: 3,
      text: 'Suspendisse ipsum ante, vestibulum sed vestibulum id, luctus id lectus. Integer vel est aliquam ante vehicula rutrum. Donec sit amet libero eget nibh rutrum malesuada. Mauris sed enim sit amet est dictum pretium. Nunc aliquam felis blandit tellus scelerisque, in pretium sem vulputate. Nulla facilisi. Maecenas aliquam, massa in tincidunt congue, erat justo ullamcorper lacus, vitae vehicula nulla quam quis orci. Sed ultrices massa eu urna maximus, non vulputate felis accumsan. Fusce mollis hendrerit felis, id aliquam tellus facilisis a. Cras eleifend varius scelerisque. Pellentesque semper lacus id enim eleifend fermentum. Suspendisse tortor dolor, egestas ac turpis quis, vehicula ultricies sapien. Aliquam id pretium turpis. Quisque aliquam sapien quis dolor consectetur ullamcorper non eu mi. Quisque eu euismod turpis, eget bibendum est. Ut feugiat faucibus risus, vel sagittis urna.'
    }
  ]


  return (
    <>
      <div className='detailsContent'>
        <div className='DetailsBox'>
          <div className='boxNav'>
            <p>
              Terms & Conditions
            </p>
            <div>
              <FilledArrow className={arrowClass} onClick={toggleForm} />
            </div>
          </div>
          {isFormVisible && (
            <form>
              <div className='formDetails'>
                {/* Left Section */}
                <div className='leftSection' style={{ width: '100%' }}>
                  <p className='termsDesc'>
                    Please provide the details of the bidder participating in the auction.
                    All fields are mandatory.
                  </p>
                  <table className='termsTable'>
                    <tbody>
                    {termsAndConditions.map((term) => (
                      <tr key={term.id}>
                        <td valign='top'>
                          <HectaPlus />
                        </td>
                        <td>
                          <p className='paraDesc'>{term.text}</p>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td valign='top'>
                      <input type='checkbox' className='checkBox' name='checkTerms' id="checkTerms" checked={formValues.checkTerms} onChange={handleInputChange}/> 
                      {/* Step 4: Add name, id, checked, and onChange props */}
                      </td>
                      <td>
                        <p className='declarationText'>
                        I hereby acknowledge that I have read, understood and agree to the terms and conditions as provided by Hecta.
                        </p>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                {/* End */}
              </div>
              <div className='horizontalLine'></div>
              <div className='floatRight'>
                <button type='submit' className='btnDark fullwidth' onClick={handleSubmitFinal}>Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  )
}

export default TermsAndConditions
