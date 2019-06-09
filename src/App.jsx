//importing react and other components
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// parent contonent login
class App extends Component {
  constructor(props) {
    super(props);
    //setting the state
    this.state = {loading: true,
      currentUser : 'Anonymous',
      messages: [
      ]}; 
  }
  // onSubmit method runs when pressing enter on content field
  onSubmit = evt => {
    //initialize the event on enter
    if(evt.key =='Enter'){
      const messageI = document.getElementById('chatbar-msg')
      const msg = messageI.value;
      const oldMessages = this.state.messages;
      const username1 = this.state.currentUser;
    
      const newMess = {
        type:'postMessage',
        username: username1,
        content: msg
      }
      const newMessage = [
            ...oldMessages,
            newMess
          ];
      messageI.value = "";
      this.socket.send(JSON.stringify(newMess));
    }//if
  }
  // onChange method runs when pressing enter on name field
  onChange = evt =>{
    if(evt.key =='Enter'){
      const nameInput = document.getElementById('chatbar-user');
      const newUserName = nameInput.value;
      const notification = (this.state.currentUser + " changed the username to " + newUserName);
      const newChange = {
        type: 'postNotification',
        content:notification
      }
      this.socket.send(JSON.stringify(newChange));
      this.setState({ currentUser: newUserName });
    }//if
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001/")

    this.socket.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected to the server')
    }

    this.socket.onmessage = (event) =>{
      //console.log(event.data)
      const info = JSON.parse(event.data);
      //checks for message or incoming/notification
      if(info.type ==='incomingMessage' || info.type ==='incomingNotification'){
        const newMessage ={
          id:info.id,
          username:info.username,
          content:info.content,
        }
        this.setState({messages:[...this.state.messages, newMessage]})
        return 
      }//if
      if(info.type ==='counter'){
        
        this.setState({counter:info.size})
        return
      }//if
    }//onmessage
  }//component
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p>{this.state.counter} users Online</p>
        </nav>
        <MessageList newMessages = {this.state.messages} />
        <ChatBar username = {this.state.currentUser} newMessage = {this.onSubmit} newChange = {this.onChange} />
      </div>
    );
  }
}//App
export default App;

