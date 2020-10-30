import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route} from 'react-router-dom';
import {formLocation, formContent, formReason, formMoveLocation, formNowLocation, formIp, formPCType} from '../utils/formData.js';
import Information from '../components/Information.js';
import SelectQuestion from '../components/SelectQuestion.js';
import ManyQues from '../components/ManyQues';
const mainOptions = [{name: "체계", go: "/sw", detail: "합동망 체계가 말썽인가요?"},
				   {name: "장비", go: "/hw", detail: "합동망 장비 신설, 수리, 지원 등을 도와드릴까요?"},
				   {name: "회선", go: "/line", detail: "합동망 회선을 설치해드릴까요?"},
					{name: "기타", go: "/other", detail: "여기에 찾는게 없으신가요?"},]

const hwOptions = [{name: "PC(노트북)", go: "/pc", detail:"PC 노트북 관련 문의"},
				   {name: "프린터", go: "/printer", detail: "프린터 관련 문의"},
					{name: "주변기기",direct:true, go: "/part", detail: "키보드 마우스 모니터 등"},]
const hwPCOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const hwPrinterOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"},
					{name: "잉크, 토너",direct:true, go: "/intra/hw/printer/ink", detail: "잉트, 토너 보충 관련 문의"},]

const lineOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const hwPCBrokenFormInfo = {
	title: "합동망 PC 고장 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const hwPCNewFormInfo = {
	title: "합동망 PC 신설 작업 신청",
	subTitle: "합동망 PC 신설 IP 작업 신청",
	mainWorker: "cf",
	subWorker: "cf",
	sub: true,
	infos: [
		formLocation,
		formPCType,
		formReason
	]
}

const hwPCRentFormInfo = {
	title: "합동망 PC 지원 작업 신청",
	subTitle: "합동망 PC 지원 IP 작업 신청",
	mainWorker: "cf",
	subWorker: "cf",
	sub: true,
	infos: [
		formLocation,
		formPCType,
		formReason
	]
}
const hwPCMoveFormInfo = {
	title: "합동망 PC 이전 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}

const hwPrinterBrokenFormInfo = {
	title: "합동망 프린터 고장 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const hwPrinterNewFormInfo = {
	title: "합동망 프린터 신설 작업 신청",
	subTitle: "합동망 프린터 신설 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "cf",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}

const hwPrinterRentFormInfo = {
	title: "합동망 프린터 지원 작업 신청",
	subTitle: "합동망 프린터 지원 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "cf",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}
const hwPrinterMoveFormInfo = {
	title: "합동망 프린터 이전 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
		formMoveLocation,
		formReason
	]
}


const lineBrokenFormInfo = {
	title: "합동망 라인 고장 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const lineNewFormInfo = {
	title: "합동망 라인 신설 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formReason
	]
}

const lineRentFormInfo = {
	title: "합동망 라인 지원 작업 신청",
	subTitle: "",
	mainWorker: "cf",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formReason
	]
}
const lineMoveFormInfo = {
	title: "합동망 라인 이전 작업 신청",
	subTitle: "",
	mainWorker: "cf",
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
	content: "합동망 체계 관련 문의는 합동정보부대로 문의해주세요.",
	call: true,
	callTitle: "합동정보부대 helpdesk(군)",
	callNum: "200-0114"
}


let ques = [
	{
		title: "WIN 10 전환 이후 문제가 생겨요.",
		go: '/joint/hw/pc/broken',
		content: '회의FAX지원과에서 담당하고 있습니다.'
	},
	{
		title: "찾고있는 합동망 체계 관련 문의가 없어요.",
		go: "/air/sw",
		content: '합동망 체계는 합동정보부대에서 담당합니다.'
	},
	{
		title: "프린터 드라이버에 문제가 생겼어요.",
		go: '/joint/hw/printer/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "자료 교환 체계는 잘 모릅니다.",
		content: '어딘가에서 담당중입니다.'
	},
]


