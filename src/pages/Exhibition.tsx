import { useParams } from "react-router-dom";
import exhibitionData from "../data/exhibitionData.json";
import "../styles/exhibitions.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Exhibition = () => {
  const { id } = useParams();
  const currentExhibition = exhibitionData.exhibitions.find((exhibition) => {
    return exhibition.id === Number(id);
  });

  return (
    <>
      <Header isHome={false} />
      <div className="exhibitionContainer">
        <div className="exhibitionInfo">
          <p style={{ fontWeight: "bold", fontSize: "larger" }}>
            {currentExhibition?.title}
          </p>
          <p>{currentExhibition?.place}</p>
          <p>{currentExhibition?.period}</p>
        </div>
        {currentExhibition?.works.map((work) => {
          return (
            <img
              className="exhibitionItem"
              key={work.id}
              src={`/assets/exhibitions/${currentExhibition.title}/${work.id}.jpg`}
              alt="foreground"
            />
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default Exhibition;
