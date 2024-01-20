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
      <img
        className="work"
        src={`/assets/2023/${currentWork.id}.png`}
        alt="work"
      />
      <p>
        {currentWork.title}, {currentWork.media}, {currentWork.size}
      </p>
      <Footer />
    </div>
  );
};

export default WorkCard;
