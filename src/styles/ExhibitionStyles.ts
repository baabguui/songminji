import styled from "styled-components";

const ExhibitionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const ExhibitionParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: Malgun Gothic;
  margin: 0;
`;

interface ExhibitionContentImageProps {
  src: string;
  category: string;
}

const ExhibitionContentImage = styled.div<ExhibitionContentImageProps>`
  // margin-top: ${({ category }) => (category === "work" ? "2vw" : 0)};
  aspect-ratio: 5 / 3;
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
`;

const ExhibitionContentCaption = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
`;

export {
  ExhibitionContainer,
  ExhibitionParagraph,
  ExhibitionContentImage,
  ExhibitionContentCaption,
};
