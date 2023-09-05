import React, { useState } from "react";

function Input({ onMsgSubmit }) {
  let textMessage = "";

  const [statetextMessage, setTextMessage] = useState(textMessage);

  const saveMessage = (event) => {
    event.preventDefault();

    let msgText = statetextMessage;
    onMsgSubmit({ msgText });
    setTextMessage("");
  };
  return (
    <div className="input-msg">
      <form onSubmit={saveMessage}>
        <input
          onChange={(e) => setTextMessage(e.target.value)}
          value={statetextMessage}
          type="text"
          autoFocus={true}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Input;
