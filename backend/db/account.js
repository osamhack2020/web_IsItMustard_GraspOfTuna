import mysql from 'mysql2/promise';
import sqlSetting from '../config/sqlSetting.js';

const pool = mysql.createPool(sqlSetting);

export const getConnection = async () => {
	try{
		const connection = await pool.getConnection(async conn => conn);

		return connection;
	} catch(err){
		throw({...err, type:"db not connect", where:"getConnection", responseCode: 500});
	}
	
};

export const isIdExists = async (userId)=>{
	const connection = await getConnection();
	try{
		let query= `SELECT EXISTS (SELECT * FROM account WHERE userId='${userId}') AS success;`
		
		let [results] = await connection.query(query);
		if(results.success)
			return({success:true, data:true})
		else 
			return({success:true, data:false})
	} catch(err){
		throw {...err, type: "id exist",where:"isIdExists",responseCode: 400};
	} finally {
		connection.release();
	}
}

export const getSaltInfo = async (userId) => {
	const connection = await getConnection();
	try{
		let query= `SELECT userPWSalt FROM account WHERE userId='${userId}';`
		let [salts] = await connection.query(query);
		if(salts.length)
			return({success:true, data:salts[0]['userPWSalt']});
		else {
			throw {type:"no id", where:"getSaltInfo"};
		}
	} catch(err){
		throw {...err, type: err.type, where:"getSaltInfo", responseCode: 400};
	} finally {
		connection.release();
	}
}

export const login = async ({userId, userPWHash, userPWSalt}) => {
	const connection = await getConnection();
	try{
		let query= `SELECT userId, userRank, userName, isWorker, userType FROM account WHERE userId='${userId}'  AND  userPWHash='${userPWHash}' AND userPWSalt='${userPWSalt}';`
		let [results] = await connection.query(query);
		if(results.length)
			return({success:true, data:results[0]});
		else {
			throw {type:"no id or wrong pw", where:"login"};
		}
	} catch(err){
		throw {...err, type: err.type, where:"login",responseCode: 400};
	} finally {
		connection.release();
	}
}

const userTypeInfo = {
	유선장비정비과: "ce",
	무선음향정비과: "ws",
	라인PC정비과: "lp",
	회의FAX지원과: "cf",
	체계관제과: "sc",
	네트워크관리과: "nm",
	정보보안과: "is",
	개발과: "de",
	체계관리과: "sm",
}
function getUserType (userUnit) {
	let userType = userTypeInfo[userUnit];
	if(userType === undefined) return "xx";
	return userType;
}

/*

*/
export const signUp = async ({userId, userName, userTel, userUnit, userRank, userPWHash, userPWSalt, isWorker, userType})=> {
	const connection = await getConnection();
	try{
		let tf, userType;
		if(isWorker){
			userType = getUserType(userUnit);
			tf = 1;
		}
		else {
			userType="xx";
			tf = 0;
		}
		let values = `values('${userId}','${userName}','${userTel}','${userUnit}','${userRank}','${userPWHash}','${userPWSalt}','${tf}', '${userType}')`
		let query= `INSERT INTO account ${values};`
		
		await connection.query(query);
		return {success:true}
	} catch(err){
		throw {...err, type: "alreay have same user", where: "signUp",responseCode: 400};
	} finally {
		connection.release();
	}
}


export const getUserInfo = async (id) => {
	const connection = await getConnection();
	try{
		let query= `SELECT userId,userName,userTel,userUnit,userRank,userType,isWorker FROM account WHERE userId='${id}';`
		let [results] = await connection.query(query);
		if(results.length)	
			return {success:true,data:results[0]};
		else 
			throw {type:"no that user"};
	} catch(err){
		throw {...err, type:err.type, whrere:"getUserInfo",responseCode: 400};
	} finally {
		connection.release();
	}
}


export const getAllUserInfo = async ()=> {
	const connection = await getConnection();
	try{
		let query= `SELECT * FROM account;`
		let [results] = await connection.query(query);
		if(!results.length)	
			throw {type:"no user"};
		else 
			return {success:true,data:results}
	} catch(err){
		throw {...err, type: err.type, where: 'getAllUserInfo',responseCode: 400};
	} finally {
		connection.release();
	}
}