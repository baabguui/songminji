import Home from "pages/Home";
import Exhibitions from "pages/Exhibitions";
import CV from "pages/CV";
import Contact from "pages/Contact";
import Exhibition from "pages/Exhibition";

export const ROUTES: routeWrap = {
  home: {
    Path: "/",
    Component: Home,
    Label: "Song Minji",
  },
  Exhibitions: {
    Path: "/exhibitions",
    Component: Exhibitions,
    Label: "Exhibitions",
  },
  CV: {
    Path: "/cv",
    Component: CV,
    Label: "CV",
  },
  Contact: {
    Path: "/contact",
    Component: Contact,
    Label: "Contact",
  },
  Exhibition: {
    Path: "/exhibitions/:id",
    Component: Exhibition,
    Label: "Exhibition",
  },
};

export const ROUTES_LIST: route[] = Object.values(ROUTES);
