import axios from 'axios';
import serverInfo from '../config/serverInfo.js';

const URL = serverInfo.URL;

export async function serverLogin ({userId, userPW}) {
	try{
		const response = await axios.post(URL + '/auth/login', {
			userId: userId,
			userPW: userPW,
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


export async function serverLogout() {
	try{
		const response = await axios.delete(URL + '/auth/login', { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299)
			throw body;
		else
			return body.data;
	} catch(err) {
		throw(err);
	}
	
}

export async function serverSignUp (userInfo) {
	try{
		const response = await axios.post(URL + '/auth/signup', {
			userInfo : userInfo
		}, { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299)
			throw body;
		else
			return body.data;
		
	} catch(err) {
		throw(err);
	}
	
}

export async function serverLoginCheck () {
	try{
		const response = await axios.get(URL + '/auth/login', { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299)
			throw body;
		else
			return body.data;
	} catch(err) {
		throw(err);
	}
	
}

export async function serverGetUserInfo(userId) {
	try{
		const response = await axios.post(URL + '/auth/info', {
			userId : userId
		}, { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299)
			throw body;
		else
			return body.data;
	} catch(err) {
		throw(err);
	}
}


export async function serverGetMyUserInfo() {
	try{
		const response = await axios.get(URL + '/auth/info', { withCredentials: true });
		let body = response.data;
		
		if(body.success === false || response.responseCode > 299)
			throw body;
		else
			return body.data;
	} catch(err) {
		throw(err);
	}
}
