describe('Logs into the site', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });

  before(() => {
    cy.adminLogin();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should navigate to Dashboard after submitting.', function () {
    cy.visit('http://localhost:3000/dashboard');
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
});

describe('Logs into the site', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/');
  });
  it('should remain at login after submitting false credentials.', function () {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with element
    cy.get('@emailText').type('haase1020@gmail.com');
    cy.get('@passwordText').type('passwordddd');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/');
    });
  });
});
