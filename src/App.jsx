import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('https://greenai-k36d.onrender.com/diagnose', {
        user_input: userInput,
      });
      setResponse(res.data.response);
    } catch (error) {
      setResponse('Error fetching diagnosis.');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Lawncare AI Assistant</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Describe your turfgrass issue here..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Diagnosing...' : 'Submit'}
        </button>
      </form>
      {response && (
        <div className="response-box">
          <h3>Diagnosis</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
