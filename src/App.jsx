import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

const message = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
}
class App extends Component {
  
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true};
  }
  render() {
    return (
      <div>
        <ChatBar username = {message.currentUser.name}/>
      </div>
      
    );
  }
}
export default App;

