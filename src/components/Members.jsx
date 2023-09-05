import React from "react";

function rederMembers(m) {
  return (
    <li className="members-list-member">
      <span
        className="avatar"
        style={{ backgroundColor: m.clientData.color }}
      />
      <div>
        <div className="username">{m.clientData.username}</div>
      </div>
    </li>
  );
}

function Members({ members }) {
  return (
    <ul className="members-list">{members.map((m) => rederMembers(m))}</ul>
  );
}

export default Members;
