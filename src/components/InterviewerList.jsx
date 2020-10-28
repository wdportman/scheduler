import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/styling/InterviewerList.scss";

export default function IntervewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    const {id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        key = {id}
        name = {name}
        avatar = {avatar}
        selected = {id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(id)}
        />);
  });
  return (
    <>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </>
  )
}