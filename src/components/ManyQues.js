import React, {useState, useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles, Typography, TextField ,Divider, Button, ListSubheader, List,ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import styled from 'styled-components';
import {RealNonStyleLink} from './NonStyleRouter';
import { useLocation } from 'react-router-dom';

const QueContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5px;
`;
const TitleContainer = styled.div`
	background-color:#3986F7;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px 10px 15px 10px;
    border-radius: 30px;
`;

const QueTitle = styled(Typography)`
	font-weight: 700;
	color: white;
`;
const QueSubTitle = styled(Typography)`
	font-weight: 500;
	margin-top: 10px;
`;


const BlackDivider = styled(Divider)`
	background-color: rgba(200,200,200,0.6);
	margin-left: 30px;
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

const CustomList = styled(List)`
	width: 100%;
`;




function ManyQues({ques}) {
	const history = useHistory();
	
    return (
		<QueContainer>
			<TitleContainer>
				<QueTitle variant='h5'>자주 묻는 질문</QueTitle>
				
			</TitleContainer>
			<QueSubTitle>추가 문의는 사용자지원센터 📞230-1000</QueSubTitle>
			<CustomList component="nav">
				{ques.map((que)=>{
					if(que.go)
					return (
						<div key={que.title}>
						<RealNonStyleLink to={que.go}>
						<ListItem button  color={'#000000'}>
							<ListItemText primary={<SelectListText>Q. {que.title}</SelectListText>} 
								secondary={<SelectListSubText>A. {que.content} (클릭하면 이동합니다)</SelectListSubText>} />
						</ListItem>
						</RealNonStyleLink>
						<BlackDivider component="li" />
						</div>

					);
					else
					return(
						<div key={que.title}>
						<ListItem button  color={'#000000'}>
							<ListItemText primary={<SelectListText>Q. {que.title}</SelectListText>} 
								secondary={<SelectListSubText>A. {que.content}</SelectListSubText>} />
						</ListItem>
						<BlackDivider component="li" />
						</div>
					)
				})}
				
			</CustomList>
		</QueContainer>
    );
}
export default ManyQues;