function JointMain () {
	return (<SelectList options={mainOptions} about={'합동망에 대해서 무엇을 도와드릴까요?'} />);
}


function JointSW () {
	return (<Information detail={InformSysDetail} />);
}

function JointHW(){
	return(<SelectList options={hwOptions} about={'어떤 장비에 도움을 드릴까요?'} />)
}

function JointHWPC(){
	return(<SelectList options={hwPCOptions} about={'PC 관련 작업을 골라주세요.'} />)
}
function JointHWPCBroken(){
	return(<ApplyFormContainer formInfo={hwPCBrokenFormInfo}/>);
}
function JointHWPCNew(){
	return(<ApplyFormContainer formInfo={hwPCNewFormInfo}/>);
}
function JointHWPCRent(){
	return(<ApplyFormContainer formInfo={hwPCRentFormInfo}/>);
}
function JointHWPCMove(){
	return(<ApplyFormContainer formInfo={hwPCMoveFormInfo}/>);
}
function JointHWPrinter(){
	return(<SelectList options={hwPrinterOptions} about={'어떤 프린터 작업을 도와드릴까요?'} />)
}

function JointHWPrinterBroken(){
	return(<ApplyFormContainer formInfo={hwPrinterBrokenFormInfo}/>);
}
function JointHWPrinterNew(){
	return(<ApplyFormContainer formInfo={hwPrinterNewFormInfo}/>);
}
function JointHWPrinterRent(){
	return(<ApplyFormContainer formInfo={hwPrinterRentFormInfo}/>);
}
function JointHWPrinterMove(){
	return(<ApplyFormContainer formInfo={hwPrinterMoveFormInfo}/>);
}

function JointLine () {
	return (<SelectList options={lineOptions} about={'라인에 대해서 무엇을 도와드릴까요?'} />);
}

function JointLineBroken(){
	return(<ApplyFormContainer formInfo={lineBrokenFormInfo}/>);
}
function JointLineNew(){
	return(<ApplyFormContainer formInfo={lineNewFormInfo}/>);
}
function JointLineRent(){
	return(<ApplyFormContainer formInfo={lineRentFormInfo}/>);
}
function JointLineMove(){
	return(<ApplyFormContainer formInfo={lineMoveFormInfo}/>);
}
function JointOther(){
	return(<><SelectList options={[]} about={''} /><ManyQues ques={ques}/></>);
}

function Joint() {
    return (
		<>
		<Route exact path="/joint" component={JointMain}/>
		<Route exact path="/joint/sw" component={JointSW}/>
		<Route exact path="/joint/hw" component={JointHW} />
		<Route exact path="/joint/hw/pc" component={JointHWPC} />
		<Route exact path="/joint/hw/pc/broken" component={JointHWPCBroken} />
		<Route exact path="/joint/hw/pc/new" component={JointHWPCNew} />
		<Route exact path="/joint/hw/pc/rent" component={JointHWPCRent} />
		<Route exact path="/joint/hw/pc/move" component={JointHWPCMove} />
		<Route exact path="/joint/hw/printer" component={JointHWPrinter} />
		<Route exact path="/joint/hw/printer/broken" component={JointHWPrinterBroken} />
		<Route exact path="/joint/hw/printer/new" component={JointHWPrinterNew} />
		<Route exact path="/joint/hw/printer/rent" component={JointHWPrinterRent} />
		<Route exact path="/joint/hw/printer/move" component={JointHWPrinterMove} />
		<Route exact path="/joint/line" component={JointLine} />
		<Route exact path="/joint/line/broken" component={JointLineBroken} />
		<Route exact path="/joint/line/new" component={JointLineNew} />
		<Route exact path="/joint/line/rent" component={JointLineRent} />
		<Route exact path="/joint/line/move" component={JointLineMove} />
		<Route exact path="/joint/other" component={JointOther} />
		</>
		
    );
}
export default Joint;
 