import { ROUTES_LIST } from "routes";
import { Link } from "react-router-dom";

import { MenuContainer, MenuItem } from "styles/MenuBarStyles";
import { useState } from "react";

const MenuBar = () => {
  type Menu = "Song Minji" | "Exhibitions" | "CV" | "Contact";
  const [selected, setSelected] = useState<Menu>("Song Minji");

  function handleClick(menu: Menu) {
    setSelected(menu);
  }

  return (
    <MenuContainer>
      {ROUTES_LIST.map(({ Path, Label }) => {
        return (
          <MenuItem
            key={Path}
            selected={selected === Label && Label !== "Song Minji"}
            onClick={() => {
              handleClick(Label as Menu);
            }}
          >
            <Link
              to={Path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {Label}
            </Link>
          </MenuItem>
        );
      })}
    </MenuContainer>
  );
};

export default MenuBar;
