import exhibitionsData from "datas/exhibitionsData.json";
import Preview from "components/Preview";
import { useNavigate } from "react-router-dom";

const Exhibitions = () => {
  const navigate = useNavigate();
  const previewData = Object.entries(exhibitionsData).reduce(
    (acc, [year, exhibitions]) => {
      acc[year] = exhibitions.map((exhibition) => ({
        id: exhibition.id,
        title: exhibition.title,
        place: exhibition.place,
        period: exhibition.period,
      }));
      return acc;
    },
    {} as ExhibitionsByYear,
  );

  const handleItemClick = (id: string) => {
    navigate(`/exhibitions/${id}`);
  };

  return <Preview previewData={previewData} onItemClicked={handleItemClick} />;
};

export default Exhibitions;
