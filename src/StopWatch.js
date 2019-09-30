import React from 'react';
import './StopWatch.css';


const view = (props) => {
  //console.log(model);
  return(<div>{props.model.time} </div>);
}

function App(model) {
  //console.log(view(model));
  return (
    view(model)
  );
}

export default App;
