import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  //The below code loops through the days array to render each day as a DayListItem.
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