import React, {useState,useEffect} from "react";
import { makeStyles, Typography, Button, Paper } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {NonStyleLink} from './NonStyleRouter';
import {useOuterClick} from '../utils/useOuterClick.js';
import '../fonts.css';

const useStyles = makeStyles(theme => ({
		noLoginContainer:{
			display: 'inline',
			alignItems: 'center',
			justifyItems: 'center',
			height: '100%',
			width: 'auto',
			borderRadius: '7px',
		},
		noColBtn:{
			display: 'block',
			marginTop: '5px',
			padding: '20px'
		},
		colorBtnText:{
			fontFamily: 'Noto Sans KR',
			fontSize: '22px',
			marginLeft: '12px',
			marginRight: '12px',
			userSelect:'none',
			color: 'white',
		},
		colorBtn:{
			backgroundColor: '#8fa5ea', //보라색
			height: '100%',
			width: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			color: 'white',
			cursor: 'pointer',
			'&:hover, &focus ': {
				backgroundColor: '#7689C2' // 어두운 \보라색
			},
		},
		userContainer:{
			display: 'block',
			// alignItems: 'center',
			// justifyItems: 'center',
			height: '100%',
			width: 'auto',
			borderRadius: '7px',
			cursor: 'pointer',
		},
		loginIcon:{
			position: 'relative',
			display: 'inline',
			color: 'white',
			userSelect: 'none',
			fontFamily: 'Noto Sans KR',
			width: '34px',
			height: '34px',
			left: '0',
			
			marginLeft: '22px',
			marginRight: '6px',
			top: '9px',
		},
		loginFont:{
			display: 'inline-block',
			fontFamily: 'Noto Sans KR',
			fontSize: '22px',
			marginTop: '26px',
			marginLeft: '12px',
			marginRight: '12px',
			userSelect:'none',
			color: 'white',
		},
		loginArrow:{
			display: 'inline-block',
			color: 'white',
			userSelect: 'none',
			fontFamily: 'Noto Sans KR',
			height: '26px',
			width: '26px',
			
			transform: 'translateY(4px)',
			marginRight: '12px',
		},
		popUpContainer:{
			backgroundColor: 'white',
			position: 'absolute',
			height: 'auto',
			width: 'calc(100% - 20px)',
			top: '10px',
			right: '10px',
			display: 'flex',
			flexDirection:'column',
			alignItems: 'center',
			justifyContent:'space-around',
			
			zIndex: '101',
			boxShadow: '0px 0px 60px rgba(0,0,0,0.2)',
			borderRadius: '7px',
			paddingBottom: '30px',
		},
		popUpButton:{
			fontSize: '20px',
			width: '120px',
			color: 'black',
			border: 'solid 2px #3986F7',
			marginTop: '30px',
		},
    })
);

function TopBarUserInfoPopUp({closePopup, authLogoutStart, isLogin,isWorker, workCount, userId}) {
	const classes = useStyles();
	const innerRef = useOuterClick(closePopup);
	return(
	<Paper ref={innerRef} className={classes.popUpContainer} elevation={5}>
		<NonStyleLink to="/"><Button className={classes.popUpButton} variant="outlined" onClick={authLogoutStart}>로그아웃</Button></NonStyleLink>
		<NonStyleLink to={`/user?userid=${userId}`}>
			<Button className={classes.popUpButton} onClick={closePopup} variant="outlined">계정관리</Button>
		</NonStyleLink>
		{
			isLogin && <NonStyleLink to='/applywork'>
			<Button className={classes.popUpButton} onClick={closePopup}  variant="outlined">
			{`신청(${workCount.apply})`}</Button>
		</NonStyleLink>

		}
		{
			Boolean(isWorker) &&
			<NonStyleLink to='/getwork'>
			<Button className={classes.popUpButton} onClick={closePopup}  variant="outlined">
			{`진행(${workCount.get})`}</Button>
		</NonStyleLink>

		}
	</Paper>
		
	);
}
// 바깥클릭하면 되게 어케하누 ㅠㅠ
function TopBarUserInfoLogin({userRank,userName, authLogoutStart,isLogin,isWorker, workCount, userId}) {
	const classes = useStyles();
	const [isOpen, changeIsOpen] = useState(false);

	const toggleOpen = () => {
		changeIsOpen(!isOpen);
	}
	const closePopup =() => {
		if(isOpen)
			changeIsOpen(false);
	}
	return(
	<>
		<div className={classes.userContainer} onClick={toggleOpen}>
			<AccountCircleIcon className={classes.loginIcon} />
			<div className={classes.loginFont}>{userRank + ' ' + userName}</div>
			<KeyboardArrowDownIcon className={classes.loginArrow}/>
		</div>
		{isOpen ? <TopBarUserInfoPopUp closePopup={closePopup}  isLogin={isLogin} isWorker={isWorker} workCount={workCount} userId={userId}
					  authLogoutStart = {authLogoutStart}/> :<></>}
	</>
	);
}

function TopBarUserInfoNotLogin() {
	const classes = useStyles();
	return(
	<div className={classes.noLoginContainer}>
		<NonStyleLink to="/login" className={classes.noColBtn}>
			<Typography className={classes.colorBtnText}>로그인/회원가입</Typography>
		</NonStyleLink>
	</div>
	);
	
}
		

function TopBarUserInfo(props) {
	
	return(<> 
		{props.isLogin ? <TopBarUserInfoLogin {...props}/> : 
		 <TopBarUserInfoNotLogin />}
		</>);
    
}
export default TopBarUserInfo;