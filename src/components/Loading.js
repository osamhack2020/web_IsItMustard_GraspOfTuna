import React from 'react';
import {CircularProgress} from '@material-ui/core';
import styled from 'styled-components';
const DarkBackground = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 5;
	background: rgba(255, 255, 255, 0.6);
`;

export default function Loading() {
	return (
		<DarkBackground>
			<CircularProgress size={100}/>
		</DarkBackground> 
	);
}