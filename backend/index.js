const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const port = 4500 || process.env.PORT;


const app = express();
const server = http.createServer(app);

app.get("/",(req,res)=>{
    res.send("It is working pretty damn!");
})

const io = socketIO(server);
io.on("connection",()=>{
    console.log("New Connection");
})

server.listen(port, ()=>{console.log("Server running at port http://localhost:"+port)});