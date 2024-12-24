
import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { user } from "../Join/Join";
import Message from "../Message/Message";
import "./Chat.css";
const ENDPOINT = "http://localhost:4500/";
let socket;
const Chat = () => { 
const[id,setId]= useState("");
const send = ()=>{

  const message = document.getElementById("ChatInput").value;
socket.emit("message",{message,id});
document.getElementById("ChatInput").value= null;



}

  useEffect(() => {
    // Initialize socket
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    // Handle connection and events
    socket.on("connect", () => {
      setId(socket.id);
      console.log(`Connected as ${user}`);
      socket.emit("joined", { user });

      socket.on("welcome", (data) => {
        console.log(data.user, data.message);
      });

      socket.on("userJoined", (data) => {
        console.log(data.user, data.message);
      });
      

      socket.on("userLeft", (data) => {
        console.log(data.user, data.message);
      });
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  useEffect(()=>{
    socket.on("sendMessage",(data)=>{
      console.log(data.user,data.message,data.id);
    })
  })

  return (
    <div className="ChatPage">
      <div className="ChatContainer">
        <div className="Header">Header</div>
        <div className="ChatBox">
        <Message message = {"hey whats up"}/>

        </div>
        <div className="InputBox">
          <input type="text" className="ChatInput" id="ChatInput" placeholder="Type your message..." />
          <button className="SendBtn" onClick={send}>
            <img src="..\src\images\send.png" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
