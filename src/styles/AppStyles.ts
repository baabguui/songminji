import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4vw;
  gap: 5vw;
`;

const ContentContainer = styled.div`
  margin-top: clamp(16px, 2.2vw, 36px);
`;

export { AppContainer, ContentContainer };
