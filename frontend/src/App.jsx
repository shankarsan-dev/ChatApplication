
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Join from './component/Join/Join';
// import socketIO from "socket.io-client";
// const ENDPOINT = "http://localhost:4500/"
// const socket = socketIO(ENDPOINT,{transports:['websocket']});
const App = () => {
  // socket.on("connect",()=>{ 
  //   console.log("new connection");
  //})
  return (

      <Router>
            <div className='App'>
       <Routes>
       <Route exact path="/" element={<Join/>}/>
       </Routes>
      
        </div>
      </Router>
      
   
  )
}

export default App;
