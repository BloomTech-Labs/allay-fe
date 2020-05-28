describe('Creates a new interview review', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000')
  })
  it('should navigate to add review form after logging in', function () {
    // select elements and alias them
    cy.get('input[name="email"]').as('emailText')
    cy.get('@emailText').type('testing123@gmail.com')

    cy.get('input[name="password"]').as('passwordText')
    cy.get('@passwordText').type('password')

    cy.get('[data-cy=loginSubmit]').click()
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')

    cy.wait(100)
    cy.get('[data-cy=addReviewButton]').click()

    // wait until pushed to dashboard/add-review
    cy.url().should('include', 'add-review')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewButton]').click()

    //Successfully fills out the form and submits a new Interview Review
    //gets the elements, assign an alias then fills them out
    // it('should complete and submit interview review', function() {
    cy.wait(7000)
    cy.get('input[name="company_name"]').as('company_nameText')
    cy.get('@company_nameText').type('Amazon Web Services')

    cy.get('input[name="job_title"]').as('job_titleText')
    cy.get('@job_titleText').type('Senior Web Developer')

    cy.get('input[name="Company Headquarters"]').as('locationText')
    cy.get('@locationText').type('Denver')
    cy.wait(1000)
    cy.get('@locationText').type('{downArrow}').type('{enter}')
    cy.get('@locationText').type('{downArrow}').type('{enter}')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click()
    cy.wait(8000)

    cy.get('select[name=interview_rounds').as('interview_rounds')
    cy.get('@interview_rounds').select('3').type('{end}')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[type="checkbox"]').check({ force: true })
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[data-cy=interviewComment]').as('commentText')
    cy.get('@commentText').type(
      'I had a great time here. They asked very technical questions like do you use tabs vs spaces. That kind of thing.'
    )
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('select[name=difficulty_rating').as('difficulty_rating')
    cy.get('@difficulty_rating').select('Average')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[data-cy=accepted]').click({ force: true })
    cy.wait(8000)

    cy.get('input[name="salary"]').as('salary')
    cy.get('@salary').type('98000').type('{end}')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('ul>li').as('interviewRating')
    cy.get('@interviewRating').eq(3).click()
    cy.wait(8000)

    cy.get('[data-cy=interviewReviewSubmit]').as('interviewReviewSubmit')
    cy.get('@interviewReviewSubmit').click()

    // wait until pushed to dashboard
    cy.wait(8000)
    cy.url().should('include', 'dashboard')
  })

  it('Opens the top right menu and logs out', function () {
    // click profile image button
    cy.wait(8000)
    cy.get('[data-cy=profileButton]').click()
    // logout upon button click and redirects to login page
    cy.get('[data-cy=signOut]').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

describe('Logs into the site', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000')
  })

  before(() => {
    cy.adminLogin()
    cy.saveLocalStorage()
  })
  beforeEach(() => {
    cy.restoreLocalStorage()
  })

  it('should navigate to Dashboard after logging in as admin', function () {
    // select element and alias them
    cy.get('input[name="email"]').as('emailText')
    cy.get('input[name="password"]').as('passwordText')
    cy.get('[data-cy=loginSubmit]').as('loginSubmit')
    // interact with element
    cy.get('@emailText').type('haase1020@gmail.com')
    cy.get('@passwordText').type('password')
    cy.get('@loginSubmit').click()
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')
  })
  it('should click on review created by testuser1, and bind, then unbind the user', function () {
    // click on review card
    cy.contains(
      'I had a great time here. They asked very technical questions like do you use tabs vs spaces. That kind of thing.'
    ).as('testReview')
    cy.get('@testReview').click()
    // select admin bind button and click
    cy.get('[data-cy=blockUserButton]').as('blockUserButton')
    cy.get('@blockUserButton').click()
    // select are you sure, bind button and click
    cy.get('[data-cy=blockUserButtonConfirm]').as('blockUserButtonConfirm')
    cy.get('@blockUserButtonConfirm').click()
    // cy.wait(3000);

    cy.get('[data-cy=reviewCloseButton]').click()
    cy.get('@testReview').click()

    // unbind user
    cy.get('[data-cy=unblockUserButton]').click()
    cy.get('[data-cy=unblockUserButtonConfirm]').click()
  })
})
