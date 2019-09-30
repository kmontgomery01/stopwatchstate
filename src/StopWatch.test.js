import React from 'react';
import ReactDOM from 'react-dom';
import StopWatch from './StopWatch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StopWatch />, div);
  ReactDOM.unmountComponentAtNode(div);
});
