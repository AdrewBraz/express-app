import React from 'react';
import ReactDom from 'react-dom';
import Home from './components/Home';
import style from './style/style.styl'

ReactDom.hydrate(<Home />, document.getElementById('root'))