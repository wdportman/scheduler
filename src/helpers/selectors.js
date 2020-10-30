const getAppointmentsForDay = (state, day) => {
  let apptIds = [];
  const output = [];
  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      apptIds = [...singleDay.appointments]
    }
  }
  if (state.appointments) {
    const appointmentKeys = Object.keys(state.appointments);
    for (const apptId of apptIds) {
      for (const appointmentKey of appointmentKeys) {
        if (state.appointments[appointmentKey].id === apptId) {
          output.push(state.appointments[appointmentKey]);
        }
      }
    }
  }
  return output;
};


const getInterviewersForDay = (state, day) => {
  let intIds = [];
  let output = [];
  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      intIds = [...singleDay.interviewers]
    }
  }
  if (state.interviewers) {
    const interviewerKeys = Object.keys(state.interviewers);
    for (const intId of intIds) {
      for (const interviewerKey of interviewerKeys) {
        if (state.interviewers[interviewerKey].id === intId) {
          output.push(state.interviewers[interviewerKey]);
        }
      }
    }
  }
  return output;
};


const getInterview = (state, interview) => {
  let output = {};
  if (!interview) {
    return null;
  }
  output.student = interview.student;
  output.interviewer = {id: interview.interviewer};
  for (const interviewer in state.interviewers) {
    if (state.interviewers[interviewer].id === interview.interviewer) {
      output["interviewer"] = {...output.interviewer, name: state.interviewers[interviewer].name};
      output["interviewer"] = {...output.interviewer, avatar: state.interviewers[interviewer].avatar};
    }
  }
  return output;
}

export { getAppointmentsForDay, getInterviewersForDay, getInterview }