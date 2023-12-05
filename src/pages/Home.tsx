import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import Header from "../components/Header";
import "../styles/home.css";

const Home = () => {
  const isHome = true;

  return (
    <div className="background">
      <Header isHome={isHome} />
      <Link to={ROUTES.Works.path}>
        <div className="works" />
      </Link>

      <Link to={ROUTES.Exhibitions.path}>
        <div className="exhibitions" />
      </Link>

      <Link to={ROUTES.CV.path}>
        <div className="cv" />
      </Link>

      <div>
        <a
          className="link"
          href="https://www.tumblr.com/fromsongminji"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </div>
  );
};

export default Home;
