export function userIdValid(value){
	// 군번 형식에 맞는지 필터링 (나무위키 군번 참조)
	if(/^[01289]\d{1}-[12357](\d{4,7})$/.test(value)){
		let rankType = value[3];
		let len = value.length;
		if(rankType === '1' || rankType ==='2' || rankType === '3')
			return(len === 8);
		else if(rankType === '5')
			return(len === 9);
		else if(rankType === '7')
			return(len === 11);
	}
	return false;
}
export function userTelValid(value){
	return( /^\d{3}-\d{4}$/.test(value));
}
export function userRankValid(value){
	return(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2}$/.test(value));
}
export function userNameVaild(value){
	return(/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,10}$/.test(value));
}
export function userPWValid(value){
	return(/^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9]).{6,}$/.test(value));
}

export function userUnitValid(value){
	return true;
}