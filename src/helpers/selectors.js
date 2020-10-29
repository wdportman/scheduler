export function getAppointmentsForDay(state, day) {
  let apptIds = [];
  for (const singleDay of state.days) {
    if (singleDay.name === day) {
      apptIds = [...singleDay.appointments]
    }
  }
  const output = [];
  for (const apptId of apptIds) {
    output.push(state.appointments[`${apptId}`]);
  }
  return output;
};