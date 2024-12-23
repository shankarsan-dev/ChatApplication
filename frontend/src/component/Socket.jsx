// socket.js
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:4500/";
let Socket;

export const getSocket = () => {
  if (!Socket) {
    Socket = socketIO(ENDPOINT, { transports: ["websocket"] });
  }
  return Socket;
};
