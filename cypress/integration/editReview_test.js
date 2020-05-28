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
    cy.wait(6000)

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
    cy.get('@commentText').type('This is a editReview test.')
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
    cy.contains('This is a editReview test.').as('testReview')
    cy.get('@testReview').click()
    // select admin bind button and click
  })

  // it('should click on review card just created and edit review', function () {
  //   // edit the recently added review
  //   cy.contains('I am an interview that needs to be edited').as('reviewToEdit')
  //   cy.get('@reviewToEdit').click()
  //   // select edit icon button and click
  //   cy.get('[data-cy=editModalReview]').as('editReview')
  //   cy.get('@editReview').click()
  //   // successfully fills out the form and edits the review
  //   cy.get('input[name="job_title"]').as('jobTitleText')
  //   cy.get('@jobTitleText').type('New Cypress Engineer')

  //   cy.get('input[name="city"]').as('cityText')
  //   cy.get('@cityText').type('New York')
  //   cy.wait(300)

  //   cy.get('select[name="state_id"]').select('NY')

  //   cy.get('input[name="salary"]').as('salaryText')
  //   cy.get('@salaryText').type('78910')

  //   cy.get('select[name="work_status_id"]').as('workStatusDropdown')
  //   cy.get('@workStatusDropdown').select('Intern')

  //   cy.get('input[name="start_date"]').as('startDateText')
  //   cy.get('@startDateText').type('2001')

  //   cy.get('input[name="end_date"]').as('endDateText')
  //   cy.get('@endDateText').type('2002')

  //   cy.get('input[name="typical_hours"]').as('hoursDropdown')
  //   cy.get('@hoursDropdown').type('20')

  //   cy.get('[name="comment"]').type('TESTING EVEN MORE VIA CYPRESS')

  //   cy.get('select[name="overall_rating"]').as('companyOverall')
  //   cy.get('@companyOverall').select('1')

  //   // submit the edit review form
  //   cy.get('[data-cy=companyEditReviewSubmit]').click()

  //   // checks all elements of the dashboard card were changed
  //   cy.contains('New Cypress Engineer')
  //   cy.contains('78910.00')
  //   cy.contains('New York, NY')
  //   cy.contains('2001-2002')
  //   cy.contains('TESTING EVEN MORE VIA CYPRESS')

  //   // checks all elements of the modal card were changed
  //   cy.contains('TESTING EVEN MORE VIA CYPRESS').click()
  //   cy.contains('20 hrs week')
  //   cy.contains('Intern')
  //   // needs test for finding star changes (overall_rating)
  // })
})
