import "react-hot-loader/patch";
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import Application from "./components/Application";
import { MuiThemeProvider } from "material-ui/styles";

//
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function(registration) {
    // 登録成功
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    // 登録失敗 :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

ReactDOM.render(
  <AppContainer>
    <MuiThemeProvider>
      <Application />
    </MuiThemeProvider>
  </AppContainer>
  , document.getElementById("app"));