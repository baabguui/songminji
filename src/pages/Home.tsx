import { useEffect, useState } from "react";
import { PopupContainer, PopupImage } from "styles/PopupStyles";
import { supabase } from "lib/supabaseClient";

interface PopupRow {
  id: string;
  storage_path: string;
  link: string;
  start_date: string;
  end_date: string;
}

const Home = () => {
  const [activePopups, setActivePopups] = useState<PopupRow[]>([]);

  useEffect(() => {
    const fetchPopups = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("popups")
        .select("*")
        .lte("start_date", today)
        .gte("end_date", today)
        .order("sort_order");
      if (error) {
        console.error(error);
        return;
      }
      setActivePopups(data ?? []);
    };
    fetchPopups();
  }, []);

  if (activePopups.length === 0) {
    return null;
  }

  return (
    <PopupContainer>
      {activePopups.map((popup) => (
        <a key={popup.id} href={popup.link} target="_blank" rel="noopener noreferrer">
          <PopupImage
            src={supabase.storage.from("assets").getPublicUrl(popup.storage_path).data.publicUrl}
            alt=""
          />
        </a>
      ))}
    </PopupContainer>
  );
};

export default Home;
