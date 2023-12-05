import { Link } from "react-router-dom";

import imageData from "../routes/imageData.json";
import Header from "../components/Header";

import "../styles/works.css";

const Works = () => {
  const imageList = [...imageData.three];

  return (
    <>
      <Header isHome={false} />
      <div className="worksWrap">
        {imageList.map((work) => {
          const width = work.width / 8;
          return (
            <Link to={`/works/${work.id}`} key={work.id}>
              <img
                className="workPreview"
                src={`/assets/2023/${work.id}_preview.png`}
                alt="preview"
                style={{ width: `${width}vw` }}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Works;
