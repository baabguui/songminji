import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES_LIST } from "./routes";
import Home from "./pages/Home";
import "./css/app.css";

function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />} />
                {ROUTES_LIST.map(({ path, Component }, idx) => (
                    <Route key={idx} path={path} element={<Component />} />
                ))}
            </Routes>
        </Router>
    );
}

export default App;
