import React, { useState } from 'react';
import "./join.css";
const Join = () => {
const [name, setName] = useState("");

const handleClick = ()=>{
  alert("Joining room "+name);
}
  return (
    
    <div className='JoinPage'>
      <div className="JoinContainer">

      <h1>Join Page</h1>
      </div>
      <input type="text" placeholder='Your Name' onChange={(e)=>e.target.value}/>
      <button onClick={handleClick}>Join</button>
    </div>
  )
}

export default Join
