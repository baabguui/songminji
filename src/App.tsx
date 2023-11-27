import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "./routes";
import "./css/app.css";

function App() {
    return (
        <Router>
            <Routes>
                {ROUTES_LIST.map(({ path, Component }, idx) => (
                    <Route key={idx} path={path} element={<Component />} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
