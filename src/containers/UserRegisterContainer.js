import React, {useCallback} from "react";
import UserRegister from "../components/UserRegister";
import {useSelector, useDispatch} from 'react-redux';
import { auth_register_start, auth_register } from "../modules/authentication";

const UserRegisterContainer = () => {
    const dispatch = useDispatch();
    const authRegisterStart = useCallback((userInfo,reset) => dispatch(auth_register_start(userInfo,reset)), [dispatch]);
	const registerStatus = useSelector(state => state.authentication.register.status);
	const authRegister  = useCallback(() => dispatch(auth_register()), [dispatch]);
	return (
		<UserRegister
		authRegisterStart={authRegisterStart}
			registerStatus={registerStatus}
			authRegister={authRegister}
		/>
	);
};
export default React.memo(UserRegisterContainer);