import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
`;

const ContactParagraph = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: Malgun Gothic;
  margin: 0;

  @media (max-width: 768px) {
    font-size: clamp(12px, 3.4vw, 24px);
  }
`;

export { ContactContainer, ContactParagraph };
