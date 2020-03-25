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
		cy.get('[data-cy=loginSubmit]').as('loginSubmit');
		// interact with element
		cy.get('@usernameText').type('spencerM');
		cy.get('@passwordText').type('12345678');
		cy.get('@loginSubmit').click();
		// wait until pushed to dashboard
		cy.url().should('include', 'dashboard');
	});
});

describe('Does not log into site', function() {
	it('Visits a new site', function() {
		// Act
		cy.visit('http://localhost:3000');
	});
	it('should navigate to Dashboard after submitting.', function() {
		// select element and alias them
		cy.get('input[name="username"]').as('usernameText');
		cy.get('input[name="password"]').as('passwordText');
		cy.get('[data-cy=loginSubmit]').as('loginSubmit');
		// interact with element
		cy.get('@usernameText').type('fakeUsername');
		cy.get('@passwordText').type('fakePassword');
		cy.get('@loginSubmit').click();
		// wait until pushed to dashboard
		cy.url().should('not.include', 'dashboard');
	});
});

describe('Navs from Login to Sign up.', function() {
	it('Visits a new site', function() {
		// Act
		cy.visit('http://localhost:3000');
	});
	it('Selects "Sign up here" and moves to sign up page', function() {
		cy.get('[data-cy=signupLink]').as('signupLink');
		cy.get('@signupLink').click();
		//wait to resolve to sign up
		cy.url().should('include', 'signup');
	});
});
