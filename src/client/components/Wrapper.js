import React from 'react';
import ScrollBtn from './ScrollBtn'

const wrapper = (props) => {
  return(
    <section className={props.selector}>
      <div className={`${props.selector}__container`}>
        <div className={`${props.selector}__content`}>
          <h2 className={`${props.selector}__section-header`}> {props.header} </h2>
          <p className={`${props.selector}__section-text`}> {props.text} </p>
        </div>
        <ScrollBtn selector={props.selector} />
      </div>
    </section>
  )
}

export default wrapper;