import { useMemo } from "react";
import { PopupContainer, PopupImage } from "styles/PopupStyles";
import { POPUP_LIST } from "datas/popupConfig";

const Home = () => {
  const activePopups = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    return POPUP_LIST.filter((popup) => {
      return popup.startDate <= todayStr && todayStr <= popup.endDate;
    });
  }, []);

  if (activePopups.length === 0) {
    return null;
  }

  return (
    <PopupContainer>
      {activePopups.map((popup) => (
        <a
          key={popup.id}
          href={popup.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PopupImage src={popup.imagePath} alt={popup.id} />
        </a>
      ))}
    </PopupContainer>
  );
};

export default Home;
