import React, {useState, useEffect} from 'react';
import { Table,TableBody,TableCell,TableContainer,TableFooter, useTheme,TableRow,Paper,IconButton,TableHead,Typography,makeStyles  } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {rows, getData, getLength} from '../lib/fakeData.js'
import qs from 'qs';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	rootContainer:{
		margin: '30px 10px 30px 10px',
	},
	container: {
		maxheight: '600px',
		
	},
	table: {
		
	},
	title:{
		fontWeight: '700',
		margin: '30px'
	},
	pagenation:{
		display:'flex',
		alignItems:'center',
		justifyContent:'center',
		marginTop: '30px'
	},
	postTitle:{
		cursor: 'pointer'
	},
	postTop:{
		borderBottom: 'solid 3px #a0a0a0'
	}
}));

function Board (props){
	let {page, datas, rowLength} = props;
	const classes = useStyles();
	let history = useHistory();
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const updateWindowDimensions = () => {
		const newHeight = window.innerHeight;
		setHeight(newHeight);
	};
	window.addEventListener("resize", updateWindowDimensions);
	return () => window.removeEventListener("resize", updateWindowDimensions) 
	}, []);
	
	function openPost(id){
		history.push(`/notice/post/?id=${id}&page=${page}`);
	}
	
	return (
	<>
	<TableContainer className={classes.container} component={Paper}>
      <Table size={height > 930 ? 'medium' : 'small'} className={classes.table} aria-label="simple table">
        <TableHead className={classes.postTop}>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell align="left">제목</TableCell>
            <TableCell align="right">작성자</TableCell>
			  <TableCell align="right">날짜</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.slice(page * rowLength - rowLength, page * rowLength).map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {rows.length - (i +(page-1)*10)}
              </TableCell>
 				<TableCell className = {classes.postTitle} align="left" onClick={()=>{openPost(row.id)}}>{row.title}</TableCell>
              	<TableCell align="right">{row.userRank + ' ' + row.userName}</TableCell>
				<TableCell align="right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	</>
	);
}

export default function NoticeBoard ({ location }){
	const query = qs.parse(location.search ,{
		ignoreQueryPrefix: true
	});
	const page = Number(query.page ? query.page : 1);
	let history = useHistory();
	const classes = useStyles();
	
	const [datas, setDatas] = useState([]);
	const [dataLength, setDataLength] = useState(0);
	
	
	const handleChangePage = (event, newPage) => {
		history.push(`/notice?page=${newPage}`);
	};
	useEffect(() => {
		(async function getDataFromServer(){
			let {getDatas, getDatasLength} = await getData(page);
			setDataLength(getDatasLength);
			setDatas(getDatas);
		})();
		return () => {
		};
	}, []);
	
	const rowLength = 10;
	return(
	<div className={classes.rootContainer}>
	<Typography className={classes.title} variant='h4'>공지사항</Typography>
	<Board datas={datas} rowLength={rowLength} page={page} />
	<div className={classes.pagenation}>
		<Pagination
		component="div"
		count={ Math.ceil(dataLength / rowLength)}
		page={page}
		onChange={handleChangePage}
		showFirstButton 
		showLastButton
		size="large"
		color="primary"
      />
	</div>
	
	</div>
	);
}

    
