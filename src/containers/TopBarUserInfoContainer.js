import React, {useCallback} from "react";
import TopBarUserInfo from "../components/TopBarUserInfo";
import {useSelector, useDispatch} from 'react-redux';
import {auth_logout_start,} from '../modules/authentication';

const TopBarUserInfoContainer = ({workCount}) => {
	const dispatch = useDispatch();
	const isLogin = useSelector(state => state.authentication.status.isLogin);
	const isWorker = useSelector(state => state.authentication.status.isWorker);
	const userId = useSelector(state => state.authentication.status.userId);
	const userName = useSelector(state => state.authentication.status.userName);
	const userRank = useSelector(state => state.authentication.status.userRank);
	const authLogoutStart = useCallback(() => dispatch(auth_logout_start()), [dispatch]);
	
	return (
		<TopBarUserInfo
			isLogin={isLogin}
			userName={userName}
			userRank={userRank}
			isWorker={isWorker}
			userId={userId}
			authLogoutStart={authLogoutStart}
			workCount={workCount}
		/>
	);
};
export default React.memo(TopBarUserInfoContainer);