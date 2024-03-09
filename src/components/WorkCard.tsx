import "../styles/works.css";
import IWork from "../interfaces/Work.interface";
import Footer from "./Footer";

const WorkCard = ({
  currentWork,
  handleOnWheel,
}: {
  currentWork: IWork;
  handleOnWheel: any;
}) => {
  return (
    <div className="workContainer" onWheel={handleOnWheel}>
      <picture>
        <img
          className="work"
          src={`/assets/${currentWork.year}/${currentWork.id}.png`}
          alt="work"
        />
      </picture>
      <p>
        {currentWork.title}, {currentWork.year}, {currentWork.media},{" "}
        {currentWork.size}
      </p>
      <Footer />
    </div>
  );
};

export default WorkCard;
