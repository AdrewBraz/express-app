import React from 'react';
import Twitter from '../img/twitter.svg'
import Instagram from '../img/instagram.svg'
import Facebook from '../img/facebook.svg'
import Dribble from '../img/dribbble.svg'


const footer = () => {
  return(
    <footer className="page-footer">
      <ul className="page-footer__socials">
        <li className="page-footer__socials-item">
          <a href="">
            <i className="socials-icon">
              <svg className="twitter">
                <use xlinkHref="#twitter"/>
              </svg>
            </i>
          </a>
        </li>
        <li className="page-footer__socials-item">
          <a href="">
            <i className="socials-icon">
              <svg className="instagram">
                <use xlinkHref="#instagram"/>
              </svg>
            </i>
          </a>
        </li>
        <li className="page-footer__socials-item">
          <a href="">
            <i className="socials-icon">
              <svg className="dribble">
                <use xlinkHref="#dribbble"/>
              </svg>
            </i>
          </a>
        </li>
        <li className="page-footer__socials-item">
          <a href="">
            <i className="socials-icon">
              <svg className="facebook">
                <use xlinkHref="#facebook"/>
              </svg>
            </i>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default footer;