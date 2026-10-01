import { Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "routes";
import MenuBar from "components/MenuBar";
import { AppContainer, ContentContainer } from "styles/AppStyles";

function PublicApp() {
  return (
    <AppContainer>
      <MenuBar />
      <ContentContainer>
        <Routes>
          {ROUTES_LIST.map(({ Path, Component }, idx) => (
            <Route key={idx} path={Path} element={<Component />} />
          ))}
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

export default PublicApp;
