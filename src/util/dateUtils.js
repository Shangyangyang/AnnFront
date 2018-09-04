export function formatTime(val) {
	if (val != null) {
		
		let date = new Date(val);		
		let format = date.getFullYear() + '-' + checkDate(date.getMonth() + 1) + '-' + checkDate(date.getDate());
		return format;
	}
}

function checkDate(date){
	if(date< 10){
		date = "0" + date;
	}
	
	return date;
}
