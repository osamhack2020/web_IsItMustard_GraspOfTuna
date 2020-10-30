import { createAction, handleActions } from "redux-actions";

const TOGGLE = "loading/TOGGLE";
const TAKE = "loading/TAKE";
const STOP = "loading/STOP";

export const toggle = createAction(TOGGLE);
export const take = createAction(TAKE);
export const stop = createAction(STOP);

const initialState = {
    isLoading: false,
}

const loading = handleActions(
    {
        [TOGGLE]: (state, action) => ({
			...state,
			isLoading: !state.isLoading
        }),
		[TAKE]: (state, action) => ({
			...state,
			isLoading: true
        }),
		[STOP]: (state, action) => ({
			...state,
			isLoading: false
        }),
    },
    initialState
);

export default loading;