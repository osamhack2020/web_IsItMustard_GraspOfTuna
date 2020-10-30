const team = {
	ce: {
		name:"유선장비정비과",
		call:"250-1010"
	},
	ws: {
		name:"무선음향정비과",
		call:"250-1020"
	},
	lp: {
		name:"라인PC정비과",
		call:"250-1030"
	},
	cf: {
		name:"회의FAX지원과",
		call:"250-1040"
	},
	sc: {
		name:"체계관제과",
		call:"250-1050"
	},
	nm: {
		name:"네트워크관리과",
		call:"250-1010"
	},
	is: {
		name:"정보보안과",
		call:"250-1010"
	},
	de: {
		name:"개발과",
		call:"250-1080"
	},
	sm: {
		name:"체계관리과",
		call:"250-1090"
	},
	
}

export default function getTeamInfo (type) {
	return (team[type]);
}