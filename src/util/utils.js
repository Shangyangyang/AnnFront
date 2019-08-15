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
	},
	getPicSize(url, maxSize = 500) {
		let mw = 0;
		let mh = 0;
		
		// 图片地址 后面加时间戳是为了避免缓存
		var img_url = url + '?' + Date.parse(new Date());
		  
		// 创建对象
		var img = new Image();
		  
		// 改变图片的src
		img.src = img_url;
		  
		// 加载完成执行
		img.onload = function(){
			// 打印
			let w = img.width;
			let h = img.height;
			
			if(w > h){
				mw = maxSize;
				let per = maxSize / w;
				mh = h * per;
			}
			if(h > w){
				mh = maxSize;
				let per = maxSize / h;
				mw = w * per;
			}
			
			return Array.of(mw, mh);
		};
	},
}
