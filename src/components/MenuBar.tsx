import { ROUTES_LIST } from "routes";
import { Link } from "react-router-dom";

const MenuBar = () => {
  return (
    <>
      {ROUTES_LIST.map(({ Path, Label }) => {
        return (
          <Link key={Path} to={Path} style={{ textDecoration: "none" }}>
            {Label}
          </Link>
        );
      })}
    </>
  );
};

export default MenuBar;
