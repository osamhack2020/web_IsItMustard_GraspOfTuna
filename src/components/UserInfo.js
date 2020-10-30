import React, {useState, useEffect} from 'react';
import {Typography, TextField, Button, InputAdornment,  } from '@material-ui/core';
import {userTelValid, userRankValid, useridVaild, userPWValid, userUnitValid } from '../utils/validation';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import qs from 'qs';
import { serverGetMyUserInfo} from '../api/serverAuthentication';

const InfoRoot=styled.div`
	display: flex;
	flex-direction: column;
	margin: 15px;
`;

const InfoBackground = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(1fr, 2fr));
	
`;

const InfoTitle = styled(Typography)`
	grid-column-start: span 2;
	align-self: start;
	margin-bottom: 20px;
`;

const InfoLine = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
margin-right: 15px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`;

const InfoBigLine = styled.div`
	margin-top: 15px;
	margin-right: 15px;
margin-bottom: 15px;
	display: grid;
	grid-column-start: 1;
	grid-column-end: 3;
	grid-template-columns: 4fr 13fr;

	@media (max-width: 768px) {
		grid-column-start: 1;
		grid-column-end: 2;
	}
`;


const InfoLineKey = styled(Typography)`
	font-weight: 700;
	font-size: 1.1rem;
	align-self: center;
`;

const InfoLineValue = styled(Typography)`
	font-size: 1.1rem;
	align-self: center;
	justify-self: left;
`;

const InfoLineTextField = styled(TextField)`
	width: 100%;
	margin-right: 15px;
	border-color: black;
	justify-self: left;
`;

const InfoLineEditIcon = styled(EditIcon)`
	color: gray;
	cursor: pointer;
	font-size: 1.1rem;
`;

const InfoEditButton = styled(Button)`
	grid-column-start: 1;
	grid-column-end: 3;
	width: 300px;
	justify-self: center;
	margin: 30px;
	@media (max-width: 768px) {
		grid-column-start: 1;
		grid-column-end: 2;
	}
	padding: 15px;
	font-size: 1.1rem;
`;


function UserInfoLine ({infoKey, infoValue, editable, big, id, onChange, error, pw}) {
	const [edit, setEdit] = useState(false);
	
	
	const toggleEdit = () => {
		setEdit(!edit);
	}

	if(big)
		return (	
		<InfoBigLine>
			<InfoLineKey>{infoKey}</InfoLineKey>
			{editable ? <InfoLineTextField 
				InputProps={{ endAdornment: <InputAdornment position="end" ><InfoLineEditIcon onClick={toggleEdit}/></InputAdornment >, 
					readOnly: !edit, style: {fontSize: '1.1rem'}}}  
			 defaultValue={infoValue} label={edit? '수정하기' : ''} variant='outlined' id={id} onChange={onChange} error={edit ? error : false} type={pw? 'password' : ''}/>	 
					:<InfoLineValue>{infoValue}</InfoLineValue>}
		</InfoBigLine>
		);
	else
		return (
		<InfoLine>
			<InfoLineKey>{infoKey}</InfoLineKey>
			{editable ? <InfoLineTextField 
				InputProps={{
					endAdornment: <InputAdornment position="end" ><InfoLineEditIcon onClick={toggleEdit}/></InputAdornment >, 
					readOnly: !edit, style: {fontSize: '1.1rem'}}}  
			 defaultValue={infoValue} label={edit? '수정하기' : ''} variant='outlined' id={id} onChange={onChange} error={edit ? error : false} type={pw? 'password' : ''}/>	 
					:<InfoLineValue>{infoValue}</InfoLineValue>}
		</InfoLine>
	);
}

