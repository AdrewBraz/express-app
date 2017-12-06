import React from 'react';
import Menu from '../img/menu.svg'
import { NavLink } from 'react-router-dom'

const nav = () => {
  return(
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-list__item">
        <NavLink to="/about">About</NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink to="/profile">Profile</NavLink>
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