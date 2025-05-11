import ChatPage from "./ChatPage";
import './App.css'
import logo from "./assets/AIGreenLogo.png";

function App() {
  return (
    <div>
      <header className="header-banner">
        <img src={logo} alt="LawnCare Assistant Logo" className="logo" />
        <div style={{ flexGrow: 1 }}>
          <h1>LawnCare Assistant</h1>
          <p style={{ fontStyle: "italic", fontSize: "0.9rem", margin: 0 }}>
            powered by Landscape World Network
          </p>
        </div>
      </header>

      {/* Directly render ChatPage without Router or Routes */}
      <ChatPage />
    </div>
  );
}

export default App;

