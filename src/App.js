import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Main, Login, Register, Info, Guide, Notice, NoticePost, 
		User, Call, Intra, Internet, Air, Joint, Part, Other, Ceremony, Conference, Fax, ApplyWork, GetWork} from './pages';
import { Route, Redirect} from 'react-router-dom';
import Copyright from './components/Copyright.js'
import {makeStyles, Paper} from '@material-ui/core';

import ChatBotInput from './components/ChatBotInput';
import Loading from './components/Loading';

import AppReloadable from './components/AppReloadable.js';
const MainContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 750px 1fr;
	@media (max-width: 768px) {
		grid-template-columns: 0fr 100% 0fr;
	}
`;



const useStyles = makeStyles(theme => ({
	frame:{
		position: 'relative',
		marginTop: '114px',
		width: 'calc(100% - 40px)',
		maxWidth: '1369px',
		marginLeft:'20px',
		marginRight:'20px',
		left: 'calc(50% - 20px)',
		transform: 'translateX(-50%);',
	},
	paper:{
		marginTop: '30px',
		marginBottom: '38px',
		boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
		borderRadius: '17px',
	},
}));

function getCookie(name) {
	let cookies = document.cookie.split('; ');
	cookies = cookies.find(cookie => cookie.startsWith(name));
	if(typeof cookies === "undefined") return ;
	return (cookies.replace(name+ '=', ''));
}



function App({isLoading, isLogin, authGetStatusStart, userType, userId, isWorker}) {	
    const classes = useStyles();
	
	useEffect(() => {
		try{
			let getData = getCookie('key');
			if(typeof getData === "undefined") return ;
			let loginData = JSON.parse(getData);
			if(!loginData.isLogin) return ;
			(async function getStatusInfoFromServer(){
				await authGetStatusStart();
			})();
		} catch (err) {
			document.cookie = 'key' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
		
	}, [isLogin]);
	
	return (
		<div>
			{isLoading && <Loading /> }
			
			<AppReloadable isLogin={isLogin} isWorker={isWorker}/>
			
			<MainContainer className={classes.frame}>
				<div></div>
				<Paper className={classes.paper}>
					<Route exact path="/">
						<Redirect to="/main" />
					</Route>
					<Route path="/main" component={Main}/>
					<Route path="/login" component={Login}>
						{isLogin && <Redirect to="/main" />}
					</Route>
					<Route path="/register" component={Register}>
						{isLogin && <Redirect to="/main" />}
					</Route>
					<Route path="/notice" component={Notice}/>
					<Route path="/notice/post/" component={NoticePost} />
					<Route path="/guide" component={Guide}/>
					<Route path="/info" component={Info}/>
					<Route path="/user" component={User} />
					<Route path="/call" component={Call} />
					<Route path="/intra" component={Intra} />
					<Route path="/internet" component={Internet} />
					<Route path="/air" component={Air} />
					<Route path="/joint" component={Joint} />
					<Route path="/part" component={Part} />
					<Route path="/other" component={Other} />
					<Route path="/ceremony" component={Ceremony} />
					<Route path="/conference" component={Conference} />
					<Route path="/fax" component={Fax} />
					<Route path="/applywork" component={ApplyWork} />
					<Route path="/getwork" component={GetWork} />
				</Paper>
				<div></div>
			</MainContainer>
			<ChatBotInput isLogin={isLogin}/>
		</div>
	);
}
			// <Copyright className='footer'/>

export default App;

