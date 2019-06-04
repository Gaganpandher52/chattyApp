import React, {Component} from 'react';
import Message from './Message.jsx';



class MessageList extends Component {
    // constructor(props) {
    //     super(props);
    //     // this is the *only* time you should assign directly to state:
    //     this.state = {loading: true};
    //   }
    render() {
      const messages = this.props.newMessages.map(message =>{
          return (<Message username={message.username} content ={message.content}/>);
      });
      return (
        <main className ='messages'>
            {messages}
        </main>
        
      );
    }
  }
  export default MessageList;