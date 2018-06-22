/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * baseImgPath: 图片存放地址
 * 
 */

let baseUrl = '';

if (process.env.NODE_ENV == 'development') {
	baseUrl = 'http://localhost:8080';
}else{
	baseUrl = 'http://103.239.155.159:8120';
}

export {
	baseUrl
}