import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Exhibition = () => {
  const { id } = useParams<{ id: string }>();
  const [exhibition, setExhibition] = useState<Exhibition>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const module = await import("datas/exhibitionsData.json");
        const data = module.default;
        Object.values(data).forEach((exhibition: Exhibition[]) => {
          const match = exhibition.find(
            (exhibition: Exhibition) => exhibition.id === id,
          );
          if (match) setExhibition(match);
        });
      } catch (error) {
        console.error;
      }
    };
    fetchData();
  }, [id]);
  return <>{exhibition?.title}</>;
};

export default Exhibition;
