import React, { useEffect } from "react";

function renderMessage(message, currentUser) {
  const messageFromMe = message.clientId === currentUser.id;
  const classNameListItem = messageFromMe
    ? "msg-message-currentUser"
    : "msg-message";
  const classNameMsg = messageFromMe
    ? "msg-content-text-cuurentUser"
    : "msg-content-text";
  return (
    <li key={message.id} className={classNameListItem}>
      <span
        className="avatar"
        style={{ backgroundColor: message.member.clientData.color }}
      />
      <div className="msg-content">
        <div className="username">{message.member.clientData.username}</div>
        <div className={classNameMsg}>{message.data}</div>
      </div>
      {/* <div className="msg-date">{getHumaDateTime(message.timestamp)}</div> */}
    </li>
  );
}

function getHumaDateTime(timestampDateTime) {
  var newDate = new Date();
  newDate.setTime(timestampDateTime * 1000);
  var dateString = newDate.toUTCString();
  return dateString;
}

function Messages({ messages, currentUser }) {
  useEffect(() => {
    var msgList = document.getElementsByClassName("msg-container");
    console.log("msg list", msgList);
    msgList[0].scrollTop = 999999999;
  });

  return (
    <ul>{messages.map((message) => renderMessage(message, currentUser))}</ul>
  );
}

export default Messages;
