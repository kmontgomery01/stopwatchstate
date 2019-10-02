import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import StopWatch from './StopWatch';
import * as serviceWorker from './serviceWorker';

const view = (props) => {
    //console.log(props);
    //let clone = Object.assign({}, props);
  
    let minutes = Math.floor(props.time/60);
    let seconds = props.time - (minutes*60);
    let secondsFormatted = `${seconds < 10 ? "0" : ""}${seconds}`;
    let handler = (event) => {
      //clone.model=clone.model.update(clone.model, clone.model.running?'STOP':'START');
      container.dispatch(props.running?'STOP':'START');
    };
  
    return(
      <div>
        <p>{minutes}:{secondsFormatted}</p> 
        <button onClick={handler}>{props.running?'Stop':'Start'}</button>
      </div>);
  }
  
  const createStore =(reducer) =>{
    let internalState;
    let handlers = [];
    return {
      dispatch: (intent) => {
        internalState = reducer(internalState, intent);
        handlers.forEach(h=>{h();});
      },
      subscribe: (handler) => {
        handlers.push(handler);
      },
      getState: ()=>internalState
    }
  }
  

  const update = (model={running: false, time:0}, intent) => {
    const updates = {
        'TICK': (model) => Object.assign(model, {time:model.time + (model.running?1:0)}),
        'STOP': (model) => Object.assign(model, {running: false}),
        'START': (model)=> Object.assign(model, {running:true})
    };
    return (updates[intent] || (() => model))(model);
}

  let container = createStore(update);
  
  let intents = {
    TICK: 'TICK', 
    START: 'START',
    STOP: 'STOP', 
    RESET: 'RESET'
  };
  
  
 /* function App(model) {
    //console.log(view(model));
    return (
      view(model)
    );
  }*/
  
  //export default App;


/*let model={
    running: false,
    time: 0,
    update: update
  }*/

function render(){
    //ReactDOM.render(<StopWatch model={model}/>, document.getElementById('root'));
    ReactDOM.render(view(container.getState()), document.getElementById('root'));
}

container.subscribe(render);

setInterval(() => {
    //model=update(model,'TICK');
    //render();
    container.dispatch('TICK');
}, 1000);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
