import io from "socket.io-client";

let socket = io.connect("http://localhost:3001");

export default socket;