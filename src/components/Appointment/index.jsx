import React from "react";

import Header from 'components/Appointment/Header.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Show from 'components/Appointment/Show.jsx';
import Form from 'components/Appointment/Form.jsx';

import "../styling/Appointment.scss";

import { useVisualMode } from "../../hooks/useVisualMode.js";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          // onSave={action('onSave')}
          onCancel={() => back()}
        />
      )}    
    </article>)
}