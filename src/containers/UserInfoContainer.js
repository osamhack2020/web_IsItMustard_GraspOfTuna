import React, {useCallback} from "react";
import UserInfo from "../components/UserInfo";
import {useSelector, useDispatch} from 'react-redux';
import { get_info_start } from "../modules/user";


const UserInfoContainer = (props) => {
	const isLogin = useSelector(state => state.authentication.status.isLogin);
	const getUserInfo = useSelector(state => state.user.getUserInfo);
	const userId = useSelector(state => state.authentication.status.userId);
	const dispatch = useDispatch();
    const getInfoStart = useCallback((id) => dispatch(get_info_start(id)), [dispatch]);
	return (
		<UserInfo {...props} isLogin={isLogin} getInfoStart={getInfoStart} getUserInfo={getUserInfo} userId={userId} />
	);
};
export default React.memo(UserInfoContainer);