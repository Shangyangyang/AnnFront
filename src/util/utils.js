export default {
	checkResult(obj, that) {

		if (!obj) {
			return false;
		}
		if (obj.status || obj.status == 0) {
			if (obj.status != '1') {
				that.$message.error(`操作失败，${obj.message}`);
				return false;
			} else {
				return true;
			}
		}

		return false;
	},
	rnd(n, m) {
		var random = Math.floor(Math.random() * (m - n + 1) + n);
		return random;
	}
}
