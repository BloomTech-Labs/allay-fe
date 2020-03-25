describe('Registers a new user to the site', function() {
	//Arrange
	it('Visits a new site', function() {
		// Act
		cy.visit('http://localhost:3000/signup');
	});
	it('should navigate to Dashboard after registering', function() {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('input[name="username"]').as('usernameText');
    cy.get('select[name="track_id"]').as('trackId');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('input[name="confirmPassword"]').as('confirmPasswordText');
    // interact with element
    cy.get('@emailText').type('thebestuser@gmail.com');
		cy.get('@usernameText').type('thebestuser');
    cy.get('@trackId').type('3');
    cy.get('@passwordText').type('12345678');
    cy.get('@confirmPasswordText').type('12345678');
    cy.get('[data-cy=addReview]').click();
		// wait until pushed to dashboard
		cy.url().should('include', 'dashboard');
	});
});