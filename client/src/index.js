import React from "react";
import ReactDOM from "react-dom/client";
import Register from "./Components/Register";
import { store } from "./Store/store";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./App.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  
    <Provider store={store}>
      <App />
    </Provider>
  
</React.StrictMode>
);
