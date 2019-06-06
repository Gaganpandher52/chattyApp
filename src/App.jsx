import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true,
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
       
      ]}; 
  }
  onSubmit = evt => {
      evt.preventDefault();
      
      const newM = evt.target.elements.newinput;
      const user = evt.target.elements.user;
      const oldMessages = this.state.messages;
      const newMess = {
        username: user.value,
        content: newM.value
      }
      const newMessage = [
            ...oldMessages,
            newMess
          ];
     
      this.setState({ messages: newMessage });
      newM.value = "";
      this.socket.send(JSON.stringify(newMess));
      
    };
componentDidMount() {
  console.log("componentDidMount <App />");
  
  this.socket = new WebSocket("ws://localhost:3001/")
  
  this.socket.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected to the server')
    
  }
  this.socket.onmessage = (event) => {
    
    // code to handle incoming message
  }
}
  render() {
    return (
      <div>
        <MessageList newMessages = {this.state.messages}/>
        <ChatBar  username = {this.state.currentUser.name} newMessage = {this.onSubmit} />
        
      </div>
      
    );
  }
}
export default App;

