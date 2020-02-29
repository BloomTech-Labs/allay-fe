// previously ReviewList
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// actions
import getReview from '../../state/actions/index';
// styles
import { Box, Avatar } from '@chakra-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		maxWidth: 1200,
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	card: {
		width: '100%',
		margin: '10px'
	},
	title: {
		fontSize: 14
	},
	pos: {
		marginBottom: 12
	}
});

const ReviewCard = ({ review }) => {
	const classes = useStyles();

	return (
		<>
			<Box overflow='hidden'>
				<Box p='2' d='flex'>
					<Box p='6' d='flex' alignItems='center' flexDirection='column'>
						<h4>{review.reviewer}</h4>
						<Avatar src='https://bit.ly/broken-link' />
					</Box>
					<Box d='flex' flexDirection='column' width='100%'>
						<Box d='flex'>
							<h3>{review.company_name}</h3>
						</Box>
						<Box p='2' d='flex' flexDirection='row'>
							<Box width='35%' d='flex' justifyContent='flex-start'>
								<h4>Summary</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Pros</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Cons</h4>
							</Box>
							<Box width='20%' d='flex' justifyContent='flex-start'>
								<h4>Salary</h4>
							</Box>
						</Box>
						<Box p='2' d='flex' flexDirection='row'>
							<Box
								width='35%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								{review.job_review}
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								"any pros"
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								"any cons"
							</Box>
							<Box
								width='20%'
								d='flex'
								justifyContent='flex-start'
								mt='1'
								fontWeight='semibold'
								as='h4'
								lineHeight='tight'
								isTruncated
							>
								${review.salary}
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
};

const mapStateToProps = state => {
	return {
		data: state.review.data
	};
};
export default connect(mapStateToProps, getReview)(ReviewCard);

{
	/*             <CardContent>
					<Typography variant='body2' component='p'>
						Company name: {review.company_name}
					</Typography>
					<Typography variant='h5' component='h2'>
						Job Title: {review.job_title}
					</Typography>
					<Typography className={classes.pos} color='textSecondary'>
						Location: {review.job_location}
					</Typography>
					<Typography variant='body2' component='p'>
						Salary: {review.salary}
					</Typography>
				</CardContent>
				<CardActions>
					<Link to={`/dashboard/${review.id}`}>Learn More</Link>
				</CardActions> */
}
