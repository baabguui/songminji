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
          <Link to={ROUTES.Works.path} style={{ textDecoration: "none" }}>
            <div className="miniHeaderItem">Works</div>
          </Link>
          <Link to={ROUTES.Exhibitions.path} style={{ textDecoration: "none" }}>
            <div className="miniHeaderItem">Exhibitions</div>
          </Link>
          <Link to={ROUTES.CV.path} style={{ textDecoration: "none" }}>
            <div className="miniHeaderItem">CV</div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MiniHeader;
