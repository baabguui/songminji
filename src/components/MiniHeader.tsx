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
                <div
                    style={{
                        display: "flex",
                        width: "20vw",
                        alignItems: "center",
                    }}
                >
                    <Link to={ROUTES.Works.path}>
                        <img
                            src={require("../assets/Works.png")}
                            style={{ width: "100%" }}
                        />
                    </Link>
                    <Link to={ROUTES.Exhibitions.path}>
                        <img
                            src={require("../assets/Exhibitions.png")}
                            style={{ width: "100%" }}
                        />
                    </Link>
                    <Link to={ROUTES.CV.path}>
                        <img
                            src={require("../assets/CV.png")}
                            style={{ width: "100%" }}
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
