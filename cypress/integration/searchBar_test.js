describe('Returns with empty search if company not found', function () {
  //Arrange
  it('Visits the Allay site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to Dashboard after login', function () {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('[data-cy=loginSubmit]').as('loginSubmit');
    // interact with element
    cy.get('@emailText').type('testing123@gmail.com');
    cy.get('@passwordText').type('12345678');
    cy.get('@loginSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
  it('returns with no reviews on unsuccessful search', function () {
    cy.get('input[name="searchbar"]').type('fgkjhieahggdsafevca');
    cy.contains('Sorry, no job reviews found.');
  });
});
