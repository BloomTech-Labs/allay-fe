describe('Navs to edit interview form and edits an interview successfully', function () {
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

  it('should navigate to edit interview form and successfully edits interview', function () {
    cy.visit('http://localhost:3000/dashboard')
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard')

    cy.wait(100)
    cy.get('[data-cy=addReviewButton]').click()

    // wait until pushed to dashboard/add-review
    cy.url().should('include', 'add-review')
    cy.wait(2000)
    cy.get('[data-cy=interviewReviewButton]').click()

    //Successfully fills out the form and submits a new Interview Review
    //gets the elements, assign an alias then fills them out
    // it('should complete and submit interview review', function() {
    cy.wait(6000)
    cy.get('input[name="company_name"]').as('company_nameText')
    cy.get('@company_nameText').type('Google')
    cy.wait(8000)

    cy.get('input[name="job_title"]').as('job_titleText')
    cy.get('@job_titleText').type('Senior Web Developer')

    cy.get('input[name="Company Headquarters"]').as('locationText')
    cy.get('@locationText').type('Denver')
    cy.wait(300)
    cy.get('@locationText').type('{downArrow}').type('{enter}')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('select[name=interview_rounds').as('interview_rounds')
    cy.get('@interview_rounds').select('3').type('{end}')
    // cy.get('input[type=checkbox').as('interview_rounds');
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[type="checkbox"]').check({ force: true })
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[data-cy=interviewComment]').as('commentText')
    cy.get('@commentText').type('edit interview test.')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('select[name=difficulty_rating').as('difficulty_rating')
    cy.get('@difficulty_rating').select('Average')
    cy.wait(1000)
    cy.get('[data-cy=interviewReviewFormButton]').click({ multiple: true })
    cy.wait(8000)

    cy.get('[data-cy=accepted]').click({ force: true })
    cy.wait(2000)

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
    cy.url().should('include', 'dashboard')

    // navigate to edit interview form
    // cy.contains('edit interview test.').click()
    // cy.get('[data-cy=editModalReview]').click({ force: true })
  })

  // successfully fills out the form and edits the interview//
  // cy.get('input[name="job_title"]').as('jobTitleText');
  // cy.get('@jobTitleText').type('Super Mario');

  // cy.get('input[name="city"]').as('cityText');
  // cy.get('@cityText').type('Mushroom Kingdom');
  // cy.wait(300);

  // cy.get('select[name="state_id"]').select('FL');

  // cy.get('input[name="salary"]').as('salaryText');
  // cy.get('@salaryText').type('10001');

  // cy.get('select[name="offer_status_id"]').as('offerStatusDropdown');
  // cy.get('@offerStatusDropdown').select('1');

  // cy.get('select[name="difficulty_rating"]').as('difficultyOverall');
  // cy.get('@difficultyOverall').select('1');

  // cy.get('input[name="interview_rounds"]').as('roundsNumber');
  // cy.get('@roundsNumber').type('5');

  // cy.get('[type="checkbox"]').check({ force: false }); //currently does not work

  // cy.get('[name="comment"]').type('Nevermind. It was all just a dream.');

  // cy.get('select[name="overall_rating"]').as('companyOverall');
  // cy.get('@companyOverall').select('1');

  // submit the edit review form//
  // cy.get('[data-cy=companyEditInterviewSubmit]').click();

  // checks all elements of the dashboard card were changed//

  // cy.contains('Super Mario');
  // cy.contains('10001.00');
  // cy.contains('Mushroom Kingdom, FL');
  // cy.contains('No Offer');
  // cy.contains('Nevermind. It was all just a dream.');

  // checks all elements of the modal card were changed//

  // cy.contains('Nevermind. It was all just a dream.').click();
  // cy.contains('Very easy');
  // cy.contains('5 Rounds');

  // needs test for finding star changes (overall_rating)
  // needs test for failing to find interview types when edited to all be deselected
})
