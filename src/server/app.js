import express from "express";
import http from "http";
import path from "path";
import Bundler from "parcel-bundler";
import socketio from "socket.io";
import sockets from "./socket";

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.Server(app);

// 静的ファイル
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "public")));
} else {
    const bundler = new Bundler(path.join(process.cwd(), "src/client/index.html"));
    app.use(bundler.middleware());
}



// socketioまわり
sockets(socketio(server));


server.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});