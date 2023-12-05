import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routes";

const MiniHeader = () => {
    const [isOpen, setOpen] = useState<Boolean>(false);
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img
                src={`assets/icons/two.png`}
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
                        alignItems: "end",
                    }}
                >
                    <Link to={ROUTES.Works.path}>
                        <img
                            src={`assets/icons/Works.png`}
                            style={{ width: "100%" }}
                        />
                    </Link>
                    <Link to={ROUTES.Exhibitions.path}>
                        <img
                            src={`assets/icons/Exhibitions.png`}
                            style={{ width: "100%" }}
                        />
                    </Link>
                    <Link to={ROUTES.CV.path}>
                        <img
                            src={`assets/icons/CV.png`}
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
