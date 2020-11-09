import React from "react";

import "components/styling/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors.js";
import { useApplicationData } from "../hooks/useApplicationData.js";

export default function Application(props) {

  //The functionality for the application component mostly lives in the useApplicationData hook, imported above. Below, we destructure the object returned by this function to get access to the state object and the three functions listed below.
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  //The below loops through all appointments to render each one.
  const appointments = getAppointmentsForDay(state, state.day).map(appointment => {
    const {id, time} = appointment;
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      //The below code passes props to the appointment component.
    <Appointment
      key={id}
      id={id}
      time={time}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />)
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}