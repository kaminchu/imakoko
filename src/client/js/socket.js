// @flow
import io from "socket.io-client";
import baseUrl from "./baseUrl";

let socket = io.connect(baseUrl);

export default socket;