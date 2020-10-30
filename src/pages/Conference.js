import React from "react";
import SelectList from '../components/SelectList';
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route, Redirect} from 'react-router-dom';
import {formLocation, formContent, formReason, formTime} from '../utils/formData.js';


const mainOptions = [{name: "화상회의", go: "/video", detail: "화상회의를 도와드릴까요?"},
				   {name: "일반회의", go: "/normal", detail: "일반 회의를 도와드릴까요?"},]

const vtcFormInfo = {
	title: "화상 회의 지원 신청",
	subTitle: "화상 회의 음향 지원 신청",
	mainWorker: "cf",
	subWorker: "ws",
	sub: true,
	infos: [
		{
			label: "위치(대회의실/중회의실/소회의실)",
			multiline: true,
			rows: 2,
			id: "workLocation",
		},
		formTime,
		{
			label: "주관부대",
			rows: 1,
			id: "workMain",
			
		},
		{
			label: "요구사항",
			multiline: true,
			rows: 3,
			id: "workWant",
			
		},
		formReason
	]
}


const normalFormInfo = {
	title: "일반 회의 지원 신청",
	subTitle: "",
	mainWorker: "ws",
	subWorker: "",
	sub: false,
	infos: [
		{
			label: "위치(대회의실/중회의실/소회의실)",
			multiline: true,
			rows: 2,
			id: "workLocation",
		},
		formTime,
		{
			label: "요구사항",
			multiline: true,
			rows: 3,
			id: "workWant",
			
		},
		formReason
	]
}



function ConferenceMain () {
	return (<SelectList options={mainOptions} about={'어떤 종류의 회의를 도와드릴까요?'} />);
}

function ConferenceVTC(){
	return(<ApplyFormContainer formInfo={vtcFormInfo}/>)
}

function ConferenceNormal(){
	return(<ApplyFormContainer formInfo={normalFormInfo}/>)
}

function Conference() {
    return (
		<>
		<Route exact path="/conference" component={ConferenceMain}/>
		<Route exact path="/conference/video" component={ConferenceVTC}/>
		<Route exact path="/conference/normal" component={ConferenceNormal}/>
		</>
		
    );
}
export default Conference;
 