import React from 'react'
import './style.css'
import './responsive.css'
import { ReactComponent as HectaLogo } from '../../Icons/Logo.svg'
import { ReactComponent as Instagram } from '../../Icons/Instagram.svg'
import { ReactComponent as LinkedIn } from '../../Icons/LinkedIn.svg'
import { ReactComponent as Facebook } from '../../Icons/Facebook.svg'
import { ReactComponent as Youtube } from '../../Icons/Youtube.svg'
import { ReactComponent as Twitter } from '../../Icons/Twitter.svg'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

export const Footer = () => {
    const loggedIn = useSelector((state) => state.users.isLoggedIn);
    return (
        <>
            <div className='footerBox bgDark'>
                {/* First Section */}
                <div className='footerFirstColumn'>
                    <HectaLogo />
                    <p className='tagLine'>Revolutionizing Real Estate Auctions</p>
                    <div className='socialIconsGroup'>
                        <Link to="">
                            <LinkedIn className='socialLogo' />
                        </Link>
                        <Link to="">
                            <Instagram className='socialLogo' />
                        </Link>
                        <Link to="">
                            <Facebook className='socialLogo' />
                        </Link>
                        <Link to="">
                            <Youtube className='socialLogo' />
                        </Link>
                        <Link>
                            <Twitter className='socialLogo' />
                        </Link>
                    </div>
                    <a href="mailto:support@auctionpe.com" className='supportLink'>support@auctionpe.com</a><br></br>
                    <a href="tel:+91 98993 60360" className='supportLink'>+91 98993 60360</a><br></br>
                    <a href="tel:+91 88518 34520" className='supportLink'>+91 88518 34520</a>
                    {/* <p className='footerText'>
                        Email: <Link to="mailto:care@hecta.co" className='colorWhite'>care@hecta.co</Link>
                    </p>
                    <p className='footerText'>
                        Helpline:  <Link to="tel:+91 11 40845500" className='colorWhite'>+91 11 40845500</Link>
                    </p>
                    <p className='footerText'>
                        WhatsApp:  <Link to="https://wa.link/igcbi1" className='colorWhite'>+91 88518 34520 </Link>
                    </p>
                    <div className='padding-bottom-20'></div>
                    <p className='footerTitleText'>
                        Corporate Office - Noida
                    </p>
                    <p className='footerTextAddress'>
                        3D, A1 Sector 10, Noida, Uttar Pradesh - 201301
                    </p>
                    <div className='padding-bottom-20'></div>
                    <p className='footerTitleText'>
                        Corporate Office - Bangalore
                    </p>
                    <p className='footerTextAddress'>
                        917, B-Wing, Mittal Towers, MG Road,<br></br>
                        Bangalore, Karnataka - 560001
                    </p> */}
                </div>
                {/* End First Section */}
                {/* Second Section */}
                <div className='footerSecondColumn'>
                    {/* First Col */}
                    <div className='footerCol'>
                        <p className='footerNavTitle'>
                            Quick Links
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/upcoming-auctions" className='colorWhite'>
                                Upcoming Auctions
                            </Link>
                        </p>
                        {loggedIn && 
                        <>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/my-auctions" className='colorWhite'>
                                My Auctions
                            </Link>
                        </p>
                        </>
                        }
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/private-treaty" className='colorWhite'>
                                Private Treaty
                            </Link>
                        </p>


                    </div>
                    {/* End Col */}

                    {/* Second Col */}
                    <div className='footerCol'>
                        <p className='footerNavTitle'>
                        Help & Support
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/contact-us" className='colorWhite'>
                            Contact Us
                            </Link>
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/about-us" className='colorWhite'>
                            About Us
                            </Link>
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="" className='colorWhite'>
                            FAQs
                            </Link>
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="" className='colorWhite'>
                            Blogs
                            </Link>
                        </p>
                       

                    </div>
                    {/* End Col */}

                    {/* Third Col */}
                    <div className='footerCol'>
                        <p className='footerNavTitle'>
                        Legal
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="/" className='colorWhite'>
                            Privacy Policy
                            </Link>
                        </p>
                        <div className='padding-bottom-20-16'></div>
                        <p className='footerNavLink '>
                            <Link to="" className='colorWhite'>
                            Terms & Conditions
                            </Link>
                        </p>
                    </div>
                    {/* End Col */}
                   
                </div>
                {/* End Second Section */}
               
            </div>
            <div className='bgDark copyRightSection'>
                <p className='copyRightText'>
                All Rights Reserved. Hecta Proptech Private Limited.
                </p>
            </div>
        </>
    )
}
