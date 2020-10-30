import express from "express";
import {userIdValid, userPWValid, userNameValid, userRankValid, userTelValid, userUnitValid} from "../utils/validation.js";
import bkfd2Password from 'pbkdf2-password';
import mysql from 'mysql2/promise';
import {getConnection, getUserInfo,getAllUserInfo, signUp, isIdExists, login, getSaltInfo} from '../db/account.js';
import {loginAuth} from './work.js';

const hasher = bkfd2Password();
const router = express.Router();

async function checkIdAndGetPWSalt (req,res,next) {
	let {userId} = req.body;
	try{
		let salt = await getSaltInfo(userId);
		req.body.userPWSalt = salt.data;
		next();
	} catch(err){
		next(err); 
	}
}

router.route("/login")
	.post(checkIdAndGetPWSalt, async(req,res,next)=>{
		let {userId, userPW, userPWSalt} = req.body;
		hasher({password:userPW, salt:userPWSalt}, async function(err, pass, salt, hash) {
			let loginInfo =  {
				userId: userId,
				userPWSalt : salt,
				userPWHash : hash,
			};
			try{
				let loginData = await login(loginInfo);
				req.session.isLogin = true;
				req.session.userInfo = loginData.data;
				res.status(200).json(loginData); 
			} catch(err){
				next(err);
			}
		})
	})
	.get((req,res,next)=>{ // 로그인 세션 확인
		if(req.session.isLogin && req.session.userInfo) 
			res.status(200).json({success:true, data:req.session.userInfo}); 
		else
			res.status(400).json({success:false}); 
		

	})
	.delete( async (req, res, next)=> {
		if(!req.session.isLogin)
			next({
				type: "Wrong Approach : Logout while not logined",
				where:'/auth/logout',
				responseCode: 400
			});
		else {
			let userInfo = req.session.userInfo;
			req.session.destroy(function(err) {
				if(err) {
					next({
						type: "Logout failed",
						where:'/auth/logout',
					});
				} else {
					res.status(200).json({
						success: true,
					});
				}
			})	
		}
	}); 	
			
async function validAll (req, res, next){
	let userInfo = {...req.body.userInfo};
	// 여기 코드 고치고 싶은데 ㅎㅎ; 어케할까
	if(!userIdValid(userInfo.userId)) {
		next({
			type: "Bad userId",
			where:'validAll',
			responseCode: 400
		});
	}
	else if(!userPWValid(userInfo.userPW)) {
		next({
			type: "Bad userPW",
			where:'validAll',
			responseCode: 400
		});
	}
	else if(!userNameValid(userInfo.userName)) {
		next({
			type: "Bad userName",
			where:' validAll',
			responseCode: 400
		});
	}
	else if(!userRankValid(userInfo.userRank)) {
		next({
			type: "Bad userRank",
			where:'validAll',
			responseCode: 400

		});
	}
	else if(!userTelValid(userInfo.userTel)) {
		next({
			type: "Bad userTel",
			where:'validAll',
			responseCode: 400
		});
	}
	else if(!userUnitValid(userInfo.userUnit, userInfo.isWorker)) {
		next({
			type: "Bad userUnit",
			where:'validAll',
			responseCode: 400
		});
	}
	else{
		next();
	}
}

async function isIdExist (req,res,next) {
	let userId = req.body.userInfo.userId;
	try{
		let isId = await isIdExists(userId);
		if(!isId.success)
			next({type:"id already exists", where:'isIdExist', responseCode: 400});
		else 
			next();
		 
	} catch(err){
		next(err); 
	}
}

router.route("/signup").post(validAll,isIdExist,(req, res,next)=> {
	let tempInfo = {...req.body.userInfo};
	console.log(tempInfo)
	hasher({password:tempInfo.userPW}, async function(err, pass, salt, hash) {
		
		delete tempInfo['userPW'];
		let userInfo =  {
			...tempInfo,
			userPWSalt : salt,
			userPWHash : hash,
		};
		
		try{
			await signUp(userInfo);
			res.status(200).json({success:true}); 
		} catch(err){
			next(err); 
		}
		
		
	})
});

router.route("/info")
	.post( async (req,res,next)=> {
		try{
			let userInfo = await getUserInfo(req.body.userId);
			res.status(200).json(userInfo); 
		} catch(err){
			next(err); 
		}
	})
	.get(loginAuth, async (req,res,next)=> {
		try{
			res.status(200).json({success:true, data: req.body.userInfo}); 
		} catch(err){
			next(err); 
		}
	})

router.route("/test").get( async (req,res,next) =>{
	try{
		let temp = await getAllUserInfo();
		res.status(200).json({success:true, data: temp}); 
	} catch(err){
		next(err); 
	}
});


export default router;

