
// import React, { useEffect, useState } from "react";
// import socketIO from "socket.io-client";
// import { user } from "../Join/Join";
// import Message from "../Message/Message";
// import "./Chat.css";
// const ENDPOINT = "http://localhost:4500/";
// let socket;
// const Chat = () => { 
// const [id,setId]= useState("");
// const [messages,setMessages] = useState([1,2,3,4,3,4,52,56,65,34,243,123,54,345,345,]);
// const send = ()=>{

// const message = document.getElementById("ChatInput").value;
// socket.emit("message",{message,id});
// document.getElementById("ChatInput").value= null;



// }

//   useEffect(() => {
//     // Initialize socket
//     socket = socketIO(ENDPOINT, { transports: ["websocket"] });

//     // Handle connection and events
//     socket.on("connect", () => {
//       setId(socket.id);
//       console.log(`Connected as ${user}`);
//       socket.emit("joined", { user });

//       socket.on("welcome", (data) => {
//         console.log(data.user, data.message);
//       });

//       socket.on("userJoined", (data) => {
//         console.log(data.user, data.message);
//       });
      

//       socket.on("userLeft", (data) => {
//         console.log(data.user, data.message);
//       });
//     });

//     // Cleanup on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   useEffect(()=>{
//     socket.on("sendMessage",(data)=>{
//       console.log(data.user,data.message,data.id);
//     })
//   })

//   return (
//     <div className="ChatPage">
//       <div className="ChatContainer">
//         <div className="Header">Header</div>
//         <div className="ChatBox">
//         {messages.map((item, i)=> < Message message={item}/>)}  
//         </div>
//         <div className="InputBox">
//           <input type="text" className="ChatInput" id="ChatInput" placeholder="Type your message..." />
//           <button className="SendBtn" onClick={send}>
//             <img src="..\src\images\send.png" alt="Send" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useEffect, useRef, useState } from "react";
import socketIO from "socket.io-client";
import { user } from '../Join/Join';
import Message from "../Message/Message";
import "./Chat.css";
const ENDPOINT = "http://localhost:4500/";
let socket;


const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const send = () => {
    const message = document.getElementById("ChatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("ChatInput").value = null;
  };

  useEffect(() => {
    // Initialize socket
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    // Handle connection and events
    socket.on("connect", () => {
      setId(socket.id);
      socket.emit("joined", { user });

      socket.on("welcome", (data) => {
        setMessages([...messages,data]);
        console.log(data.user, data.message);
      });

      socket.on("userJoined", (data) => {
        setMessages([...messages,data]);
        console.log(data.user, data.message);
      });

      socket.on("userLeft", (data) => {
        setMessages([...messages,data]);
        console.log(data.user, data.message);
      });
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log(data.user, data.message, data.id);
      setMessages([...messages,data]);
    });
  },[messages]);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="ChatPage">
      <div className="ChatContainer">
        <div className="Header">

        <img className="Logo" src="..\src\images\guff-gaaf-high-resolution-logo.png" alt="logo" />
        <a href="/"><img className="Close" src="..\src\images\img.icons8.png" alt="logo" /></a>

        </div>
        <div className="ChatBox" ref={chatBoxRef}>
          {messages.map((item, i) => (
            <Message user ={item.id===id?'':item.user} message={item.message} classs={item.id===id?'Right':'Left'} key={i} />
          ))}
        </div>
        <div className="InputBox">
          <input
            type="text"
            className="ChatInput"
            id="ChatInput"
            placeholder="Type your message..."
          />
          <button className="SendBtn" onClick={send}>
            <img src="..\src\images\send.png" alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
