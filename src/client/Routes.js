import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import Nav from './components/Nav'
import Footer from './components/Footer'
import About from './components/About'

export default () => {
  return(
    <div>
      <Nav />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Footer />
    </div>
  )
};