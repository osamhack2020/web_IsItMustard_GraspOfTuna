import React, {useCallback} from "react";
import UserLogin from '../components/UserLogin';
import {useDispatch} from 'react-redux';
import { auth_login_start } from "../modules/authentication";

const UserLoginContainer = () => {
    const dispatch = useDispatch();
    const authLoginStart = useCallback((loginInfo) => dispatch(auth_login_start(loginInfo)), [dispatch]);
	
	return (
		<UserLogin
		authLoginStart={authLoginStart}
		/>
	);
};
export default React.memo(UserLoginContainer);