import styled from "styled-components";

const ExhibitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 86vw;
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const ExhibitionParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: Malgun Gothic;
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
  width: 86vw;
  height: auto;
  object-fit: contain;
`;

const ExhibitionContentCaption = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
`;

const ScrollTop = styled.div`
  position: fixed;
  right: 10vw;
  bottom: 6vw;
  @media (max-width: 768px) {
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
