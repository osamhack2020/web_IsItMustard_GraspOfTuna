import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route} from 'react-router-dom';
import {formLocation, formContent, formReason, formMoveLocation, formNowLocation, formIp, formPCType} from '../utils/formData.js';
import Information from '../components/Information.js';
import SelectQuestion from '../components/SelectQuestion.js';
import ManyQues from '../components/ManyQues';

const mainOptions = [{name: "체계", go: "/sw", detail: "인터넷 체계가 말썽인가요?"},
				   {name: "장비", go: "/hw", detail: "인터넷 장비 신설, 수리, 지원 등을 도와드릴까요?"},
				   {name: "회선", go: "/line", detail: "인터넷 회선을 설치해드릴까요?"},
					{name: "기타", go: "/other", detail: "여기에 찾는게 없으신가요?"},]

const hwOptions = [{name: "PC(노트북)", go: "/pc", detail:"PC 노트북 관련 문의"},
				   {name: "프린터", go: "/printer", detail: "프린터 관련 문의"},
					{name: "주변기기",direct:true, go: "/part", detail: "키보드 마우스 모니터 등"},
				  {name: "IPTV(기가지니)", go: "/iptv", detail: "IPTV(기가지니) 관련 문의"}]
const hwPCOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

const hwPrinterOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"},
					{name: "잉크, 토너",direct:true, go: "/intra/hw/printer/ink", detail: "잉트, 토너 보충 관련 문의"},]

const hwIPTVOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]


const lineOptions = [{name: "고장", go: "/broken", detail:"고장 관련 문의"},
				   {name: "신설", go: "/new", detail: "신설 관련 문의"},
					{name: "지원", go: "/rent", detail: "지원(대여) 관련 문의"},
				  {name: "이전",go: "/move", detail: "이전 관련 문의"}]

let ques = [
	{
		title: "IP는 어떻게 확인하나요?",
		content: '윈도우키+r을 눌러서 윈도우 검색창을 킵니다. cmd를 입력하셔서 나오는 검은 창에 ipconfig -all을 입력하시면 IPv4 주소가 ip 주소입니다.'
	},
	{
		title: "WIN 10 전환 이후 문제가 생겨요.",
		go: '/internet/hw/pc/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "찾고있는 인터넷 체계 관련 문의가 없어요.",
		go: "/internet/sw",
		content: '인터넷 체계 개발 및 유지보수 담당은 하늘정보부대입니다.'
	},
	{
		title: "프린터 드라이버에 문제가 생겼어요.",
		go: '/internet/hw/printer/broken',
		content: '라인PC정비과에서 담당하고 있습니다.'
	},
	{
		title: "신설 문서적 절차 문의",
		content: '각 부대 보안 담당관에게 문의하세요.'
	},
	{
		title: "자료 교환 체계는 잘 모릅니다.",
		content: '어딘가에서 담당중입니다.'
	},
]

const hwPCBrokenFormInfo = {
	title: "인터넷 PC 고장 작업 신청",
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
	title: "인터넷 PC 신설 작업 신청",
	subTitle: "인터넷 PC 신설 IP 작업 신청",
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
	title: "인터넷 PC 지원 작업 신청",
	subTitle: "인터넷 PC 지원 IP 작업 신청",
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
	title: "인터넷 PC 이전 작업 신청",
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
	title: "인터넷 프린터 고장 작업 신청",
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
	title: "인터넷 프린터 신설 작업 신청",
	subTitle: "인터넷 프린터 신설 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}

const hwPrinterRentFormInfo = {
	title: "인터넷 프린터 지원 작업 신청",
	subTitle: "인터넷 프린터 지원 IP 작업 신청",
	mainWorker: "lp",
	subWorker: "nm",
	sub: true,
	infos: [
		formLocation,
		formReason
	]
}
const hwPrinterMoveFormInfo = {
	title: "인터넷 프린터 이전 작업 신청",
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


const hwIPTVBrokenFormInfo = {
	title: "IPTV(기가기니) 프린터 고장 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formContent
	]
}

const hwIPTVNewFormInfo = {
	title: "IPTV(기가기니) 신설 작업 신청",
	subTitle: "",
	mainWorker: "lp",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		formReason
	]
}

const hwIPTVMoveFormInfo = {
	title: "IPTV(기가기니) 이전 작업 신청",
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
	title: "인터넷 라인 고장 작업 신청",
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
	title: "인터넷 라인 신설 작업 신청",
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
	title: "인터넷 라인 지원 작업 신청",
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
	title: "인터넷 라인 이전 작업 신청",
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
	content: "인터넷 체계 관련 문의는 하늘정보부대 helpDesk로 문의해주세요.",
	call: true,
	callTitle: "하늘정보부대 helpdesk(군)",
	callNum: "230-0114"
}

function InternetMain () {
	return (<SelectList options={mainOptions} about={'인터넷에 대해서 무엇을 도와드릴까요?'} />);
}


