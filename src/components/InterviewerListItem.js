import React from 'react';
import classNames from 'classnames';

import "components/styling/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const InterviewerListItemClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': selected
  });
  return (
    <li className={InterviewerListItemClass}
    onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}