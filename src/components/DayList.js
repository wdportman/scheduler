import React from "react";
import DayListItem from "./DayListItem";

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
  },
  {
    id: 4,
    name: "Thursday",
    spots: 2,
  }
];

export default function DayList(props) {
  const days = props.days.map(day => {
    const { id, name, spots} = day;
    return (
      <DayListItem
        key={id}
        name={name}
        spots={spots}
        selected={name === props.day}
        setDay={props.setDay}
      />)
    })
  return (<ul>
    {days}
  </ul>);
}