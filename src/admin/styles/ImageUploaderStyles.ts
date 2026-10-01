import styled from "styled-components";

const SmallButton = styled.button`
  border: 1px solid #ccc;
  background: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  padding: 2px 6px;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

export { SmallButton };
