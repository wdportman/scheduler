//Test of appointments card functionality

describe("Appointments", () => {

  //This "beforeEach" resets the database and returns to the "Monday" view before each test runs:
  beforeEach(()=> {
    cy.request("GET","http://localhost:8001/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");
  });

  //This test is for booking an interview: Typing in a name, selecting an interviewer, and hitting "save."
  it("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get('[data-testid=student-name-input]')
      .type("Lydia Miller-Jones");

    cy.get('[alt="Sylvia Palmer"')
      .click();

    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  //This test is for editing an existing interview: Editing the name, selecting a different interviewer, and hitting "save."
  it("should edit an interview", () => {

    cy.get("[alt=Edit]")
      .click({force: true});

    cy.get('[data-testid=student-name-input]')
      .clear()
      .type("Will Portman");

    cy.get('[alt="Tori Malcolm"')
      .click();

    cy.contains("Save")
      .click();
    
    cy.contains(".appointment__card--show", "Will Portman");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  //This test is for deleting an existing interview, and ensuring that the deletion occurs.
  it("should delete an interview", () => {

    cy.get("[alt=Delete]")
      .click({force: true});

    cy.contains("Confirm")
      .click();
    
    cy.contains("Deleting")
      .should("exist");
    cy.contains("Deleting")
      .should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
    
  });

});