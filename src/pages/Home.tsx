import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import Header from "../components/Header";
import "../styles/home.css";
import Footer from "../components/Footer";

const Home = () => {
  const isHome = true;
  const year = 2024;
  return (
    <div className="background">
      <Header isHome={isHome} />
      <Link to={`works/${year}`}>
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
      <Footer />
    </div>
  );
};

export default Home;
