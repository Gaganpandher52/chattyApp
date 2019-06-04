import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {loading: true};
  }
  render() {
    return (
      <div>
        <ChatBar/>
      </div>
      
    );
  }
}
export default App;

