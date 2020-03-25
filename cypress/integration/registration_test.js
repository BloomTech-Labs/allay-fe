describe('Register new user', function() {
  //Arrange
  it('Visits a new site', function() {
    // Act
    cy.visit('http://localhost:3000/signup');
  });
  it('should navigate to Dashboard after submitting', function() {
    // Select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="username"]').as('usernameText');
    cy.get('select[name=track_id').as('track_id');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('input[name="confirmPassword"]').as('confirmPasswordText');
    cy.get('[data-cy=registerSubmit]').as('registerSubmit');
    // interact with element
    cy.get('@emailText').type('testuser@allay.com');
    cy.get('@usernameText').type('testuser1');
    cy.get('@track_id').select('Full Stack Web Development');
    cy.get('@passwordText').type('12345678');
    cy.get('@confirmPasswordText').type('12345678');
    cy.get('@registerSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
});
