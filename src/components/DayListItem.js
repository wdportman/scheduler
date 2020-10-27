import React from "react";
import classNames from 'classnames';

import 'components/DayListItem.scss';

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
          {props.spots}
        </h3>
    </li>
  );
}


// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"