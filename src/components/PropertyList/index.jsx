import React, { useState,useEffect } from "react";
import { PropertyCard } from "../PropertyCard/PropertyCard";
import { useLocation } from "react-router-dom";
import { MyAuctionCard } from "../PropertyCard/MyAuctionCard";
import Skeleton from "../PropertyCard/Skeleton";

const PropertyList = ({ currentPageProperties }) => {
  const hotPropertyValues = currentPageProperties.map(
    (property) => property.hot_property
  );
  const { pathname } = useLocation();
  const [isLoading, setIsLoading]=useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="">
      <div className="cardRow">
        {isLoading ? (
     <>
       {[...Array(3)].map((_, index) => (
            <Skeleton key={index} />
          ))}
     </>
        ):(
<>
{currentPageProperties.length > 0 ? (
  currentPageProperties.map((property, key) => {
    if (pathname.includes("my-auctions")) {
      return (
        <div className="flexItem2" key={key}>
          <MyAuctionCard
            propertyTitle={property.property_name}
            alt={property.images.length > 0 ? property.images[0].alt : "Hecta"}
            discount={property.discount_percentage}
            applyBy={property.application_end_date}
            price={property.reserve_price}
            auctionDate={property.auctionDate}
            seller={property.seller}
            propertyTitleSlug={property.slug}
            propertyId={property.id}
            bankName={property.bank_name}
            trendingProperty={property.hot_property}
            propertyType={property.categories[0]}
            arialView={property.panoramic_image}
            applied={property.applied}
            auctionStatus={property.auction_status}
            approval={property.approval_status}
          />
        </div>
      );
    } else {
      return (
        <div key={key} className="flexItem">
          <PropertyCard
            propertyTitle={property.property_name}
            alt={property.images.length > 0 ? property.images[0].alt : "Hecta"}
            discount={property.discount_percentage}
            applyBy={property.application_end_date}
            price={property.reserve_price}
            auctionDate={property.auctionDate}
            seller={property.seller}
            propertyTitleSlug={property.slug}
            propertyId={property.id}
            bankName={property.bank_name}
            trendingProperty={property.hot_property}
            propertyType={property.categories[0]}
            arialView={property.panoramic_image}
            applied={property.applied}
            liveStatus={property.live}
          />
        </div>
      );
    }
  })
) : (
  <div>
    <p>No Property Found.</p>
  </div>
)}
</>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
