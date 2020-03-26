describe('Opens modals with more details on click of review card', function () {
  //Arrange
  it('Visits the Allay site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to Dashboard after login', function () {
    // select element and alias them
    cy.get('input[name="username"]').as('usernameText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with element
    cy.get('@usernameText').type('testuser1');
    cy.get('@passwordText').type('12345678');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
  it('Opens all review card modals on click', function () {
    cy.get('[data-cy=modalCard]').click({ multiple: true, force: true });
  });
});