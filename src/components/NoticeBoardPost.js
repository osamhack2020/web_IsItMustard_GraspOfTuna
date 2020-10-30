import React, {useState, useEffect} from 'react';
import {Paper,Typography,makeStyles, Backdrop   } from '@material-ui/core';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router";
import {getPost} from '../lib/fakeData.js';
import {useOuterClick} from '../utils/useOuterClick.js';

import qs from 'qs';
const DarkBackground = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 750px 1fr;
	grid-template-areas: ". main .";
	z-index: 4;
	background: rgba(0, 0, 0, 0.6);
	@media (max-width: 768px) {
		grid-template-columns: 0fr 100% 0fr;
	}
`;

const CloseButton = styled(CloseIcon)`
	padding: 10px;
	font-size: 2.5rem;
	cursor: pointer;
	
`;

const HeaderBox = styled.div`
	display: grid;
	grid-template-columns: 4fr 60px;
`;

const HeaderTitle = styled(Typography)`
	padding-left: 5%;
	align-self: center;
	justify-self: center;
`;

const InfoBox = styled.div`
	display: flex;
	flex-direction: row-reverse;
	font-size: 23px;
	margin: 10px;
`;

const useStyles = makeStyles((theme) => ({
	content:{
		height: '80%',
		gridArea: 'main',
		alignSelf: 'center',
		padding: '0px 10px 0px 10px',
		display: 'grid',
		gridTemplateRows: '60px 50px 1fr',
	},
}));

export default function NoticeBoardPost ({location}){
	const classes = useStyles();
	const history = useHistory();
	
	const query = qs.parse(location.search ,{
		ignoreQueryPrefix: true
	});
	const id = Number(query.id ? query.id : 1);
	const page = Number(query.page ? query.page : 1);
	const [post, setPost] = useState({});
	const handleBack = () => {
		history.push(`/notice?page=${page}`);
	};
  	const ref = useOuterClick(handleBack);
	
	useEffect(() => {
		(async function getDataFromServer(){
			let tempPost = await getPost(id);
			setPost(tempPost);
		})();
		return () => {
		};
	}, []);
	return(
		<DarkBackground>
			<Paper ref={ref} className={classes.content}>
				<HeaderBox>
					<HeaderTitle variant="h4">{post.title}</HeaderTitle>
					<CloseButton onClick={handleBack} />
				</HeaderBox>
				<InfoBox>
					<div>{post.date}</div>
					<div>{post.userRank} {post.userName}</div>					
				</InfoBox>
				{post.content}
			</Paper>
		</DarkBackground>
	);
}

    
