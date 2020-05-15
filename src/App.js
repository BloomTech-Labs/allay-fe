import React, { useEffect } from 'react'
// React Router
import { Route, Switch } from 'react-router-dom'
// styles
import './App.css'
import { ThemeProvider } from '@chakra-ui/core'
import customTheme from './theme/customTheme'
// Components
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import FormController from './components/Dashboard/Forms/FormController'
import PrivateRoute from './utils/PrivateRoute'
import EditReviewForm from './components/Dashboard/Forms/EditReviewForm'
import EditInterviewForm from './components/Dashboard/Forms/EditInterviewForm'
import DashboardHome from './components/Dashboard/DashboardHome'
import AddCompanyForm from './components/Dashboard/Forms/AddCompanyForm'
import ProfilePage from './components/Dashboard/UserProfile/ProfilePage'
import EditUserProfile from './components/Dashboard/UserProfile/EditUserProfile'
// google analytics
import ReactGA from 'react-ga'
import { useLocation } from 'react-router-dom'

//below tablet size app is not responsive
// uncomment the STEPS bellow if you want to hide the app
// if the size is bellow tablet size

// ==>  STEP 1  <==
// import sizeMe from 'react-sizeme'

function initializeAnalytics() {
  return process.env.NODE_ENV === 'production'
    ? ReactGA.initialize('UA-165296425-1') &&
        // ReactGA.ga('send', 'pageview', window.location.pathname)
        ReactGA.pageview(window.location.pathname + window.location.search)
    : null
}
//

const App = ({ size }) => {
  const location = useLocation()

  // check for admin

  useEffect(() => {
    initializeAnalytics()
  }, [location])
  // ==>  STEP 2  <==
  // if (size.width > 850) {
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
          <PrivateRoute
            exact
            path="/profile/:id/edit"
            component={EditUserProfile}
          />
          <PrivateRoute exact path="/dashboard" component={DashboardHome} />
          <PrivateRoute
            path="/dashboard/add-review"
            component={FormController}
          />
          <PrivateRoute
            path="/dashboard/review/:id"
            component={EditReviewForm}
          />
          <PrivateRoute
            path="/dashboard/interview/:id"
            component={EditInterviewForm}
          />
          <PrivateRoute path="/add-company" component={AddCompanyForm} />
        </Switch>
      </div>
    </ThemeProvider>
  )
  // ==>   STEP 3 <==
  // } else {
  //   return <h1>Working on mobile version, please use larger screen for now.</h1>
  // }
}
export default App
// ==>  STEP 4  <==
// export default sizeMe()(App)
