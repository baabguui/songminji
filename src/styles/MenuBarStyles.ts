import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4vw;
`;

interface MenuItemProps {
  selected: boolean;
}
const MenuItem = styled.div<MenuItemProps>`
  color: black;
  font-style: ${({ selected }) => (selected ? "italic" : "normal")};
  font-size: clamp(12px, 1.6vw, 26px);
  &:hover {
    font-style: italic;
  }
`;

export { MenuContainer, MenuItem };
