import React,{useEffect, useState} from "react";
import {serverWorkGetByNum, serverWorkUpdate, serverWorkDelete, serverWorkDone, serverWorkDeny} from '../api/serverWork.js';
import { useHistory } from "react-router";
import { Collapse,IconButton,Table,TableBody,TableCell,TableContainer,TableHead,
		TableRow,Typography,Paper, Box, Button,TextField, InputLabel, MenuItem, FormHelperText, FormControl, Select  } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import styled from 'styled-components';


let status ={
	w: "작업중",
	f: "작업완료",
	n: "작업거부"
}

const ButtonContainer = styled.div`
	display: flex;
	margin: 15px;
    justify-content: flex-end;
`;

const HotButton = styled(Button)`
	margin: 0 5px 0 5px;
`;

const FullTextField = styled(TextField)`
	width: 90%;
`;

const MiddleTextField = styled(TextField)`
	width: 50%;
`;
const ColorFulTableRow = styled(TableRow)`  
	 background-color: ${(props) => 
		 props.status === "작업완료" ? "darkgrey" : props.status === "작업거부" ? "bisque" : "white"
	 };
`;

function changeToTow(time) {
	if(Number(time) < 10)
		return "0" + time;
	return time;
}

function getStrDate (dateTime) {
	let tempDT = new Date(dateTime);
	return `${tempDT.getMonth() + 1}/${tempDT.getDate()} ${changeToTow(tempDT.getHours())}:${changeToTow(tempDT.getMinutes())}`;
}

function Pretreatment(copyWork) {
	if(!copyWork.workOtherInfo.length) return ;
	let datas = copyWork.workOtherInfo.split(";");
	let madeDatas = datas.map((data)=> {
		return(data.split(":"));
	})
	if(copyWork["workEndTime"]){
		copyWork["workEndTime"] = getStrDate(copyWork["workEndTime"]);	
	}
	copyWork["workRegisterTime"] = getStrDate(copyWork["workRegisterTime"]);	
	
	copyWork["workTitle"] = madeDatas[0][1];
	madeDatas.shift();
	madeDatas.pop();
	copyWork["workStatus"] = status[copyWork["workStatus"]];
	copyWork["workOther"] = madeDatas;

	return copyWork;
}

