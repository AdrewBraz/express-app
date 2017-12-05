import React from 'react';
import Menu from '../img/menu.svg'

const nav = () => {
  return(
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          <a href="">Home</a>
        </li>
        <li className="nav-list__item">
          <a href="">About</a>
        </li>
        <li className="nav-list__item">
          <a href="">Profile</a>
        </li>
        <li className="nav-list__item">
          <a href="">Login</a>
        </li>
      </ul>
      <i className="main-nav__icon">
        <svg className="icon-menu">
          <use xlinkHref="#menu"/>
        </svg>
      </i>
    </nav>  
  )
}

export default nav;