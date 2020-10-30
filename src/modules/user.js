// 이게 store에 들어갈 필요가 있나? -> 걍 귀찮아서? 왜 이랫지?
import { createAction, handleActions } from "redux-actions";
import {getUser} from '../lib/fake';
import { take, stop } from "../modules/loading";
import {serverGetUserInfo} from '../api/serverAuthentication.js';

const GET_INFO = "user/GET_INFO";

export const get_info = createAction(GET_INFO);

export const get_info_start = (userId) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			let getUserInfo = await serverGetUserInfo(userId); // 로그인 요청 보내는 api가 들어가야함
			dispatch(get_info(getUserInfo));
			dispatch(stop());
		}
		catch(error) {
			dispatch(stop());
			alert("에러:",error);
		}
	};
}

const initialState = {
    getUserInfo : {
		userId : '',
		userRank : '',
		userName : '',
		userTel : '',
		userUnit : '',
		isWorker: false,
	}
}

const user = handleActions(
    {
        [GET_INFO]: (state, action) => ({
			...state,
			getUserInfo: action.payload
        }),

    },
    initialState
);

export default user;