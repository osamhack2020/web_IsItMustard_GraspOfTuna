import { createAction, handleActions } from "redux-actions";
import { take, stop } from "../modules/loading";
import {serverSignUp, serverLogin, serverLoginCheck, serverLogout} from '../api/serverAuthentication.js';

const AUTH_REGISTER = "authentication/AUTH_REGISTER";
const AUTH_REGISTER_SUCCESS = "authentication/AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "authentication/AUTH_REGISTER_FAILURE";
const AUTH_LOGIN = "authentication/AUTH_LOGIN";
const AUTH_LOGIN_SUCCESS = "authentication/AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "authentication/AUTH_LOGIN_FAILURE";
const AUTH_LOGOUT = "authentication/AUTH_LOGOUT";
const AUTH_GET_STATUS = "authentication/AUTH_GET_STATUS";
const AUTH_GET_STATUS_SUCCESS = "authentication/AUTH_GET_STATUS_SUCCESS";
const AUTH_GET_STATUS_FAILURE = "authentication/AUTH_GET_STATUS_FAILURE";
export const auth_register = createAction(AUTH_REGISTER);
export const auth_register_success = createAction(AUTH_REGISTER_SUCCESS);
export const auth_register_failure = createAction(AUTH_REGISTER_FAILURE);
export const auth_login = createAction(AUTH_LOGIN);
export const auth_login_success = createAction(AUTH_LOGIN_SUCCESS);
export const auth_login_failure = createAction(AUTH_LOGIN_FAILURE);
export const auth_logout = createAction(AUTH_LOGOUT);
export const auth_get_status = createAction(AUTH_GET_STATUS);
export const auth_get_status_success = createAction(AUTH_GET_STATUS_SUCCESS);
export const auth_get_status_failure = createAction(AUTH_GET_STATUS_FAILURE);

export const auth_register_start = (userInfo,reset) => {
	return async (dispatch, getState) => {
		dispatch(take());
		dispatch(auth_register());
		try {
			delete userInfo['userPWAgain'];
			await serverSignUp(userInfo);
			reset();
			dispatch(auth_register_success_end());
		}
		catch(error) {
			dispatch(auth_register_failure_end(error));
		}
	};
};
export const auth_register_success_end = () => (dispatch) => {
	dispatch(stop());
	dispatch(auth_register_success());
	alert("회원가입에 성공하셨습니다.");
	
}

export const auth_register_failure_end = (error) => (dispatch) => {
	dispatch(stop());
	dispatch(auth_register_failure(error));
	alert("회원가입에 실패하셨습니다 : " + (error.error? error.error.type : '알 수 없는 에러'));
}




export const auth_login_start = ({userId, userPW}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		dispatch(auth_login());
		try {
			let userInfo = await serverLogin({userId, userPW});
			
			dispatch(auth_login_success_end(userInfo));
		}
		catch(error) {
			dispatch(auth_login_failure_end(error));
		}
	};
}

export const auth_login_success_end = ({userName, userRank, userId, isWorker, userType}) => (dispatch) => {
	dispatch(stop());
	dispatch(auth_login_success({userName, userRank, userId, isWorker, userType}));
	alert(userName+"님, 환영합니다.");
	let loginData = {
		isLogin: true,
		userId: userId,
		userName: userName,
		userRank: userRank,
		isWorker: isWorker,
		userType:userType,
	};
	document.cookie = 'key=' + JSON.stringify(loginData); //base64 인코당
}

export const auth_login_failure_end = (error) => (dispatch) => {
	dispatch(stop());
	dispatch(auth_login_failure(error));
	alert("다시 시도해주세요. : " + (error.error? error.error.type : '알 수 없는 에러'));
}

export const auth_logout_start = () => {
	return async (dispatch, getState) => {
		dispatch(take());
		dispatch(auth_logout());
		try {
			await serverLogout();
			document.cookie = 'key' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			dispatch(stop());
		}
		catch(error) {
			dispatch(stop());
		}
	};
	
}

export const auth_get_status_start = () => {
	return async (dispatch, getState) => {
		dispatch(take());
		dispatch(auth_get_status());
		try {
			let loginInfo = await serverLoginCheck(); 
			dispatch(auth_get_status_success_end(loginInfo));
		}
		catch(error) {
			dispatch(auth_get_status_failure_end(error));
			throw(error);
		}
	};
}

export const auth_get_status_success_end =(loginInfo) => (dispatch) => {
	dispatch(stop());
	dispatch(auth_get_status_success(loginInfo));
}

export const auth_get_status_failure_end = (error) => (dispatch) => {
	dispatch(stop());
	dispatch(auth_get_status_failure(error));
	document.cookie = 'key' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
    },
    status: {
        valid: false,
        isLogin: false,
        userName: '',
		userRank: '',
		userId: '',
		isWorker: false,
		userType: '',
		error: -1
    },
};

    
const authentication = handleActions(
    {
        [AUTH_REGISTER]: (state, action) => {
			return{ 
				...state,
				register: {
					status: 'WAITING',
					
				},
				status:{
					...state.status,
					error: -1
				}
			};
		},
        [AUTH_REGISTER_SUCCESS]: (state, action) => {
        	return {
				...state,
				register: {
				  ...state.register,
				  status: 'SUCCESS'
				}
			};
        },
        [AUTH_REGISTER_FAILURE]: (state, action) => {
        	return {
				...state,
				register:{
				  status: 'FAILURE',
        		},
				status:{
					...state.status,
					error: action.payload.type
				}
			};
        },
		[AUTH_LOGIN]: (state, action) => {
        	return {
				...state,
				login:{
					...state,
				  status: 'WAITING',
        		},
				status:{
					...state.status,
					error: -1,
					
				}
			};
        },
		[AUTH_LOGIN_SUCCESS]: (state, action) => {
        	return {
				...state,
				login:{
				  status: 'SUCCESS',
        		},
				status:{
					...state.status,
					isLogin: true,
					userName: action.payload.userName,
					userRank: action.payload.userRank ,
					userId: action.payload.userId,
					isWorker: action.payload.isWorker,
					userType: action.payload.userType
				}
			};
        },
		[AUTH_LOGIN_FAILURE]:(state, action) => {
        	return {
				...state,
				login:{
				  status: 'FAILURE',
        		},
				status:{
					...state.status,
					isLogin: false,
					error: action.payload.type
				}
			};
        },
		[AUTH_GET_STATUS]: (state, action) => {
        	return {
				...state,
				login:{
					...state,
				  status: 'WAITING',
        		},
				status:{
					...state.status,
					error: -1,
				}
			};
        },
		[AUTH_GET_STATUS_SUCCESS]: (state, action) => {
        	return {
				...state,
				login:{
				  status: 'SUCCESS',
        		},
				status:{
					...state.status,
					isLogin: true,
					userName: action.payload.userName,
					userRank: action.payload.userRank ,
					userId: action.payload.userId,
					isWorker: action.payload.isWorker,
					userType: action.payload.userType
					
				}
			};
        },
		[AUTH_GET_STATUS_FAILURE]:(state, action) => {
        	return {
				...state,
				login:{
				  status: 'FAILURE',
        		},
				status:{
					...state.status,
					isLogin: false,
					isWorker: false,
					userNameRank: '',
					userId: '',
					error: action.payload.type
				}
			};
        },
		[AUTH_LOGOUT]:(state, action) => {
			return {
				...state,
				status:{
					...state.status,
					isLogin: false,
					userNameRank: '',
					userId: '',
					isWorker: false,
				}
			}
		},
    },
    initialState
);

export default authentication;