import express from "express";
import mysql from 'mysql2/promise';
import {getWorkInfoByNum, getWorkInfoById, changeWorkStatus, addWork, updateWork, deleteWork, workCheck, getWorkCount} from '../db/works.js';
import {getUserInfo} from '../db/account.js';
const router = express.Router();

export async function loginAuth (req,res,next) {
	if(req.session.isLogin){
		try{
			let userInfo = await getUserInfo(req.session.userInfo.userId);
			req.body.userInfo = userInfo.data;
			next();
		}
		catch(err){
			next(err); 
		}
	}
	else{
		next({success:false, type: "not logined~",
			where:'loginAuth', responseCode: 200})
	}
}

router.route("/done").post(loginAuth, async (req,res,next)=> {
	try{
		let {userType} = req.body.userInfo;
		let {workId, workComment} = req.body;
		await changeWorkStatus({workComment,workId,userType,workStatus:'f'})
		res.status(200).json({success:true}); 
	} catch(err){
		next(err); 
	}
});	

router.route("/deny").post(loginAuth, async (req,res,next) =>{
	try{
		let {userType} = req.body.userInfo;
		let {workId, workComment} = req.body;
		await changeWorkStatus({workComment,workId,userType,workStatus:'n'})
		res.status(200).json({success:true}); 
	} catch(err){
		next(err); 
	}
});

router.route("/edit").post(loginAuth, async (req,res,next) =>{
		try{
			let {workId,workOtherInfo, userInfo} = req.body;
			let {userId} = userInfo;
			let works = await updateWork({workId, workOtherInfo, userId});
			res.status(200).json(works); 
		} catch(err){
			next(err); 
		}
	});

router.route("/delete").post(loginAuth, async (req,res,next) =>{
		try{
			let {workId, userInfo} = req.body;
			let {userId} = userInfo;
			let works = await deleteWork({workId, userId});
			res.status(200).json(works); 
		} catch(err){
			next(err); 
		}
	});

router.route("/renew")
	.get(loginAuth, async (req,res,next) =>{
		try{
			let {userId, userType} = req.body.userInfo;
			let data = await getWorkCount({userType: userType, userId: userId});
			res.status(200).json(data); 
		} catch(err){
			next(err); 
		}
	})

router.route("/")
	.post(loginAuth, async (req,res,next) =>{
		try{
			
			let workInfo = req.body.workInfo;
			let {userId, userType} = req.body.userInfo;
			await addWork({...workInfo, userId: userId});
			res.status(200).json({success:true}); 
		} catch(err){
			next(err); 
		}
	})
	.get(loginAuth, async (req,res,next) =>{
		try{
			let {my} = req.query;
			let {userId, userType} = req.body.userInfo;
			let works = await getWorkInfoByNum({my, userId, userType});
			res.status(200).json(works); 
		} catch(err){
			next(err); 
		}
	})



/*
if(workStatus !== 'e' && workStatus !=='d'){
			return({success:false, type: 'wrong workStatus'});
		}
*/
export default router;

