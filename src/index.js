import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import * as Redux from 'redux'

const view = (props) => {
  
    let minutes = Math.floor(props.time/60); 
    let seconds = props.time - (minutes*60);
    let secondsFormatted = `${seconds < 10 ? "0" : ""}${seconds}`;
    let handler = (event) => {
      container.dispatch(props.running?{type:'STOP'}:{type:'START'});
    };
  
    return(
      <div>
        <p>{minutes}:{secondsFormatted}</p>  
        <button onClick={handler}>{props.running?'Stop':'Start'}</button>
      </div>);
  }

  const update = (model={running: false, time:0}, action) => {
    const updates = {
        'TICK': (model) => Object.assign(model, {time:model.time + (model.running?1:0)}),
        'STOP': (model) => Object.assign(model, {running: false}),
        'START': (model)=> Object.assign(model, {running:true})
    };
    return (updates[action.type] || (() => model))(model);
}


let container = Redux.createStore(update);
  
function render(){
    ReactDOM.render(view(container.getState()), document.getElementById('root'));
}

container.subscribe(render);

setInterval(() => {
    container.dispatch({type:'TICK'});
}, 1000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
