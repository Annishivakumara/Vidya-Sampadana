import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/Components/LandingPage";
import AboutPage from "./pages/Components/Aboutpage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App