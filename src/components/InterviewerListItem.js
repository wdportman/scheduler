import React from 'react';
import classNames from 'classnames';

import "components/styling/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  return (
    <li className="interviewers__item">
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {name}
    </li>
  );
}