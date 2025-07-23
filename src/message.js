import React from 'react';

function Message({ msg, isOwn }) {
  return (
    <div className={`message ${isOwn ? 'own' : ''}`}>
      {!isOwn && <span className="sender">{msg.username}:</span>}
      <span className="text">{msg.message}</span>
    </div>
  );
}

export default Message;
