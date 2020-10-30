import React from 'react';
import { Link, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
		footer: {
			padding: '5px 0px 5px 0px',
			backgroundColor: '#e0e0e0',
			width: '100%',
			position: 'fixed',
			bottom:'0',
			left:'0',
		},
}));
    
export default function Copyright() {
	const classes = useStyles();
	return (
		<Typography className={classes.footer} variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
			작통단
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}