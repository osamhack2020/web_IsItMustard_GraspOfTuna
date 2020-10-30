import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route, Redirect} from 'react-router-dom';
import {formLocation, formContent, formReason, formMoveLocation, formNowLocation, formIp, formPCType} from '../utils/formData.js';
import Information from '../components/Information.js';
import SelectQuestion from '../components/SelectQuestion.js';
import ManyQues from '../components/ManyQues';
const mainOptions = [{name: "체계", go: "/sw", detail: "인트라넷 체계가 말썽인가요?"},
				   {name: "장비", go: "/hw", detail: "인트라넷 장비 신설, 수리, 지원 등을 도와드릴까요?"},
				   {name: "회선", go: "/line", detail: "인트라넷 회선을 설치해드릴까요?"},
					{name: "기타", go: "/other", detail: "여기에 찾는게 없으신가요?"},]
const swOptions = [{name: "보안 프로그램", go: "/secure", detail:"보안 프로그램들이 말썽인가요?"},
				   {name: "정보통신부대 병사 홈페이지", go: "/dev", detail: "정보통신부대! 병사 홈페이지 관련 문의"},
					{name: "기타", go: "/other", detail: "여기에 찾는게 없으신가요?"},]

const hwOptions = [{name: "PC(노트북)", go: "/pc", detail:"PC 노트북 관련 문의"},
				   {name: "프린터", go: "/printer", detail: "프린터 관련 문의"},
					{name: "주변기기",direct:true, go: "/part", detail: "키보드 마우스 모니터 등"},
				  {name: "전화기",direct:true, go: "/call", detail: "인트라넷 ip 전화기"}]
