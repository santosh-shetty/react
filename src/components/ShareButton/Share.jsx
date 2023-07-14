import React, { useState } from "react";
import { ReactComponent as ShareIcon } from "../../Icons/ShareIcon.svg";
import { ReactComponent as Facebook } from "../../Icons/Facebook.svg";
import { ReactComponent as Twitter } from "../../Icons/Twitter.svg";
import { ReactComponent as LinkedIn } from "../../Icons/LinkedIn.svg";
import { ReactComponent as Whatsapp } from "../../Icons/Whatsapp.svg";
import "./style.css";

const Share = (props) => {
  const [showIcons, setShowIcons] = useState(false);
  // Base URL for sharing link
  const baseUrl = process.env.REACT_APP_PROPERTY_SHARE_URL;

  // data from parent component
  const { id, slug, title, reservePrice, discount, deadLine, address } = props;
  // End data

  // Hide or show social icons
  const iconsHandle = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="share-container">
      <ShareIcon onClick={iconsHandle} className="shareIcon" />
      {showIcons && (
        <div className="social-icons">
          <a
            href={`https://api.whatsapp.com/send?text=*${title}*%0A%0AReserve%20Price:%20${reservePrice}%0AEstimated%20Discount:%20*${discount}%*%0AApplication%20Deadline:%20*${deadLine}*%20%20%0A%0A*No%20Brokerage%20to%20Buyer*%0A%0ACheck%20the%20property%20at:%20%0A${baseUrl}/${id}/${slug}/%0A%0A%0A%20Exact%20Google%20Map%20Location:%20https://maps.google.com/maps?q=28.735892086307338,77.12345371446638%0A%0AAddress:%20*Flat%20No.96,%20Third%20Floor%20(With%20Roof%20Rights)%20Block-F,%20Pocket-5,%20Sector%20-16,%20Rohini*%0A%20%0A%0ACall:%20%2B91%201140%20845%20500%20%0AWhatsapp:%20%2B91%209899%20360%20360%20%0AEmail:%20care@hecta.co`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon">
              <Whatsapp className="facebook" />
            </div>
          </a>
          <a
            href={`http://www.facebook.com/sharer.php?u=${baseUrl}/${id}/${slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon">
              <Facebook className="facebook" />
            </div>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${title}&url=${baseUrl}/${id}/${slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon">
              <Twitter />
            </div>
          </a>
          <a
            href={`https://www.linkedin.com/cws/share?url=${baseUrl}/${id}/${slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="icon">
              <LinkedIn />
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default Share;
