import { Link } from "react-router-dom";
import { ROUTES } from "../routes";
import Header from "../components/Header";
import "../styles/home.css";
import PopUp from "../components/PopUp";
import Footer from "../components/Footer";

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

      <PopUp
        img={"/assets/2023/exhibitions/Well/well.png"}
        url={
          "https://www.instagram.com/p/C19O01sJnCC/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        }
      />

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
