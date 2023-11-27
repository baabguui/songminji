import Header from "../components/Header";
import ExhibitionCard from "../components/ExhibitionCard";
import exhibitionData from "../routes/exhibitionData.json";
import "../css/exhibitions.css";

const Exhibitions = () => {
    const exhibitionList = [...exhibitionData.three];
    return (
        <>
            <Header isHome={false} />
            <div className="exhibitionsListContainer">
                {exhibitionList.map((exhibition) => {
                    return (
                        <ExhibitionCard
                            key={exhibition.id}
                            exhibition={exhibition}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default Exhibitions;
