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

const getInterview = (state, interview) => {
  let output = null;
  if (interview) {
    for (const interviewer in state.interviewers) {
      if (state.interviewers[interviewer].id === interview.interviewer) {
        interview.interviewer = state.interviewers[interviewer];
        output = interview;
      }
    }
  }
  return output;
};

export { getAppointmentsForDay, getInterview }