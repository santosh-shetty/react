import React from 'react'
import './style.css'
import './responsive.css'
import { ReactComponent as Bullet } from '../../Icons/Bullet.svg'
import { ReactComponent as Funnel } from '../../Icons/Funnel.svg'
import { ReactComponent as Tick } from '../../Icons/Tick.svg'
import { ReactComponent as Discount } from '../../Icons/Disount.svg'
import { ReactComponent as Customer } from '../../Icons/Customer.svg'
import { ReactComponent as Circle } from '../../Icons/Circle.svg'
import { ReactComponent as Settings } from '../../Icons/Settings.svg'
import { ReactComponent as Bell } from '../../Icons/Bell.svg'
import { ReactComponent as Shield } from '../../Icons/Shield.svg'
import { ReactComponent as Rupee } from '../../Icons/Rupee.svg'
import { ReactComponent as Group } from '../../Icons/Group.svg'
import { ReactComponent as Arrow } from '../../Icons/CrossArrow.svg'
import { ReactComponent as Flower } from '../../Icons/Flower.svg'
import { ReactComponent as QuestionMark } from '../../Icons/Question.svg'
import { ReactComponent as Call } from '../../Icons/Call.svg'
import { ReactComponent as Whatsapp } from '../../Icons/WhatsappBlue.svg'
import { Helmet, HelmetProvider  } from "react-helmet-async";

// Slick Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AboutUs = () => {

  const settings4 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <HelmetProvider>
      <Helmet>
        <title>
          About Us 
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
    </HelmetProvider>
      {/* Section 1 */}
      <section id='sectionOneAbout'>
        <div className="sectionOneFlex">
          <div className='sectionLeft'>
            <h1>Revolutionizing real estate auctions</h1>
            <p>
            AuctionPe is an online auction platform that helps you bid on properties listed by banks and other financial institutions. Our platform offers a user-centric interface that is easy to use, transparent and allows you to participate in auctions from the comfort of your home, ensuring that the bidding process is fair, secure and accessible to everyone.
