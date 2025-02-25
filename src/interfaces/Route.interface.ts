interface route {
  Path: string;
  Component: React.FC;
  Label: string;
}

interface routeWrap {
  [key: string]: route;
}
