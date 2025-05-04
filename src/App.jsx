import { useState } from "react";
import axios from "axios";
import "./App.css";

const SAMPLE_QUESTIONS = [
  "Why is my bermudagrass turning yellow?",
  "What causes dollar spot in bentgrass?",
  "How often should I mow Zoysia turf?",
  "How do I control crabgrass organically?",
];

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSampleClick = (question) => {
    setUserInput(question);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);

    try {
      const res = await axios.post("https://greenai-k36d.onrender.com/diagnose", {
        user_input: userInput,
      });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.response }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Error fetching diagnosis." }]);
    }

    setUserInput("");
    setLoading(false);
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <h2>Sample Turf Questions</h2>
        <ul>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <li key={idx} onClick={() => handleSampleClick(q)}>
              {q}
            </li>
          ))}
        </ul>
        <div className="ad-placeholder">[Google Ad Here]</div>
      </aside>

      <main className="chatbox">
        <div className="messages">
          {messages.map((m, idx) => (
            <div key={idx} className={`message ${m.role}`}>
              <strong>{m.role === "user" ? "You" : "TurfAI"}:</strong> {m.content}
            </div>
          ))}
          {loading && <div className="message assistant">Lawncare AI is thinking...</div>}
        </div>
        <form onSubmit={handleSubmit} className="input-form">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Describe your turf issue..."
          />
          <button type="submit" disabled={loading}>Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;

