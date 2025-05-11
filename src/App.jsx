import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./ChatPage";
import LawnCareNews from "./LawnCareNews";
import './App.css';
import logo from "./assets/AIGreenLogo.png";

function App() {
  return (
    <Router>
      <header className="header-banner">
        <img src={logo} alt="LawnCare Assistant Logo" className="logo" />
        <div style={{ flexGrow: 1 }}>
          <h1>LawnCare Assistant</h1>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", margin: 0 }}>
            powered by Landscape World Network
          </p>
        </div>
        <nav>
          <Link
            to="/news"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "1rem",
              backgroundColor: "#3E7E3C",
              padding: "0.3rem 0.7rem",
              borderRadius: "5px"
            }}
          >
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