function InternetSW () {
	return (<Information detail={InformSysDetail} />);
}

function InternetHW(){
	return(<SelectList options={hwOptions} about={'어떤 장비에 도움을 드릴까요?'} />)
}

function InternetHWPC(){
	return(<SelectList options={hwPCOptions} about={'PC 관련 작업을 골라주세요.'} />)
}
function InternetHWPCBroken(){
	return(<ApplyFormContainer formInfo={hwPCBrokenFormInfo}/>);
}
function InternetHWPCNew(){
	return(<ApplyFormContainer formInfo={hwPCNewFormInfo}/>);
}
function InternetHWPCRent(){
	return(<ApplyFormContainer formInfo={hwPCRentFormInfo}/>);
}
function InternetHWPCMove(){
	return(<ApplyFormContainer formInfo={hwPCMoveFormInfo}/>);
}
function InternetHWPrinter(){
	return(<SelectList options={hwPrinterOptions} about={'어떤 프린터 작업을 도와드릴까요?'} />)
}

function InternetHWPrinterBroken(){
	return(<ApplyFormContainer formInfo={hwPrinterBrokenFormInfo}/>);
}
function InternetHWPrinterNew(){
	return(<ApplyFormContainer formInfo={hwPrinterNewFormInfo}/>);
}
function InternetHWPrinterRent(){
	return(<ApplyFormContainer formInfo={hwPrinterRentFormInfo}/>);
}
function InternetHWPrinterMove(){
	return(<ApplyFormContainer formInfo={hwPrinterMoveFormInfo}/>);
}
function InternetHWIPTV(){
	return(<SelectList options={hwIPTVOptions} about={'어떤 IPTV(기가지니) 작업을 도와드릴까요?'} />)
}
function InternetHWIPTVBroken(){
	return(<ApplyFormContainer formInfo={hwIPTVBrokenFormInfo}/>);
}
function InternetHWIPTVNew(){
	return(<ApplyFormContainer formInfo={hwIPTVNewFormInfo}/>);
}
function InternetHWIPTVMove(){
	return(<ApplyFormContainer formInfo={hwIPTVMoveFormInfo}/>);
}



function InternetLine () {
	return (<SelectList options={lineOptions} about={'라인에 대해서 무엇을 도와드릴까요?'} />);
}

function InternetLineBroken(){
	return(<ApplyFormContainer formInfo={lineBrokenFormInfo}/>);
}
function InternetLineNew(){
	return(<ApplyFormContainer formInfo={lineNewFormInfo}/>);
}
function InternetLineRent(){
	return(<ApplyFormContainer formInfo={lineRentFormInfo}/>);
}
function InternetLineMove(){
	return(<ApplyFormContainer formInfo={lineMoveFormInfo}/>);
}
function InternetOther(){
	return(<><SelectList options={[]} about={''} /><ManyQues ques={ques}/></>);
}

function Internet() {
    return (
		<>
		<Route exact path="/internet" component={InternetMain}/>
		<Route exact path="/internet/sw" component={InternetSW}/>
		<Route exact path="/internet/hw" component={InternetHW} />
		<Route exact path="/internet/hw/pc" component={InternetHWPC} />
		<Route exact path="/internet/hw/pc/broken" component={InternetHWPCBroken} />
		<Route exact path="/internet/hw/pc/new" component={InternetHWPCNew} />
		<Route exact path="/internet/hw/pc/rent" component={InternetHWPCRent} />
		<Route exact path="/internet/hw/pc/move" component={InternetHWPCMove} />
		<Route exact path="/internet/hw/printer" component={InternetHWPrinter} />
		<Route exact path="/internet/hw/printer/broken" component={InternetHWPrinterBroken} />
		<Route exact path="/internet/hw/printer/new" component={InternetHWPrinterNew} />
		<Route exact path="/internet/hw/printer/rent" component={InternetHWPrinterRent} />
		<Route exact path="/internet/hw/printer/move" component={InternetHWPrinterMove} />
		<Route exact path="/internet/hw/iptv" component={InternetHWIPTV} />
		<Route exact path="/internet/hw/iptv/broken" component={InternetHWIPTVBroken} />
		<Route exact path="/internet/hw/iptv/new" component={InternetHWIPTVNew} />
		<Route exact path="/internet/hw/iptv/move" component={InternetHWIPTVMove} />
		<Route exact path="/internet/line" component={InternetLine} />
		<Route exact path="/internet/line/broken" component={InternetLineBroken} />
		<Route exact path="/internet/line/new" component={InternetLineNew} />
		<Route exact path="/internet/line/rent" component={InternetLineRent} />
		<Route exact path="/internet/line/move" component={InternetLineMove} />
		<Route exact path="/internet/other" component={InternetOther} />
		</>
		
    );
}
export default Internet;
 