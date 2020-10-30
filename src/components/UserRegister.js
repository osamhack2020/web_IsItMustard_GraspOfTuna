import React, {useState, useEffect, useCallback} from "react";
import { makeStyles, Avatar, Typography, TextField, Checkbox, FormControlLabel, Button, RadioGroup, FormControl, FormLabel, Radio, Select, InputLabel, MenuItem } from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {userIdValid, userTelValid, userRankValid, userNameVaild, userPWValid, userUnitValid } from '../utils/validation';
import {useHistory} from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	container: {
		display: 'grid',
		gridTemplateRows: '1fr 4fr',
	},
	avatar: {
		margin: theme.spacing(1),
		background: '#3986F7',
	},
	top: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	form: {
		gridColumnStart: '1',
		gridColumnEnd: '2',
		display: 'grid',
		gridTemplateRows: 'repeat(7, 1fr)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	end: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: { //이거때메 약관 동의가 안보이자나..
		width: '70%',
		fontSize: '20px',
		textAlign: 'center',
	},
	textfield: {
		alignSelf: 'center',
		margin: theme.spacing(1),
	},
	textfieldLarge: {
		margin: theme.spacing(1),
		width: '97%',
	},
	check: {
		userSelect: 'none'
	},
	radio: {
		display: 'flex',
		flexDirection:'row'
	},
	selectForm:{
		width: '100%'
	},
	inputContainer:{
		display: 'flex',
		justifyContent: 'center'
	}
}));

const workerUnits = ["유선장비정비과", "무선음향정비과", "라인PC정비과", "회의FAX지원과", "쳬계관제과", "네트워크관리과", "정보보안과", "체계관리과", "개발과"]

