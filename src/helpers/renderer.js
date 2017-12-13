import React from 'react';
import { renderToString } from 'react-dom/server'
import Routes from '../client/Routes'
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'redux';

export default (req, store) =>{
  const content = renderToString(
    <Provider store={ store }>
      <StaticRouter location={req.path}  context={{}}>
        <Routes/>
      </StaticRouter>
    </Provider>  
  );

  return (
  `<html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel='stylesheet' href='styles.css' >
    </head>
    <body>
    <div id='root'>${content}</div>
    <script src="bundle.js"></script>
    </body>
  </html>
  `)
}