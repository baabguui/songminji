import { useState } from "react";
import "../styles/popup.css";

const PopUp = (props: { img: String; url: String }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    return;
  };

  return (
    <div className={isOpen ? "popupContainer" : "popupOff"}>
      <a href={`${props.url}`} target="_blank" rel="noopener noreferrer">
        <div
          className="posterContainer"
          style={{
            backgroundImage: `url(${props.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </a>

      <span className={"close"} onClick={handleOpen}>
        x
      </span>
    </div>
  );
};

export default PopUp;
