import React, { useEffect, useState } from "react";
import "./style.css";
import "./responsive.css";

const AvtarSection = ({ profile }) => {
  // const image = './images/avtar.webp';
  const image = "";
  const [fullname, setFullname] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (profile?.name) {
      setFullname(profile.name);
      const nameArr = profile.name.split(" ");
      if (nameArr.length == 1) {
        setInitials(nameArr[0].charAt(0));
      } else {
        setInitials(`${nameArr[0].charAt(0)}${nameArr[nameArr.length - 1].charAt(0)}`);
      }
    }
  }, [profile]);

  return (
    <>
      <div className="avtarInfo">
        <div className="avtarImage">
          {image ? (
            <img src={image} alt="" width="100%" />
          ) : (
            <p className="avtarText">{initials}</p>
          )}
        </div>
        <div>
          <p className="userName">{fullname}</p>
          <p className="userEmail">{profile?.email}</p>
        </div>
      </div>
    </>
  );
};

export default AvtarSection;
