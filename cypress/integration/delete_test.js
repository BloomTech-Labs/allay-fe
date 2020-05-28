describe('Register new user', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000/signup')
  })
  it('should navigate to Dashboard after submitting the short-form signup', function () {
    // Select element and alias them
    cy.get('input[name="firstName"]').as('firstnameText')
    cy.get('input[name="lastName"]').as('lastnameText')
    cy.get('input[name="email"]').as('emailText')
    cy.get('select[name=track_id').as('track_id')
    cy.get('input[name="cohort"]').as('cohort')
    cy.get('input[name="password"]').as('passwordText')
    cy.get('input[name="confirmPassword"]').as('confirmPasswordText')
    cy.get('[data-cy=registerSubmit]').as('registerSubmit')
    // interact with element
    cy.get('@firstnameText').type('test04')
    cy.get('@lastnameText').type('user04')
    cy.get('@emailText').type('testuser04@allay.com')
    cy.get('@track_id').select('WEB')
    cy.get('@cohort').type('FT-100')
    cy.get('@passwordText').type('password')
    cy.get('@confirmPasswordText').type('password')
    cy.wait(1000)
    cy.get('@registerSubmit').click({ multiple: true })
    cy.wait(1000)
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
    cy.wait(1000)
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
    cy.get('@commentText').type('TESTING CYPRESS DELETE')
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
    cy.contains('TESTING CYPRESS DELETE').as('reviewToDelete')
    cy.get('@reviewToDelete').click({ multiple: true })
    cy.get('[data-cy=deleteModalReview]').as('deleteReview')
    cy.get('@deleteReview').click({ multiple: true })
    //confirm want to delete
    cy.get('[data-cy=confirmDeleteModalReview]').as('deleteReviewConfirm')
    cy.get('@deleteReviewConfirm').click({ multiple: true })
    cy.wait(3000)

    // confirms review was deleted
    cy.get('TESTING CYPRESS DELETE').should('not.exist')
    cy.url().should('include', 'dashboard')
  })
})
