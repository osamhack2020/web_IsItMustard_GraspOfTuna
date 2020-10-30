import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route} from 'react-router-dom';
import {formLocation, formContent, formReason, formMoveLocation, formNowLocation, formIp, formPCType} from '../utils/formData.js';
import Information from '../components/Information.js';
import SelectQuestion from '../components/SelectQuestion.js';
import ManyQues from '../components/ManyQues';
const mainOptions = [{name: "체계", go: "/sw", detail: "하늘망 체계가 말썽인가요?"},
				   {name: "장비", go: "/hw", detail: "하늘망 장비 신설, 수리, 지원 등을 도와드릴까요?"},
				   {name: "회선", go: "/line", detail: "하늘망 회선을 설치해드릴까요?"},
					{name: "기타", go: "/other", detail: "여기에 찾는게 없으신가요?"},]
const swOptions = [{name: "보안 프로그램", go: "/secure", detail:"보안 프로그램들이 말썽인가요?"},
				   {name: "요구사항(개선사항)", go: "/dev", detail: "하늘망 요구사항 및 개선사항"},
					{name: "이상 및 도움", go: "/broken", detail: "하늘망 이상, 계정 찾기 등"},]

const hwOptions = [{name: "PC(노트북)", go: "/pc", detail:"PC 노트북 관련 문의"},
				   {name: "프린터", go: "/printer", detail: "프린터 관련 문의"},
					{name: "주변기기",direct:true, go: "/part", detail: "키보드 마우스 모니터 등"}]
const hwPCOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const hwPrinterOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
						{name: "신설", go: "/new", detail: "신설 관련 문의"},
						{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
						{name: "이전",go: "/move", detail: "이전 관련 문의"},
						{name: "잉크, 토너",direct:true, go: "/air/hw/printer/ink", detail: "잉트, 토너 보충 관련 문의"},]

const lineOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const swSecureFormInfo = {
	title: "하늘망 보안프로그램 작업 신청",
	subTitle: "",
	mainWorker: "is",
	subWorker: "",
	sub: false,
	infos: [
		formIp,
		formContent
	]
}

const swDevFormInfo = {
	title: "하늘망 개선 작업 신청",
	subTitle: "",
	mainWorker: "de",
	subWorker: "",
	sub: false,
	infos: [
		formContent
	]
}
const swBrokenFormInfo = {
	title: "하늘망 이상,도움 작업 신청",
	subTitle: "",
	mainWorker: "sc",
	subWorker: "",
	sub: false,
	infos: [
		formIp,
		formContent
	]
}


const hwPCBrokenFormInfo = {
	title: "하늘망 PC 고장 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const hwPCNewFormInfo = {
	title: "하늘망 PC 신설 작업 신청",
	subTitle: "하늘망 PC 신설 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formPCType,
		formReason
	]
}

