import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import StopWatch from './StopWatch';
import * as serviceWorker from './serviceWorker';

const model={
    running: false,
    time: 0
  }

ReactDOM.render(<StopWatch model={model}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
