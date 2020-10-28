import React from "react";
import classNames from 'classnames';

import 'components/styling/DayListItem.scss';

const formatSpots = function(num) {
  if (num === 0) {
    return `no spots remaining`;
  }
  if (num === 1) {
    return `${num} spot remaining`;
  }
  if (num > 1) {
    return `${num} spots remaining`;
  }
};

export default function DayListItem(props) {
  const dayListItemClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  });
  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}>
        <h2
          className="text--regular">
            {props.name}
        </h2>
        <h3 className="text--light">
          {formatSpots(props.spots)}
        </h3>
    </li>
  );
}