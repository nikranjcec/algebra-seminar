import "./App.css";
import React, { useState, useEffect } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import AppHeader from "./components/AppHeader";
import Members from "./components/Members";
import LogIn from "./components/LogIn";
function App() {
  const roomName = "observable-algebra3-room";
  const scaledronKey = "ORrZ5bWBx7n0pp4E";
  function randomColor() {
    return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
  }

  let state = {
    messages: [],
    members: [],
    member: {
      username: "",
      color: randomColor(),
    },
  };

  const [stateData, setStateData] = useState(state);
  const [drone, setDrone] = useState(null);

  const onSendMessage = ({ msgText }) => {
    if (msgText !== "") {
      drone.publish({
        room: roomName,
        message: msgText,
      });
    }
  };

  const onSetUserName = ({ userName }) => {
    stateData.member.username = userName;
    stateData.member.color = stateData.member.color;
    setStateData({ ...stateData }, stateData.member);

    const drone = new window.Scaledrone(scaledronKey, {
      data: stateData.member,
    });
    setDrone(drone);
  };

  useEffect(() => {
    if (stateData.member.username !== "") {
      var msgList = document.getElementsByClassName("msg-container");
      msgList[0].scrollTop = 999999999;
    }
  });

  useEffect(() => {
    const setScaledronConnection = () => {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        stateData.member.id = drone.clientId;
        stateData.member.username = stateData.member.username;
        stateData.member.color = stateData.member.color;

        setStateData({ ...stateData }, stateData.member);
        setRoom();
      });

      drone.on("error", (error) => console.error(error));
      drone.on("disconnect", () => {
        console.log("User is disconected.");
      });
      drone.on("reconnect", () => {
        console.log("User is reconnected");
      });
    };

    const setRoom = () => {
      const room = drone.subscribe(roomName);
      room.on("open", (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log("Connected.......");
        }
      });

      room.on("members", (m) => {
        stateData.members = m;
        setStateData({ ...stateData }, stateData.members);
      });

      room.on("member_join", (member) => {
        stateData.members.push(member);
        setStateData({ ...stateData }, stateData.members);
      });

      room.on("message", (message) => {
        receiveMsg(message);
      });

      room.on("member_leave", ({ id }) => {
        const index = stateData.members.findIndex((member) => member.id === id);
        stateData.members.splice(index, 1);
        setStateData({ ...stateData }, stateData.members);
      });
    };

    const receiveMsg = (message) => {
      stateData.messages.push(message);
      setStateData({ ...stateData }, stateData.messages);
    };

    if (drone && !stateData.member.id) {
      setScaledronConnection();
    }
  }, [stateData, drone]);

  return (
    <div className="App">
      {stateData.member.username === "" ? (
        <LogIn onSetUserName={onSetUserName} />
      ) : (
        <div className="chat-container">
          <AppHeader currentUser={stateData.member} />
          <div className="main-container">
            <div className="member-container">
              <Members members={stateData.members} />
            </div>

            <div className="chat">
              <div className="msg-container">
                <Messages
                  messages={stateData.messages}
                  currentUser={stateData.member}
                />
              </div>
              <div className="input-container">
                <Input onMsgSubmit={onSendMessage} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
