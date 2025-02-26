import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    gap: 6vw;
  }
`;

const CVContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 70vw;
  gap: 0vw;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 6vw;
  }
`;

const CVLanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  @media (max-width: 768px) {
    gap: 6vw;
  }
`;

interface YearContainerProps {
  //kr, en 간격 맞추기용
  category: string;
}

const CVYearContainer = styled.div<YearContainerProps>`
  display: flex;
  flex-direction: row;
  width: 30vw;
  gap: 1vw;
  min-height: ${({ category }) => (category === "educations" ? "4vw" : 0)};
  @media (max-width: 768px) {
    width: 80vw;
  }
`;

const CVContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CVContentParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: NotoSanskr, NotoSans;
  margin: 0;
  @media (max-width: 768px) {
    font-size: clamp(12px, 3.4vw, 24px);
    margin: 0;
  }
`;

export {
  Container,
  CVContainer,
  CVLanguageContainer,
  CVYearContainer,
  CVContentParagraph,
  CVContentContainer,
};
