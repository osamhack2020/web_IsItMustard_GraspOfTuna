import React from "react";
import { makeStyles, Typography,Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const teamInfos = [
	{
		name:'사용자지원센터',
		tel:'250-1000',
		work: 'HelpDesk 관리 및 추가 안내',
		type: '크루'
	},
	{
		name:'유선장비정비과',
		tel:'250-1010',
		work: '유선 IP 전화기 담당',
		type: '주간'
	},
	{
		name:'무선음향정비과',
		tel:'250-1020',
		work: '행사 지원 및 일반 회의 지원',
		type: '크루'
	},
	{
		name:'라인PC정비과',
		tel:'250-1030',
		work: '인트라넷, 공군C4I, 인터넷 등 하드웨어 관리',
		type: '주간'
	},
	{
		name:'회의FAX지원과',
		tel:'250-1040',
		work: '합참 C4I 망 관리 및 팩스, 화상 회의 지원',
		type: '크루'
	},
	{
		name:'네트워크관리과',
		tel:'250-1050',
		work: '네트워크 장비 관리',
		type: '크루'
	},
	{
		name:'체계관제과',
		tel:'250-1060',
		work: '공군C4I 체계 관리',
		type: '크루'
	},
	{
		name:'정보보안과',
		tel:'250-1070',
		work: '보안 프로그램 관리',
		type: '크루'
	},
	{
		name:'개발과',
		tel:'250-1080',
		work: '공군C4I 및 인트라넷 체계 개발',
		type: '주간'
	},
	{
		name:'체계관리과',
		tel:'250-1090',
		work: '체계 관리 지원',
		type: '주간'
	}
	
];

const useStyles = makeStyles(theme => ({
		paper:{
			marginTop: '38px',
			marginBottom: '38px',
			// boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
			borderRadius: '17px',
		},
		tableHead:{
			fontSize: '1.1rem'
		},
		tableBody:{
			fontSize: '1.1rem'
		},
		table:{
			fontSize: '3rem'
		}
	})
);

function TeamInfoBox() {
    const classes = useStyles();
    return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.tableHead}>부서 이름</TableCell>
			  <TableCell className={classes.tableHead} align="left">부서 유형</TableCell>
            <TableCell className={classes.tableHead} align="left">전화 번호</TableCell>	
            <TableCell className={classes.tableHead} align="center">담당 업무</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {teamInfos.map((teamInfo, i) => (
            <TableRow key={i} >
              <TableCell className={classes.tableBody} component="th" scope="row">
                {teamInfo.name}
              </TableCell>
				<TableCell className={classes.tableBody} align="left">{teamInfo.type}</TableCell>
              <TableCell className={classes.tableBody} align="left">{teamInfo.tel}</TableCell>
				
              <TableCell className={classes.tableBody} align="center">{teamInfo.work}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}
export default TeamInfoBox;