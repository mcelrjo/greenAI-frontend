import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./ChatPage";
import LawnCareNews from "./LawnCareNews";  // You need to create this if not already

function App() {
  return (
    <Router>
      <header className="header-banner">
        <img src="./assets/AIGreenLogo.png" alt="LawnCare Assistant Logo" className="logo" />
        <div style={{ flexGrow: 1 }}>
          <h1>LawnCare Assistant</h1>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", margin: 0 }}>
            powered by Landscape World Network
          </p>
        </div>
        <nav>
          <Link to="/news" style={{ color: "white", textDecoration: "none", marginRight: "1rem" }}>
            LawnCare News
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/news" element={<LawnCareNews />} />
      </Routes>
    </Router>
  );
}

export default App;
