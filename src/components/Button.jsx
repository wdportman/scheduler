import React from "react";
import classNames from 'classnames';

import "components/styling/Button.scss";

export default function Button(props) {
   const { onClick, disabled, children, confirm, danger } = props;
   const buttonClass = classNames({
     'button': true,
     'button--confirm': confirm,
     'button--danger': danger
  });
  return (
      <button
         className={buttonClass}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
      </button>
   );
}
