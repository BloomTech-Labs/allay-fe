# Allay Documentation

[![Maintainability](https://api.codeclimate.com/v1/badges/2f8112a7751e3db18cf2/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/allay-fe/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2f8112a7751e3db18cf2/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/allay-fe/test_coverage)

# Maintainability Score: https://codeclimate.com/github/Lambda-School-Labs/allay-fe/maintainability

You can find the deployed project on [Heroku](https://labs21-allay-fe.herokuapp.com/).

## Contributors

|                                      [Spencer McGuire](https://github.com/spencer-mcguire)                                       |                                               [Aaron Pleitez](https://github.com/Playtez)                                                |                                              [Nasra Aden](https://github.com/nasraaden)                                               |                                          [Matthew Weidner](https://github.com/taterntots)                                          |                                             [William Chambers](https://github.com/wchamber01)                                              |                                     [Ignacio San Martin](https://github.com/ignaciosm)                                     |
| :------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: |
|                         [<img src="https://tinyurl.com/vvaor9q" />](https://github.com/spencer-mcguire)                          |                          [<img src="https://tinyurl.com/qm7ayvt" width = "200" />](https://github.com/Playtez)                           |                        [<img src="https://tinyurl.com/vn7oxkl" width = "200" />](https://github.com/nasraaden)                        |                      [<img src="https://tinyurl.com/vrp5qsg" width = "200" />](https://github.com/taterntots)                      |                          [<img src="https://tinyurl.com/v6majhl" width = "200" />](https://github.com/wchamber01)                          |                  [<img src="https://tinyurl.com/vx4zeah" width = "200" />](https://github.com/ignaciosm)                   |
|                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/spencer-mcguire)                   |                           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/Playtez)                           |                        [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/nasraaden)                         |                      [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/taterntots)                       |                          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/wchamber01)                           |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ignaciosm)                   |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/spencer-mcguire/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/aaron-pleitez-14277818a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/nasra-aden-168b5618a/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/matthew-a-weidner/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/william-chambers-8729b650/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/ignaciosm/) |

<br>
<br>

🚫 Optional examples of using images with links for your tech stack, make sure to change these to fit your project

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
![React](https://img.shields.io/badge/react-v16.7.0--alpha.2-blue.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

🚫 more info on using badges [here](https://github.com/badges/shields)

## Project Overview

[Trello Board](https://trello.com/b/gHzGRDcS/allay)

[Product Canvas](https://www.notion.so/Allay-eb3c5b88ffab4ff199663cb40fcc1402)

[UX Design files](figma.com/file/OfII2N2BzKwTZN7EbyMozO/Allay%2C-Hanina-%26-Kelly?node-id=177%3A6)

Welcome to Allay! We are a platform that aims to relieve stress for students by providing a message board where students and alumni can talk about their job seeking experience. We do this by allowing alumni to leave reviews, post about job interviews, and share salaries. Additionally, we aim to provide basic social networking between students and hired alumni.

Allay is a job portal for Lambda students and alumni to network and talk about their place of employment, hiring process, and salary range.

### Key Features

- feature one
- feature two
- feature three
- feature four
- feature five

## Tech Stack

### Front end built using:

- [React](https://reactjs.org/): Current industry standard for web applications, using React let us displaying large amounts of data effectively by implementing Components. It is also very scalable, perfect for large applications with huge growth potential.
- [Redux](https://redux.js.org/): Centralizes our application's state and logic, easy to test/debug, works with any UI layer
- [Chakra](https://chakra-ui.com/): Chakra UI is accessible abd themeable component library. Simple to implement and build beautiful looking apps fast.

#### Front end deployed to [Heroku](https://labs21-allay-fe.herokuapp.com/).

### [Back end](https://github.com/Lambda-School-Labs/allay-be) built using:

- NodeJS
- Express
- Knex
- PostgreSQL
- Jest
- Okta

# APIs

## Authentication API here

🚫Replace text below with a description of the API

Supposed to be Okta.

## Misc API here

🚫Replace text below with a description of the API

Google places API for autocomplete of city/state on the forms.

## Misc API here

🚫Replace text below with a description of the API

Companies Logo API for loading the company logos on the dashboard and forms.

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.
create a .env.local file that includes the following:

\_ REACT_APP - Notates the enviroment for the database.

    *  REACT_APP_databaseURL=https://labs21-allay-be.herokuapp.com/api

# 5️⃣ Content Licenses

🚫For all content - images, icons, etc, use this table to document permission of use. Remove the two placeholders and add you content to this table

| Image Filename | Source / Creator | License                                                                      |
| -------------- | ---------------- | ---------------------------------------------------------------------------- |
| doodles.png    | Nicole Bennett   | [Creative Commons](https://www.toptal.com/designers/subtlepatterns/doodles/) |
| rings.svg      | Sam Herbert      | [MIT](https://github.com/SamHerbert/SVG-Loaders)                             |

# Testing

🚫Document what you used for testing and why
Jest

# Installation Instructions

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/Lambda-School-Labs/allay-be) for details on the backend of our project.
