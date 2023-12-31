import { useParams } from "react-router-dom";
import exhibitionData from "../data/exhibitionData.json";
import "../styles/exhibitions.css";
import Header from "../components/Header";

const Exhibition = () => {
  const { id } = useParams();
  const currentExhibition = exhibitionData.three.find((exhibition) => {
    return exhibition.id === Number(id);
  });

  return (
    <>
      <Header isHome={false} />
      <div className="exhibitionContainer">
        <p>
          {currentExhibition?.title},{currentExhibition?.place}
        </p>
        {currentExhibition?.works.map((work) => {
          return (
            <img
              className="exhibitionItem"
              key={work.id}
              src={`/assets/2023/exhibitions/${currentExhibition.title}/${work.id}.jpg`}
              alt="foreground"
            />
          );
        })}
      </div>
      <div>{currentExhibition?.id}</div>
    </>
  );
};

export default Exhibition;
