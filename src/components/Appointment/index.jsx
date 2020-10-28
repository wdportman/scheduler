import React, {Fragment} from "react";

import Header from 'components/Appointment/Header.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Show from 'components/Appointment/Show.jsx';

import "../styling/Appointment.scss";

export default function Appointment(props) {
  return (
    <>
      <Header
        time={props.time}
      />
      {props.interview ? <Show /> : <Empty />}
    </>
  )
}