const hwPCRentFormInfo = {
	title: "하늘망 PC 지원 작업 신청",
	subTitle: "하늘망 PC 지원 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formPCType,
		formReason
	]
}
const hwPCMoveFormInfo = {
	title: "하늘망 PC 이전 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}

const hwPrinterBrokenFormInfo = {
	title: "하늘망 프린터 고장 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const hwPrinterNewFormInfo = {
	title: "하늘망 프린터 신설 작업 신청",
	subTitle: "하늘망 프린터 신설 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}

const hwPrinterRentFormInfo = {
	title: "하늘망 프린터 지원 작업 신청",
	subTitle: "하늘망 프린터 지원 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}
const hwPrinterMoveFormInfo = {
	title: "하늘망 프린터 이전 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}


const lineBrokenFormInfo = {
	title: "하늘망 라인 고장 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const lineNewFormInfo = {
	title: "하늘망 라인 신설 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formReason
	]
}

const lineRentFormInfo = {
	title: "하늘망 라인 지원 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formReason
	]
}
const lineMoveFormInfo = {
	title: "하늘망 라인 이전 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}


const InformSysDetail = {
	title: "정보통신부대 업무가 아닙니다.",
	content: "하늘망 체계 관련 문의는 하늘정보부대 helpDesk로 문의해주세요.",
	call: true,
	callTitle: "하늘정보부대 helpdesk(군)",
	callNum: "230-0114"
}

let ques = [
	{
		title: "IP는 어떻게 확인하나요?",
		content: '윈도우키+r을 눌러서 윈도우 검색창을 킵니다. cmd를 입력하셔서 나오는 검은 창에 ipconfig -all을 입력하시면 IPv4 주소가 ip 주소입니다.'
	},
	{
		title: "WIN 10 전환 이후 문제가 생겨요.",
		go: '/air/hw/pc/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "찾고있는 하늘망 체계 관련 문의가 없어요.",
		go: "/air/sw/broken",
		content: '하늘망 체계 관련 종합 문의는 체계 관제과에서 담당합니다.'
	},
	{
		title: "프린터 드라이버에 문제가 생겼어요.",
		go: '/air/hw/printer/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "자료 교환 체계는 잘 모릅니다.",
		content: '어딘가에서 담당중입니다.'
	},
]

function AirMain () {
	return (<SelectList options={mainOptions} about={'하늘망에 대해서 무엇을 도와드릴까요?'} />);
}


function AirSW () {
	return (<SelectList options={swOptions} about={'체계에 대해서 무엇을 도와드릴까요?'} />);
}


function AirSWSecure () {
	return (<ApplyFormContainer formInfo={swSecureFormInfo} />);
}

function AirSWDev () {
	return (<ApplyFormContainer formInfo={swDevFormInfo} />);
}

function AirSWBroken () {
	return (<ApplyFormContainer formInfo={swBrokenFormInfo} />);
}
function AirHW(){
	return(<SelectList options={hwOptions} about={'어떤 장비에 도움을 드릴까요?'} />)
}

function AirHWPC(){
	return(<SelectList options={hwPCOptions} about={'PC 관련 작업을 골라주세요.'} />)
}
function AirHWPCBroken(){
	return(<ApplyFormContainer formInfo={hwPCBrokenFormInfo}/>);
}
function AirHWPCNew(){
	return(<ApplyFormContainer formInfo={hwPCNewFormInfo}/>);
}
function AirHWPCRent(){
	return(<ApplyFormContainer formInfo={hwPCRentFormInfo}/>);
}
function AirHWPCMove(){
	return(<ApplyFormContainer formInfo={hwPCMoveFormInfo}/>);
}
function AirHWPrinter(){
	return(<SelectList options={hwPrinterOptions} about={'어떤 프린터 작업을 도와드릴까요?'} />)
}

function AirHWPrinterBroken(){
	return(<ApplyFormContainer formInfo={hwPrinterBrokenFormInfo}/>);
}
function AirHWPrinterNew(){
	return(<ApplyFormContainer formInfo={hwPrinterNewFormInfo}/>);
}
function AirHWPrinterRent(){
	return(<ApplyFormContainer formInfo={hwPrinterRentFormInfo}/>);
}
function AirHWPrinterMove(){
	return(<ApplyFormContainer formInfo={hwPrinterMoveFormInfo}/>);
}
function AirLine () {
	return (<SelectList options={lineOptions} about={'라인에 대해서 무엇을 도와드릴까요?'} />);
}

function AirLineBroken(){
	return(<ApplyFormContainer formInfo={lineBrokenFormInfo}/>);
}
function AirLineNew(){
	return(<ApplyFormContainer formInfo={lineNewFormInfo}/>);
}
function AirLineRent(){
	return(<ApplyFormContainer formInfo={lineRentFormInfo}/>);
}
function AirLineMove(){
	return(<ApplyFormContainer formInfo={lineMoveFormInfo}/>);
}
function AirOther(){
	return(<><SelectList options={[]} about={''} /><ManyQues ques={ques}/></>);
}

function Air() {
    return (
		<>
		<Route exact path="/air" component={AirMain}/>
		<Route exact path="/air/sw" component={AirSW}/>
		<Route exact path="/air/sw/secure" component={AirSWSecure}/>
		<Route exact path="/air/sw/dev" component={AirSWDev}/>
		<Route exact path="/air/sw/broken" component={AirSWBroken}/>
		<Route exact path="/air/hw" component={AirHW} />
		<Route exact path="/air/hw/pc" component={AirHWPC} />
		<Route exact path="/air/hw/pc/broken" component={AirHWPCBroken} />
		<Route exact path="/air/hw/pc/new" component={AirHWPCNew} />
		<Route exact path="/air/hw/pc/rent" component={AirHWPCRent} />
		<Route exact path="/air/hw/pc/move" component={AirHWPCMove} />
		<Route exact path="/air/hw/printer" component={AirHWPrinter} />
		<Route exact path="/air/hw/printer/broken" component={AirHWPrinterBroken} />
		<Route exact path="/air/hw/printer/new" component={AirHWPrinterNew} />
		<Route exact path="/air/hw/printer/rent" component={AirHWPrinterRent} />
		<Route exact path="/air/hw/printer/move" component={AirHWPrinterMove} />
		<Route exact path="/air/line" component={AirLine} />
		<Route exact path="/air/line/broken" component={AirLineBroken} />
		<Route exact path="/air/line/new" component={AirLineNew} />
		<Route exact path="/air/line/rent" component={AirLineRent} />
		<Route exact path="/air/line/move" component={AirLineMove} />
		<Route exact path="/air/other" component={AirOther}/>
		</>
		
    );
}
export default Air;
 