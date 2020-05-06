describe('Creates a new interview review', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });

  before(() => {
    cy.adminLogin();
    cy.saveLocalStorage();
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  it('should navigate to add review form after logging in', function () {
    cy.visit('http://localhost:3000/dashboard');
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');

    cy.wait(100);
    cy.get('[data-cy=addReviewButton]').click();

    // wait until pushed to dashboard/add-review
    cy.url().should('include', 'add-review');
    cy.wait(2000);
    cy.get('[data-cy=interviewReviewButton]').click();

    //Successfully fills out the form and submits a new Interview Review
    //gets the elements, assign an alias then fills them out
    cy.wait(7000);
    cy.get('input[name="company_name"]').as('company_nameText');
    cy.get('@company_nameText').type('Amazon Web Services');

    cy.get('input[name="job_title"]').as('job_titleText');
    cy.get('@job_titleText').type('Senior Web Developer');

    cy.get('input[name="Company Headquarters"]').as('locationText');
    cy.get('@locationText').type('Denver');
    cy.wait(1000);
    cy.get('@locationText').type('{downArrow}').type('{enter}');
    cy.get('@locationText').type('{downArrow}').type('{enter}');
    cy.wait(1500);

    cy.get('select[name=interview_rounds').as('interview_rounds');
    cy.get('@interview_rounds').select('3').type('{end}');
    cy.wait(4000);

    cy.get('[type="checkbox"]').check({ force: true });
    cy.wait(4000);

    cy.get('[data-cy=interviewComment]').as('commentText');
    cy.get('@commentText').type(
      'There were many questions asked. We talked about computer stuff, food and long walks on the beach at sunset. It was pretty epic.'
    );
    cy.wait(4000);

    cy.get('select[name=difficulty_rating').as('difficulty_rating');
    cy.get('@difficulty_rating').select('Average');
    cy.wait(2000);

    cy.get('[data-cy=accepted]').click({ force: true });
    cy.wait(2000);

    cy.get('input[name="salary"]').as('salary');
    cy.get('@salary').type('98000').type('{end}');
    cy.wait(2000);

    cy.get('ul>li').as('interviewRating');
    cy.get('@interviewRating').eq(3).click();
    cy.wait(2000);

    cy.get('[data-cy=interviewReviewSubmit]').as('interviewReviewSubmit');
    cy.get('@interviewReviewSubmit').click();

    // wait until pushed to dashboard
    cy.wait(3000);
    cy.url().should('include', 'dashboard');
  });
});

describe('Logs into the site', function () {
  it('should click on review created by testuser1, and delete the review.', function () {
    // click on review card
    cy.contains(
      'There were many questions asked. We talked about computer stuff, food and long walks on the beach at sunset. It was pretty epic.'
    ).as('testReview');
    cy.get('@testReview').click();
    // select admin delete button and click
    cy.get('[data-cy=adminDeleteReview]').as('adminDeleteReview');
    cy.get('@adminDeleteReview').click();
    // select are you sure, delete button and click
    cy.get('[data-cy=adminDeleteReviewConfirm]').as('adminDeleteReviewConfirm');
    cy.get('@adminDeleteReviewConfirm').click();
    cy.wait(3000);
    // review card should be deleted and return to dashboard
    cy.get('@testReview').should('eq', null);
    cy.wait(1000);
    cy.url().should('include', 'dashboard');
  });
});
