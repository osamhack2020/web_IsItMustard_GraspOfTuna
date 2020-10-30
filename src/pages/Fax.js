import React from "react";
import Information from '../components/Information.js';
import { Route, Redirect} from 'react-router-dom';
const mainDetail = {
	title: "상용팩스/군용팩스 송수신",
	content: "직접 찾아오셔야 합니다. 위치: 작사 4층 구석",
	call: true,
	callTitle: "작통단 회의FAX지원과(군)",
	callNum: "250-1040"
}
function FaxMain () {
	return (<Information detail={mainDetail}/>);
}
function Fax() {
    return (
		<>
		<Route exact path="/fax" component={FaxMain}/>
		</>
		
    );
}
export default Fax;
 