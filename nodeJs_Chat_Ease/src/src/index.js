import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { UserStore } from "./Stores/UserStore";
import { MessageStore } from "./Stores/MessageStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const userStore = new UserStore();
const messageStore = new MessageStore();
export const Context = createContext({
  userStore,
  messageStore,
});
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Context.Provider value={{ userStore, messageStore }}>
        <App />
      </Context.Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
