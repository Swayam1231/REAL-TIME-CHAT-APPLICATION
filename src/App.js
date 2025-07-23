import React, { useState } from 'react';
import Chat from './chat';

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username.trim()) {
      setJoined(true);
    }
  };

  return (
    <div className="app">
      {!joined ? (
        <div className="join-screen">
          <h2>Enter your name</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
