import React, { useState } from 'react'
import './style.css'
import './responsive.css'
import { ReactComponent as HectaPlus } from '../../../Icons/HectaPlus.svg'

const Disclaimer = () => {

    const [showMore, setShowMore] = useState(true);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    }

    return (
        <>
            <p className='disclaimerTitle'>
                Disclaimer
            </p>
            <div className='infoPoint'>
                <HectaPlus className='hectaPlus' />
                <p>
                    Information provided are on "As-Is" basis. Buyer(s) to apply discretion and required due diligence before investment. Refer <a className='linkColor' href='https://hecta.co/terms-conditions/' target="_blank">T&Cs</a> for details. Read our Disclaimer.
                </p>
            </div>

            {showMore ? (
                <>
                    <div className='infoPoint'>
                        <HectaPlus className='hectaPlus' />
                        <p>

                            Hecta.co is a website operated by Hecta Proptech Private Limited (“Hecta”) (CIN: U72200DL2021PTC386648) and by accessing the website and any pages thereof, you agree to be bound by its terms of service and privacy policy.
                        </p>
                    </div>
                    <button className="readMore" onClick={toggleShowMore}>Read More</button>
                </>
            ) : (
                <>
                    <div className='infoPoint'>
                        <HectaPlus className='hectaPlus' />
                        <p>

                            Hecta.co is a website operated by Hecta Proptech Private Limited (“Hecta”) (CIN: U72200DL2021PTC386648) and by accessing the website and any pages thereof, you agree to be bound by its terms of service and privacy policy.
                        </p>
                    </div>

                    <div className='infoPoint'>
                        <HectaPlus className='hectaPlus' />
                        <p>
                            Every effort is made to ensure that the information provided on the website is accurate. However, Hecta.co does not guarantee the accuracy or the authenticity of the information provided on its website and shall not be liable or responsible for any loss arising out of the purchase or investment made on the property.
                        </p>
                    </div>
                    <div className='infoPoint'>
                        <HectaPlus className='hectaPlus' />
                        <p>
                            Direct and indirect purchase of real property involves significant risk and purchaser/investor(s) may lose value on the property and these are not guaranteed by Hecta. It is the responsibility of the Prospective Investor(s) to verify the integrity and authenticity of the information made available on the website. Investors must be able to afford to bear losses on investment made.
                        </p>
                    </div>
                    <div className='infoPoint'>
                        <HectaPlus className='hectaPlus' />
                        <p>

                            Hecta.co does not endorse or promote any of the properties information that appear on its website for Investments nor make any recommendations regarding the same to any Investor. Prospective investors are not to construe anything on the website as a direct offer by Hecta. Any information made available from our website or links to websites, do not represent a solicitation of an offer to buy or sell any property.
                        </p>
                    </div>
                    <button className="readMore" onClick={toggleShowMore}>Read Less</button>
                </>
            )}
            
        </>
    )
}

export default Disclaimer