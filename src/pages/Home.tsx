import { PopupContainer, PopupImage } from "styles/PopupStyles";
import { POPUP_LINK } from "datas/popupConfig";

const Home = () => {
  return (
    <PopupContainer>
      <a href={POPUP_LINK} target="_blank" rel="noopener noreferrer">
        <PopupImage src="/assets/popup/olm.jpeg"></PopupImage>
      </a>
    </PopupContainer>
  );
};

export default Home;
