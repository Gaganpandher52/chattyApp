const express = require('express');
const SocketServer = require('ws').Server;
const uid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//runs on connection
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach(client => {
    client.send(JSON.stringify({type:'counter',size:wss.clients.size}))
  });

  //runs logic on incoming message/notification
  ws.on('message',(event) => {
    const message = JSON.parse(event);
    message.id = uid();
    message.type = message.type.replace('post', 'incoming')
    console.log(JSON.stringify(message));
    wss.clients.forEach(client => {
      client.send(JSON.stringify(message));
    });
});//ws messages

// Set up a callback for when a client closes the socket. This usually means they closed their browser.
ws.on('close', () => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify({type:'counter',size:wss.clients.size}))
    });
  console.log('Client disconnected')
  });
});//wss connections




