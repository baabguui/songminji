import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

import "../styles/header.css";

const MiniHeader = () => {
  const [isOpen, setOpen] = useState<Boolean>(false);

  return (
    <div className="miniHeaderContainer">
      <img
        className="miniHeaderIcon"
        src={`assets/icons/two.png`}
        alt="miniheader"
        onClick={() => {
          setOpen(!isOpen);
        }}
      />
      {isOpen ? (
        <div className="openMiniHeaderMenu">
          <Link to={ROUTES.Works.path}>
            <img
              src={`assets/icons/Works.png`}
              style={{ width: "100%", marginLeft: "1vw" }}
            />
          </Link>
          <Link to={ROUTES.Exhibitions.path}>
            <img
              src={`assets/icons/Exhibitions.png`}
              style={{ width: "100%", marginLeft: "2vw" }}
            />
          </Link>
          <Link to={ROUTES.CV.path}>
            <img
              src={`assets/icons/CV.png`}
              style={{ width: "100%", marginLeft: "3vw" }}
            />
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MiniHeader;
