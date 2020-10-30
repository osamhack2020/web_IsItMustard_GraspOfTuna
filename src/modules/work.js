import { createAction, handleActions } from "redux-actions";
import { take, stop } from "../modules/loading";
import {serverWorkDone, serverWorkDeny, serverWorkAdd, serverWorkGetByNum,serverWorkUpdate} from '../api/serverWork';

const WORK_CHANGE = "work/WORK_CHANGE";
const WORK_ADD = "work/WORK_ADD";
const WORK_GET = "work/WORK_GET"

export const work_change = createAction(WORK_CHANGE);
export const work_add = createAction(WORK_ADD);
export const work_get = createAction(WORK_GET);

export const work_edit_start = ({workId, workOtherInfo}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			await serverWorkUpdate({workId:workId, workOtherInfo:workOtherInfo});
			dispatch(stop());
			dispatch(work_change({valid: true}));
			alert("완료에 성공하셨습니다.");
		}
		catch(error) {
			dispatch(stop());
			dispatch(work_change({valid: false, error: error}));
			alert("완료에 실패하셨습니다 : " + (error.error? error.error.type : '알 수 없는 에러'));
		}
	};
}
export const work_done_start = ({workId, workComment}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			await serverWorkDone({workId, workComment});
			dispatch(stop());
			dispatch(work_change({valid: true}));
			alert("완료에 성공하셨습니다.");
		}
		catch(error) {
			dispatch(stop());
			dispatch(work_change({valid: false, error: error}));
			alert("완료에 실패하셨습니다 : " + (error.error? error.error.type : '알 수 없는 에러'));
		}
	};
}

export const work_deny_start = ({workId, workComment}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			await serverWorkDeny({workId, workComment});
			dispatch(stop());
			dispatch(work_change({valid: true}));
			alert("거부에 성공하셨습니다.");
		}
		catch(error) {
			dispatch(stop());
			dispatch(work_change({valid: false, error: error}));
			alert("거부에 실패하셨습니다 : " + (error.error? error.error.type : '알 수 없는 에러'));
		}
	};
}

export const work_add_start = ({workInfo,reset}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			await serverWorkAdd(workInfo);
			dispatch(stop());
			dispatch(work_add({valid: true}));
			alert("추가에 성공하셨습니다.");
			reset();
		}
		catch(error) {
			dispatch(stop());
			dispatch(work_add({valid: false, error: error}));
			alert("추가에 실패하셨습니다 : " + (error.error? error.error.type : '알 수 없는 에러'));
		}
	};
}

export const work_get_start = ({my}) => {
	return async (dispatch, getState) => {
		dispatch(take());
		try {
			let getWorks = await serverWorkGetByNum({my});
			dispatch(stop());
			dispatch(work_get({valid: true, data: getWorks}));
		}
		catch(error) {
			dispatch(stop());
			dispatch(work_get({valid: false, error: error}));
		}
	};
}

const initialState = {
	change: 'init',
	add: 'init',
	get: 'init',
	data: [],
	
	valid: false,
	error: -1
}

const work = handleActions(
    {
        [WORK_CHANGE]: (state, action) => ({
			...state,
			valid: action.payload.valid,
			error: action.payload.valid ? action.payload.valid : -1,
			change: action.payload.valid ? 'SUCCESS': 'FAIL',
			
        }),
		[WORK_ADD]: (state, action) => ({
			...state,
			valid: action.payload.valid,
			error: action.payload.valid ? action.payload.valid : -1,
			add: action.payload.valid ? 'SUCCESS': 'FAIL',
        }),
		[WORK_GET]: (state, action) => ({
			...state,
			valid: action.payload.valid,
			error: action.payload.valid ? action.payload.valid : -1,
			get: action.payload.valid ? 'SUCCESS': 'FAIL',
			data: action.payload.valid ? action.payload.data: [],
        }),
    },
    initialState
);

export default work;