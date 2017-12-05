import React from 'react';
import Arrow from '../img/arrow.svg';

const scrollBtn = (props) => {
  return(
    <a className={`${props.selector}__btn`}>
      <i className={`${props.selector}__btn-icon`}>
        <svg className="icon-arrow">
          <use xlinkHref= "#arrow"/>
        </svg>
      </i>
    </a>
  )
}

export default scrollBtn;