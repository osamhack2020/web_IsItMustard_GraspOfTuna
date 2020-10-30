// n 밀리세컨드동안 기다리는 프로미스를 만들어주는 함수
const sleep = n => new Promise(resolve => setTimeout(resolve, n));

// 가짜 포스트 목록 데이터
const users = [
  {
	  userId: '15-12345',
	  userPW: 'qwe123!@#',
	  userName: '김근',
	  userRank: '소령',
	  userUnit: '유선장비정비과',
	  userTel: '123-4567',
	  isWorker: true
  },
	{
	  userId: '10-12345',
	  userPW: 'qwe123!@#',
	  userName: '조준오',
	  userRank: '상령',
	  userUnit: '공군작전사령부 예하 B전대',
	  userTel: '121-4567',
	  isWorker: false
  }
];

// 포스트 목록을 가져오는 비동기 함수
export const signUp = async (userInfo) => {
	await sleep(2500); // 0.5초 쉬고
	users.push(userInfo);
	return users; // posts 배열
};

// ID로 포스트를 조회하는 비동기 함수
export const login = async ({userId, userPW}) => {
	await sleep(2500); // 0.5초 쉬고
	let targets = users.filter(user => user.userId === userId);
	let target = { ...targets[0] };
	if(targets.length !== 1){
		throw({type:'존재하지 않는 회원입니다.'});
	}
	else if(targets[0].userPW !== userPW) {
		throw({type:'비밀번호가 잘못됐습니다.'});
	}
	else {
		return {userName: target.userName, userRank: target.userRank, userId: target.userId, isWorker: target.isWorker};
	}
	throw({type:'알 수 없는 오류.'});
	
};

export const loginCheck = async () => {
	await sleep(100); // 0.5초 쉬고
	
	return {userName: users[0].userName, userRank: users[0].userRank, userId: users[0].userId};

	
};

export const getUser = async (userId) => {
	await sleep(150); // 0.5초 쉬고
	let target = users.filter(user => user.userId === userId);
	if(target.length !== 1){
		throw({type:'존재하지 않는 회원입니다.'});
	}
	else {
		target = { ...target[0] };
		delete target['userPW'];
		return target;
	}
	throw({type:'알 수 없는 오류.'});
}

const posts = [
	{
		postId: 1,
		postTitle: '전화기 이전의 건',
		postLocation: '작사 청사',
		postTel: '213-1231',
		postStatus: 'doing',
		postUserRank: '소령',
		postUserName: '유비',
		postUserId: '20-11111'
	},
	{
		postId: 2,
		postTitle: '전화기 신설의 건',
		postLocation: '작사 청사',
		postTel: '213-1231',
		postStatus: 'doing',
		postUserRank: '소령',
		postUserName: '유비',
		postUserId: '20-11111'
	}
];

const notices =[
	{
		noticeId: 1,
		noticeTitle: '공지 테스트',
		noticeUserRank: '소령',
		noticeUserName: '유비',
		noticeUserId: '20-11111'
	},
	{
		noticeId: 2,
		noticeTitle: '공지 테스트2',
		noticeUserRank: '소령',
		noticeUserName: '유비',
		noticeUserId: '20-11111'
	},
	{
		noticeId: 3,
		noticeTitle: '공지 테스트3',
		noticeUserRank: '소령',
		noticeUserName: '유비',
		noticeUserId: '20-11111'
	},
]

export const getNotices = async () => {
	await sleep(2500); // 0.5초 쉬고
	return notices;
	
};