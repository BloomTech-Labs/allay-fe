import React, { useState } from 'react';
import { connect } from 'react-redux';
import postCompany from '../../state/actions';

// styles
import { TextField, Button, ButtonGroup, Typography } from '@material-ui/core';

const AddCompanyForm = ({ isLoading, postCompany, history }) => {
	const [newCompany, setNewCompany] = useState({
		name: '',
		hq_city: '',
		hq_state: ''
	});

	const changeHandler = e => {
		e.preventDefault();
		setNewCompany({
			...newCompany,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		postCompany(newCompany).then(() => history.push('/dashboard/add-review'));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Typography> Add a Company</Typography>
				<TextField
					type='text'
					name='name'
					placeholder='Company Name'
					value={newCompany.name}
					onChange={changeHandler}
				/>
				<TextField
					type='text'
					name='hq_city'
					placeholder='City'
					value={newCompany.hq_city}
					onChange={changeHandler}
				/>
				<TextField
					type='text'
					name='hq_state'
					placeholder='State'
					value={newCompany.hq_state}
					onChange={changeHandler}
				/>
				<ButtonGroup>
					<Button type='submit'> Add </Button>
					<Button
						onClick={() =>
							alert(
								'Are you sure you want to cancel?',
								history.push('/dashboard/add-review')
							)
						}
					>
						Cancel
					</Button>
				</ButtonGroup>
			</form>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.company.fetchingData
	};
};
export default connect(mapStateToProps, postCompany)(AddCompanyForm);
