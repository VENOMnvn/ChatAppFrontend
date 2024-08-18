import React from 'react'
const Message = (props) => {
  
  return (<div className={props.owner ? "right-message message":"left-message message"}>
                <div className='message-content'>
                    <p>{props.msg?.msg}</p>
                    <span>
                      {
                        // props.owner ? 
                        // props.msg.isSeen  ? "Seen" : "Unseen" 
                        // :""
                      }
                    </span>
                </div>                
         </div>
  )
}

export default Message