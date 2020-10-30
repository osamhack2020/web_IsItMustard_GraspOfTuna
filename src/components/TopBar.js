import React from "react";
import { useLayoutEffect, useState } from 'react';
import { makeStyles, Typography,Paper } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import TopBarUserInfoContainer from '../containers/TopBarUserInfoContainer';
import TopBarMobileSnackMenu from './TopBarMobileSnackMenu';
import {NonStyleLink, NonStyleNavLink} from './NonStyleRouter';
import { Icon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import '../fonts.css';


const useStyles = makeStyles(theme => ({
		logoLink:{
			width: '100%',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'inline',
			position: 'relative',
			left: '31px',
			top: '6px',
			
			fontFamily: 'Montserrat',
			color: 'black',
			fontSize: '36px',
			zIndex: '3',
			letterSpacing: '-1px',
			userSelect:'none',
			display: 'inline',
		},
		logoLinkStick:{
			width: '100%',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
			display: 'inline',
			position: 'relative',
			left: '73px',
			top: '20px',
			
			fontFamily: 'Montserrat',
			color: 'black',
			fontSize: '36px',
			letterSpacing: '-1px',
			userSelect:'none',
			display: 'inline',
		},
		notActiveMenu:{
			fontFamily: 'Noto Sans KR',
			color: '#091A27',
			padding: '10px 10px 10px 10px',
			display: 'inline-block',
			lineHeight: '60px',
			top: '2px',
			left: '12px',
			position: 'relative',
			transition: 'ease 120ms',
			
			fontSize: '22px',
			marginLeft: '13px',
			paddingTop: '11px',
			userSelect:'none',
		},
		userInfoContainer:{
			float: 'right',
			display: 'inline',
		},
        paper: {
			height: '86px',
			marginTop: '14px',
			marginLeft: '14px',
			marginRight: '14px',
			background: 'white',
			display: 'block',
			position: 'absolute',
			justifyItems: 'center',
			zIndex: '2',
			boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
			borderRadius: '7px',
        },
        categoryPaper: {
			left: '0',
			top: '0',
			marginRight: '300px',
			width: 'auto',
			overflow: 'auto',
        },
        userPaper: {
			right: '0',
			top: '0',
			width: 'auto',
			background: '#3986F7',
        },
        paperContainer: {
			height: '114px',
			width: '100%',
			position: 'fixed',
			left: '0',
			top: '0',
			zIndex: '2',
			backdropFilter: 'blur(14px)',
			background: 'rgba(235,235,235,0.5)',
        },
		categoryContainer:{
			display: 'inline',
			position: 'relative',
			left: '30px',
			marginRight: '65px',
		},
		paperStick:{
			height: '86px',
			position: 'fixed',
			left: '0',
			top: '0',
			width: '100%',
			background: 'rgba(255,255,255,0.82)',
			display: 'block',
			justifyItems: 'center',
			backdropFilter: 'blur(8px)',
			zIndex: '2',
			boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
        },
		boxIcon: {
			fontSize: 26,
			color: 'black',
			alignSelf: 'center',
			justifySelf: 'center',
			cursor: 'pointer',
		},
	
		contentStick:{
			marginTop: '30px',
		},
		iconLeft:{
			marginTop: '20px',
			position: 'absolute',
			marginLeft: '15px',
			padding: '10px',
			color:'black',
		},
		userStick:{
			background: '#3986F7',
			position: 'absolute',
			right: '0',
			top: '0',
			height: '86px',
			color:'black',
		},
	})
);

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

function TopBar({workCount,isLogin, isWorker}) {
    const classes = useStyles();
	const [width, height] = useWindowSize();
	const [open, setOpen] = useState(false);

	const desktop = <div className={classes.paperContainer}>
				<div className={[classes.paper, classes.categoryPaper].join(' ')} >
					<NonStyleLink to='/main' className={classes.logoLink}>
						Help Desk
					</NonStyleLink>
					<div className={classes.categoryContainer}>
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
				</div>
				<div className={[classes.paper, classes.userPaper].join(' ')} >
					<TopBarUserInfoContainer className={classes.userInfoContainer} workCount={workCount}/>
				</div>
		</div>;
	
	const mobile = <div className={classes.paperStick} >
			<Icon component={MenuIcon} className={[classes.boxIcon,classes.iconLeft].join(' ')} onClick={()=>{setOpen(true)}}/>
			  {open && <TopBarMobileSnackMenu setOpen={setOpen} workCount={workCount} isLogin={isLogin} isWorker={isWorker}/>}
			<NonStyleLink to='/main' className={classes.logoLinkStick}>
				Help Desk
			</NonStyleLink>
			<div className={classes.userStick} >
				<TopBarUserInfoContainer className={classes.userInfoContainer} workCount={workCount}/>
			</div>
		</div>;
    return (
		<>{width < 1234 ? mobile : desktop}</>
    );
}
export default TopBar;