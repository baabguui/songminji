import { HashRouter, Routes, Route } from "react-router-dom";
import PublicApp from "PublicApp";
import AdminApp from "admin/AdminApp";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicApp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
