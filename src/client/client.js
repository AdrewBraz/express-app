import React from 'react';
import ReactDom from 'react-dom';
import Routes from './Routes';
import{ BrowserRouter } from 'react-router-dom';
import style from './style/style.styl';
import store from './store';
import { Provider } from 'react-redux';

ReactDom.hydrate(
  <Provider store={ store }>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))