import { useState, useEffect } from "react";
import axios from 'axios';

const useApplicationData = () => {

  //The below manages state for the application. We pass it some initial values in the format we need:
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  //The below sets the state after getting data from the scheduler API via HTTP Axios requests.
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('/api/days')),
      Promise.resolve(axios.get('/api/appointments')),
      Promise.resolve(axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, []);

  const setDay = (day) => setState({ ...state, day });

  //The below dynamically updates the number of spots remaining for each day, based on appointments data from the scheduler API:
  const updateSpots = (day, days, appointments) => {
    const currentDay = days.find((anyDay) => anyDay.name === day);
    const currentAppts = currentDay.appointments;
    let spots = 0;
    for (const currentAppt of currentAppts) {
      if (!appointments[currentAppt].interview) {
        spots++;
      }
    }
    currentDay.spots = spots;
  };

  //The below updates the database, updates state, and updates the "spots remaining" function above when a new interview is booked.
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        updateSpots(state.day, state.days, appointments);
        setState({...state, appointments})
      })
  };

  //The below updates the database and the state when an interview is canceled/deleted:
  function cancelInterview(id) {
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        state.appointments[id].interview = null;
        updateSpots(state.day, state.days, state.appointments);
        setState({ ...state, appointments: state.appointments, days: state.days });
        })
  };

  return { state, setDay, bookInterview, cancelInterview };
};

export { useApplicationData }