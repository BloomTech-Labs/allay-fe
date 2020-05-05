describe('who user information', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/');
  });

  it('should navigate to user profile after logging in', function () {
    // select elements and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('@emailText').type('testing123@gmail.com');

    cy.get('input[name="password"]').as('passwordText');
    cy.get('@passwordText').type('password');

    cy.get('[data-cy=loginSubmit]').click();
    // wait until pushed to dashboard
    cy.wait(2000);
    cy.url().should('include', 'dashboard');

    cy.get('[data-cy=hamburger]').click();

    cy.wait(2000);
    cy.get('[data-cy=profileLink]').click();

    cy.wait(2000);
    cy.url().should('eq', 'http://localhost:3000/profile/45');
  });

  it('should diplay user profile on profile page', function () {
    // Select element and alias the
    cy.get('#profileNames').should('exist');
  });
});