const hwPCOptions = [{name: "고장", go: "/q", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const hwPrinterOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
						{name: "신설", go: "/new", detail: "신설 관련 문의"},
						{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
						{name: "이전",go: "/move", detail: "이전 관련 문의"},
						{name: "잉크, 토너",go: "/ink", detail: "잉트, 토너 보충 관련 문의"},]

const lineOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const swSecureFormInfo = {
	title: "인트라넷 보안프로그램 작업 신청",
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
	title: "정보통신부대 병사 홈페이지 작업 신청",
	subTitle: "",
	mainWorker: "de",
	subWorker: "",
	sub: false,
	infos: [
		formContent
	]
}

const hwPCBrokenFormInfo = {
	title: "인트라넷 PC 고장 작업 신청",
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
	title: "인트라넷 PC 신설 작업 신청",
	subTitle: "인트라넷 PC 신설 IP 작업 신청",
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
	title: "인트라넷 PC 지원 작업 신청",
	subTitle: "인트라넷 PC 지원 IP 작업 신청",
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
	title: "인트라넷 PC 이전 작업 신청",
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
	title: "인트라넷 프린터 고장 작업 신청",
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
	title: "인트라넷 프린터 신설 작업 신청",
	subTitle: "인트라넷 프린터 신설 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}

const hwPrinterRentFormInfo = {
	title: "인트라넷 프린터 지원 작업 신청",
	subTitle: "인트라넷 프린터 지원 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}
const hwPrinterMoveFormInfo = {
	title: "인트라넷 프린터 이전 작업 신청",
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

const hwPrinterInkRefillFormInfo = {
	title: "프린터 잉크 보충 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formNowLocation,
	]
}


const lineBrokenFormInfo = {
	title: "인트라넷 라인 고장 작업 신청",
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
	title: "인트라넷 라인 신설 작업 신청",
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
	title: "인트라넷 라인 지원 작업 신청",
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
	title: "인트라넷 라인 이전 작업 신청",
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
	content: "인트라넷 체계 관련 문의는 하늘정보부대 helpDesk로 문의해주세요.",
	call: true,
	callTitle: "하늘정보부대 helpdesk(군)",
	callNum: "230-0114"
}

const hwPrinterInkSelfDetail = {
	title: "잉크, 토너 교체",
	content: "다 쓴 잉크를 작근단 보충과로 가져다 주시면 새걸로 드립니다.",
}

const hwPCQuestion = {
	title: "보안프로그램 관련 문의인가요?",
	content: "인트라넷 보안 프로그램 오류는 여기가 아닙니다",
	yes: "네",
	no: "아니요",
	yesGo: "/intra/sw/secure",
	noGo: "/intra/hw/pc/broken",
	
}
const hwPrinterInkQuestion = {
	title: "사용하시는 프린터의 잉크가 보충통 형태인가요?",
	content: "보충통 형태가 아닐 경우 직접 교체하셔야 합니다.",
	yes: "네",
	no: "아니요",
	yesGo: "/intra/hw/printer/ink/refill",
	noGo: "/intra/hw/printer/ink/self",
	
}
let ques = [
	{
		title: "IP는 어떻게 확인하나요?",
		content: '윈도우키+r을 눌러서 윈도우 검색창을 킵니다. cmd를 입력하셔서 나오는 검은 창에 ipconfig -all을 입력하시면 IPv4 주소가 ip 주소입니다.'
	},
	{
		title: "WIN 10 전환 이후 문제가 생겨요.",
		go: '/intra/hw/pc/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "찾고있는 인트라넷 체계 관련 문의가 없어요.",
		go: "/intra/sw/other",
		content: '인트라넷 체계 개발 및 유지보수 담당은 정체단입니다.'
	},
	{
		title: "프린터 드라이버에 문제가 생겼어요.",
		go: '/intra/hw/printer/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "자료 교환 체계는 잘 모릅니다.",
		content: '어딘가에서 담당중입니다.'
	},
]

function IntraMain () {
	return (<SelectList options={mainOptions} about={'인트라넷에 대해서 무엇을 도와드릴까요?'} />);
}


function IntraSW () {
	return (<SelectList options={swOptions} about={'체계에 대해서 무엇을 도와드릴까요?'} />);
}


function IntraSWSecure () {
	return (<ApplyFormContainer formInfo={swSecureFormInfo} />);
}

function IntraSWDev () {
	return (<ApplyFormContainer formInfo={swDevFormInfo} />);
}

function IntraSWOther () {
	return (<Information detail={InformSysDetail} />);
}
function IntraHW(){
	return(<SelectList options={hwOptions} about={'어떤 장비에 도움을 드릴까요?'} />)
}

function IntraHWPC(){
	return(<SelectList options={hwPCOptions} about={'PC 관련 작업을 골라주세요.'} />)
}
function IntraHWPCQ(){
	return(<SelectQuestion question={hwPCQuestion}/>);
}
function IntraHWPCBroken(){
	return(<ApplyFormContainer formInfo={hwPCBrokenFormInfo}/>);
}
function IntraHWPCNew(){
	return(<ApplyFormContainer formInfo={hwPCNewFormInfo}/>);
}
function IntraHWPCRent(){
	return(<ApplyFormContainer formInfo={hwPCRentFormInfo}/>);
}
function IntraHWPCMove(){
	return(<ApplyFormContainer formInfo={hwPCMoveFormInfo}/>);
}
function IntraHWPrinter(){
	return(<SelectList options={hwPrinterOptions} about={'어떤 프린터 작업을 도와드릴까요?'} />)
}

function IntraHWPrinterBroken(){
	return(<ApplyFormContainer formInfo={hwPrinterBrokenFormInfo}/>);
}
function IntraHWPrinterNew(){
	return(<ApplyFormContainer formInfo={hwPrinterNewFormInfo}/>);
}
function IntraHWPrinterRent(){
	return(<ApplyFormContainer formInfo={hwPrinterRentFormInfo}/>);
}
function IntraHWPrinterMove(){
	return(<ApplyFormContainer formInfo={hwPrinterMoveFormInfo}/>);
}

function IntraHWPrinterInk(){
	return(<SelectQuestion question={hwPrinterInkQuestion}/>);
}
function IntraHWPrinterInkSelf () {
	return (<Information detail={hwPrinterInkSelfDetail} />);
}
function IntraHWPrinterInkRefill(){
	return(<ApplyFormContainer formInfo={hwPrinterInkRefillFormInfo}/>);
}

function IntraLine () {
	return (<SelectList options={lineOptions} about={'라인에 대해서 무엇을 도와드릴까요?'} />);
}

function IntraLineBroken(){
	return(<ApplyFormContainer formInfo={lineBrokenFormInfo}/>);
}
function IntraLineNew(){
	return(<ApplyFormContainer formInfo={lineNewFormInfo}/>);
}
function IntraLineRent(){
	return(<ApplyFormContainer formInfo={lineRentFormInfo}/>);
}
function IntraLineMove(){
	return(<ApplyFormContainer formInfo={lineMoveFormInfo}/>);
}
function IntraOther(){
	return(<><SelectList options={[]} about={''} /><ManyQues ques={ques}/></>);
}

function Intra() {
    return (
		<>
		<Route exact path="/intra" component={IntraMain}/>
		<Route exact path="/intra/sw" component={IntraSW}/>
		<Route exact path="/intra/sw/secure" component={IntraSWSecure}/>
		<Route exact path="/intra/sw/dev" component={IntraSWDev}/>
		<Route exact path="/intra/sw/other" component={IntraSWOther}/>
		<Route exact path="/intra/hw" component={IntraHW} />
		<Route exact path="/intra/hw/pc" component={IntraHWPC} />
		<Route exact path="/intra/hw/pc/q" component={IntraHWPCQ} />
		<Route exact path="/intra/hw/pc/broken" component={IntraHWPCBroken} />
		<Route exact path="/intra/hw/pc/new" component={IntraHWPCNew} />
		<Route exact path="/intra/hw/pc/rent" component={IntraHWPCRent} />
		<Route exact path="/intra/hw/pc/move" component={IntraHWPCMove} />
		<Route exact path="/intra/hw/printer" component={IntraHWPrinter} />
		<Route exact path="/intra/hw/printer/broken" component={IntraHWPrinterBroken} />
		<Route exact path="/intra/hw/printer/new" component={IntraHWPrinterNew} />
		<Route exact path="/intra/hw/printer/rent" component={IntraHWPrinterRent} />
		<Route exact path="/intra/hw/printer/move" component={IntraHWPrinterMove} />
		<Route exact path="/intra/hw/printer/ink" component={IntraHWPrinterInk} />
		<Route exact path="/intra/hw/printer/ink/self" component={IntraHWPrinterInkSelf} />
		<Route exact path="/intra/hw/printer/ink/refill" component={IntraHWPrinterInkRefill} />
		<Route exact path="/intra/line" component={IntraLine} />
		<Route exact path="/intra/line/broken" component={IntraLineBroken} />
		<Route exact path="/intra/line/new" component={IntraLineNew} />
		<Route exact path="/intra/line/rent" component={IntraLineRent} />
		<Route exact path="/intra/line/move" component={IntraLineMove} />
		<Route exact path="/intra/other" component={IntraOther} />
		</>
		
    );
}
export default Intra;
 