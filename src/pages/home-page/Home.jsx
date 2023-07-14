import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";
import { ReactComponent as Bullet } from "../../Icons/Bullet.svg";
import { ReactComponent as Funnel } from "../../Icons/Funnel.svg";
import { ReactComponent as Tick } from "../../Icons/Tick.svg";
import { ReactComponent as Discount } from "../../Icons/Disount.svg";
import { ReactComponent as Customer } from "../../Icons/Customer.svg";
import { ReactComponent as Circle } from "../../Icons/Circle.svg";
import { ReactComponent as Settings } from "../../Icons/Settings.svg";
import { ReactComponent as Bell } from "../../Icons/Bell.svg";
import { ReactComponent as Shield } from "../../Icons/Shield.svg";
import { ReactComponent as Rupee } from "../../Icons/Rupee.svg";
import { ReactComponent as Group } from "../../Icons/Group.svg";
import { ReactComponent as Arrow } from "../../Icons/CrossArrow.svg";
import { ReactComponent as Flower } from "../../Icons/Flower.svg";
import { ReactComponent as ArrowForward } from "../../Icons/DashboardIcons/ForwardArrow.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { FeaturedPropCard } from "../../components/PropertyCard/FeaturedPropCard";
import { Link, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Api packages
import axios from "axios";
import { useSelector } from "react-redux";

// Slick Slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Budget = [
  {
    title: "Under 10 Lakhs",
    value: "0,1000000",
  },
  {
    title: "10L to 50L",
    value: "1000000,5000000",
  },
  ,
  {
    title: "50L to 2Cr",
    value: "5000000,20000000",
  },
  ,
  {
    title: "2Cr to 5Cr",
    value: "20000000,50000000",
  },
  {
    title: "5Cr to 25Cr",
    value: "50000000,250000000",
  },
  {
    title: "Above 25Cr",
    value: "250000000,990000000",
  },
];

// Slick slider settings
const settings1 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        arrows: false,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
      },
    },
  ],
};

const settings5 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
      },
    },
  ],
};

const settings2 = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};
const settings3 = {
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const settings4 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 2000,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};
//End Slick slider settings

