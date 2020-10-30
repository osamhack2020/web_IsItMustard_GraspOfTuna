import React from "react";
import { Route, Redirect} from 'react-router-dom';
import Information from '../components/Information.js';

const InformSysDetail = {
	title: "사용자 지원 센터로 연락해주세요.",
	content: "복잡한 문의는 사용자 지원 센터로 연락해주세요!",
	call: true,
	callTitle: "작통단 helpdesk(군)",
	callNum: "250-1000"
}


function OtherMain () {
	return (<Information detail={InformSysDetail} about={'어떤 종류의 회의를 도와드릴까요?'} />);
}

function Other() {
    return (
		<>
		<Route exact path="/other" component={OtherMain}/>
		</>
		
    );
}
export default Other;
 