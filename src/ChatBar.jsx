import React, {Component} from 'react';

function ChatBar(props) {
    
    return (
        <form onSubmit ={props.newMessage}>
        <footer className="chatbar">
        <input className="chatbar-username"  name ='user' placeholder="Your Name (Optional)" defaultValue={props.username} />
        <input className="chatbar-message" name ='newinput' placeholder="Type a message and hit ENTER"  />
        <button type='submit'></button>
        </footer>
        </form>
    );
}
export default ChatBar;
