import React, {Component} from 'react';

function ChatBar(props) {
    
    return (
        
        <footer className="chatbar">
       
        <input id = 'chatbar-user' className="chatbar-username"  name ='user' placeholder="Your Name (Optional)" defaultValue={props.username}onKeyPress ={props.newChange} />
        <input className="chatbar-message" id = 'chatbar-msg' name ='newinput' placeholder="Type a message and hit ENTER" onKeyPress ={props.newMessage} />
        
        </footer>
        
        
        
        
    );
}
export default ChatBar;
