import React from 'react'
import "../PropertyCard/style.css";
import "../PropertyCard/responsive.css";
const Skeleton = () => {
  return (
    <>
     <div className="propertyCard" style={{minWidth:'30%',maxWidth:'100%'}}>
        <div className="topBarDetails">
          <div className="detailItem">
            <p className="discount skeltone"></p>
          </div>
          <div className="detailItem">
            <p className="endDate skeltone"></p>
          </div>
        </div>
        <div className="mainData">
          <div className='bgImgSkel'>
<p>Loading...</p>
          </div>
          <div className='bgTitleSkel'>
          
          </div>
          <div className='bgTitleSkel'>
          
          </div>
        </div>
        <div className="sellerDetails skeltone">
         
        </div>
       
        <div className="btnGroup">
          <button className="btnSkel" >
          
          </button>
          <button className="btnSkel" >
           
          </button>
    
        </div>
       
      </div>
    </>
  )
}

export default Skeleton