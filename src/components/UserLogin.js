import React, {useState} from 'react';
import { makeStyles, Avatar, Typography, TextField, Button } from '@material-ui/core';
import {userIdValid,  userPWValid } from '../utils/validation'; 
import {NonStyleLink} from './NonStyleRouter';
import styled from 'styled-components';
const useStyles = makeStyles(theme => ({
	avatar: {
		background: '#3986F7',
		height: '60px',
		width: '60px',
	},
	loginTitle:{
		color: '#091A27',
		width: 'auto',
		overflow: 'hidden',
	},
	top: {
		width: '30%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		    margin: '10%',
		flexDirection: 'column'
	},
	form: {
		display: 'grid',
		width: 'calc(70% - 60px)',
		gridRowStart: '2',
		gridRowEnd: '3',
		gridTemplateRows: '1fr 1fr 1fr',
		gridRowGap: '12px',
		padding: '30px',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '100%',
		fontSize: '20px'
	},
	textfield: {
		alignSelf: 'center',
		margin: theme.spacing(1),
		textAlign: 'center',
	},
	colorBtn:{
		width: '100%',
		fontSize: '20px',
		textAlign: 'center',
	}
}));
const MainContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

function UserLogin ({authLoginStart}) {
	const classes = useStyles();
	
	const [inputs, setInputs] = useState({
		userId: '',
		userPW:'',
	});
	const [errorCheck, setErrorCheck] = useState({
		userId: true,
		userPW: true,
	});
	
	function onChange (e) {
		const { value, id} = e.target; // 우선 e.target 에서 name 과 value 를 추출
		let valid = false;
		setInputs({
			...inputs,
			[id]: value
		});
		switch(id){
			case 'userId':
				valid = userIdValid(value);
				break;
			case 'userPW':
				valid = userPWValid(value);
				break;
			default:
				break;
		}
		
		setErrorCheck({
			...errorCheck,
			[id]: !valid
		});
	}
	const onReset = () => {
		setInputs({
			userId: '',
			userPW:'',
		});
		setErrorCheck({
			userId: true,
			userPW: true,
		});
		document.getElementById('loginForm').reset();
	};
	
	function validCheck() {
		let valid = true;
		
		for(let key in errorCheck){
			let error  = errorCheck[key];
			if(error === true) {
				valid = false;
				alert("제대로 작성해주세요!")
				break;
			}
		}
		if(valid){
			onReset();
			authLoginStart(inputs);
		} 		
	};
	
	function onEnter(e) {
		if(e.keyCode === 13) {
			validCheck();
		}
	}
	return (
		<MainContainer>
			<div className={classes.top}>
				<Avatar className={classes.avatar}>
				</Avatar>
				<Typography className={classes.loginTitle} component="h1" variant="h5">
				  로그인
				</Typography>
			</div>
			
			<form className={classes.form} id="loginForm" autoComplete="off">
				<TextField className={classes.textfield} id="userId" onChange={onChange}
				error={errorCheck['userId']}
				label="군번" variant="outlined" required/>
				<TextField className={classes.textfield} id="userPW" onChange={onChange} onKeyDown={onEnter}
					error={errorCheck['userPW']}
					label="비밀번호" type="password" variant="outlined" required 
				/>
				<Button id="loginButton" className={classes.button} variant="contained" color="primary" onClick={validCheck}>
					로그인
				</Button>
				<NonStyleLink to="/register"  className={classes.colorBtn}>		
					<Typography variant="h6" className={classes.colorBtnText}>회원가입하기</Typography>
				</NonStyleLink>
			</form>
		</MainContainer>
	);
	
}

export default UserLogin;