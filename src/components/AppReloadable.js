import {Alert} from '@material-ui/lab'
import TopBar from '../components/TopBar';
import {serverWorkRenew} from '../api/serverWork.js';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

const CustomAlert = styled(Alert)`
	position: fixed;
    width: 90%;
    z-index: 55;
    left: 5%;
    bottom: 7%;
`;

let works = {get:0, apply:0};
export default function AppReloadable({isLogin, isWorker}){
	const [popup, setPopup] = useState({open: false, message: ''});
	const [workCount, setWorkCount] = useState({apply:0, get:0});
	
	useEffect(()=>{
		if(isLogin){
			async function getStatusInfoFromServer(){
				try{
					let data = await serverWorkRenew();
					data = {get:data.getCount, apply:data.applyCount}
					setWorkCount(data);
					
					if(works.get === 0 && works.apply === 0)
					{
						works =data;
					}
					else if(works.get || works.apply) {
					
						let getChange = Math.abs(works.get - data.get);
						let applyChange = Math.abs(works.apply - data.apply);
						
						if(getChange || applyChange){
							let str = `${getChange === 0 ? '' : '신청받은 작업에 ' + getChange + '개의, '}${applyChange === 0 ? '' : '신청하신 작업에 ' + applyChange + '개의'} 변화가 있습니다.`
							setPopup({open: true, message: str});
							setTimeout(()=>{setPopup({open: false, message: ''})}, 5000);
							works = data;
						}
						else 
							return ;
					}
				}catch (err){
					
				}
			}
			getStatusInfoFromServer();
			setInterval(getStatusInfoFromServer,15000);
			return(()=>{clearInterval(getStatusInfoFromServer)})
		}
	},[isLogin])
	
	return (
		<>
	{popup.open && <CustomAlert variant="filled" severity="info">{popup.message}</CustomAlert>}
	<TopBar workCount={workCount} isLogin={isLogin} isWorker={isWorker}/>
		</>
	)

}