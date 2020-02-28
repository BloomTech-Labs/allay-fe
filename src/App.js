import React from 'react';
// React Router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
// styles
import './App.css';
import { ThemeProvider } from '@chakra-ui/core';
import customTheme from './theme/customTheme';
// Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ReviewForm from './components/Dashboard/ReviewForm';
import PrivateRoute from './utils/PrivateRoute';
import SingleReview from './components/Dashboard/SingleReview';
import DashboardHome from './components/Dashboard/DashboardHome';
import AddCompanyForm from './components/Dashboard/AddCompanyForm';

const App = () => {
	return (
		<Router>
			<ThemeProvider theme={customTheme}>
				<div className='App'>
					<Switch>
						<Route exact path='/' component={Login} />
						<Route path='/signup' component={Signup} />
						<PrivateRoute exact path='/dashboard' component={DashboardHome} />
						<PrivateRoute path='/dashboard/add-review' component={ReviewForm} />
						<PrivateRoute path='/dashboard/:id' component={SingleReview} />
						<PrivateRoute path='/add-company' component={AddCompanyForm} />
					</Switch>
				</div>
			</ThemeProvider>
		</Router>
	);
};

export default App;
