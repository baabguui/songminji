import styled from "styled-components";

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`;

const YearContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3vw;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
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
  font-family: Malgun Gothic;
  margin: -0.1vw;
`;

export { PreviewContainer, YearContainer, ItemContainer, Item, ItemParagraph };
