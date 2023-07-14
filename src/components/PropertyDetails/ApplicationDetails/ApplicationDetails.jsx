import React from 'react'
import './style.css'
import './responsive.css'

const ApplicationDetails = (props) => {

  // Data from parent component
  const {
    emd,
    app_deadline,
    auction_date,
    private_treaty,
    autorized_Officer,
    extension
  } = props;
  // End data
  // const exten = "10 Minutes";
  // const extMinutes = extension?.match(/\d+/g).map(Number);
  console.log(extension);
  return (
    <>
      <p className='appDetailsTitle'>
      Application Details
        </p>
        <div className='appDetailsData'>
          <div>
            <p className='appDetailsLabel'>
            Earnest Money Deposit
            </p>
            <p className='appDetailsValue'>
            {emd}
            </p>
          </div>
          <div>
            <p className='appDetailsLabel'>
            Application Deadline
            </p>
            <p className='appDetailsValue'>
            {app_deadline}
            </p>
          </div>
          <div>
            <p className='appDetailsLabel'> 
            Auction Date & Time
            </p>
            <p className='appDetailsValue'>
           {auction_date}
            </p>
          </div>
          <div>
            <p className='appDetailsLabel'>
            Private Treaty
            </p>
            <p className='appDetailsValue'>
            {private_treaty}
            </p>
          </div>
          <div>
            <p className='appDetailsLabel'>
            Authorized Officer
            </p>
            <p className='appDetailsValue'>
           {autorized_Officer}
            </p>
          </div>
        </div>
       
          <p className='appDetailsLabel'>
          Time Extension
          </p>
          <p className='extensionDesc'>
          If the bid is placed in the last 10 minutes of auction, the auction end time will increase by {extension} min.
          </p>
       
    </>
  )
}

export default ApplicationDetails