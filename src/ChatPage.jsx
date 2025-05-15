import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import logo from "./assets/AIGreenLogo.png";  // Adjust if needed

const SAMPLE_QUESTIONS = ["How do I control crabgrass in my St. Augustinegrass lawn?", "How tall should I mow tall fescue?", "What fertilizer do I need to use in the fall?", "Which lawn is best- bermudagrass or zoysiagrass?"];

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [animatedResponse, setAnimatedResponse] = useState("");
  const [imageFile, setImageFile] = useState(null);


  const handleSampleClick = (q) => setUserInput(q);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() && !imageFile) return;

    // Show the user message or note that an image was sent
    setMessages([...messages, {
      role: "user",
      content: userInput || "[Image uploaded]",
    }]);

    setLoading(true);

    try {
      let res;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        res = await axios.post("https://greenai-0job.onrender.com/diagnose-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("https://greenai-0job.onrender.com/diagnose", {
          user_input: userInput,
        });
      }

      const full = res.data.response;
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
    } catch (err) {
      setMessages([...messages, {
        role: "assistant",
        content: "Error fetching diagnosis.",
      }]);
    }

    setUserInput("");
    setImageFile(null);
    setLoading(false);
  };


  return (
    <div className="three-column-layout">
      <aside className="sidebar left">
        <h2>What questions do you have today?</h2>
        <ul>{SAMPLE_QUESTIONS.map((q, i) => <li key={i} onClick={() => handleSampleClick(q)}>{q}</li>)}</ul>
      </aside>

      <main className="chat-area">
        <div className="messages">
          {messages.length === 0 && animatedResponse === "" && !loading ? (
            <div className="chat-logo-container">
              <img src={logo} alt="LawnCare Assistant Logo" className="center-logo" />
            </div>
          ) : (
            <>
              {messages.map((m, idx) => (
                <div key={idx} className={`message-wrapper ${m.role}`}>
                  <div className={`message ${m.role}`}>
                    <strong>{m.role === "user" ? "You" : "TurfAI"}:</strong> <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {animatedResponse && <div className="message assistant"><strong>🤖 TurfAI:</strong> <ReactMarkdown>{animatedResponse}</ReactMarkdown></div>}
              {loading && <div className="message assistant typing">TurfAI is typing...</div>}
            </>
          )}
        </div>

        <button className="scroll-to-latest" onClick={() => document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight}>⬇️ Newest</button>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-group">
            <label htmlFor="image-upload" className="image-label">📎 Attach Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              style={{ marginRight: "0.5rem" }}
            />
          </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Describe your turf issue..."
            />

            <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}
export default ChatPage;
