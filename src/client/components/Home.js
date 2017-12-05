import React from 'react';
import Wrapper from './Wrapper';
import Footer from './Footer';
import Nav from './Nav';

const Home = () => {
  return(
    <div>
      <Nav/>
      <Wrapper selector='about' header='About' text='This app is build for everyone'/>
      <Wrapper selector='content' header='Content' text='Search news. Learn history. Get stats'/>
      <Wrapper selector='Note' header='Note' text='SMTH'/>
      <Footer/>
    </div>
  )
}

export default Home;