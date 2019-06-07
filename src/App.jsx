import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true,
      currentUser : 'Anynomouse', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
       
      ]}; 
      
  }
  onSubmit = evt => {
    
      if(evt.key =='Enter'){
        const messageI = document.getElementById('chatbar-msg')
        const msg = messageI.value;
      
      // const newM = evt.target.elements.currentUser;
      // const user = evt.target.elements.user;
      const oldMessages = this.state.messages;
      const username1 = this.state.currentUser;
      //const nameChange = evt.target.elemtent.user//new
      
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
      // this.socket.send(JSON.stringify(newChange));
        }
    };

 onChange = evt =>{

    if(evt.key =='Enter'){
    // const userq = evt.target.elements.user;
    const nameInput = document.getElementById('chatbar-user');
	  const newUserName = nameInput.value;
    const newMessage = (this.state.currentUser + " changed the username to " + newUserName);
    const newChange = {
      type: 'postNotification',
      content:newMessage
    }
  this.socket.send(JSON.stringify(newChange));
  this.setState({ currentUser: newUserName });
  }

}

  componentDidMount() {
  console.log("componentDidMount <App />");
  
  this.socket = new WebSocket("ws://localhost:3001/")
  
  this.socket.onopen = () => {
    // on connecting, do nothing but log it to the console
    console.log('connected to the server')
    
  }
  this.socket.onmessage = (event) =>{
    console.log(event.data)
    const obj = JSON.parse(event.data);
    if(obj.type ==='incomingMessage'){
    
    const newMessage ={
      id:obj.id,
      username:obj.username,
      content:obj.content
    }
    this.setState({messages:[...this.state.messages, newMessage]})
    return 
    // return
  }
    
    if(obj.type ==='counter'){
      const obj = JSON.parse(event.data);
   
      this.setState({counter:obj.size})
      return
    }
    }

  }//component
  
  render() {
    return (
      <div>
        <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p>{this.state.counter} users Online</p>
      </nav>
        <MessageList newMessages = {this.state.messages}/>
        <ChatBar  username = {this.state.currentUser} newMessage = {this.onSubmit} newChange = {this.onChange} />
        
      </div>
      
    );
  }
}
export default App;

