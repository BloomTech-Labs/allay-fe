describe('Register new user', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/signup');
  });
  it('should navigate to Dashboard after submitting the short-form signup', function () {
    // Select element and alias them
    cy.get('input[name="firstName"]').as('firstnameText');
    cy.get('input[name="lastName"]').as('lastnameText');
    cy.get('input[name="email"]').as('emailText');
    cy.get('select[name=track_id').as('track_id');
    cy.get('input[name="cohort"]').as('cohort');
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
  it('should navigate to Dashboard after submitting the long-form signup', function () {
    // Select element and alias them
    cy.get('input[name="firstName"]').as('firstnameText');
    cy.get('input[name="lastName"]').as('lastnameText');
    cy.get('input[name="email"]').as('emailText');
    cy.get('select[name="track_id"]').as('track_id');
    cy.get('input[name="cohort"]').as('cohort');
    cy.get('input[name="password"]').as('passwordText');
    cy.get('input[name="confirmPassword"]').as('confirmPasswordText');
    // longform info
    cy.get('input[name="location"]').as('locationText');
    cy.get('#graduated-1').as('graduatedTrue');
    cy.get('select[name="gradMonth"]').as('gradMonth');
    cy.get('select[name="gradYear"]').as('gradYear');
    cy.get('select[name="highest_ed"]').as('highest_ed');
    cy.get('input[name="field_of_study"]').as('field_of_study');
    cy.get('#priorExp-1').as('priorExpTrue');
    cy.get('#TLSL-1').as('tlslTrue');
    cy.get('#employed-1').as('employedTrue');
    cy.get('input[name="employed_company"]').as('employed_company');
    cy.get('input[name="employed_title"]').as('employed_title');
    cy.get('#employed_remote-1').as('employedRemoteTrue');
    cy.get('select[name="workMonth"]').as('workMonth');
    cy.get('select[name="workYear"]').as('workYear');
    cy.get('input[name="contact_email"]');
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
