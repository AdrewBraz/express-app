import React from 'react';
import ReactDom from 'react-dom';
import Routes from './Routes';
import{ BrowserRouter } from 'react-router-dom';
import style from './style/style.styl';

ReactDom.hydrate(
  <BrowserRouter>
    <Routes/>
  </BrowserRouter>
  , document.getElementById('root'))