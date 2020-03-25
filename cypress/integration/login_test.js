describe('Logs into the site', function() {
	//Arrange
	it('Visits a new site', function() {
		// Act
		cy.visit('http://localhost:3000');
	});
	it('should navigate to Dashboard after submitting.', function() {
		// select element and alias them
		cy.get('input[name="username"]').as('usernameText');
		cy.get('input[name="password"]').as('passwordText');
		cy.get('[data-cy=submit]').as('submit');
		// interact with element
		cy.get('@usernameText').type('spencerM');
		cy.get('@passwordText').type('12345678');
		cy.get('@submit').click();
		// wait until pushed to dashboard
		cy.url().should('include', 'dashboard');
	});
});
