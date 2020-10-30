import React from "react";
import { useLayoutEffect, useState } from 'react';
import { makeStyles, Typography,Paper } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TopBarUserInfoContainer from '../containers/TopBarUserInfoContainer';
import {NonStyleLink, NonStyleNavLink} from './NonStyleRouter';
import { Icon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../fonts.css';
import {useOuterClick} from '../utils/useOuterClick.js';

const useStyles = makeStyles(theme => ({
		container:{
			width: 'auto',
			height: 'auto',
			position: 'fixed',
			left: '10px',
			top: '10px',
			background: 'white',
			zIndex: '100',
			boxShadow: '0px 0px 60px rgba(0,0,0,0.2)',
			borderRadius: '7px',
			
			alpha: '0.5',
		},
		logoLinkStick:{
			width: '100%',
			height: '100%',
			alignItems: 'center',
			display: 'block',
			justifyContent: 'center',
			marginLeft: '63px',
			marginRight: '33px',
			marginTop: '10px',
			marginBottom: '25px',
			
			fontFamily: 'Montserrat',
			color: 'black',
			fontSize: '36px',
			zIndex: '3',
			letterSpacing: '-1px',
			userSelect:'none',
		},
		notActiveMenu:{
			fontFamily: 'Noto Sans KR',
			color: '#091A27',
			display: 'block',
			position: 'relative',
			transition: 'ease 120ms',
			
			fontSize: '22px',
			paddingBottom: '23px',
			paddingLeft: '63px',
			userSelect:'none',
		},
		boxIcon: {
			fontSize: 26,
			color: 'black',
			alignSelf: 'center',
			justifySelf: 'center',
			cursor: 'pointer',
		},
		iconLeft:{
			marginTop: '10px',
			position: 'absolute',
			marginLeft: '5px',
			padding: '10px',
			color:'black',
		},
	})
);

function TopBarMobileSnackMenu({setOpen, workCount,isLogin, isWorker}) {
    const classes = useStyles();
	const innerRef = useOuterClick(()=>{setOpen(false)});
    return (
		<div ref={innerRef} className={classes.container} onClick={()=>{setOpen(false)}}>
		<Icon component={CloseIcon} 
			className={[classes.boxIcon,classes.iconLeft].join(' ')} onClick={()=>{setOpen(false)}}/>
		<NonStyleLink to='/main' className={classes.logoLinkStick}>
			Help Desk
		</NonStyleLink>
		<NonStyleNavLink to='/info' activeStyle={{color: "#3986F7"}} className={classes.notActiveMenu}>
			연락처
		</NonStyleNavLink>
		<NonStyleNavLink to='/notice' activeStyle={{ color: "#3986F7"}} className={classes.notActiveMenu}>
			공지사항
		</NonStyleNavLink>
		<NonStyleNavLink to='/guide' activeStyle={{color: "#3986F7"}} className={classes.notActiveMenu}>
			사용법 안내
		</NonStyleNavLink>
		{
			isLogin && <NonStyleNavLink to='/applywork' activeStyle={{color: "#3986F7"}} className={classes.notActiveMenu}>
			{`신청(${workCount.apply})`}
		</NonStyleNavLink>

		}
		{
			Boolean(isWorker) &&
			<NonStyleNavLink to='/getwork' activeStyle={{color: "#3986F7"}} className={classes.notActiveMenu}>
			{`진행(${workCount.get})`}
		</NonStyleNavLink>

		}
	</div>

    );
}
export default TopBarMobileSnackMenu;