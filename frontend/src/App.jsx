
import React from 'react';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Chat from './component/Chat/Chat';
import Join from './component/Join/Join';
const App = () => {


  
  return (

      <Router>
            <div className='App'>
       <Routes>
       <Route exact path="/" element={<Join/>}/>
       <Route path ="/chat" element={<Chat/>}></Route>
       </Routes>
      
        </div>
      </Router>
      
   
  )
}

export default App;
