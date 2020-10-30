import React, {useCallback} from "react";
import App from "../App";
import {useSelector, useDispatch} from 'react-redux';
import { auth_get_status_start } from "../modules/authentication";

const AppContainer = () => {
	const loading = useSelector(state => state.loading.isLoading);
	const isLogin = useSelector(state => state.authentication.status.isLogin);
	const userId = useSelector(state => state.authentication.status.userId);
	const userType = useSelector(state => state.authentication.status.userType);
	const isWorker = useSelector(state => state.authentication.status.isWorker);
	const dispatch = useDispatch();
    const authGetStatusStart = useCallback(() => dispatch(auth_get_status_start()), [dispatch]);
	
	
	return (
		<App
		  isLoading={loading}
		isLogin={isLogin}
			userType={userType}
			userId={userId}
		authGetStatusStart={authGetStatusStart}
			isWorker={isWorker}
		/>
	);
};
export default React.memo(AppContainer);