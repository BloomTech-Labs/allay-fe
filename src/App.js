import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import './App.css';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ReviewList from './components/Dashboard/ReviewList';
import ReviewForm from './components/Dashboard/ReviewForm';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <h1>WELCOME TO ALLAY!</h1>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={ReviewList} />
        <Route path="/add-review" component={ReviewForm} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  console.log('APP STATE', state);
  return {
    isLoggedIn: state.isLoggedIn
  };
};

export default connect(mapStateToProps, {})(App);
