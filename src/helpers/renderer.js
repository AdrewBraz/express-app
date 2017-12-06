import React from 'react';
import { renderToString } from 'react-dom/server'
import Routes from '../client/Routes'
import { StaticRouter } from 'react-router-dom';

export default (req) =>{
  const content = renderToString(
    <StaticRouter location={req.path}  context={{}}>
      <Routes/>
    </StaticRouter>
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