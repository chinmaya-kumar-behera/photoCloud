import { BUTTON } from '@/constant/button.constant';
import classNames from 'classnames';
import React from 'react'

const Button = ({ className, children, size = "md", rounded = "rounded", onClick }) => {

  const defaultStyle = "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
  const styles = classNames(defaultStyle, className, BUTTON.SIZE[size], rounded);

  return (
    <button className={styles} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button