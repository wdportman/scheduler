import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  //This test makes sure the student name field is blank if it's not been passed to the component.
  it("renders without student name if not provided", () => {
    const {getByPlaceholderText} = render(<Form 
      interviewers={interviewers}
    />);
    expect(getByPlaceholderText(/enter student name/i)).toHaveValue("");
  });


  //This test makes sure the student name field displays the correct name if a name has been passed to the component.
  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form 
      interviewers={interviewers}
      name="Lydia Miller-Jones"
    />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });
  

  //This test makes sure that, after an error message is displayed for not entering a student name, the appointment can later be saved once a name is entered.
  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });


  //This test makes sure that canceling an edit operation performs as expected.
  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText(/enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText(/enter student name/i)).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });  
});