import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4vw;
  gap: 5vw;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8vw;
  }
`;

const ContentContainer = styled.div`
  margin-top: clamp(16px, 2.6vw, 36px);
  @media (max-width: 768px) {
    margin-top: 0;
    padding-left: 1vw;
  }
`;

export { AppContainer, ContentContainer };