<br></br><br></br>
At AuctionPe, we aim at providing exceptional customer service, ensuring that our clients have access to a dedicated team of professionals who are available to answer any and all your queries and provide you with the support you need.
            </p>
          </div>
          <div className='sectionRight'>
            <div className='contentBoxWhite'>

            </div>
          </div>
        </div>
      </section>
      {/* End Section 1 */}

      {/* Section 4 */}
      <section id='sectionFourAbout'>
        <p className='subTitleText'>
          Our Core Values
        </p>
        <h3 className='sectionTitleText'>The Power of AuctionPe</h3>
        <div className="sectionFlexBox">
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Funnel width={16} />
            </div>
            <h4 className=''>
              Aggregated Listings
            </h4>
            <p>
              We offer a diverse selection of properties including residential, commercial, and industrial properties, catering to different preferences of bidders, ensuring there is something for everyone.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Tick width={20} />
            </div>
            <h4 className=''>
            Verified Listings
            </h4>
            <p>
            Get accurate and verified property information, including detailed descriptions, high-quality images, floor plans, and relevant documents, enabling informed decision-making.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Discount width={16} />
            </div>
            <h4 className=''>
            Discounted Deals
            </h4>
            <p>
            Buyers can find attractive deals and competitive pricing as properties are listed at a discount from market price, providing potential savings compared to traditional real estate transactions.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Customer width={20} />
            </div>
            <h4 className=''>
            Customer Support
            </h4>
            <p>
            Our dedicated customer support team is readily available to address any queries, concerns, or technical issues that bidders may have, providing prompt and efficient assistance.
            </p>
          </div>
      
        </div>
      </section>
      {/* End Section 4 */}
      {/* Section 5 */}
      <section id='sectionFiveAbout'>
        <p className='subTitleText'>
        Our Services
        </p>
        <h3 className='sectionTitleText'>What We Offer - Buyers</h3>
        <div className="sectionFlexBox">
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Circle width={20} />
            </div>
            <h4 className=''>
            Transparency
            </h4>
            <p>
            We prioritize transparency in all our auction processes, ensuring bidders have access to accurate and comprehensive property information, bidding history, and transaction details.
            </p>
          </div>
          <div className='sectionflexItem'> 
            <div className='iconContainer'>
              <Settings width={20} />
            </div>
            <h4 className=''>
            Expert Guidance
            </h4>
            <p>
            We provide expert guidance and support throughout the bidding process, assisting bidders in making informed decisions and maximizing their chances of success.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Bell width={20} />
            </div>
            <h4 className=''>
            Discounted Deals
            </h4>
            <p>
            Buyers can find attractive deals and competitive pricing as properties are listed at a discount from market price, providing potential savings compared to traditional real estate transactions.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Shield width={16} />
            </div>
            <h4 className=''>
            Trust & Security
            </h4>
            <p>
            We prioritize the trust and security of our bidders by implementing robust security measures to safeguard their personal information and ensuring a secure bidding platform.
            </p>
          </div>
      
        </div>
      </section>
      {/* End Section 5 */}
      {/* Section 6 */}
      <section id='sectionSixAbout'>
        <p className='subTitleText'>
        Our Services
        </p>
        <h3 className='sectionTitleText'>What We Offer - Sellers</h3>
        <div className="sectionFlexBox">
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Rupee width={12} />
            </div>
            <h4 className=''>
            Maximize Return
            </h4>
            <p>
            AuctionPe provides a platform that helps the sellers to maximize their returns on their properties by reaching out to many interested buyers.
            </p>
          </div>
          <div className='sectionflexItem'> 
            <div className='iconContainer'>
              <Group width={24} />
            </div>
            <h4 className=''>
            Access to Buyers
            </h4>
            <p>
            Access a large pool of verified buyers who are interested in purchasing properties through an online auction process.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Arrow width={20} />
            </div>
            <h4 className=''>
            Competitive Bidding
            </h4>
            <p>
            AuctionPe online auction process encourages competitive bidding which ensures that the sellers get the best possible price for their properties.
            </p>
          </div>
          <div className='sectionflexItem'>
            <div className='iconContainer'>
              <Flower width={24} />
            </div>
            <h4 className=''>
            Marketing Reach
            </h4>
            <p>
            We use “Hyper Local Target Marketing” approach to promote the properties, attracting more potential buyers and maximizing the visibility of the seller's assets.
            </p>
          </div>
      
        </div>
      </section>
      {/* End Section 6 */}
      {/* Section 7 */}
      <section id='sectionSevenAbout'>
        <p className='subTitleText'>
        Our Alliances
        </p>
        <h3 className='sectionTitleText'>Secure Your Investment with Reputed Institutions</h3>
        <div className='clients'>
          <Slider {...settings4}>
            <div className=''>
              <img src="images/clients/1.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/2.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/3.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/4.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/5.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/6.png" alt="" />
            </div>
            <div className=''>
              <img src="images/clients/7.png" alt="" />
            </div>

          </Slider>
        </div>
      </section>
      {/* End Section 7 */}
      {/* Section 8 */}
      <section id='sectionEightAbout'>
      <p className='subTitleText'>
      Need Help?
        </p>
        <h3 className='sectionTitleText'>Reach Out to Us</h3>
          {/* <p className='formTitleName'>
          Sign up for our newsletter.
          </p>
          <p className='paragraph'>
          Be the first to receive updates on new listings, market insights, and exclusive offers.
          </p> */}
       <div className='aboutUsFlex'>
        <div className='aboutUsItem'>
          <table>
            <tbody>
            <tr>
              <td>
              <div className='iconContainer'>
              <QuestionMark width={20} />
            </div>
              </td>
              <td>
              <p>
              Support
              </p>
              <p>
              Our friendly team is here to help you.
              </p>
              <a href='mailto:support@auctionpe.com'>support@auctionpe.com</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='aboutUsItem'>
          <table>
            <tbody>
            <tr>
              <td>
              <div className='iconContainer'>
              <Call width={18} />
            </div>
              </td>
              <td>
              <p>
              Helpline
              </p>
              <p>
              Mon - Sat from 9am to 6pm.
              </p>
              <a href='tel:+91 98993 60360'>+91 98993 60360</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='aboutUsItem'>
          <table>
            <tbody>
            <tr>
              <td>
              <div className='iconContainer'>
              <Whatsapp width={22} />
            </div>
              </td>
              <td>
              <p>
              WhatsApp
              </p>
              <p>
              Questions or Queries? Get in touch!
              </p>
              <a href='tel:+91 88518 34520'>+91 88518 34520</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
       </div>
      </section>
      {/* End Section 8 */}
    </>
  )
}

export default AboutUs