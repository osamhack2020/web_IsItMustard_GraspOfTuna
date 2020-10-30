import React, {useState} from 'react';
import styled from 'styled-components';
import {Typography, Paper, makeStyles } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FlightIcon from '@material-ui/icons/Flight';
import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpsIcon from '@material-ui/icons/Https';
import MouseIcon from '@material-ui/icons/Mouse';
import SpeakerIcon from '@material-ui/icons/Speaker';
import VideocamIcon from '@material-ui/icons/Videocam';
import PrintIcon from '@material-ui/icons/Print';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import { Icon } from '@material-ui/core';
import {RealNonStyleLink} from './NonStyleRouter';

const MainContainer = styled.div`
	display: grid;
`;
const TitleTypo = styled(Typography)`
	font-size: 1.5rem;
	margin: 15px;
	margin-left: 22px;
	margin-bottom: 5px;
`;

const GridContainer = styled.div`
	display: grid;
	margin-left: 24px;
	margin-right: 24px;
	margin-bottom: 24px;
	margin-top: 24px;
	grid-template-columns: repeat(auto-fill, minmax(158px, 1fr));
	grid-gap: 20px;
`;
const ColorContainer = styled.div`
	height: 195px;
	width: 1fr;
	display: grid;
	grid-template-rows: 1fr 1fr;
	grid-template-columns: 1fr;
	justify-content: space-around;
	align-items: center;
	user-select: none;
	justify-self:center;

	background-color: #3986F7;
    border-radius: 5px;
	box-shadow: 0px 0px 20px rgba(37,94,177,0.25);
`;

const ColorDiv = styled.div`
	//background-color: ${props => props.bgcolor};
	//<!--일단 색상값 무시함-->
	height: 100%;
	width: 100%;
	display: grid;
	color: white;	
	justify-content: center;
	align-items: center;
	padding: 10px;
    box-sizing: border-box;
`
const useStyles = makeStyles(theme => ({
		boxIcon: {
			width: '48px',
			height: '48px',
			color: 'white',
			alignSelf: 'center',
			justifySelf: 'center'
		},
    })
);

function CategoryDiv(props) {
	const classes = useStyles();
	let {bgcolor, secondColor, icon, title, content, go} = props;
	return(
		<RealNonStyleLink to={go}>
		<ColorContainer>
			<Icon component={icon} className={classes.boxIcon} tyle={{ fontSize: 50 }}/>
			<ColorDiv bgcolor={bgcolor}>
				<Typography variant='h5'>{title}</Typography>
				<Typography>{content}</Typography>
			</ColorDiv>
		</ColorContainer>
		</RealNonStyleLink>
	);
}

export default function MainGrid() {
	const classes = useStyles();
	return (
		<MainContainer>
			<TitleTypo>어떤 도움이 필요하신가요?</TitleTypo>
			<GridContainer>
				
				<CategoryDiv bgcolor={'#428e9e'} secondColor={'#56b5ca'} icon={PhoneIcon} title='전화기' 
					content='유선 전화기 신설, 수리, 이전 등' go='/call'/>
				<CategoryDiv bgcolor={'#c43434'} secondColor={'#ef5350'} icon={ImportantDevicesIcon} title='인트라넷' 
					content='인트라넷 체계, 장비, 회선 등' go='/intra'/>
				<CategoryDiv bgcolor={'#428e9e'} secondColor={'#56b5ca'} icon={ComputerIcon} title='인터넷' 
					content='인터넷 체계, 장비, 회선 등' go='/internet'/>
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={FlightIcon} title='하늘망' 
					content='하늘망 체계, 장비, 회선 등' go='/air'/>
				<CategoryDiv bgcolor={'#c43434'} secondColor={'#ef5350'} icon={HttpsIcon} title='합동망' 
					content='합동망 체계, 장비, 회선 등' go='/joint'/>
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={MouseIcon} title='주변 기기' 
					content='마우스, 키보드, 모니터 등' go='/part' />
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={VideocamIcon} title='회의 지원' 
					content='일반 회의 및 화상 회의 지원' go='/conference' />
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={SpeakerIcon} title='행사 지원' 
					content='기타 음향 장비 행사 지원' go='/ceremony' />
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={PrintIcon} title='FAX' 
					content='군용 및 상용 FAX 송수신' go='/fax' />
				<CategoryDiv bgcolor={'#508b61'} secondColor={'#66af7b'} icon={DevicesOtherIcon} title='기타' 
					content='핫라인, 인터컴, 마이크/앰프, 케이블 TV, 등' go='/other' />
			</GridContainer>
		</MainContainer> 
	);
}