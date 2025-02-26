import { createGlobalStyle } from "styled-components";
import NotoSansKR from "./NotoSansKr/NotoSansKR-Regular.ttf";
import NotoSans from "./NotoSans/NotoSans-VariableFont_wdth,wght.ttf";

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "NotoSans";
  src: local('NotoSans');
  src: url(${NotoSans}) format('truetype');
}

@font-face {
  font-family: "NotoSansKR";
  src: local('NotoSansKR');
  src: url(${NotoSansKR}) format('truetype');
}
`;
