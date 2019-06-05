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
        {
          id:1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id:2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]}; 
  }
  // onSubmit = evt => {
  //   evt.preventDefault();
  //   const newM = evt.target.elements.newinput;
  //   const user = evt.target.elements.user;
  //   const oldMessages = this.state.messages;
  //   const newMessage = [
  //     ...oldMessages,
  //     {
  //       username: user.value,
  //       content: newM.value
  //     }
  //   ];
  //   this.setState({ messages: newMessage });
  //   newM.value = "";
  // };
  // in App.jsx
  onSubmit = evt => {
      evt.preventDefault();
      
      const newM = evt.target.elements.newinput;
      const user = evt.target.elements.user;
      const oldMessages = this.state.messages;
      const newMessages = [
        ...oldMessages,
        newMessages
      ];
      const newMessage = 
        {
          username: user.value,
          content: newM.value
        }
      this.setState({ messages: newMessage });
      newM.value = "";
      this.socket.send(`User: ${newMessage.username} said ${newMessage.content} `)
      
    };
componentDidMount() {
  console.log("componentDidMount <App />");
  
  this.socket = new WebSocket("ws://localhost:3001/")
  
  this.socket.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected to the server')
    
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

