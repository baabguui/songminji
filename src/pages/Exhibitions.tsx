import Header from "../components/Header";
import ExhibitionCard from "../components/ExhibitionCard";
import exhibitionData from "../data/exhibitionData.json";
import "../styles/exhibitions.css";
import Footer from "../components/Footer";

const Exhibitions = () => {
  const exhibitionList = exhibitionData.three;
  return (
    <>
      <Header isHome={false} />
      <div className="exhibitionsListContainer">
        {exhibitionList.map((exhibition) => {
          return <ExhibitionCard key={exhibition.id} exhibition={exhibition} />;
        })}
      </div>
      <Footer />
    </>
  );
};
export default Exhibitions;
