import React, {useState, useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles, Typography, TextField ,Divider, Button } from '@material-ui/core';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {RealNonStyleLink} from './NonStyleRouter';
import { useLocation } from 'react-router-dom';
import { serverGetMyUserInfo} from '../api/serverAuthentication';
import getTeamInfo from '../utils/getTeamInfoByCode.js';
//collpaso 메모

const BackIcon = styled(ArrowBackIcon)`
	padding: 5px;
	border-radius: 50%;
	background-color: #3986F7;
	color: white;
	font-size: 1.8rem;
	cursor: pointer;
	justify-self: flex-start;
`;

const MainContainer = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

const MainTitle = styled(Typography)`
	margin: 15px;
	font-size: 2rem;
	font-weight: 500;
    margin-right: 10%;
`;

const MainForm = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
	width: 100%;
`;

const SmallApplyText = styled(TextField)`
	width: 80%;
	margin: 15px;
`;

const ApplyButton = styled(Button)`
	font-size: 1.8rem;
	width: 40%;
	margin-bottom: 15px;
`;

const TeamInfo = styled(Typography)`
	align-self: flex-end;
	margin: 5px 15px 5px 5px;
	font-size: 1rem;
	font-weight: 500;
`;

const RowContainer =styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 90%;	
`;

const MainTitleContainer=styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;	
`;

function ApplyForm({formInfo, workAddStart, isLogin}) {
	const history = useHistory();
	
	// 렌더시 추가 밸류들 state에 추가
	useEffect(()=>{ 
		let values = {}; 
		formInfo.infos.forEach(info => values[info.id] = '');
		setInputs({...inputs, ...values});
	},[formInfo]);
	
	useEffect(()=>{
		(async function getDataFromServer() {
			try{
				let userInfo = await serverGetMyUserInfo();
				setData(userInfo);
			} catch (err) {
				alert("로그인 정보가 존재하지 않습니다.");
				history.push('/login');
			}
		})();
	},[]);
	
	function setData(userInfo) {
		let {userRank, userName, userUnit, userTel,isWorker } = userInfo;
		setInputs({workUserRank: userRank, workUserName: userName, 
				   workUserUnit: isWorker ? ("정보통신부대 " + userUnit):userUnit, workUserTel: userTel});
		
	}
	
	const [inputs, setInputs] = useState({
		workUserRank: '',
		workUserName: '',
		workUserUnit: '',
		workUserTel: '',
	});
	const onChange = (e) => {
		let { value, id} = e.target; 
		id = id ? id : e.target.name;
		setInputs({
			...inputs,
			[id]: value 
		});
	}
	
	function makeWorkInfo(){
		let workInfo = inputs;
		workInfo["workOtherInfo"] = `제목:${formInfo.title};`;
		formInfo.infos.forEach(info=>{
			workInfo["workOtherInfo"] += `${info.label}:${inputs[info.id]};`
		})
		workInfo["workUserType"] = formInfo.mainWorker;
		return workInfo;
	}
	function makeSubWorkInfo(){
		let workInfo = inputs;
		workInfo["workOtherInfo"] = `제목:${formInfo.subTitle};`;
		formInfo.infos.forEach(info=>{
			workInfo["workOtherInfo"] += `${info.label}:${inputs[info.id]};`
		})
		workInfo["workUserType"] = formInfo.subWorker;
		return workInfo;
	}
	
	
	function checkValidAndApply () {
		let tempForm = document.getElementById('applyForm');
		if(tempForm.checkValidity()){
			if(window.confirm("정말로 신청하시겠습니까?")){
				let workInfo = makeWorkInfo(); 
				workAddStart({workInfo:workInfo,reset: onReset})
				if(formInfo.sub){
					let subInfo = makeSubWorkInfo(); 
					workAddStart({workInfo:workInfo,reset: ()=>{}})
				}
			}
		}
		else {
			alert("입력창을 다 채워주세요.");
		}
	}
	function onReset() {
		let tempForm = document.getElementById('applyForm');
		tempForm.reset();
		window.location.href = '/main'
	}
	const mainInfo = getTeamInfo(formInfo.mainWorker);
	const subInfo = getTeamInfo(formInfo.subWorker);
    return (
		<MainContainer>
			<RowContainer>
				<BackIcon onClick={history.goBack}/>
				<MainTitleContainer><MainTitle variant="h4">{formInfo.title}</MainTitle></MainTitleContainer>
			
			</RowContainer>
			
			<TeamInfo>담당부서: {mainInfo.name}/연락처: {mainInfo.call} </TeamInfo>
			<MainForm id="applyForm">
				<SmallApplyText label="계급" id="workUserRank" variant="outlined" 
					value={inputs['workUserRank'] || ''} onChange={onChange} required/>
				<SmallApplyText label="이름" id="workUserName" variant="outlined" 
					value={inputs['workUserName'] || ''} onChange={onChange} required/>
				<SmallApplyText label="전화번호" id="workUserTel" variant="outlined" 
					value={inputs['workUserTel'] || ''} onChange={onChange} required/>
				<SmallApplyText label="소속" id="workUserUnit" variant="outlined" 
					value={inputs['workUserUnit'] || ''} onChange={onChange} required/>
				{formInfo.infos.map((info, i)=>{
					return(
						<SmallApplyText key={i} label={info.label} id={info.id} multiline={info.multiline} 
							rows={info.rows} variant="outlined"  onChange={onChange} required/>
					);
				})}
				
			</MainForm>
			<ApplyButton variant="contained" color="primary" onClick={checkValidAndApply}>신청하기</ApplyButton>
		</MainContainer>
    );
}
export default ApplyForm;