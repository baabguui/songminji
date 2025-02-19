import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "routes";
import MenuBar from "components/MenuBar";

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        {ROUTES_LIST.map(({ Path, Component }, idx) => (
          <Route key={idx} path={Path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