export default function UserInfo({location, isLogin,userId, getInfoStart, getUserInfo}) {
	const query = qs.parse(location.search ,{
		ignoreQueryPrefix: true
	});
	const id = (query.userid ? query.userid : false);
	
	useEffect(() => {
		(async function getDataFromServer(){
			try{
				let data = await serverGetMyUserInfo();
				if(data.userId !== id){
					throw {message:"잘못된 접근입니다!"}
				}
				await getInfoStart(id);
			}
			catch(err) {
				alert(err.message ? err.message:"서버 에러!");
				window.location.href = '/main';
			}
		})();	
	}, []);
	
	const [inputs, setInputs] = useState({
		changingUserTel: '',
		changingUserUnit: '',
		changingUserRank: '',
		changingUserPW:'',
		changingUserPWAgain:'',
		changingUserPWCheck: ''
	});
	
	const [errorCheck, setErrorCheck] = useState({
		changingUserTel: true,
		changingUserUnit: true,
		changingUserRank: true,
		changingUserPW:true,
		changingUserPWAgain:true,
		changingUserPWCheck: true
	});

	
	const onChange = (e) => {
		const { value, id} = e.target; 
		let valid = true;
		let isDiffer = false;
		setInputs({
			...inputs, 
			[id]: value 
		});
		
		switch(id){
			case 'changingUserTel':
				valid = userTelValid(value);
				break;
			case 'changingUserUnit':
				valid = userUnitValid(value);
				break;
			case 'changingUserRank':
				valid = userRankValid(value);
				break;
			case 'changingUserPW':
				valid = userPWValid(value);
				if(valid){
					isDiffer = (value !== inputs['changingUserPWAgain']);
				}
				break;
			case 'changingUserPWAgain':
				valid = (value === inputs['changingUserPW']);
				break;
			case 'changingUserPWCheck':
				valid = userPWValid(value);
				break;
			default:
				break;
		}
		if(isDiffer){
			setErrorCheck({ ...errorCheck, [id]: !valid, changingUserPWAgain: isDiffer});
		}
		else {
			setErrorCheck({
				...errorCheck,
				[id]: !valid
			});
		}
	};
	
	const onReset = () => {
		setInputs({
			changingUserTel: '',
			changingUserUnit: '',
			changingUserRank: '',
			changingUserPW:'',
			changingUserPWAgain:'',
			changingUserPWCheck: ''
		});
		setErrorCheck({
			changingUserTel: true,
			changingUserUnit: true,
			changingUserRank: true,
			changingUserPW: true,
			changingUserPWAgain: true,
			changingUserPWCheck: true
		});
		document.getElementById('editForm').reset();
	};
	
	function validCheck(){
		let editInfo = {};
		for(let key in errorCheck){
			
			let error  = errorCheck[key] || (inputs[key] === document.getElementById(key).defaultValue);
			if(!error) {
				
				editInfo[key] = inputs[key];
			}
		}
		if(errorCheck['changingUserPWCheck'] === false){
			//api에 보내기 ^^
		}
	}
	
	
	let auth = isLogin && getUserInfo.userId === userId;
	return(
		<InfoRoot>
		<InfoTitle variant='h4'>유저정보</InfoTitle>
		<form id ="editForm">
		<InfoBackground>
			<UserInfoLine infoKey="이름" infoValue={getUserInfo.userName}/>
			<UserInfoLine infoKey="군번" infoValue={getUserInfo.userId}/>
			<UserInfoLine infoKey="계급" id="changingUserRank" infoValue={getUserInfo.userRank} editable={auth} onChange={onChange} error={errorCheck.changingUserRank}/>
			<UserInfoLine infoKey="군내번호" id="changingUserTel" infoValue={getUserInfo.userTel} editable={auth} onChange={onChange} error={errorCheck.changingUserTel}/>
			<UserInfoLine infoKey={"소속" + (getUserInfo.isWorker ? "(정보통신부대)" : "")} 
				id="changingUserUnit" infoValue={getUserInfo.userUnit} editable={auth} big onChange={onChange} error={errorCheck.changingUserUnit}/>
			<UserInfoLine infoKey="새 비밀번호" id="changingUserPW" editable={auth} onChange={onChange} error={errorCheck.changingUserPW} pw/>
			<UserInfoLine infoKey="새 비밀번호 확인" id="changingUserPWAgain" editable={auth} onChange={onChange} error={errorCheck.changingUserPWAgain} pw/>
			<InfoBigLine>
				<InfoLineKey>{"현재 비밀번호"}</InfoLineKey>
				<InfoLineTextField 
					InputProps={{style: {fontSize: '1.1rem'}}}  
				 defaultValue={''} label={'정보를 수정하시려면 입력해주세요'} variant='outlined' id={"changingUserPWCheck"} 
					onChange={onChange} error={auth ? errorCheck.changingUserPWCheck : false} type={'password'}/>	 
			</InfoBigLine>
			<InfoEditButton variant="contained" color="primary"  onClick={validCheck}>수정하기</InfoEditButton>
		</InfoBackground>
		</form>
		</InfoRoot>
	)

}