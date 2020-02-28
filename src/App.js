import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Components
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ReviewForm from './components/Dashboard/ReviewForm';
import ReviewList from './components/Dashboard/ReviewList';
import PrivateRoute from './utils/PrivateRoute';
import SingleReview from './components/Dashboard/SingleReview';
import AddCompanyForm from './components/Dashboard/AddCompanyForm';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <h1>WELCOME TO ALLAY!</h1>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/signup' component={Signup} />
          <PrivateRoute exact path='/dashboard' component={ReviewList} />
          <PrivateRoute
            exact
            path='/dashboard/add-review'
            component={ReviewForm}
          />
          <PrivateRoute exact path='/dashboard/:id' component={SingleReview} />
          <PrivateRoute path='/add-company' component={AddCompanyForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
