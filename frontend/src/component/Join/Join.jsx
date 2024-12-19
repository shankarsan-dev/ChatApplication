
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./join.css";
let user; 
const Join = () => {

const [name, setName] = useState("");
const sendUser= ()=>{
  user = document.getElementById("JoinInput").value;
  document.getElementById("JoinInput").value = "";

}
  return (
    
    <div className='JoinPage'>
      <div className="JoinContainer">
     <img src="..\src\images\guff-gaaf-high-resolution-logo.png" alt="logo" />

      <input className='JoinInput' type="text" placeholder='Your Name'id='JoinInput'/>
      <Link  to="chat" >
      <button to="chat"  className="JoinBtn" onClick={sendUser}>Join</button>
      </Link>
   
      </div>
     
    </div>
  )
}

export default Join;
export { user };


