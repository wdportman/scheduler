import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

import "components/styling/InterviewerList.scss";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
    const {id, name, avatar } = interviewer;
    return (
      <InterviewerListItem
        key = {id}
        name = {name}
        avatar = {avatar}
        selected = {id === props.value}
        setInterviewer={(event) => props.onChange(id)}
        />);
  });
  return (
    <>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};