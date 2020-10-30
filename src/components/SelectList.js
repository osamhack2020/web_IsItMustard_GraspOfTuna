import React from "react";
import { useHistory } from "react-router";
import { makeStyles, Typography, ListSubheader, List,ListItem, ListItemIcon, ListItemText,Divider } from '@material-ui/core';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {RealNonStyleLink} from './NonStyleRouter';
import { useLocation } from 'react-router-dom'
//collpaso 메모


const SelectListHeaderDiv = styled.div`
	display: flex;
	align-items: center;
	margin-left: 15px;
`;

const SelectListHeader = styled(ListSubheader)`
	color: black;
	font-size: 1.1rem;
	margin-top: 5px;
`;

const BlackDivider = styled(Divider)`
	background-color: rgba(200,200,200,0.6);
	margin-left: 30px;
`;

const BackIcon = styled(ArrowBackIcon)`
	padding: 5px;
	margin-top: 10px;
	margin-bottom: 5px;
	border-radius: 50%;
	background-color: #3986F7;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
`;

const SelectListText = styled(Typography)`
	color: black;
	font-weight: 600;
	margin-left: 32px;
	margin-bottom: 2px;
`;

const SelectListSubText = styled.span`
	font-weight: 500;
	margin-left: 31px;
`;

const useStyles = makeStyles(theme => ({
		item:{
			paddingBottom: '4px',
		},
}));


function SelectList({options, about}) {
	let history = useHistory();
	let location = useLocation();
	const classes = useStyles();
    return (
		<List component="nav"
		subheader={ <SelectListHeaderDiv>
					<BackIcon onClick={history.goBack}/>
					<SelectListHeader component="h4">{about}</SelectListHeader>
					</SelectListHeaderDiv>}>
					
			{options.map((option,i) => {
				return(
					<div key={i}>
					<RealNonStyleLink to={option.direct? option.go:location.pathname+option.go}>
					<ListItem button className={classes.item} color={'#000000'}>
						<ListItemText primary={<SelectListText>{option.name}</SelectListText>} 
							secondary={<SelectListSubText>{option.detail}</SelectListSubText>} />
					</ListItem>
					</RealNonStyleLink>
					<BlackDivider component="li" />
					</div>
				);
			})}
		</List>
    );
}
export default SelectList;