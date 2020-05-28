describe('update user profile', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/')
  })

  before(() => {
    cy.login()
    cy.saveLocalStorage()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  it('should navigate to user profile after logging in', function () {
    cy.visit('http://localhost:3000/dashboard')

    // wait until pushed to dashboard
    cy.wait(2000)
    cy.url().should('include', 'dashboard')

    cy.get('[data-cy=profileButton]').click({ force: true })
    cy.wait(2000)

    cy.get('[data-cy=profileLink]').click({ force: true })

    cy.wait(2000)
    cy.url().should('eq', 'http://localhost:3000/profile/45')

    //edit profile
    cy.get('[data-cy=editProfile').click({ force: true })
    cy.wait(2000)

    cy.url().should('eq', 'http://localhost:3000/profile/45/edit')
  })

  it('should navigate to User Profile after clicking Save or Cancel buttons', function () {
    // Select element and alias them
    cy.get('input[name="firstName"]').as('firstnameText')
    cy.get('input[name="lastName"]').as('lastnameText')
    cy.get('input[name="location"]').as('locationText')
    cy.get('#graduated-1').as('graduatedTrue')
    cy.get('@graduatedTrue').click({ force: true })
    cy.get('select[name="gradMonth"]').as('gradMonth')
    cy.get('select[name="gradYear"]').as('gradYear')
    cy.get('select[name="highest_ed"]').as('highest_ed')
    cy.get('input[name="field_of_study"]').as('field_of_study')
    cy.get('#priorExp-1').as('priorExpTrue')
    cy.get('#priorExp-2').as('priorExpFalse')
    cy.get('#TLSL-1').as('tlslTrue')
    cy.get('#employed-1').as('employedTrue')
    cy.get('@employedTrue').click({ force: true })
    cy.get('input[name="employed_company"]').as('employed_company')
    cy.get('input[name="employed_title"]').as('employed_title')
    // cy.get('#employed_remote-1').as('employedRemoteTrue')
    cy.get('input[name="linked_in"]').as('linkedin')
    cy.get('[data-cy=registerSubmit]').as('save')
    cy.get('[data-cy=cancelUpdate]').as('cancel')
    // interact with element
    cy.get('@priorExpTrue').click({ force: true })

    cy.get('@linkedin').type('www.linkedin.com')
    cy.get('@save').click()
    cy.wait(2000)
    cy.url().should('eq', 'http://localhost:3000/profile/45')

    cy.get('[data-cy=editProfile').click({ force: true })
    cy.wait(2000)

    cy.get('@linkedin').type('www.linkedin.com').clear()
    cy.get('@save').click()
    cy.wait(2000)
    cy.url().should('eq', 'http://localhost:3000/profile/45')
  })
})
