const connection = (socket) => {
  console.log('a user connected');
  socket.on('sendMessage', (msg) => {
    console.log('message: ' + msg);
  });
};
module.exports = connection;