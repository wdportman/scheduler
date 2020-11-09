import React from "react";
import classNames from 'classnames';

import 'components/styling/DayListItem.scss';

//The below function sets the correct wording for the "spots remaining" based on how many there are.
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
  const {selected, spots, setDay, name} = props;
  const dayListItemClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });
  return (
    <li
      className={dayListItemClass}
      onClick={() => setDay(name)}
      data-testid="day">
        <h2
          className="text--regular">
            {name}
        </h2>
        <h3 className="text--light">
          {formatSpots(spots)}
        </h3>
    </li>
  );
}