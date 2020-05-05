describe('Creates a new interview review', function () {
  //Arrange
  it('Visits a new site', function () {
    // Act
    cy.visit('http://localhost:3000');
  });
  it('should navigate to add review form after logging in', function () {
    // select elements and alias them
    cy.get('input[name="email"]').as('emailText');
    cy.get('@emailText').type('testuser1@gmail.com');

    cy.get('input[name="password"]').as('passwordText');
    cy.get('@passwordText').type('12345678');

    cy.get('[data-cy=loginSubmit]').click();
    // wait until pushed to dashboard
    cy.url().should('include', 'dashboard');

    cy.wait(100);
    cy.get('[data-cy=addReviewButton]').click();

    // wait until pushed to dashboard/add-review
    cy.url().should('include', 'add-review');
    cy.wait(2000);
    cy.get('[data-cy=interviewReviewButton]').click();
    // .as('interviewReviewButton');
    // interact with elements
    // cy.get('@interviewReviewButton')
    // });

    //Successfully fills out the form and submits a new Interview Review
    //gets the elements, assign an alias then fills them out
    // it('should complete and submit interview review', function() {
    cy.wait(3000);
    cy.get('input[name="company_name"]').as('company_nameText');
    cy.get('@company_nameText').type('Amazon Web Services');

    cy.get('input[name="job_title"]').as('job_titleText');
    cy.get('@job_titleText').type('Senior Web Developer');

    cy.get('input[name="Company Headquarters"]').as('locationText');
    cy.get('@locationText').type('Denver');
    cy.wait(300);
    cy.get('@locationText').type('{downArrow}').type('{enter}');
    cy.wait(1500);

    cy.get('select[name=interview_rounds').as('interview_rounds');
    cy.get('@interview_rounds').select('3').type('{end}');
    // cy.get('input[type=checkbox').as('interview_rounds');
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
    cy.url().should('include', 'dashboard');
  });
});
