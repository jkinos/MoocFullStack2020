import React from 'react'
import {
    BrowserRouter as Router,
} from "react-router-dom"
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';



ReactDOM.render(
    <Provider store={store}>
        <Router>
        <App />
        </Router>
    </Provider>,
    document.getElementById('root'))