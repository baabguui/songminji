import styled from "styled-components";

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4vw;
  @media (max-width: 768px) {
    padding-left: 1vw;
  }
`;

interface MenuItemProps {
  selected: boolean;
  category: string;
}
const MenuItem = styled.div<MenuItemProps>`
  color: black;
  font-style: ${({ selected }) => (selected ? "italic" : "normal")};
  font-size: clamp(12px, 1.6vw, 26px);
  font-family: NotoSansKR, NotoSans;
  margin: -0.1vw;
  &:hover {
    font-style: ${({ category }) =>
      category === "Song Minji" ? "normal" : "italic"};
  }
  @media (max-width: 768px) {
    font-size: clamp(18px, 5vw, 32px);
  }
`;

export { MenuContainer, MenuItem };
