import React from "react";
import ReactDOM from "react-dom";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import App from "./App";
import { createStore } from "redux";
import { state } from "./Redux/store";
import { Provider } from "react-redux";

import './public/i18next';

const store = createStore(state);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("root"));

