import styled from "styled-components";

const CVContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  gap: 1.5vw;
`;

const CVCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1vw;
`;

const CVContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CVContentParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: Malgun Gothic;
  margin: -0.1vw;
`;

export {
  CVContainer,
  CVCategoryContainer,
  CVContentContainer,
  CVContentParagraph,
};
