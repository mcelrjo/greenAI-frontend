import ChatPage from "./ChatPage";

function App() {
  return (
    <div>
      <header className="header-banner">
        <img src="./assets/AIGreenLogo.png" alt="LawnCare Assistant Logo" className="logo" />
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

