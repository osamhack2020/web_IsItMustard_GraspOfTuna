import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import ManyQues from '../components/ManyQues';
import { Route, Redirect} from 'react-router-dom';
import {formLocation, formContent, formReason, formMoveLocation, formNowLocation, formIp} from '../utils/formData.js';


const mainOptions = [{name: "고장", go: "/broken", detail: "전화기가 말썽인가요?"},
				   {name: "신설(증설)", go: "/new", detail: "전화기를 추가하거나 같은 번호를 쓰는 전화를 늘리고 싶나요?"},
				   {name: "지원", go: "/rent", detail: "전화기를 임시적으로 지원해드릴까요?"},
				   {name: "이전", go: "/move", detail: "전화기의 위치를 이전해드릴까요?"},
					{name: "기타", go: "/other", detail: "여기에 찾는 게 없으신가요?"},]
const brokenOptions = [{name: "전화기 본체", go: "/body", detail: "전화기 본체가 이상해요."},
				   {name: "전화기 회선", go: "/line", detail: "전화기 통화가 잘 안돼요."},
				   {name: "잘 모르겠음", go: "/other", detail: "무슨 문제인지 잘 모르겠어요."},]

const otherOptions = [{name: "그룹화", go: "/group", detail: "여러 전화기를 묶어서 전화를 한번에 받고 싶어요."},
					 {name: "전화번호 변경", go: "/change", detail: "전화 번호를 변경하고 싶어요."},
					 {name: "등급 변경", go: "/grade", detail: "전화의 등급을 변경하고 싶어요."},
					 {name: "전화 단축키", go: "/quick", detail: "전화의 단축키에 번호를 등록하고 싶어요."},]

let linkStack=[{name:'전화기', loc:'/call',}]

const brokenBodyFormInfo = {
	title: "전화기 본체 수리 작업",
	subTitle: "",
	mainWorker: "ce",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const brokenLineFormInfo = {
	title: "전화기 회선 수리 작업",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		formIp
	]
}

const brokenOtherFormInfo = {
	title: "전화기 수리 작업",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		formIp
	]
}

const newFormInfo = {
	title: "전화기 신설(증설)",
	subTitle: "",
	mainWorker: "ce",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "신설(증설) 전화번호",
			rows: 1,
			id: "workCall",
		},
		{
			label: "신설(증설) 개수",
			rows: 1,
			id: "workCallCount",
		},
		formLocation,
		formReason
	]
}



const rentFormInfo = {
	title: "전화기 지원",
	subTitle: "",
	mainWorker: "ce",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "지원 전화번호",
			rows: 1,
			id: "workCall",
		},
		{
			label: "지원 개수",
			rows: 1,
			id: "workCallCount",
		},
		formLocation,
		formReason
	]
}


const moveFormInfo = {
	title: "전화기 이전",
	subTitle: "",
	mainWorker: "ce",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}

const groupFormInfo = {
	title: "전화기 그룹화",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "그룹화할 번호들",
			multiline: true,
			rows: 2,
			id: "workCalls",
		},
		formReason
	]
}
const changeFormInfo = {
	title: "전화기 번호 변경",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "현재 번호",
			rows: 1,
			id: "workCallBefore",
		},
		{
			label: "옮길 번호",
			rows: 1,
			id: "workCallAfter",
		},
		formReason
	]
}
const gradeFormInfo = {
	title: "전화기 등급 변경",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "변경할 번호",
			rows:1,
			id: "workCall",
		},
		formReason
	]
}

const quickFormInfo = {
	title: "전화기 단축키",
	subTitle: "",
	mainWorker: "nm",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "추가할 번호",
			rows:1,
			id: "workCall",
		},
		formReason
	]
}

let ques = [
	{
		title: "전화기가 고장났는데 어디 문제인지 모르겠어요.",
		go: '/call/broken/other',
		content: '네트워크 관리과에서 먼저 테스트 해봐야 합니다.'
	},
	{
		title: "그룹화가 뭔가요?",
		content: '그룹화는 여러 개의 번호를 묶어서 묶인 번호의 전화를 서로 자유롭게 받을 수 있게 합니다.'
	},
	{
		title: "신설과 증설의 차이는 뭔가요?",
		content: '증설은 존재하는 전화기의 번호로 걸려온 전화를 받는 다른 전화기를 설치하는 겁니다.'
	},
	{
		title: "아날로그 전화기 관련 문의가 하고 싶어요.",
		go: '/other',
		content: '기타 장비에서 찾으실 수 있습니다.'
	}
	
]
function CallMain () {
	return (<SelectList options={mainOptions} about={'전화기에 대해서 무엇을 도와드릴까요?'} />);
}

function CallBroken() {
	return (<SelectList options={brokenOptions} about={'고장의 종류를 골라주세요.'} />);
}

function CallBrokenBody(){
	return(<ApplyFormContainer formInfo={brokenBodyFormInfo}/>)
}
function CallBrokenLine(){
	return(<ApplyFormContainer formInfo={brokenLineFormInfo}/>)
}
function CallBrokenOther(){
	return(<ApplyFormContainer formInfo={brokenOtherFormInfo}/>)
}

function CallNew(){
	return(<ApplyFormContainer formInfo={newFormInfo}/>)
}
function CallRent(){
	return(<ApplyFormContainer formInfo={rentFormInfo}/>)
}
function CallMove(){
	return(<ApplyFormContainer formInfo={moveFormInfo}/>)
}

function CallOther() {
	return (<><SelectList options={otherOptions} about={'전화기에 대해서 무엇을 도와드릴까요?'} /><ManyQues ques={ques}/></>);
}

function CallOtherGroup(){
	return(<ApplyFormContainer formInfo={groupFormInfo}/>)
}
function CallOtherChange(){
	return(<ApplyFormContainer formInfo={changeFormInfo}/>)
}
function CallOtherGrade(){
	return(<ApplyFormContainer formInfo={gradeFormInfo}/>)
}
function CallOtherQuick(){
	return(<ApplyFormContainer formInfo={quickFormInfo}/>)
}

function Call() {
    return (
		<>
		<Route exact path="/call" component={CallMain}/>
		<Route exact path="/call/broken" component={CallBroken}/>
		<Route exact path="/call/broken/body" component={CallBrokenBody}/>
		<Route exact path="/call/broken/line" component={CallBrokenLine}/>
		<Route exact path="/call/broken/other" component={CallBrokenOther}/>
		<Route exact path="/call/new" component={CallNew} />
		<Route exact path="/call/rent" component={CallRent} />
		<Route exact path="/call/move" component={CallMove} />
		<Route exact path="/call/other" component={CallOther} />
		<Route exact path="/call/other/group" component={CallOtherGroup} />
		<Route exact path="/call/other/change" component={CallOtherChange} />
		<Route exact path="/call/other/grade" component={CallOtherGrade} />
		<Route exact path="/call/other/quick" component={CallOtherQuick} />
		</>
		
    );
}
export default Call;
 