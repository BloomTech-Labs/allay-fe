describe('Logs out user and redirects to login page', function () {
  //Arrange
  it('Visits the Allay site', function () {
    // Act
    cy.visit('http://localhost:3000')
  })
  before(() => {
    cy.login()
    cy.saveLocalStorage()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  it('should navigate to Dashboard after submitting.', function () {
    cy.visit('http://localhost:3000/dashboard')
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
  })

  it('clicks on user profile image and selects logout', function () {
    cy.visit('http://localhost:3000/dashboard')
    cy.wait(500)
    // click profile image
    cy.get('[data-cy=profileButton]').click({ force: true })
    cy.wait(500)
    // logout upon button click and redirects to login page
    cy.get('[data-cy=signOut]').click({ force: true })
    cy.url().should('eq', 'http://localhost:3000/')
  })
})
