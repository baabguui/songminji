import { Link, useParams, useNavigate } from "react-router-dom";

import imageData from "../data/imageData.json";
import Header from "../components/Header";

import "../styles/works.css";
import Footer from "../components/Footer";
import { useState } from "react";

const Works = () => {
  const [currentYear, setCurrentYear] = useState("2024");
  let { year } = useParams();
  const navigate = useNavigate();
  year = year != "2023" ? "2024" : "2023";
  const imageList = year == "2024" ? imageData[2024] : imageData[2023]; //수정 필요

  const handleClickYear = (year: number) => {
    navigate(`/works/${year}`);
  };

  return (
    <>
      <Header isHome={false} />
      <div className="yearContainer">
        <div
          style={currentYear == "2024" ? { fontWeight: "bolder" } : {}}
          onClick={() => {
            handleClickYear(2024);
            setCurrentYear("2024");
          }}
        >
          {2024}
        </div>
        <div
          style={currentYear == "2023" ? { fontWeight: "bolder" } : {}}
          onClick={() => {
            handleClickYear(2023);
            setCurrentYear("2023");
          }}
        >
          {2023}
        </div>
      </div>

      <div className={year == "2023" ? "worksWrap" : "worksWrapFour"}>
        {imageList.map((work) => {
          const width = year == "2023" ? work.width / 8 : work.width / 12; //수정 필요

          return (
            <Link
              className={year == "2024" ? "workLinkFour" : "workLink"}
              to={`/works/${work.year}/${work.id}`}
              key={work.id}
            >
              <picture>
                <source
                  srcSet={`/assets/${work.year}/${work.id}_preview.webp`}
                  type="image/webp"
                />

                <img
                  className="workPreview"
                  src={`/assets/${work.year}/${work.id}_preview.png`}
                  alt="preview"
                  style={{
                    width: `${width}vw`,
                  }}
                />
              </picture>
            </Link>
          );
        })}
      </div>
      <Footer />
    </>
  );
};
export default Works;
