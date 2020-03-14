import React, { useEffect } from 'react';
// React Router
import { Route, Switch } from 'react-router-dom';
// styles
import './App.css';
import { ThemeProvider, FormControl } from '@chakra-ui/core';
import customTheme from './theme/customTheme';
// Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ReviewForm from './components/Dashboard/Forms/ReviewForm';
import InterviewForm from './components/Dashboard/Forms/InterviewForm';
import FormControler from './components/Dashboard/Forms/FormControler';
import PrivateRoute from './utils/PrivateRoute';
import SingleReview from './components/Dashboard/SingleReview';
import DashboardHome from './components/Dashboard/DashboardHome';
import AddCompanyForm from './components/Dashboard/Forms/AddCompanyForm';
// google analytics
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

function initializeAnalytics() {
	return process.env.NODE_ENV === 'production'
		? ReactGA.initialize('UA-159325981-1') &&
				// ReactGA.ga('send', 'pageview', window.location.pathname)
				ReactGA.pageview(window.location.pathname + window.location.search)
		: null;
}

const App = () => {
	const location = useLocation();

	useEffect(() => {
		initializeAnalytics();
	}, [location]);

	return (
		<ThemeProvider theme={customTheme}>
			<div className='App'>
				<Switch>
					<Route exact path='/' component={Login} />
					<Route path='/signup' component={Signup} />
					<PrivateRoute exact path='/dashboard' component={DashboardHome} />
					{/* <PrivateRoute path='/dashboard/add-review' component={ReviewForm} /> */}
					<PrivateRoute
						path='/dashboard/add-review'
						component={FormControler}
					/>
					<PrivateRoute path='/dashboard/:id' component={SingleReview} />
					<PrivateRoute path='/add-company' component={AddCompanyForm} />
				</Switch>
			</div>
		</ThemeProvider>
	);
};

export default App;
