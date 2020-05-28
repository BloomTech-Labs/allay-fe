describe('Navs to company review form.', function () {
  //Arrange
  it('Visits a new site', function () {
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

  it('should navigate to add review after logging in the submit a review', function () {
    cy.visit('http://localhost:3000/dashboard')
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
    // nav to add review start
    cy.get('[data-cy=addReviewButton]').as('addReviewButton')

    cy.wait(500)

    cy.get('@addReviewButton').click()
    cy.url().should('include', 'add-review')
    // click
    cy.get('[data-cy=companyReviewButton]').as('companyReviewButton')
    cy.wait(4500)
    cy.get('@companyReviewButton').click()

    //Successfully fills out the form and submits a new Company Review
    //get the elements and assign alias then type
    cy.wait(6000)
    cy.get('input[name="company_name"]').as('companyNameText')
    cy.get('@companyNameText').type('Google')

    cy.get('select[name="work_status_id"]').as('workStatusDropdown')
    cy.get('@workStatusDropdown').select('Full Time')

    cy.get('input[name="job_title"]').as('jobTitleText')
    cy.get('@jobTitleText').type('Cypress Engineer')

    cy.get('input[name="Company Headquarters"]').as('locationText')
    cy.get('@locationText').type('Atlanta')
    cy.wait(300)
    cy.get('@locationText').type('{downArrow}').type('{enter}')

    cy.get('input[name="start_date"]').as('startDateText')
    cy.get('@startDateText').type('1999')

    cy.get('input[name="end_date"]').as('endDateText')
    cy.get('@endDateText').type('2000')
    cy.get('[data-cy=companyReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[data-cy=companyComment]').as('commentText')
    cy.get('@commentText').type(
      'I am testing to make sure I can submit a company review.'
    )
    cy.get('[data-cy=companyReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('select[name="typical_hours"]').as('hoursDropdown')
    cy.get('@hoursDropdown').select('30 hours+')
    cy.get('[data-cy=companyReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('input[name="salary"]').as('salaryText')
    cy.get('@salaryText').type('123456')
    cy.get('[data-cy=companyReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('ul>li').as('companyOverall')
    cy.get('@companyOverall').eq(2).click()

    //submit the form
    cy.get('[data-cy=companyReviewSubmit]').click()
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
  })
  it('should click on review created', function () {
    // click on review card
    cy.contains('I am testing to make sure I can submit a company review.').as(
      'testReview'
    )
    cy.get('@testReview').click()
    // select admin bind button and click
  })
})
