const sockets = (io) => {
    io.sockets.on("connection", (socket) => {
        socket.on("id?", () => {
            const mapId = socket.id;
            socket.on(mapId, (pos) => {
                io.emit(mapId, pos);
            });
            io.to(socket.id).emit("getId", socket.id);
        });
    });
};

export default sockets;