import express from "express";
import http from "http";
import path from "path";
import socketio from "socket.io";
import sockets from "./socket";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);

// 静的ファイル
app.use(express.static(path.join(process.cwd(), "public")));


// socketioまわり
sockets(socketio(server));


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});