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

export const getWorksLength = async () => {
	const connection = await getConnection();
	try{
		let query = `select ;`
		
	} catch(err){
		throw {...err, type: "no workId",where:"getWorkUserType",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const getWorkInfoByNum = async ({start,end, my, userId, userType})=>{
	const connection = await getConnection();
	try{
		
		let cond = (my === 'true' ? ("userId='" + userId + "'") :("workUserType='" + userType + "'"));
		let query= `SELECT * FROM works WHERE ${cond};` // LIMIT ${start}, ${end}
		let [results] = await connection.query(query);
		if(results.length)
			return({success:true, data:results})
		else {
			return({success:false})
		}
			
	} catch(err){
		throw {...err, type: "wrong index",where:"getWorkInfoByNum",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const getWorkInfoById = async (workId)=>{
	const connection = await getConnection();
	try{
		let query= `SELECT * FROM works WHERE workId='${workId}';`
		
		let [results] = await connection.query(query);
		if(results.length)
			return({success:true, data:results[0]})
		else 
			return({success:false})
	} catch(err){
		throw {...err, type: "no workId",where:"getWorkUserType",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const changeWorkStatus = async ({workId, userType,workStatus, workComment})=>{
	const connection = await getConnection();
	try{
		let query= `UPDATE works SET workStatus='${workStatus}',workComment='${workComment}', workEndTime=NOW() WHERE workId=${workId} AND workUserType='${userType}';`
		await connection.query(query);
		return({success:true})
	} catch(err){
		throw {...err, type: "someting wrong",where:"changeWorkStatus",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const addWork = async ({workUserName, workUserTel, workUserUnit, workUserRank, workOtherInfo, userId, workUserType})=>{
	const connection = await getConnection();
	try{
		let values = `('${workUserName}', '${workUserTel}', '${workUserUnit}', '${workUserRank}', '${workOtherInfo}', '${userId}', '${workUserType}', NOW())`;
		let query= `INSERT INTO works (workUserName, workUserTel, workUserUnit, workUserRank, workOtherInfo, userId, workUserType, workRegisterTime) VALUES ${values};`
		await connection.query(query);
		return({success:true})
	} catch(err){
		throw {...err, type: "data error",where:"addWork",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const updateWork = async ({userId, workOtherInfo, workId})=>{
	const connection = await getConnection();
	try{
		
		let query= `UPDATE works SET workOtherInfo = '${workOtherInfo}',workStatus='w',workEndTime=NULL WHERE userId='${userId}' AND workId=${workId};`
		await connection.query(query);
	
		return({success:true})
	} catch(err){
		throw {...err, type: "data error",where:"updateWork",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const deleteWork = async ({userId, workId})=>{
	const connection = await getConnection();
	try{
		
		let query= `DELETE FROM works WHERE userId='${userId}' AND workId=${workId};`
		await connection.query(query);
	
		return({success:true})
	} catch(err){
		throw {...err, type: "data error",where:"deleteWork",responseCode: 400};
	} finally {
		connection.release();
	}
};


export const getWorkCount = async ({userId, userType})=>{
	const connection = await getConnection();
	try{
		let query= `SELECT COUNT(CASE WHEN userId='${userId}' AND workStatus='w' THEN 1 END) as applyCount,COUNT(CASE WHEN workUserType='${userType}'AND workStatus='w' THEN 1 END) as getCount FROM works;`
		let [results] = await connection.query(query);
		if(results.length)
			return({success:true, data:results[0]})
		else 
			return({success:false})
	} catch(err){
		throw {...err, type: "data error",where:"getWorkCount",responseCode: 400};
	} finally {
		connection.release();
	}
};

export const workCheck = async ({userId, userType})=>{
	const connection = await getConnection();
	try{
		let applyQuery= `SELECT workId, workStatus FROM works WHERE userId='${userId}';`
		let getQuery= `SELECT workId, workStatus FROM works WHERE workUserType='${userType}';`
		let [getResults] = await connection.query(getQuery);
		let [applyResults] = await connection.query(applyQuery);
		if(getResults.length ||applyResults.length )
			return({success:true, data:{get: getResults, apply: applyResults}});
		else 
			return({success:false})
	} catch(err){
		throw {...err, type: "data error",where:"getWorkCount",responseCode: 400};
	} finally {
		connection.release();
	}
};