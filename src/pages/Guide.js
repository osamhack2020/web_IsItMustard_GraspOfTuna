import guideImage from '../image/guide.png';
import React, {useState} from 'react';
import styled from 'styled-components';
import {Typography, Paper, makeStyles, Card ,CardContent, CardMedia   } from '@material-ui/core';

const CenterContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Image = styled.img`
	width: 100%;
	margin: 30px 0px 30px 0px;
`;
const Title = styled(Typography)`
	font-size: 1.4rem;
`;

const Content = styled(Typography)`
	font-size: 1.1rem;
`;

function Guide() {
    return (
		<CenterContainer>
			<Image src={guideImage}/>
		</CenterContainer>
    );
}
export default Guide;
 