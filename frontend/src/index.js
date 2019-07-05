import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import configureStore from './store/store';
import './index.css';
import './reset.scss';

let store = configureStore();

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);

window.getState = store.getState;
// fetchAllPatients().then(res => console.log(res))