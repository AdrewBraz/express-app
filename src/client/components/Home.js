import React from 'react';
import Wrapper from './Wrapper';

const Home = () => {
  return(
    <div>
      <Wrapper selector='about' header='About' text='This app is build for everyone'/>
      <Wrapper selector='content' header='Content' text='Search news. Learn history. Get stats'/>
      <Wrapper selector='Note' header='Note' text='SMTH'/>
    </div>
  )
}

export default Home;