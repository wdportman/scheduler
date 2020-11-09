import React, {useState} from "react";

import Button from "components/Button.jsx"
import InterviewerList from "components/InterviewerList.jsx"

export default function Form(props) {

  
  const [name, setName] = useState(props.name || "");

  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const [error, setError] = useState("");

  //This function resets the form data (name and interviewer).
  const reset = function() {
    setName("");
    setInterviewer(null);
  }

  //This function is called when the user hits "cancel," and it passes through the above reset function.
  const cancel = function() {
    reset();
    props.onCancel();
  }

  //This function checks to see if a student name is present. If it isn't, it prevents the appointment from being saved and shows the user an error message.
  const validate = function() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else {
      setError("");
    }
    props.onSave(name, interviewer);
  }  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter student name"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}