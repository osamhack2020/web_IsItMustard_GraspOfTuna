import React, {useCallback} from "react";
import ApplyForm from "../components/ApplyForm";
import {useSelector, useDispatch} from 'react-redux';
import {work_add_start} from '../modules/work';

const ApplyFormContainer = (props) => {
	const dispatch = useDispatch();
	const isLogin = useSelector(state => state.authentication.status.isLogin);
	const workAddStart = useCallback(({workInfo, reset}) => dispatch(work_add_start({workInfo, reset})), [dispatch]);
	return (
		<ApplyForm
			isLogin={isLogin}
			workAddStart={workAddStart}
			{...props}
		/>
	);
};
export default React.memo(ApplyFormContainer);