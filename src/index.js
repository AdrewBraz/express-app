import express from 'express'
import React from 'react';
import { renderToString } from 'react-dom/server'
import Home from './client/components/Home'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  const html = 
  `<html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    </head>
    <body>
    <div id='root'></div>
    <script src="bundle.js"></script>
    </body>
  </html>
  `

  res.send(html)
})

app.listen(3000, () => {
  console.log(`App is running on port 3000`)
})