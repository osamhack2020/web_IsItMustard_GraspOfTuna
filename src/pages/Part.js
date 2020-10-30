import React from "react";
import ApplyFormContainer from '../containers/ApplyFormContainer';
import { Route, Redirect} from 'react-router-dom';
import {formLocation, formContent} from '../utils/formData.js';
function PartMain () {
	return (<ApplyFormContainer formInfo={mainFormInfo}/>);
}

const mainFormInfo = {
	title: "주변기기 지원 신청",
	subTitle: "",
	mainWorker: "ws",
	subWorker: "",
	sub: false,
	infos: [
		formLocation,
		{
			label: "종류(모니터, 키보드, 마우스 등)",
			rows: 1,
			id: "workWant",
			
		},
		formContent
	]
}

function Part() {
    return (
		<>
		<Route exact path="/part" component={PartMain}/>
		</>
		
    );
}
export default Part;
 