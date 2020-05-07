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
    cy.get('@firstnameText').type('test133');
    cy.get('@lastnameText').type('user133');
    cy.get('@emailText').type('testuser133@allay.com');
    cy.get('@track_id').select('WEB');
    cy.get('@cohort').type('FT-100');
    cy.get('@passwordText').type('password');
    cy.get('@confirmPasswordText').type('password');
    cy.get('@registerSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/signup');
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
    cy.get('[data-cy=longFormDropdown]').as('longFormDropdown');
    cy.get('@longFormDropdown').click();
    cy.get('input[name="location"]').as('locationText');
    cy.get('#graduated-1').as('graduatedTrue');
    cy.get('@graduatedTrue').click({ force: true });
    cy.get('select[name="gradMonth"]').as('gradMonth');
    cy.get('select[name="gradYear"]').as('gradYear');
    cy.get('select[name="highest_ed"]').as('highest_ed');
    cy.get('input[name="field_of_study"]').as('field_of_study');
    cy.get('#priorExp-1').as('priorExpTrue');
    cy.get('#TLSL-1').as('tlslTrue');
    cy.get('#employed-1').as('employedTrue');
    cy.get('@employedTrue').click({ force: true });
    cy.get('input[name="employed_company"]').as('employed_company');
    cy.get('input[name="employed_title"]').as('employed_title');
    cy.get('#employed_remote-1').as('employedRemoteTrue');
    cy.get('[data-cy=registerSubmit]').as('registerSubmit');
    // interact with element
    cy.get('@firstnameText').type('test122');
    cy.get('@lastnameText').type('user122');
    cy.get('@emailText').type('testuser122@allay.com');
    cy.get('@track_id').select('WEB');
    cy.get('@cohort').type('FT-100');
    cy.get('@passwordText').type('password');
    cy.get('@confirmPasswordText').type('password');
    // longform interactions
    cy.get('@locationText').type('Atlanta, GA');
    cy.get('@gradMonth').select('Feb');
    cy.get('@gradYear').select('2018');
    cy.get('@highest_ed').select('PhD');
    cy.get('@field_of_study').type('Testing');
    cy.get('@priorExpTrue').click({ force: true });
    cy.get('@tlslTrue').click({ force: true });
    cy.get('@employed_company').type('Google');
    cy.get('@employed_title').type('Testerrr');
    cy.get('@employedRemoteTrue').click({ force: true });
    cy.get('@registerSubmit').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
});
