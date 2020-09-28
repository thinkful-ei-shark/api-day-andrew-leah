import React from 'react';
import ReactDom from "react-dom";
import './index.css';
import STORE from './store';
import App from './App'



ReactDom.render(<App store={STORE} />, document.getElementById('root'));