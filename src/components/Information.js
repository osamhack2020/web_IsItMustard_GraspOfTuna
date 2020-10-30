import React from "react";
import { useHistory } from "react-router";
import { makeStyles, Typography, TextField ,Divider, Button } from '@material-ui/core';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {RealNonStyleLink} from './NonStyleRouter';
import { useLocation } from 'react-router-dom';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';



const MainContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const RowContainer= styled.div`
	margin: 15px;
	display: flex;
	align-items: center;
	flex-direction: row;
	width: 60%;
    justify-content: space-around;
`;

const ColContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
`;

const MainTitle = styled(Typography)`
	margin: 15px;
	font-size: 1.7rem;
	font-weight: 500;
`;

const MainContent = styled(Typography)`
	margin: 15px;
	font-size: 1.4rem;
`;

const CallIcon= styled(AddIcCallIcon)`
	color: #2196f3;
	font-size: 4rem;
`;

const CallTitle = styled(Typography)`
	font-size: 1.4rem;
	font-weight: 500;

`;

const CallNumber = styled(Typography)`
	font-size: 1.4rem;
	color: #2196f3;
	font-weight: 700;
`;

const CallDivider = styled(Divider)`
	background-color: #afafaf;
`;




function Information({detail}) {
	const history = useHistory();
	
	function onReset() {
		history.push('/main');
	}
    return (
		<MainContainer>
			<MainTitle variant="h4">{detail.title}</MainTitle>
			<MainContent>{detail.content}</MainContent>
			{detail.call &&
			<RowContainer> 
				<CallIcon />
				<CallDivider orientation="vertical" flexItem/>
				<ColContainer>
					<CallTitle>{detail.callTitle}</CallTitle>
					
					<CallNumber>{detail.callNum}</CallNumber>
				</ColContainer>
			</RowContainer>
			}
		</MainContainer>
    );
}
export default Information;