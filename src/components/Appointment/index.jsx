import React from "react";

import Header from 'components/Appointment/Header.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Show from 'components/Appointment/Show.jsx';

import "../styling/Appointment.scss";

export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {props.interview ?
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
        :
        <Empty />}
    </article>)
}