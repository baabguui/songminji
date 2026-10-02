import { useEffect, useState } from "react";
import Preview from "components/Preview";
import { useNavigate } from "react-router-dom";
import { supabase } from "lib/supabaseClient";

const Exhibitions = () => {
  const navigate = useNavigate();
  const [previewData, setPreviewData] = useState<ExhibitionsByYear>({});

  useEffect(() => {
    const fetchExhibitions = async () => {
      const { data, error } = await supabase
        .from("exhibitions")
        .select("id, title, place, year, sort_order")
        .order("year", { ascending: false })
        .order("sort_order", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      const grouped = (data ?? []).reduce((acc, exhibition) => {
        const year = String(exhibition.year);
        if (!acc[year]) acc[year] = [];
        acc[year].push({
          id: exhibition.id,
          title: exhibition.title,
          place: exhibition.place,
        });
        return acc;
      }, {} as ExhibitionsByYear);

      setPreviewData(grouped);
    };

    fetchExhibitions();
  }, []);

  const handleItemClick = (id: string) => {
    navigate(`/exhibitions/${id}`);
  };

  return <Preview previewData={previewData} onItemClicked={handleItemClick} />;
};

export default Exhibitions;
