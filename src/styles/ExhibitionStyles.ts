import styled from "styled-components";

const ExhibitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  @media (max-width: 768px) {
    width: 86vw;
  }
`;

const ExhibitionParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: NotoSansKR, NotoSans;
  margin: 0;
  @media (max-width: 768px) {
    font-size: clamp(12px, 3.4vw, 24px);
    margin: 0;
  }
`;

interface ExhibitionContentImageProps {
  src: string;
  category: string;
}

const ExhibitionContentImage = styled.img<ExhibitionContentImageProps>`
  width: 65vw;
  height: auto;
  object-fit: contain;
  @media (max-width: 768px) {
    width: 86vw;
  }
`;

const ExhibitionContentCaption = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
`;

const ScrollTop = styled.div`
  position: fixed;
  right: 6vw;
  bottom: 6vw;
  font-family: NotoSansKR, NotoSans;
  @media (max-width: 768px) {
    right: 10vw;
    width: 10vw;
    height: 10vw;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
    font-size: clamp(14px, 3vw, 24px);
    display: grid;
    place-items: center;
  }
`;

export {
  ExhibitionContainer,
  ExhibitionParagraph,
  ExhibitionContentImage,
  ExhibitionContentCaption,
  ScrollTop,
};