const Home = () => {
  const [propertyType, setPropertyType] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    price: "",
    propertyType: "",
  });

  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.users.isLoggedIn);
  const [propertyList, setPropertyList] = useState([]);

  // Api Details
  const basePath = process.env.REACT_APP_API_PATH;
  const url = `${basePath}/api/trending-property`;
  const token = useSelector((state) => state.users.token);

  // Fetch properties
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (loggedIn === true) config["headers"]["Authorization"] = `Bearer ${token}`;

    axios
      .get(url, config)
      .then((response) => {
        // console.log(response.data);
        setPropertyList(response.data.trending.slice(0, 12));
        // console.log(response.data.properties);
      })
      .catch((error) => console.log(error));
    axios
      .get(`${basePath}/api/property-type-list`, config)
      .then((response) => {
        setPropertyType(response.data.property_type);
      })
      .catch((error) => console.log(error));
  }, [loggedIn, token, url]);
  // End

  const submit = (e) => {
    e.preventDefault();
    if (formData.location === "") return;
    let obj = { location: formData.location };
    if (formData.price !== "") {
      obj["minPrice"] = formData.price.split(",")[0];
      obj["maxPrice"] = formData.price.split(",")[1];
    }
    if (formData.propertyType !== "") obj["propertyType"] = formData.propertyType;
    navigate(`/upcoming-auctions?${new URLSearchParams(obj).toString()}`);
  };

  const {
    register: registerSubscriber,
    handleSubmit: handleSubmitSubscriber,
    formState: { errors: subscriberFormErrors },
    reset: resetSubscriberForm,
  } = useForm();
  const onSubscriberSubmit = (data) => {
    axios
      .post(`${basePath}/api/add-subscriber`, data)
      .then((response) => {
        console.log("API response:", response.data);
        setTimeout(() => {
          resetSubscriberForm();
        }, 2000);
        // Handle the API response here
        toast.success("Subscribed Successfully", {
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
        console.error("Error submitting form:", error);
        // Handle the error here
        toast.error(error.response.data.msg, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  // Subscribe form
  // const handleNext1 = () => {
  //   if (sliderRef1?.current) {
  //     sliderRef1.current.slickNext();
  //   }
  // };

  // const handlePrev1 = () => {
  //   if (sliderRef1?.current) {
  //     sliderRef1.current.slickPrev();
  //   }
  // };
  // const handleNext2 = () => {
  //   if (sliderRef2?.current) {
  //     sliderRef2.current.slickNext();
  //   }
  // };

  // const handlePrev2 = () => {
  //   if (sliderRef2?.current) {
  //     sliderRef2.current.slickPrev();
  //   }
  // };
  const sliderRef1 = React.useRef(null);
  const sliderRef2 = React.useRef(null);

  const handleSliderAction = (sliderRef, action) => {
    if (sliderRef?.current) {
      switch (action) {
        case "nextBtn":
          sliderRef.current.slickNext();
          break;
        case "prevBtn":
          sliderRef.current.slickPrev();
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Helmet>
      </HelmetProvider>
      <ToastContainer newestOnTop={false} rtl={false} pauseOnFocusLoss theme="colored" />
      {/* Section 1 */}
      <section id="sectionOne">
        <div className="sectionOneFlex">
          <div className="sectionLeft">
            <p className="sonebadge">
              <span>Revolutionizing Real Estate Auctions</span>
            </p>
            <h1 className="soneTitle">
              <span>Bank se... AuctionPe...</span>
            </h1>
            <p className="soneText">
              Experience a seamless and transparent approach to real estate acquisitions.
            </p>
            <p className="sonePoints">
              <span>
                <Bullet className="bullet" />
              </span>
              Aggregated Listings
            </p>
            <p className="sonePoints">
              <span>
                <Bullet className="bullet" />
              </span>
              Discounted Deals
            </p>
            <p className="sonePoints">
              <span>
                <Bullet className="bullet" />
              </span>
              Expert Guidance
            </p>
            <button className="blueShadeBtn" onClick={() => navigate("/sign-up")}>
              Get Started Today
            </button>
          </div>
          <div className="sectionRight">
            <div className="contentBoxWhite">
              <Slider {...settings2} id="sl1">
                <div>
                  <img src="images/slider-1/slide-1.png" alt="" />
                </div>
                <div>
                  <img src="images/slider-1/slide-1.png" alt="" />
                </div>
              </Slider>
            </div>
            <div className="contentBoxWhite">
              <Slider {...settings3} id="sl2">
                <div>
                  <img src="images/slider-2/slide-1.png" alt="" />
                </div>
                <div>
                  <img src="images/slider-2/slide-1.png" alt="" />
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* End Section 1 */}

      {/* Search filter */}
      <section id="searchFilter">
        <form>
          <div className="searchFilterForm">
            <div className="filterItem">
              <p className="formLable">Search City, Locality or State</p>
              <input
                type="text"
                placeholder="Try searching “Bengaluru”"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="filterItem">
              <p className="formLable">Budget</p>
              <select
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              >
                <option value="">Select</option>
                {Budget.map((element, key) => (
                  <option key={key} value={element.value}>
                    {element.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="filterItem">
              <p className="formLable">Property Type</p>
              <select
                value={formData.propertyType}
                onChange={(e) =>
                  setFormData({ ...formData, propertyType: e.target.value })
                }
              >
                <option value="">Select</option>
                {propertyType.map((type, key) => (
                  <option key={key}>{type}</option>
                ))}
              </select>
            </div>
            <div className="filterItem">
              <button type="submit" className="width-100 blueShadeBtn" onClick={submit}>
                Search
              </button>
            </div>
          </div>
        </form>
        <form>
          <div className="popularSearch">
            <div>
              <p className="popularSearchLabelnoborder">Popular searches:</p>
            </div>
            <div>
              <Link to="" className="noDecoration">
                <p className="popularSearchLabel">Noida Sector 104</p>
              </Link>
            </div>
            <div>
              <Link to="" className="noDecoration">
                <p className="popularSearchLabel">Gurgaon</p>
              </Link>
            </div>
            <div>
              <Link to="" className="noDecoration">
                <p className="popularSearchLabel">Gurgaon</p>
              </Link>
            </div>
          </div>
        </form>
      </section>
      {/* End Search filter */}

      {/* Section 2 */}
      <section id="sectiontwo">
        <p className="subTitleText">Featured Listings</p>
        <div className="navArrowFlex">
          <div>
            <h3 className="sectionTitleText">Explore Trending Properties</h3>
          </div>
          <div>
            <span style={{ marginRight: "15px" }}>
              <ArrowForward
                width={10}
                className="arrowBack nextBtn"
                onClick={() => handleSliderAction(sliderRef1, "prevBtn")}
              />
            </span>
            <span>
              <ArrowForward
                width={10}
                className="prevBtn"
                onClick={() => handleSliderAction(sliderRef1, "nextBtn")}
              />
            </span>
          </div>
        </div>

        <div className="featuredSlider">
          <Slider ref={sliderRef1} {...settings1}>
            {propertyList.map((property) => (
              <div key={property.id}>
                <FeaturedPropCard
                  propertyTitle={property.property_name}
                  alt={property.images.length > 0 ? property.images[0].alt : "Hecta"}
                  discount={property.discount_percentage}
                  applyBy={property.application_end_date}
                  price={property.emd}
                  auctionDate={property.auctionDate}
                  seller={property.seller}
                  propertyTitleSlug={property.slug}
                  propertyId={property.id}
                  //  userId={userId}
                  bankName={property.bank_name}
                  trendingProperty={property.hot_property}
                  propertyType={property.categories[0]}
                  arialView={property.panoramic_image}
                  applied={property.applied}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* End Section 2 */}

      {/* Section 3 */}
      <section id="sectionThree">
        <p className="subTitleText">The Process</p>
        {/* <h3 className="sectionTitleText">How To Buy Properties From Banks</h3> */}
        <div className="navArrowFlex">
          <div>
            <h3 className="sectionTitleText">How To Buy Properties From Banks</h3>
          </div>
          <div>
            <span style={{ marginRight: "15px" }}>
              <ArrowForward
                width={10}
                className="arrowBack nextBtn"
                onClick={() => handleSliderAction(sliderRef2, "prevBtn")}
              />
            </span>
            <span>
              <ArrowForward
                width={10}
                className="prevBtn"
                onClick={() => handleSliderAction(sliderRef2, "nextBtn")}
              />
            </span>
          </div>
        </div>
        <div>
          <Slider ref={sliderRef2} {...settings5}>
            <div>
              <img src="images/timeline/sl-1.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-2.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-3.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-4.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-5.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-6.png" alt="" width="100%" />
            </div>
            <div>
              <img src="images/timeline/sl-7.png" alt="" width="100%" />
            </div>
          </Slider>
        </div>
      </section>
      {/* End Section 3 */}

      {/* Section 4 */}
      <section id="sectionFour">
        <p className="subTitleText">Our Core Values</p>
        <h3 className="sectionTitleText">The Power of AuctionPe</h3>
        <div className="sectionFlexBox">
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Funnel width={16} />
            </div>
            <h4 className="">Aggregated Listings</h4>
            <p>
              We offer a diverse selection of properties including residential,
              commercial, and industrial properties, catering to different preferences of
              bidders, ensuring there is something for everyone.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Tick width={20} />
            </div>
            <h4 className="">Verified Listings</h4>
            <p>
              Get accurate and verified property information, including detailed
              descriptions, high-quality images, floor plans, and relevant documents,
              enabling informed decision-making.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Discount width={16} />
            </div>
            <h4 className="">Discounted Deals</h4>
            <p>
              Buyers can find attractive deals and competitive pricing as properties are
              listed at a discount from market price, providing potential savings compared
              to traditional real estate transactions.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Customer width={20} />
            </div>
            <h4 className="">Customer Support</h4>
            <p>
              Our dedicated customer support team is readily available to address any
              queries, concerns, or technical issues that bidders may have, providing
              prompt and efficient assistance.
            </p>
          </div>
        </div>
      </section>
      {/* End Section 4 */}
      {/* Section 5 */}
      <section id="sectionFive">
        <p className="subTitleText">Our Services</p>
        <h3 className="sectionTitleText">What We Offer - Buyers</h3>
        <div className="sectionFlexBox">
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Circle width={20} />
            </div>
            <h4 className="">Transparency</h4>
            <p>
              We prioritize transparency in all our auction processes, ensuring bidders
              have access to accurate and comprehensive property information, bidding
              history, and transaction details.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Settings width={20} />
            </div>
            <h4 className="">Expert Guidance</h4>
            <p>
              We provide expert guidance and support throughout the bidding process,
              assisting bidders in making informed decisions and maximizing their chances
              of success.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Bell width={20} />
            </div>
            <h4 className="">Discounted Deals</h4>
            <p>
              Buyers can find attractive deals and competitive pricing as properties are
              listed at a discount from market price, providing potential savings compared
              to traditional real estate transactions.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Shield width={16} />
            </div>
            <h4 className="">Trust & Security</h4>
            <p>
              We prioritize the trust and security of our bidders by implementing robust
              security measures to safeguard their personal information and ensuring a
              secure bidding platform.
            </p>
          </div>
        </div>
      </section>
      {/* End Section 5 */}
      {/* Section 6 */}
      <section id="sectionSix">
        <p className="subTitleText">Our Services</p>
        <h3 className="sectionTitleText">What We Offer - Sellers</h3>
        <div className="sectionFlexBox">
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Rupee width={12} />
            </div>
            <h4 className="">Maximize Return</h4>
            <p>
              AuctionPe provides a platform that helps the sellers to maximize their
              returns on their properties by reaching out to many interested buyers.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Group width={24} />
            </div>
            <h4 className="">Access to Buyers</h4>
            <p>
              Access a large pool of verified buyers who are interested in purchasing
              properties through an online auction process.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Arrow width={20} />
            </div>
            <h4 className="">Competitive Bidding</h4>
            <p>
              AuctionPe online auction process encourages competitive bidding which
              ensures that the sellers get the best possible price for their properties.
            </p>
          </div>
          <div className="sectionflexItem">
            <div className="iconContainer">
              <Flower width={24} />
            </div>
            <h4 className="">Marketing Reach</h4>
            <p>
              We use “Hyper Local Target Marketing” approach to promote the properties,
              attracting more potential buyers and maximizing the visibility of the
              seller's assets.
            </p>
          </div>
        </div>
      </section>
      {/* End Section 6 */}
      {/* Section 7 */}
      <section id="sectionSeven">
        <p className="subTitleText">Our Alliances</p>
        <h3 className="sectionTitleText">
          Secure Your Investment with Reputed Institutions
        </h3>
        <div className="clients">
          <Slider {...settings4}>
            <div className="">
              <img src="images/clients/1.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/2.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/3.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/4.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/5.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/6.png" alt="" />
            </div>
            <div className="">
              <img src="images/clients/7.png" alt="" />
            </div>
          </Slider>
        </div>
      </section>
      {/* End Section 7 */}
      {/* Section 8 */}
      <section id="sectionEight">
        <p className="formTitleName">Sign up for our newsletter.</p>
        <p className="paragraph">
          Be the first to receive updates on new listings, market insights, and exclusive
          offers.
        </p>
        {/* <form>
          <div className="subscribeForm">
            <div className="formItem">
              <input type="email" placeholder="Enter your Email Address" />
            </div>
            <div className="formItem">
              <button type="submit" className="blueShadeBtn">
                Subscribe
              </button>
            </div>
          </div>
        </form> */}
        <form
          className="subscriberForm text-center"
          onSubmit={handleSubmitSubscriber(onSubscriberSubmit)}
        >
          <div className="subsriberFlex">
            <input
              type="email"
              {...registerSubscriber("email", { required: true })}
              placeholder="Enter your Email Address"
            />

            <button className="blueShadeBtn" type="submit">
              Subscribe
            </button>
          </div>
          {subscriberFormErrors.email && <span className="error">Email is required</span>}
        </form>
      </section>
      {/* End Section 8 */}
    </>
  );
};

export default Home;
