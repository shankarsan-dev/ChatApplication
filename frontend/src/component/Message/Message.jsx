import React from 'react';
import "../Message/Message.css";

const Message = ({message}) => {
  return (
    <div className='MessageBox Right '>
    {message}
    </div>
  )
}

export default Message
