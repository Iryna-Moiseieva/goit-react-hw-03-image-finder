import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({onClick}) => { 
  return (
    <button
      className={s['button']}
      type="button"
      onClick={ onClick}
    >Load more
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
}

export default Button;