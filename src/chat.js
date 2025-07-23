import React, { useState, useEffect, useRef } from 'react';
import Message from './message';

const SOCKET_URL = 'ws://localhost:8080'; // Replace with your backend WebSocket server

function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const socket = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket(SOCKET_URL);

    socket.current.onmessage = async (event) => {
  const text = await event.data.text(); // ✅ Convert Blob to text
  const data = JSON.parse(text);        // ✅ Now safely parse JSON
  setMessages((prev) => [...prev, data]);
};


    return () => {
      socket.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = { username, message };
      socket.current.send(JSON.stringify(msg));
      setMessage('');
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat Room</div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} isOwn={msg.username === username} />
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
