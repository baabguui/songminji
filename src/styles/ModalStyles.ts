import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalImage = styled.img`
  max-width: 80vw;
  max-height: 70vh;
  object-fit: contain;
`;

const ModalCaption = styled.p`
  font-size: clamp(10px, 1.2vw, 22px);
  font-family: NotoSansKR, NotoSans;
  margin: 0;
  @media (max-width: 768px) {
    font-size: clamp(12px, 3.4vw, 24px);
    margin: 0;
  }
`;

export { ModalContainer, ModalContentContainer, ModalImage, ModalCaption };
