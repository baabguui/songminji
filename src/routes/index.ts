import React from "react";
import Home from "../pages/Home";
import Works from "../pages/Works";
import Work from "../pages/Work";
import Exhibitions from "../pages/Exhibitions";
import Exhibition from "../pages/Exhibition";
import CV from "../pages/CV";
import Contact from "../pages/Contact";

interface route {
  path: string;
  Component: React.FC;
}

interface routeWrap {
  [key: string]: route;
}

export const ROUTES: routeWrap = {
  Home: {
    path: "/",
    Component: Home,
  },
  Works: {
    path: "/works/:year",
    Component: Works,
  },
  Work: {
    path: "/works/:year/:id",
    Component: Work,
  },
  Exhibitions: {
    path: "/exhibitions",
    Component: Exhibitions,
  },
  Exhibition: {
    path: "/exhibitions/:id",
    Component: Exhibition,
  },
  CV: {
    path: "/CV",
    Component: CV,
  },
  Contact: {
    path: "/contact",
    Component: Contact,
  },
};

export const ROUTES_LIST: route[] = Object.values(ROUTES);
