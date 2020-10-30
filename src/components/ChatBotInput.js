import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core';
import styled from 'styled-components';
import chatbotInfo from '../config/chatbotInfo.js';
import { useHistory } from "react-router";
const useStyles = makeStyles(theme => ({
	container: {
	},}));

const CustomContainer  = styled.div`
	height: 600px;
	position: fixed;
	z-index: 10000;
`;

function ChatBotInput({isLogin}){
	const [inputs, setInputs] = useState({});
	const [sessionId ,setSessionId] =useState(Math.random());
	const history = useHistory();
	useEffect(()=> {
	
		function receiveEvent(event) {
			const dfMessenger = document.querySelector('df-messenger');
			try{
				let path = event.detail.response.queryResult.outputContexts[0].parameters.route;
				history.push(path)
			} catch(err){
				
			}
		}
		window.addEventListener('df-response-received',receiveEvent );
		
		setSessionId(Math.random());
		return (()=>{window.removeEventListener('df-response-received',receiveEvent);})
	}, [isLogin])

	return (
		<CustomContainer>
			<df-messenger
		  intent={"WELCOME"}
		  chat-title="사용자 지원 봇"
		  agent-id={chatbotInfo.agentId}
		  language-code="ko"
				session-id={sessionId}
			chat-icon="https://www.flaticon.com/svg/static/icons/svg/1086/1086640.svg"
					wait-open={true}
			></df-messenger>
		</CustomContainer>
	
	)
}

export default ChatBotInput;

