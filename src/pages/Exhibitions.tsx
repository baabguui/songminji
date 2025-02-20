import exhibitionsData from "datas/exhibitionsData.json";
import Preview from "components/Preview";

const Exhibitions = () => {
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
  return <Preview previewData={previewData} />;
};

export default Exhibitions;
