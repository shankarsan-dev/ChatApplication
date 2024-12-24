// const http = require("http");
// const express = require("express");
// const cors = require("cors");
// const socketIO = require("socket.io");
// const port = 4500 || process.env.PORT;


// const app = express();
// const server = http.createServer(app);
// app.use(cors());
// const users =[{}];
// app.get("/",(req,res)=>{
//     res.send("It is working pretty damn!");
// })

// const io = socketIO(server);
// io.on("connection",(socket)=>{
//     console.log("New Connection");
//     socket.on('joined',({user})=>{
//         users[socket.id]= user;
       
//         console.log(`${user} joined `);
//     });
//     socket.emit('welcome',{user:"Admin",message:`Welcome to the chat`});
//     socket.broadcast.emit("userJoined",{user:"Admin",message:`${users[socket.id]} has joined the chat`});
    
// });


// server.listen(port, ()=>{console.log("Server running at port http://localhost:"+port)});

const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const port = process.env.PORT || 4500;
const app = express();
const server = http.createServer(app);

app.use(cors());

const users = {};

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  // Handle user joining
  socket.on("joined", ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} joined`);

    // Notify the current user
    socket.emit("welcome", { user: "Admin", message: `Welcome to the chat, ${user}!` });

    // Notify others
    socket.broadcast.emit("userJoined", { user: "Admin", message: `${user} has joined the chat.` });
  });
  socket.on("message",({message,id})=>{
    io.emit("sendMessage",{user:users[id],message,id});
  })
  // Handle disconnection
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      console.log(`${user} left`);
      delete users[socket.id];
      socket.broadcast.emit("userLeft", { user: "Admin", message: `${user} has left the chat.` });
    }
  });
 

});

server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
