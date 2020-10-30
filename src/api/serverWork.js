import axios from 'axios';
import serverInfo from '../config/serverInfo.js';

const URL = serverInfo.URL;

export async function serverWorkDone ({workId, workComment}) {
	try{
		const response = await axios.post(URL + '/work/done', {
			workId: workId,
			workComment: workComment,
		}, { withCredentials: true });
		let body = response.data
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else{
			return body.data;
		}
			
		
	} catch(err) {
		throw(err);
	}
	
}


export async function serverWorkDeny({workId, workComment}) {
	try{
		const response = await axios.post(URL + '/work/deny', {
			workId: workId, 
			workComment: workComment
		},{ withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
	} catch(err) {
		throw(err);
	}
	
}

export async function serverWorkAdd (workInfo) {
	try{
		const response = await axios.post(URL + '/work', {
			workInfo : workInfo
		}, { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
		
	} catch(err) {
		throw(err);
	}
	
}

export async function serverWorkGetByNum ({start,end,my}) {
	try{
		const response = await axios.get(URL + `/work?start=${start}&end=${end}&my=${my}`, { withCredentials: true });
		let body = response.data;
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
		
	} catch(err) {
		throw(err);
		
	}
	
}

export async function serverWorkUpdate ({workId, workOtherInfo}) {
	try{
		const response = await axios.post(URL + `/work/edit`, 
			{workId, workOtherInfo},
		  	{ withCredentials: true }, 
		);
		let body = response.data;
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
		
	} catch(err) {
		throw(err);
	}
	
}
export async function serverWorkDelete ({workId}) {
	try{
		const response = await axios.post(URL + `/work/delete`, 
			{workId},
		  	{ withCredentials: true }, 
		);
		let body = response.data;
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
		
	} catch(err) {
		throw(err);
	}
	
}

export async function serverWorkRenew () {
	try{
		const response = await axios.get(URL + `/work/renew`, { withCredentials: true },);
		let body = response.data;
		if(body.success === false || response.responseCode > 299){
			throw body;
		}	
		else
			return body.data;
		
	} catch(err) {
		throw(err);
	}
	
}


