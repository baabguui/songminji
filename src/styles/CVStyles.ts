import styled from "styled-components";

const CVContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  gap: 1.8vw;
`;

const CVCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1vw;
`;

const CVContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;

const CVContentParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  margin: 0;
`;

export {
  CVContainer,
  CVCategoryContainer,
  CVContentContainer,
  CVContentParagraph,
};
