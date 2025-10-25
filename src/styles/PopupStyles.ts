import styled from "styled-components";

const PopupContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const PopupImage = styled.img`
  max-width: 44vw;
  object-fit: contain;
  @media (max-width: 768px) {
    position: fixed;
    top: 8vh;
    left: 44vw;
  }
`;

export { PopupContainer, PopupImage };
