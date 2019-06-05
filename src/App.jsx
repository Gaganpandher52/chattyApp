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
  onSubmit = evt => {
    evt.preventDefault();
    const newM = evt.target.elements.newinput;
    const user = evt.target.elements.user;
    const oldMessages = this.state.messages;
    const newMessage = [
      ...oldMessages,
      {
        username: user.value,
        content: newM.value
      }
    ];
    this.setState({ messages: newMessage });
    newM.value = "";
  };
  // in App.jsx
componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
      <div>
        <MessageList newMessages = {this.state.messages}/>
        <ChatBar username = {this.state.currentUser.name} newMessage = {this.onSubmit}/>
        
      </div>
      
    );
  }
}
export default App;

