import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const MiniHeader = () => {
    const [isOpen, setOpen] = useState<Boolean>(false);
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img
                src={require("../assets/two.png")}
                alt="miniheader"
                style={{ width: "4vw" }}
                onClick={() => {
                    setOpen(!isOpen);
                }}
            />
            {isOpen ? (
                <div>
                    <Link to={ROUTES.Works.path}>
                        <img
                            src={require("../assets/Works.png")}
                            style={{ width: "10%" }}
                        />
                    </Link>
                    <Link to={ROUTES.Exhibitions.path}>
                        <img
                            src={require("../assets/Exhibitions.png")}
                            style={{ width: "15%" }}
                        />
                    </Link>
                    <Link to={ROUTES.CV.path}>
                        <img
                            src={require("../assets/CV.png")}
                            style={{ width: "5%" }}
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
