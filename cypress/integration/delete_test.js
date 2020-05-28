describe('Logs into the site and adds review, then deletes', function () {
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

  it('should navigate to Dashboard after submitting.', function () {
    cy.visit('http://localhost:3000/dashboard')
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
  })

  it('should make a review', function () {
    cy.wait(100)
    cy.get('[data-cy=addReviewButton]').click({ multiple: true })

    // wait until pushed to dashboard/add-review
    cy.url().should('include', 'add-review')
    cy.wait(1000)
    cy.get('[data-cy=companyReviewButton]').as('companyReviewButton')
    cy.wait(4500)
    cy.get('@companyReviewButton').click({ multiple: true })

    // Successfully fills out the form and submits a new Company Review
    // get the elements and assign alias then type
    cy.wait(7000)
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
    cy.get('@commentText').type('I am an interview that needs to be deleted')
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

    // submit the form
    cy.get('[data-cy=companyReviewSubmit]').click({ multiple: true })

    // wait until pushed to dashboard
    cy.wait(8000)
    cy.url().should('include', 'dashboard')
  })

  it('should click on review card just created and delete review', function () {
    // delete the recently added review
    cy.contains('I am an interview that needs to be deleted').as(
      'reviewToDelete'
    )
    cy.get('@reviewToDelete').click({ force: true })
    // select delete icon button and click
    cy.get('[data-cy=deleteModalReview]').as('deleteReview')
    cy.get('@deleteReview').click({ force: true })
    //confirm want to delete
    cy.get('[data-cy=confirmDeleteModalReview]').as('deleteReviewConfirm')
    cy.get('@deleteReviewConfirm').click({ force: true })
    cy.wait(3000)

    // confirms review was deleted
    cy.get('I am an interview that needs to be deleted').should('not.exist')
    cy.url().should('include', 'dashboard')
  })
})
