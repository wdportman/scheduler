import React, {Fragment} from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button.jsx";
import DayListItem from "components/DayListItem.jsx";
import DayList from "components/DayList.jsx";
import InterviewerListItem from 'components/InterviewerListItem.jsx';
import InterviewerList from 'components/InterviewerList.jsx';
import Appointment from 'components/Appointment/index.jsx';
import Header from 'components/Appointment/Header.jsx';
import Empty from 'components/Appointment/Empty.jsx';
import Show from 'components/Appointment/Show.jsx';
import Confirm from "components/Appointment/Confirm.jsx";
import Status from "components/Appointment/Status.jsx";
import Error from "components/Appointment/Error.jsx";
import Form from "components/Appointment/Form.jsx";

const darkBackground = {backgrounds: [{ name: "dark", value: "#222f3e", default: true }]};

const lightBackground = {backgrounds: [{ name: "white", value: "#fff", default: true }]};

storiesOf("Button", module)
  .addParameters(darkBackground)
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

storiesOf("DayListItem", module)
    .addParameters(darkBackground)
    .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
    .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
    .add("Full", () => <DayListItem name="Monday" spots={0} />)
    .add("Clickable", () => (
      <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
    ));

    
//Days data to be used in rendering DayList item below it:    
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  }
];

storiesOf("DayList", module)
  .addParameters(darkBackground)
  .add("Monday", () => (
    <DayList days={days} day={"Monday"} setDay={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));


//Interviewer data to be used in rendering InterviewerListItem below it:
const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};
  
storiesOf("InterviewerListItem", module)
  .addParameters(darkBackground)
  .add("Unselected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={event => action("setInterviewer")(interviewer.id)}
    />
  ));
  

//Interviewers data to be used in rendering InterviewerList below it:
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

storiesOf("InterviewerList", module)
  .addParameters(darkBackground)
  .add("Initial", () => (
    <InterviewerList
      interviewers={interviewers}
      onChange={action("setInterviewer")}
    />
  ))
  .add("Preselected", () => (
    <InterviewerList
      interviewers={interviewers}
      value={3}
      onChange={action("setInterviewer")}
    />
  ));

storiesOf("Appointment", module)
  .addParameters(lightBackground)
  .add("Appointment", () => <Appointment />)
  .add("Appointment with time", () => <Appointment 
    time='12pm'
  />)
  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="12pm" />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="12pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment id="last" time="1pm" />
    </Fragment>
  ))
  .add("Header", () => <Header 
    time='12pm'
  />)
  .add("Empty", () => <Empty
    onAdd ={action('onAdd')}
  />)
  .add("Show", () => <Show
    student = 'Lydia Miller-Jones'
    interviewer = {interviewer.name}
    onEdit = {action('onEdit')}
    onDelete = {action('onDelete')}
  />)
  .add("Confirm", () => <Confirm
    message = "Delete the appointment?"
    onConfirm = {action('onConfirm')}
    onCancel = {action('onCancel')}
  />)
  .add("Saving", () => <Status
    message="Saving"
  />)
  .add("Deleting", () => <Status
    message="Deleting"
  />)
  .add("Error Saving", () => <Error
    message="Could not save appointment"
    onClose={action('onClose')}
  />)
  .add("Error Deleting", () => <Error
    message="Could not delete appointment"
    onClose={action('onClose')}
  />)
  .add("Edit", () => <Form
    name="Will Portman"
    interviewers={interviewers}
    interviewer={1}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />)
  .add("Create", () => <Form
    interviewers={interviewers}
    onSave={action('onSave')}
    onCancel={action('onCancel')}
  />)