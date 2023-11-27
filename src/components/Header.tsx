import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import "../css/header.css";
import MiniHeader from "./MiniHeader";

const Header = (props: { isHome: Boolean }) => {
    return (
        <div className="headerContainer">
            <Link to={ROUTES.Home.path}>
                <img src={require("../assets/home.png")} alt="songminji" />
            </Link>
            {props.isHome ? <></> : <MiniHeader />}
        </div>
    );
};
export default Header;