function Row({work, my}){
	const [open, setOpen] = useState(false);
	const [workInfo, setWorkInfo] = useState({});
	const [edit, setEdit]= useState(false);
	
	const [processing, setProcessing]= useState({
		process: false,
		mode: 'init'
	});
	const [inputs, setInputs] = useState({});
	useEffect(()=>{
		let tempWork = {...work};
		setWorkInfo(Pretreatment(tempWork));
		tempWork["workOther"].forEach((wo)=>{
			inputs[wo[0]] = wo[1];
		});
	},[])
	
	
	const onChange = (e) => {
		let { value, id} = e.target; // 우선 e.target 에서 name 과 value 를 추출
		id = id ? id : e.target.name;
		setInputs({
			...inputs, // 기존의 input 객체를 복사한 뒤
			[id]: value // name 키를 가진 값을 value 로 설정
		});
	};
	
	const handleEdit = async () => {
		let str = `제목:${workInfo["workTitle"]};`;
		let temp = [];
		Object.keys(inputs).forEach((inputKey)=>{
			temp.push([inputKey,inputs[inputKey]])
			str += `${inputKey}:${inputs[inputKey]};`;
		});
		try{
			await serverWorkUpdate({workId:workInfo["workId"], workOtherInfo:str});
			setEdit(false);
			setWorkInfo({...workInfo,workOther: temp});
			alert("갱신 성공!");
			window.location.reload();
		} catch(err){
			setEdit(false);
			alert("갱신 실패!");
		}
		
	}
	const handleDelete = async () => {
		let check = window.confirm("정말로 삭제하시겠습니까?");
		if(check){
			try{
				await serverWorkDelete({workId:workInfo["workId"]});
				window.location.reload(); // 컴포넌트 리렌더링을 위해 ^^ 더좋은 방법 있으면 바꾸자
				alert("삭제 성공!");
			} catch(err){
				alert("삭제 실패!");
			}
		}
	}
	const handleProcess = async()=>{
		let check = window.confirm("정말로 변경하시겠습니까?");
		if(processing.process === false || processing.mode === 'init' || !check) {
			return ;
		}
			
		else{
			let wc = document.getElementById('workComment').value;
			try{
				if(processing.mode === 'deny'){
					await serverWorkDeny({workId:workInfo["workId"], workComment:wc});
				}
				else{
					await serverWorkDone({workId:workInfo["workId"], workComment:wc});
					
				}
				window.location.reload();
			} catch(err){
				alert("수정 실패!");
			}
			
		}
	}

	function ProcessingButton () {
		const [reason, setReason] = useState('');
		if(processing.process === true){
			return (
			
			<ButtonContainer>
			 <MiddleTextField variant="outlined" label={processing.mode === 'deny' ? "거부 사유" : "내용"}
				 value={reason ? reason : ''} id="workComment" onChange={(e)=>{setReason(e.target.value)}}/>
			<HotButton variant="contained" color="primary" onClick={handleProcess}>
			  확인
			</HotButton>
			<HotButton variant="contained" color="secondary" onClick={()=>{setProcessing({process: false, mode: 'init'})}}>
			  취소
			</HotButton>
			</ButtonContainer>
			);
		}
		else {
			return (
				<ButtonContainer>
			<HotButton variant="contained" color="primary"  onClick={()=>{setProcessing({process: true, mode: 'done'})}}>
			  작업 완료
			</HotButton>
			<HotButton variant="contained" color="secondary" onClick={()=>{setProcessing({process: true, mode: 'deny'})}}>
			  작업 거부
			</HotButton>
			</ButtonContainer>
			);
			
		}
	}
	const EditButton = (<ButtonContainer>
			<HotButton variant="contained" color="primary" onClick={()=>{setEdit(true)}}>
			  수정하기
			</HotButton>
			<HotButton variant="contained" color="secondary" onClick={handleDelete}>
			  삭제하기
			</HotButton>
			</ButtonContainer>)
	const EditingButton = (<ButtonContainer>
			<HotButton variant="contained" color="primary" onClick={handleEdit}>
			 	완료
			</HotButton>
			<HotButton variant="contained" color="secondary" onClick={()=>{setEdit(false)}}>
			 	취소
			</HotButton>
			</ButtonContainer>)
	
	function TabelHeader () {
		return (<ColorFulTableRow status={workInfo.workStatus}>
			<TableCell align="left">{workInfo.workId}</TableCell>
			<TableCell component="th" scope="row">
				{workInfo["workTitle"] }
			</TableCell>
			<TableCell align="right">{workInfo.workUserTel}</TableCell>
			<TableCell align="right">{workInfo.workUserRank}</TableCell>
			<TableCell align="right">{workInfo.workUserName}</TableCell>
			<TableCell align="right">{workInfo.workStatus}</TableCell>
			<TableCell align="right">
				<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
				{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</TableCell>
		</ColorFulTableRow>)
	}
	function StatusEnd () {
		return (
			
			<TableRow>
				<TableCell>{workInfo["workStatus"] === '작업완료' ? "완료:": "거부:" }</TableCell>
				<TableCell colSpan={3}>
					{workInfo["workComment"]}
				</TableCell>
				<TableCell>
					{workInfo["workEndTime"]}
				</TableCell>
			</TableRow>
		);
	}
	return (
		<>
		<TabelHeader/>
		<TableRow>
			<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
			<Collapse in={open} timeout="auto" unmountOnExit>
			<Box margin={1}>
			<Typography variant="h6" gutterBottom component="div">
			상세 정보
			</Typography>
			<Table size="small" aria-label="purchases">
				<TableBody>
					<TableRow>
					<TableCell component="th" scope="row">
					{workInfo.workUserRank}
					</TableCell>
					<TableCell>{workInfo.workUserName}</TableCell>
					<TableCell>{workInfo.workUserTel}</TableCell>
					<TableCell>{workInfo.workUserUnit}</TableCell>
					<TableCell>{workInfo["workRegisterTime"]}</TableCell>
					</TableRow>
					
					{workInfo["workOther"] && workInfo["workOther"].map((other) => {
						return (
							<TableRow key={other[0]}>
								<TableCell>{other[0]}:</TableCell>
								<TableCell colSpan={4}>
									{edit ? <FullTextField defaultValue={other[1]} id={other[0]} onChange={onChange}/> : other[1]}</TableCell>
							</TableRow>
						);			
					})}
					{
						workInfo["workStatus"] !== '작업중'&& <StatusEnd />
					}
				</TableBody>
			</Table>
			</Box>
				{edit ? EditingButton : 
				my ? 
					(workInfo["workStatus"] !== '작업완료') && EditButton :
				(workInfo["workStatus"] === '작업중') && <ProcessingButton />}
			</Collapse>
			
			</TableCell>
			
		</TableRow>
		</>
    );
}

const FilterContainer = styled.div`
	margin: 10px;
    display: grid;
    grid-auto-flow: column;
`;

const StyledFormCon = styled(FormControl)`
	width: 130px;
	margin-right: 5px;
	justify-self: right;
`;
const SearchText = styled(TextField)`
`;

function ShowWorks({my}) {
	const [getWorks, setGetWorks] = useState([]);
	const [works, setWorks] = useState([]);
	const [query, setQuery] = useState("");
	const [type, setType] = useState("a");
	const [search, setSearch] = useState("workOtherInfo");
	const handleSearchChange=(e)=>{
		setSearch(e.target.value);
	}
	const handleTypeChange=(e) => {
		setQuery("");
		setType(e.target.value);
	};
	const history = useHistory();
	useEffect(()=>{
		(async function getDataFromServer() {
			try{
				let temp = await serverWorkGetByNum({start:1, end:2,my:my});
				temp.reverse();
				setGetWorks(temp);
				setWorks(temp);
			} catch(err) {
			}
			
		})();
		
	},[]);
	
	useEffect(()=>{
		if(!getWorks.length) return ;
		let temp = getWorks.filter(work => {
			
			if(type === "a"){
				if(work)
					return(work[search].search(query) !== -1)
				else 
					return true;
			}	
			else
				if(work)
					return(work["workStatus"] === type && work[search].search(query) !== -1);
				else 
				   return(work["workStatus"] === type);
		});
		setWorks(temp);
	},[type,query]);

	return (
		
    <TableContainer component={Paper}>
		<FilterContainer>
		
		<div>
		<StyledFormCon>
			<InputLabel>검색 유형</InputLabel>
			<Select
			  value={search}
			  onChange={handleSearchChange}
			>
				<MenuItem value={"workOtherInfo"}>제목 및 내용</MenuItem>
				<MenuItem value={"workUserName"}>신청자 이름</MenuItem>
				
			</Select>
		</StyledFormCon>
		<SearchText label="검색할 텍스트" value={query ? query : ""} onChange={(e)=>{setQuery(e.target.value)}}/>
		</div>
		<StyledFormCon>
			<InputLabel>작업 상태 필터</InputLabel>
			<Select
			  value={type}
			  onChange={handleTypeChange}
			>
				<MenuItem value={"a"}>전체</MenuItem>
				<MenuItem value={"w"}>작업중</MenuItem>
				<MenuItem value={"f"}>작업완료</MenuItem>
				<MenuItem value={"n"}>작업거부</MenuItem>
			</Select>
		</StyledFormCon>
		</FilterContainer>
		<Table aria-label="collapsible table">
		<TableHead>
		  <TableRow>
			 <TableCell align="left">신청번호</TableCell>
			<TableCell>제목</TableCell>
			<TableCell align="right">연락처</TableCell>
			<TableCell align="right">계급</TableCell>
			<TableCell align="right">이름</TableCell>
			  <TableCell align="right">상태</TableCell>
			<TableCell />
		  </TableRow>
		</TableHead>
		<TableBody>
		  {works.map((work) => (
			<Row key={work.workId} work={work} my={my}/>
		  ))}
		</TableBody>
		</Table>
    </TableContainer>
  );
    
}
export default ShowWorks;
 