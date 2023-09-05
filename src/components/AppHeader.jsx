import React from "react";

function AppHeader({ currentUser }) {
  return (
    <div className="app-header">
      <div className="app-title">
        <h4>Kranjcec - algebra seminar</h4>
      </div>
      <div className="app-curent-user">
        <span
          className="avatar-header"
          style={{ backgroundColor: currentUser.color }}
        />
        <div className="username-header">{currentUser.username}</div>
      </div>
    </div>
  );
}

export default AppHeader;
