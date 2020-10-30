import React from "react";
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route, Redirect} from 'react-router-dom';
import {formLocation, formReason, formTime} from '../utils/formData.js';
function CeremonyMain () {
	return (<ApplyFormContainer formInfo={mainFormInfo}/>);
}

const mainFormInfo = {
	title: "행사 지원 신청",
	subTitle: "",
	mainWorker: "ws",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
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

function Ceremony() {
    return (
		<>
		<Route exact path="/ceremony" component={CeremonyMain}/>
		</>
		
    );
}
export default Ceremony;
 