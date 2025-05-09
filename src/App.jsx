import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/AIGreenLogo.png";

const SAMPLE_QUESTIONS = [
  "Why is my bermudagrass turning yellow?",
  "How do I control crabgrass organically?",
  "What is this brown spot in my lawn?",
  "When should I fertilize Zoysia?"
];

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [animatedResponse, setAnimatedResponse] = useState("");

  const handleSampleClick = (q) => {
    setUserInput(q);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages([...messages, { role: "user", content: userInput }]);
    setLoading(true);

    try {
      const res = await axios.post("https://greenai-k36d.onrender.com/diagnose", {
        user_input: userInput,
      });

      let full = res.data.response;
      let index = 0;
      setAnimatedResponse("");

      const animate = () => {
        if (index < full.length) {
          setAnimatedResponse((prev) => prev + full.charAt(index));
          index++;
          setTimeout(animate, 20);
        } else {
          setMessages((prev) => [...prev, { role: "assistant", content: full }]);
          setAnimatedResponse("");
        }
      };
      animate();
    } catch {
      setMessages([...messages, { role: "assistant", content: "Error fetching diagnosis." }]);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <div>
      <header className="header-banner">
        <img src={logo} alt="Lawncare AI" className="logo" />
        <h1>AI Green Assistant</h1>
      </header>

      <div className="three-column-layout">
        <aside className="sidebar left">
          <h2>Sample Questions</h2>
          <ul>
            {SAMPLE_QUESTIONS.map((q, i) => (
              <li key={i} onClick={() => handleSampleClick(q)}>{q}</li>
            ))}
          </ul>
        </aside>

        <main className="chat-area">
          <div className="messages">
            {messages.length === 0 && animatedResponse === "" && !loading ? (
              <div className="chat-logo-container">
                <img src={logo} alt="Lawncare AI Logo" className="center-logo" />
              </div>
            ) : (
              <>
                {messages.map((m, idx) => (
                  <div key={idx} className={`message ${m.role}`}>
                    <strong>{m.role === "user" ? "You" : "TurfAI"}:</strong> {m.content}
                  </div>
                ))}
                {animatedResponse && (
                  <div className="message assistant">
                    <strong>TurfAI:</strong> {animatedResponse}
                  </div>
                )}
                {loading && (
                  <div className="message assistant typing">TurfAI is typing...</div>
                )}
              </>
            )}
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe your turf issue..."
            />
            <button type="submit">Send</button>
          </form>
        </main>

        <aside className="sidebar right">
          <h2>Lawn Care News</h2>
          <div className="news-feed">
            <iframe
              src="https://rss.app/embed/v1/list/Y2w4zPxrObmELkuA"
              frameBorder="0"
              title="Lawn Care News"
              style={{
                width: "100%",
                height: "100%",
                border: "none"
              }}
            />
          </div>
        </aside>

      </div>
    </div>
  );
}

export default App;
