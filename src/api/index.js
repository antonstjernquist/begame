// api/index.js
import openSocket from 'socket.io-client';
const socket = openSocket('https://stark-ocean-61611.herokuapp.com/api/');

function connect(cb) {
  socket.on('chat', (message) => {
    console.log(message)
    cb(message);
  })
}

export { connect }
