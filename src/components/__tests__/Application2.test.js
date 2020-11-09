//NOTE: I split Application tests into two files, Application.test.js and Application2.test.js. Some tests were failing apparently because the state and/or DOM was changed in one test and not cleaned up before the following test despite using "afterEach(cleanup)." After lots of googling, I debugged this with a mentor for a while. After 2+ hours, in the interest of time, the simplest solution to get the tests to work ended up being to split the tests into two files.

import React from "react";

//The below is to import the mock Axios library from the __mocks__ folder:
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  //This test ensures the app performs correctly when an existing interview appointment is edited.
  it("loads data, edits an interview, and keeps the spots remaining for Monday the same", async () => {

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Will Portman" }
    });

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Will Portman"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(queryByText(day, "1 spot remaining")).toBeInTheDocument();
  });


  //This test makes sure the user is shown an error message when an error occurs upon saving an appointment.
  it("shows the save error when failing to save an appointment", async () => {

    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Oops! There was an error saving your appointment."));
    expect(getByText(appointment, "Oops! There was an error saving your appointment.")).toBeInTheDocument();

  });


  //This test makes sure the user is shown an error message when an error occurs upon deleting an appointment.
  it("shows the save error when failing to delete an appointment", async () => {

    axios.delete.mockRejectedValueOnce();
    
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Oops! There was an error deleting your appointment."));
    expect(getByText(appointment, "Oops! There was an error deleting your appointment.")).toBeInTheDocument();


  });

});