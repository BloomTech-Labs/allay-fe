describe('Logs out user and redirects to login page', function () {
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
  it('Opens the hamburger menu and logs out', function () {
    cy.visit('http://localhost:3000/dashboard');
    // click hamburger button
    cy.get('[data-cy=hamburger]').click();
    // logout upon button click and redirects to login page
    cy.get('[data-cy=signOut]').click();
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
