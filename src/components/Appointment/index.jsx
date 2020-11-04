import React from "react";

import Header from 'components/Appointment/Header.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Show from 'components/Appointment/Show.jsx';
import Form from 'components/Appointment/Form.jsx';
import Status from 'components/Appointment/Status.jsx';
import Confirm from 'components/Appointment/Confirm.jsx';
import Error from 'components/Appointment/Error.jsx';

import "../styling/Appointment.scss";

import { useVisualMode } from "../../hooks/useVisualMode.js";

export default function Appointment(props) {

  const { id, interview, time, interviewers, bookInterview, cancelInterview} = props;

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM_CANCEL = "CONFIRM_CANCEL";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy() {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  function confirmDelete() {
    transition(CONFIRM_CANCEL);
  }

  function edit() {
    transition(EDIT)
  }
  
  return (
    <article className="appointment" data-testid="appointment">
      <Header
        time={time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && (
        <Status
        message="Saving"
        />
      )}
      {mode === DELETING && (
        <Status
        message="Deleting"
        />
      )}
      {mode === CONFIRM_CANCEL && (
        <Confirm
        message="Are you sure you want to delete this appointment?"
        onCancel={() => back()}
        onConfirm={destroy}
        />
      )}
      {mode === EDIT && (
        <Form
        interviewers={interviewers}
        onSave={save}
        onCancel={() => back()}
        name={interview.student}
        interviewer={interview.interviewer.id}
      />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message="Oops! There was an error saving your appointment."
        onClose={() => back()}
      />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message="Oops! There was an error deleting your appointment."
        onClose={() => back()}
      />
      )}
    </article>)
}