function Register({authRegisterStart, registerStatus, authRegister}) {
	// 회원 가입 화면 컴포넌트
    const classes = useStyles();
	const history = useHistory();
	const [inputs, setInputs] = useState({
		userId: '',
		userTel: '',
		userUnit: '',
		userRank: '',
		userName: '',
		userPW:'',
		userPWAgain: ''
	});
	
	const [errorCheck, setErrorCheck] = useState({ // 에러 여부를 담는 state
		userId: true,
		userTel: true,
		userUnit: true,
		userRank: true,
		userName: true,
		userPW: true,
		userPWAgain: true,
		checkBox: true,
	});
	
	const [isWorker, setIsWorker] = useState('notWorker');
	
	const moveToLogin = useCallback(() => {	
		if(registerStatus === 'SUCCESS'){
			history.push(`login`);
			authRegister();
		}	
	}, [registerStatus]);
	
	useEffect(() => { // 회원가입 성공시 1회용 이동용
		moveToLogin();
	}, [moveToLogin]);

	
	const handleRadioChange = (e) => {
		setIsWorker(e.target.value);
	}
	
	const onChange = (e) => {
		let { value, id} = e.target; // 우선 e.target 에서 name 과 value 를 추출
		id = id ? id : e.target.name;
		let valid = true;
		let isDiffer = false;
		setInputs({
			...inputs, // 기존의 input 객체를 복사한 뒤
			[id]: value // name 키를 가진 값을 value 로 설정
		});
		switch(id){
			case 'userId':
				valid = userIdValid(value);
				break;
			case 'userTel':
				valid = userTelValid(value);
				break;
			case 'userUnit':
				valid = userUnitValid(value);
				break;
			case 'userRank':
				valid = userRankValid(value);
				break;
			case 'userName':
				valid = userNameVaild(value);
				break;
			case 'userPW':
				valid = userPWValid(value);
				if(valid){
					isDiffer = (value !== inputs['userPWAgain']);
				}
				break;
			case 'userPWAgain':
				valid = (value === inputs['userPW']);
				break;
			default:
				break;
		}
		
		if(isDiffer){
			setErrorCheck({ ...errorCheck, [id]: !valid, userPWAgain: isDiffer});
		}
		else {
			setErrorCheck({
				...errorCheck,
				[id]: !valid
			});
		}
	};
	
	function onCheck(event) {
		setErrorCheck({
			...errorCheck,
			checkBox: !event.target.checked
		});
		
	}
	const onReset = () => {
		setInputs({
			userId: '',
			userTel: '',
			userRank: '',
			userUnit: '',
			userName: '',
			userPW:'',
			userPWAgain: '',
		});
		setErrorCheck({
			userId: true,
			userTel: true,
			userRank: true,
			userUnit: true,
			userName: true,
			userPW: true,
			userPWAgain: true,
			checkBox: true,
		});
		document.getElementById('loginForm').reset();
	};
	
	function validCheck(){
		let valid = true;
		
		for(let key in errorCheck){
			let error  = errorCheck[key];
			if(error === true) {
				valid = false;
				alert("제대로 작성해주세요!")
				return false;
			}
		}
		if(valid){
			let tempWorker = (isWorker === "worker") ? true : false;
			authRegisterStart({...inputs, isWorker: tempWorker}, onReset);
		}
	}
	
    return (
		<div className={classes.container}>
			<div className={classes.top}>
				<Avatar className={classes.avatar}>
				  <LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
				  회원가입
				</Typography>
			</div>
			<form className={classes.form} id="loginForm" autoComplete="off">
				<div className={classes.inputContainer}>
					<TextField className={classes.textfield} id="userId" onChange={onChange}
					error={errorCheck['userId']}
					label="군번" variant="outlined" required helperText="아이디로 사용됩니다"/>
					<TextField className={classes.textfield} id="userTel" onChange={onChange} 
					error={errorCheck['userTel']} helperText=" "
					label="군내번호" variant="outlined" required/>
				</div>
				<div  className={classes.inputContainer}>
					<FormControl component="fieldset" >
						<FormLabel component="legend">정보통신부대이신가요?</FormLabel>
						<RadioGroup aria-label="gender" name="worker" value={isWorker} onChange={handleRadioChange} className={classes.radio}>
							<FormControlLabel value={'notWorker'} control={<Radio />} label="타부대" />
							<FormControlLabel value={'worker'} control={<Radio />} label="정보통신부대" />
						</RadioGroup>
					</FormControl>
				
				</div>
				{isWorker==='worker' ? 
				<div  className={classes.inputContainer}>
					<FormControl className={classes.selectForm} id="userUnit" error={errorCheck['userUnit']}>
						<InputLabel id="demo-simple-select-label">소속부대</InputLabel>
						<Select
						labelId="userUnit"
						id="userUnit"
						name='userUnit'
						value={inputs['userUnit']}
						onChange={onChange}
						>
						{workerUnits.map((workerUnit,i) => (<MenuItem key={i} value={workerUnit} id="userUnit">{workerUnit}</MenuItem>) )}
					</Select>
					</FormControl>
				</div>
				: 
				<div  className={classes.inputContainer}>
					<TextField className={classes.textfieldLarge} id="userUnit" onChange={onChange}
					error={errorCheck['userUnit']}
					label="소속부대" variant="outlined" required helperText="반, 소대 단위까지 적어주세요."/>
				</div>
				}
				
				<div  className={classes.inputContainer}>
					<TextField className={classes.textfield} id="userRank" onChange={onChange} 
					error={errorCheck['userRank']} 
					label="계급" variant="outlined" required />
					<TextField className={classes.textfield} id="userName" onChange={onChange} 
					error={errorCheck['userName']}
					label="이름" variant="outlined" required/>
				</div>
				<div  className={classes.inputContainer}>
					<TextField className={classes.textfield} id="userPW" onChange={onChange} 
					error={errorCheck['userPW']}
					label="비밀번호" type="password" variant="outlined" required 
					helperText="영문,숫자,특수문자를 포함해"/>
					<TextField className={classes.textfield} id="userPWAgain" onChange={onChange} 
					error={errorCheck['userPWAgain']}
					helperText="6자리 이상으로 해주세요."
					label="비밀번호 확인" type="password" variant="outlined" required/>
				</div>
				<div className={classes.end}>
					<FormControlLabel className={classes.check} control={<Checkbox value="allowExtraEmails" color="primary" onChange={onCheck}/>}
					label="체크하시면, 약관에 동의합니다."  required/>
					<Button className={classes.button} variant="contained" color="primary" onClick={validCheck}>
						회원가입
					</Button>
				</div>
			</form>
		</div>
    );
}
export default Register;
 