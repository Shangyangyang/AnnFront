/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * baseImgPath: 图片存放地址
 * 
 */

let baseUrl = '';
let testUrl = '';
let loginUrl = 'http://localhost:8888/#/login';


if (process.env.NODE_ENV == 'development') {

	baseUrl = 'http://localhost:8001';
	testUrl = 'http://localhost:8300';
}else{
	baseUrl = 'http://localhost:8001';
	testUrl = 'http://localhost:8300';
}

export {
	baseUrl,
	testUrl,
	loginUrl,
}