import "react-hot-loader/patch";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Application from "./components/Application";

ReactDOM.render(<AppContainer><Application /></AppContainer>, document.getElementById("app"));