export function formatTime(val) {
	if (val != null) {
		var date = new Date(val);
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}
}



