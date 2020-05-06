describe('Returns with empty search if company not found', function () {
  //Arrange
  it('Visits the Allay site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });

  before(() => {
    cy.login();
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should navigate to Dashboard after login', function () {
    cy.visit('http://localhost:3000/dashboard');
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');
  });
  it('returns with no reviews on unsuccessful search', function () {
    cy.get('input[name="searchbar"]').type('fgkjhieahggdsafevca');
    cy.contains('Sorry, no job reviews found.');
  });
});
