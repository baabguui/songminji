import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  @media (max-width: 768px) {
    gap: 6vw;
  }
`;

const YearContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3vw;
  @media (max-width: 768px) {
    gap: 4vw;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  @media (max-width: 768px) {
    gap: 6vw;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  &:hover {
    font-style: italic;
  }
`;

const ItemParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: NotoSansKR, NotoSans;
  margin: -0.1vw;
  @media (max-width: 768px) {
    font-size: clamp(12px, 3.4vw, 24px);
    margin: 0;
  }
`;

export { PreviewContainer, YearContainer, ItemContainer, Item, ItemParagraph };
