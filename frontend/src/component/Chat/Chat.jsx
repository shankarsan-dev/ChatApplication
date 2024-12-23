import React, { useEffect } from "react";
import socketIO from "socket.io-client";
import { user } from "../Join/Join";
import "./Chat.css";

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  useEffect(() => {
    socket.on("connect", () => {
      alert("connected "+ user);

      socket.emit('joined',{user});
      socket.on('welcome',(data)=>{
        console.log(data.user);
        console.log(data.message);
      })
      socket.on("user joined",(data)=>{
        console.log(data.user,data.message);
      })

    });
    return () => {};
  }, []);
  return (
    <div className="ChatPage">
    <div className="ChatContainer">
      <div className="Header">Header</div>
      <div className="ChatBox">ChatBox</div>
      <div className="InputBox">
        <input type="text" className="ChatInput" placeholder="Type your message..." />
        <button className="SendBtn"><img src="..\src\images\send.png" alt="" /></button>
      </div>
    </div>
  </div>
  );
};

 export default Chat;

