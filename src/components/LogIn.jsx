import React, { useState } from "react";

function LogIn({ onSetUserName }) {
  let userName = "";

  const [stateUserName, setStateUserName] = useState(userName);

  const setUserName = (event) => {
    event.preventDefault();

    let userName = stateUserName;
    onSetUserName({ userName });
    setStateUserName("");
  };

  return (
    <div className="login">
      <form onSubmit={setUserName}>
        <h4>Chose your username</h4>
        <div className="login-content">
          <div>
            <input
              onChange={(e) => setStateUserName(e.target.value)}
              value={stateUserName}
              type="text"
              className="login-form-input"
              autoFocus={true}
            />
          </div>

          <button>Enter Chat</button>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
