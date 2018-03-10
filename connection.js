const connection = (io) => (socket) => {
  socket.on('id?', () => {
    const mapId = socket.id;
    socket.on(mapId, (pos) => {
      io.emit(mapId, pos);
    });
    io.to(socket.id).emit("getId", socket.id);
  });
};

module.exports = connection;