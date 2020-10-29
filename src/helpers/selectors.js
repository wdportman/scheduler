export function getAppointmentsForDay(state, day) {
  if (!state.days[0]) {
    return [];
  }
  let apptIds = [];
  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      apptIds = [...singleDay.appointments]
    }
  }
  const output = [];
  const appointmentKeys = Object.keys(state.appointments);
  for (const apptId of apptIds) {
    for (const appointmentKey of appointmentKeys) {
      if (state.appointments[appointmentKey].id === apptId) {
        output.push(state.appointments[appointmentKey]);
      }
    }
  }
  return output;
};