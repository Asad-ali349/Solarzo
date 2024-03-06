import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from './Redux/store.js'

const Root = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <App/>
      </Provider>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
reportWebVitals();
